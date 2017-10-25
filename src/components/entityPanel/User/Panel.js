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
import compareArrays from '../../../main/functions/compareArrays';

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
                "banned":false
            },
            validationErrors:{
                "name": "",
                "nameChange": "",
                "email": "",
                "firstname": "",
                "lastname": "",
                "phoneNumber": "",
                "participatedTournaments": "",
                "organizedTournaments": ""
            },
            tabsMap:{},
            tabsNamesMap:{}
        };
    }

    async componentDidMount() {
        if(this.props.entityPanel.mode==='edit' || this.props.entityPanel.mode==='get')
        {
            await axios.get(serverName+`get/`+this.props.entityPanel.entityType+`?name=`+this.props.entityPanel.entityName)
                .then(res => {
                    this.setAccessToTabsByStatus(res.data.status);
                    this.setState({entity:res.data});
                    console.log(res.data);
                })
                .catch(error => {
                    this.props.showNetworkErrorMessage(error);
                });
        }
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.entityPanel.hidden === false &&
            this.props.entityPanel.hidden === true &&
            !compareArrays(nextProps.entityPanel.relatedEntity.relatedEntityNames,this.props.entityPanel.relatedEntity.relatedEntityNames)) {

        }
    }

    setActiveTab(activeTabName){
        this.setState({activeTab:activeTabName});
    }

    isTabActive(activeTabName){
        return this.state.activeTab === activeTabName;
    }

    createContent(){
        return React.createElement(
            this.state.tabsMap[this.state.activeTab],
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
        let entityToSend = JSON.parse(JSON.stringify(this.state.entity));
        delete entityToSend["status"];
        delete entityToSend["points"];
        delete entityToSend["numberOfBattles"];
        delete entityToSend["finishedParticipatedTournaments"];
        delete entityToSend["finishedOrganizedTournaments"];
        delete entityToSend["createdGames"];
        delete entityToSend["banned"];
        let validationErrors = validateUser(entityToSend);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log(entityToSend);
            axios.post(serverName+this.props.entityPanel.mode+'/'+this.props.entityPanel.entityType, entityToSend)
                .then(res => {
                    this.setAccessToTabsByStatus(res.data.status);
                    this.setState({entity:res.data});
                    this.props.showSuccessMessage("User: "+res.data.name+" successfully "+this.props.entityPanel.mode+"ed");
                    this.props.disableEntityPanel();
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
        let content = <div/>;
        if(!checkIfObjectIsNotEmpty(this.state.tabsMap))
            content = this.createContent();

        let buttons = [];
        if(this.props.mode!=='get'){
            buttons = [
                <Button key="cancel" text={"Cancel"} action={() => this.props.disableEntityPanel()}/>,
                <Button key="save" text={"Save"} action={() => {this.sendEntity()}}/>
            ]
        }
        else{
            buttons = [
                <Button key="ok" text={"Ok"} action={() => this.props.disableEntityPanel()}/>
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
        entityPanel:state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
