import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Button from '../inputs/Button';

import AddressTab from './Tabs/AddressTab';
import BasicDataTab from './Tabs/BasicDataTab';
import OrganizersTab from './Tabs/OrganizersTab';
import ParticipantsTab from './Tabs/ParticipantsTab';

import compareArrays from '../../../main/functions/compareArrays';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Navigation from './Navigation/Navigation'

import {resp, styles} from '../styles'

import {serverName} from '../../../main/consts/server';
import axios from 'axios';

const tabsMap = {
    "basicData":BasicDataTab,
    "address":AddressTab,
    "organizers":OrganizersTab,
    "participants":ParticipantsTab
};

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab : "basicData",
            entity:{
                "name": "",
                "nameChange": "",
                "tablesCount": 0,
                "maxPlayers": 0,
                "game": "",
                "dateOfStart": 0,
                "dateOfEnd": 0,
                "province": "",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
                "organizers": [],
                "participants": []
            },
            validationErrors:{
                "name": "",
                "nameChange": "",
                "tablesCount": "",
                "maxPlayers": "",
                "game": "",
                "dateOfStart": "",
                "dateOfEnd": "",
                "province": "",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
                "organizers": "",
                "participants": ""
            }
        };
    }

    async componentDidMount() {
        if(this.props.entityPanel.mode==='edit' || this.props.entityPanel.mode==='get')
        {
            await axios.get(serverName+`get/`+this.props.entityPanel.entityType+`?name=`+this.props.entityPanel.entityName)
                .then(res => {
                    this.setState({entity:res.data});
                })
                .catch(error => {
                    this.props.showNetworkErrorMessage(error);
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.entityPanel.hidden === false &&
            this.props.entityPanel.hidden === true &&
            !compareArrays(nextProps.entityPanel.relatedEntity.relatedEntityNames,this.props.entityPanel.relatedEntity.relatedEntityNames)) {
            let relatedEntityType = nextProps.entityPanel.relatedEntity.relatedEntityType;
            let relatedEntityNames = nextProps.entityPanel.relatedEntity.relatedEntityNames;
            if(compareArrays(relatedEntityType,["ORGANIZER"])){
                this.actualizeRelatedEntityObjects("organizers",relatedEntityNames)
            }
            else if(compareArrays(relatedEntityType,["ORGANIZER","ACCEPTED"])){
                this.actualizeRelatedEntityObjects("participants",relatedEntityNames)
            }
        }
    }

    actualizeRelatedEntityObjects(relatedEntityType,relatedEntityNames){
        let entity = this.state.entity;
        let organizersNames = entity[relatedEntityType].map(entity => entity.name);
        relatedEntityNames.forEach(
            elementName => {
                if(organizersNames.indexOf(elementName)===-1){
                    entity[relatedEntityType].push({
                        invitedUserName:elementName,
                        accepted:false
                    })
                }
            }
        );
        organizersNames.forEach(
            elementName => {
                if(relatedEntityNames.indexOf(elementName)===-1){
                    let organizerToDelete = entity[relatedEntityType].find(element => element.name===elementName);
                    entity[relatedEntityType].splice(entity[relatedEntityType].indexOf(organizerToDelete),1);
                }
            }
        );
        this.setState({entity:entity});
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
                mode:this.props.mode,
                entity:this.state.entity,
                changeEntity: this.changeEntity.bind(this),
                validationErrors: this.state.validationErrors
            },
            null)
    }

    changeEntity(fieldName,value){
        let entity = this.state.entity;
        entity[fieldName] = value;
        this.setState({entity:entity});
    }

    sendEntity(){
        if(this.props.entityPanel.mode==='add')
        {
            let entity = this.state.entity;
            entity.name = entity.nameChange;
            this.setState({entity:entity})
        }
        this.state.entity.organizers = this.state.entity.organizers.map(element => element.invitedUserName);
        this.state.entity.participants = this.state.entity.participants.map(element => element.invitedUserName);
        let validationErrors = this.validate(this.state.entity);
        if(validationErrors.length === 0){
            axios.post(serverName+this.props.entityPanel.mode+'/'+this.props.entityPanel.entityType, this.state.entity)
                .then(res => {
                    this.setState({entity:res.data});
                    this.props.showSuccessMessage("Tournament: "+res.data.name+" successfully "+this.props.entityPanel.mode+"ed")
                })
                .catch(error => {
                    this.setValidationErrors(error);
                });
        }
        else{
            this.setValidationErrors(validationErrors);
        }
    }

    validate(entity){
        return [];
    }

    setValidationErrors(errors){
        let validationException = errors.response.data;
        this.props.showFailureMessage(validationException.message);
        let validationErrors = validationException.fieldErrors;
        let validationErrorsState = this.state.validationErrors;
        for (let field in validationErrors) {
            if (validationErrors.hasOwnProperty(field)) {
                validationErrorsState[field] = validationErrors[field]
            }
        }
        console.log(validationErrorsState);
        this.setState({validationErrors:validationErrorsState})
    }

    render(){
        let content = this.createContent();

        return(
            <div style={styles.goldAndBrownTheme} className = {css(resp.panel)}>
                <Navigation
                    setActiveTab={this.setActiveTab.bind(this)}
                    isTabActive={this.isTabActive.bind(this)}/>
                <div className={css(resp.content)}>
                    {content}
                </div>
                <Button text={"Cancel"} action={() => this.props.disableEntityPanel()}/>
                <Button text={"Save"} action={() => {this.sendEntity()}}/>
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel,
        message:state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
