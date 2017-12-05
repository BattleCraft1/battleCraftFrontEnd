import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Button from '../../entityPanel/inputs/Button';

import AddressTab from './Tabs/AddressTab';
import PersonalDataTab from './Tabs/PersonalDataTab';
import PanelTitle from '../../entityPanel/inputs/PanelTitle';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Navigation from '../../entityPanel/Navigation/Navigation'

import {resp, styles} from './styles'

import {serverName} from '../../../main/consts/server';
import axios from 'axios';

import checkIfObjectIsNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'
import validateRegister from './validator/RegisterValidator'

const tabsMap = {
    "personalData":PersonalDataTab,
    "address":AddressTab
};

const tabsNamesMap = {
    "personalData":"Personal data",
    "address":"Address",
};

class Panel extends React.Component{
    constructor(props) {
        super(props);

        this.setEntityPanelRef = this.setEntityPanelRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            height : window.innerHeight,
            activeTab : "personalData",
            entity:{
                "name": "",
                "nameChange": "",
                "email": "",
                "password":"",
                "passwordConfirm":"",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "province": "lubelskie",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
            },
            validationErrors:{
                "name": "",
                "nameChange": "",
                "email": "",
                "password":"",
                "passwordConfirm":"",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "province": "",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": ""
            },
            tabsMap:{},
            tabsNamesMap:{}
        };
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    handleClickOutside(event) {
        if (this.entityPanelRef && !this.entityPanelRef.contains(event.target)) {
            this.setState({
                entity:{
                    "name": "",
                    "nameChange": "",
                    "email": "",
                    "password":"",
                    "passwordConfirm":"",
                    "firstname": "",
                    "lastname": "",
                    "phoneNumber": "",
                    "province": "lubelskie",
                    "city": "",
                    "street": "",
                    "zipCode": "",
                    "description": "",
                }});
            this.setState({
                validationErrors:{
                    "name": "",
                    "nameChange": "",
                    "email": "",
                    "password":"",
                    "passwordConfirm":"",
                    "firstname": "",
                    "lastname": "",
                    "phoneNumber": "",
                    "province": "",
                    "city": "",
                    "street": "",
                    "zipCode": "",
                    "description": ""
                }});
            this.props.showRegisterPanel(false)
        }
    }

    setEntityPanelRef(node) {
        this.entityPanelRef = node;
    }

    updateDimensions()
    {
        this.setState({
            height : window.innerHeight,
        })
    }

    setActiveTab(activeTabName){
        this.setState({activeTab:activeTabName});
    }

    isTabActive(activeTabName){
        return this.state.activeTab === activeTabName;
    }

    createContent(){
        return React.createElement(
            tabsMap[this.state.activeTab],
            {
                entity:this.state.entity,
                inputsDisabled: this.props.mode === 'get',
                changeEntity: this.changeEntity.bind(this),
                validationErrors: this.state.validationErrors
            },
            null);

    }

    changeEntity(fieldName,value){
        let entity = this.state.entity;
        entity[fieldName] = value;
        this.setState({entity:entity});
    }


    sendEntity(){
        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));
        console.log(entityToSend);
        entityToSend.name = this.state.entity.nameChange;
        let validationErrors = validateRegister(entityToSend);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log("output entity:");
            console.log(entityToSend);
            let url;
            let config;
            if(this.props.security.role !== "ROLE_ADMIN"){
                url = 'registration';
                config = {}
            }
            else{
                url = '/create/admin';
                config = {
                    headers: {
                        "X-Auth-Token":this.props.security.token
                    }
                }
            }

            this.props.startLoading("Creating account...");
            axios.post(serverName+url, entityToSend, config)
                .then(res => {
                    this.props.stopLoading();
                    if (this.props.security.role !== "ROLE_ADMIN") {
                        this.props.showSuccessMessage("You are successfully registered. Please check your mail box to verify you account. If you do not have any mail from us please try to rensend mail.");
                    }
                    else {
                        this.props.showSuccessMessage("Admin account is created");
                    }
                    this.props.showRegisterPanel(false);
                })
                .catch(error => {
                    this.props.stopLoading();
                    if(error.response.data.fieldErrors===undefined){
                        this.props.showNetworkErrorMessage(error);
                    }
                    else{
                        this.setValidationErrors(error.response.data);
                    }
                });
        }
        else{
            this.setValidationErrors(validationErrors);
        }
    }


    setValidationErrors(validationException){
        console.log(validationException);
        this.props.showFailureMessage(validationException.message);
        let validationErrors = validationException.fieldErrors;
        console.log("validation errors:");
        console.log(validationErrors);
        let validationErrorsState = this.state.validationErrors;
        for (let field in validationErrorsState) {
            if (validationErrors.hasOwnProperty(field)) {
                validationErrorsState[field] = validationErrors[field]
            }
            else{
                validationErrorsState[field] = "";
            }
        }
        this.setState({validationErrors:validationErrorsState})
    }

    createTitle(){
        if(this.props.userKind === "normal"){
            return 'Registration'
        }
        else{
            return 'Create administrator'
        }
    }

    render(){
        return(
            <div>
            {this.props.securityPanels.isRegisterPanelShown &&
            <div style = {Object.assign({}, styles.background, {display: 'block'})}>
                <div ref={this.setEntityPanelRef} style = {Object.assign({}, styles.goldAndBrownTheme, styles.panelContainer)} className = {css(resp.popupContent)}>
                    <div>
                        <PanelTitle name={this.createTitle()}/>
                        <div style={styles.goldAndBrownTheme} className={css(resp.panel)}>
                            <Navigation
                                tabNames={tabsNamesMap}
                                setActiveTab={this.setActiveTab.bind(this)}
                                isTabActive={this.isTabActive.bind(this)}/>
                            <div style={{
                                maxHeight: this.state.height * 0.6, overflowY: 'scroll',
                                width: '80%', padding: '20px', paddingRight: '10%', paddingLeft: '10%'
                            }}>
                                {this.createContent()}
                            </div>
                            <Button key="cancel" text={"Cancel"} action={() => this.props.showRegisterPanel(false)}/>,
                            <Button key="save" text={"Save"} action={() => {
                                this.sendEntity()
                            }}/>
                        </div>
                    </div>

                </div>
            </div>}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        securityPanels: state.securityPanels,
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
