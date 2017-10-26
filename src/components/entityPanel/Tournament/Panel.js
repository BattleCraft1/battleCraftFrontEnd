import React from 'react';
import {css} from 'aphrodite';
import Button from '../inputs/Button';

import AddressTab from './Tabs/AddressTab';
import BasicDataTab from './Tabs/BasicDataTab';
import OrganizersTab from './Tabs/OrganizersTab';
import ParticipantsTab from './Tabs/ParticipantsTab';
import PanelTitle from '../inputs/PanelTitle';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Navigation from '../Navigation/Navigation'

import {resp, styles} from '../styles'

import {serverName} from '../../../main/consts/server';
import axios from 'axios';

import checkIfObjectIsNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'
import validateTournament from '../validators/TournamentValidator'
import compareArrays from '../../../main/functions/compareArrays';

const tabsMap = {
    "basicData":BasicDataTab,
    "address":AddressTab,
    "organizers":OrganizersTab,
    "participants":ParticipantsTab
};

const tabsNamesMap = {
    "basicData":"Basic data",
    "address":"Address",
    "organizers":"Organizers",
    "participants":"Participants",
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
                "playersOnTableCount": 0,
                "game": "Warhammer",
                "dateOfStart": new Date(),
                "dateOfEnd": new Date(),
                "province": "lubelskie",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
                "organizers": [],
                "participants": [],
                "status":""
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
        if(this.props.mode==='edit' || this.props.mode==='get')
        {
            await axios.get(serverName+`get/`+this.props.type+`?name=`+this.props.name)
                .then(res => {
                    this.setState({entity:res.data});
                    console.log(res.data);
                })
                .catch(error => {
                    this.props.showNetworkErrorMessage(error);
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hidden === false &&
            this.props.hidden === true &&
            !compareArrays(nextProps.relatedEntity.relatedEntityNames,this.props.relatedEntity.relatedEntityNames)) {
            this.actualizeRelatedEntityObjects(
                nextProps.relatedEntity.relatedEntityType,
                nextProps.relatedEntity.relatedEntityNames)
        }
    }

    actualizeRelatedEntityObjects(relatedEntityType,relatedEntityNames){
        let entity = this.state.entity;
        let relatedEntitiesNames = entity[relatedEntityType].map(entity => entity.name);
        relatedEntityNames.forEach(
            elementName => {
                if(relatedEntitiesNames.indexOf(elementName)===-1){
                    entity[relatedEntityType].push({
                        name:elementName,
                        accepted:false
                    })
                }
            }
        );
        relatedEntitiesNames.forEach(
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
                entity:this.state.entity,
                inputsDisabled: this.props.mode === 'get',
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
        if(this.props.mode==='add')
        {
            let entity = this.state.entity;
            entity.name = entity.nameChange;
            this.setState({entity:entity})
        }

        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));
        entityToSend.organizers = this.state.entity.organizers.map(element => element.name);
        entityToSend.participants = this.state.entity.participants.map(element => element.name);
        delete entityToSend["status"];
        let validationErrors = validateTournament(entityToSend);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log(entityToSend);
            axios.post(serverName+this.props.mode+'/'+this.props.entityType, entityToSend)
                .then(res => {
                    this.setState({entity:res.data});
                    this.props.showSuccessMessage("Tournament: "+res.data.name+" successfully "+this.props.mode+"ed");
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

    setValidationErrors(validationException){
        this.props.showFailureMessage(validationException.message);
        let validationErrors = validationException.fieldErrors;
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
        let content = this.createContent();

        let buttons = [];
        if(this.props.mode!=='get'){
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
          <PanelTitle name={"TOURNAMENT PANEL"} />
            <div style={styles.goldAndBrownTheme} className = {css(resp.panel)}>
                <Navigation
                    tabNames={tabsNamesMap}
                    setActiveTab={this.setActiveTab.bind(this)}
                    isTabActive={this.isTabActive.bind(this)}/>
                <div className={css(resp.content)}>
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
        message:state.message,
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
