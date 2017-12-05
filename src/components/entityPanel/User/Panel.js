import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Button from '../inputs/Button';

import AddressTab from './Tabs/AddressTab';
import OrganizerTab from './Tabs/OrganizerTab';
import PlayerTab from './Tabs/PlayerTab';
import PersonalDataTab from './Tabs/PersonalDataTab';
import PanelTitle from '../inputs/PanelTitle';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Navigation from '../Navigation/Navigation'

import {resp, styles} from '../styles'

import {serverName} from '../../../main/consts/server';
import axios from 'axios';

import checkIfObjectIsNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'
import validateUser from '../validators/UserValidator'

import Cookies from 'universal-cookie';

const cookies = new Cookies('auth');

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          height : window.innerHeight,
            activeTab : "personalData",
            entity:{
                "name": "",
                "nameChange": "",
                "email": "",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "status": "",
                "points": 0,
                "numberOfBattles": 0,
                "participatedTournaments": [],
                "finishedParticipatedTournaments": [],
                "organizedTournaments": [],
                "finishedOrganizedTournaments": [],
                "createdGames":[],
                "banned":false,
                "canCurrentUserEdit":false
            },
            validationErrors:{
                "name": "",
                "nameChange": "",
                "email": "",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "province": "",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
                "participatedTournaments": "",
                "organizedTournaments": ""
            },
            tabsMap:{},
            tabsNamesMap:{}
        };
    }

    async componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        await axios.get(serverName+`get/user?name=`+this.props.name,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.setAccessToTabsByStatus(res.data.status);
                this.setState({entity:res.data});
                console.log("input entity: ");
                console.log(res.data);
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    updateDimensions()
    {
        this.setState({
            height : window.innerHeight,
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    setAccessToTabsByStatus(status){
        let tabsMap = {
            "personalData":PersonalDataTab,
            "address":AddressTab,
        };
        let tabsNamesMap = {
            "personalData":"Personal data",
            "address":"Address"
        };
        if(status === "ORGANIZER" || status === "ACCEPTED"){
            tabsMap["player"] = PlayerTab;
            tabsNamesMap["player"] = "Participant data";
        }
        if(status === "ORGANIZER"){
            tabsMap["organizer"] = OrganizerTab;
            tabsNamesMap["organizer"] = "Organizer data";
        }
        this.setState({tabsMap:tabsMap});
        this.setState({tabsNamesMap:tabsNamesMap});
    }

    setActiveTab(activeTabName){
        this.setState({activeTab:activeTabName});
    }

    isTabActive(activeTabName){
        return this.state.activeTab === activeTabName;
    }

    createContent(){
        if(this.state.activeTab === "organizer" || this.state.activeTab === "player")
            return React.createElement(
                this.state.tabsMap[this.state.activeTab],
                {
                    entity:this.state.entity,
                    inputsDisabled: this.props.mode === 'get' || !this.state.entity.canCurrentUserEdit,
                    changeEntity: this.changeEntity.bind(this),
                    validationErrors: this.state.validationErrors,
                    relatedEntity: this.props.relatedEntity,
                    hidden: this.props.hidden
                },
                null);
        else
            return React.createElement(
                this.state.tabsMap[this.state.activeTab],
                {
                    entity:this.state.entity,
                    inputsDisabled: this.props.mode === 'get' || !this.state.entity.canCurrentUserEdit,
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
        delete entityToSend["status"];
        delete entityToSend["points"];
        delete entityToSend["numberOfBattles"];
        delete entityToSend["finishedParticipatedTournaments"];
        delete entityToSend["finishedOrganizedTournaments"];
        delete entityToSend["finishedOrganizedTournaments"];
        delete entityToSend["createdGames"];
        delete entityToSend["banned"];
        delete entityToSend["canCurrentUserEdit"];
        console.log(entityToSend);
        let validationErrors = validateUser(entityToSend);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log("output entity:");
            console.log(entityToSend);
            axios.post(serverName+this.props.mode+'/'+this.props.type, entityToSend,
                {
                    headers: {
                        "X-Auth-Token": this.props.security.token
                    }
                })
                .then(res => {
                    this.setAccessToTabsByStatus(res.data.status);
                    this.setState({entity:res.data});
                    if (res.data.newToken !== "") {
                        this.loginUserWithChangedUsername(res.data.newToken,res.data.name);
                    }
                    this.props.showSuccessMessage("User: "+res.data.name+" successfully "+this.props.mode+"ed");
                    this.props.disable();
                })
                .catch(error => {
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

    loginUserWithChangedUsername(token,name){
        this.props.setTokenAndRole(token,this.props.security.role,name);
        let date = new Date();

        if(cookies.get('token')!==undefined && cookies.get('role')!==undefined && cookies.get('username')!==undefined){
            cookies.set('token', token, { path: '/' ,expires: new Date(+new Date + 12096e5)});
            cookies.set('role', this.props.security.role, { path: '/' ,expires: new Date(+new Date + 12096e5)});
            cookies.set('username', name, { path: '/' ,expires: new Date(+new Date + 12096e5)});
        }
    }

    setValidationErrors(validationException){
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

    render(){
        let content = <div/>;
        if(!checkIfObjectIsNotEmpty(this.state.tabsMap))
            content = this.createContent();

        let buttons = [];
        if(this.props.mode!=='get'  && this.state.entity.canCurrentUserEdit){
            buttons = [
                <Button key="cancel" text={"Cancel"} action={() => this.props.disable()}/>,
                <Button key="save" text={"Save"} action={() => {this.sendEntity()}}/>
            ]
        }
        else{
            buttons = [
                <Button key="ok" text={"Ok"} action={() => this.props.disable()}/>
            ]
        }

        return(
          <div>
          <PanelTitle name={"USER PANEL"} />
            <div style={styles.goldAndBrownTheme} className = {css(resp.panel)}>
                <Navigation
                    tabNames={this.state.tabsNamesMap}
                    setActiveTab={this.setActiveTab.bind(this)}
                    isTabActive={this.isTabActive.bind(this)}/>
                <div style={{maxHeight:this.state.height * 0.6, overflowY:'scroll',
                    width:'80%', padding:'20px',paddingRight:'10%',paddingLeft:'10%'}}>
                    {content}
                </div>
                {buttons}
            </div>
          </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        security:state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
