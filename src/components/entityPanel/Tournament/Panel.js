import React from 'react';
import {css} from 'aphrodite';

import Button from '../inputs/Button';
import ButtonLink from '../inputs/ButtonLink';

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
        let today = new Date();
        let tomorrow = new Date();
        let dayAfterTomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        dayAfterTomorrow.setDate(today.getDate()+2);
        this.state = {
            height:window.innerHeight,
            activeTab : "basicData",
            entity:{
                "name": "",
                "nameChange": "",
                "tablesCount": 0,
                "playersOnTableCount": 2,
                "toursCount":0,
                "game": "Warhammer",
                "dateOfStart": tomorrow,
                "dateOfEnd":dayAfterTomorrow,
                "province": "lubelskie",
                "city": "",
                "street": "",
                "zipCode": "",
                "description": "",
                "organizers": [],
                "participants": [],
                "status":"NEW",
                "canCurrentUserEdit":false
            },
            validationErrors:{
                "name": "",
                "nameChange": "",
                "tablesCount": "",
                "playersOnTableCount":"",
                "toursCount":0,
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

            this.setState({height:window.innerHeight});
            window.addEventListener("resize", this.updateDimensions.bind(this));
            this.props.startLoading("Fetching tournament...");
            await axios.get(serverName+`get/tournament?name=`+this.props.name,
                {
                    headers: {
                        "X-Auth-Token":this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    this.setState({entity:res.data});
                    console.log("input entity: ");
                    console.log(res.data);
                })
                .catch(error => {
                    this.props.stopLoading();
                    this.props.showNetworkErrorMessage(error);
                });
        }
        else {
            let entity = this.state.entity;
            entity.canCurrentUserEdit = true;
            this.setState({entity:entity});
        }
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

    setActiveTab(activeTabName){
        this.setState({activeTab:activeTabName});
    }

    isTabActive(activeTabName){
        return this.state.activeTab === activeTabName;
    }

    createContent(){
        if(this.state.activeTab === "organizers" || this.state.activeTab === "participants")
            return React.createElement(
                tabsMap[this.state.activeTab],
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
                tabsMap[this.state.activeTab],
                {
                    entity:this.state.entity,
                    mode:this.props.mode,
                    inputsDisabled: this.props.mode === 'get' || !this.state.entity.canCurrentUserEdit,
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
        entityToSend.participants = [];
        this.state.entity.participants.map(participantGroup => {
            let participantGroupToSend = [];
            participantGroup.forEach(participant =>{
                if(participant.name !== undefined)
                    participantGroupToSend.push(participant.name)});
            if(participantGroupToSend.length !== 0)
                entityToSend.participants.push(participantGroupToSend);
        });
        delete entityToSend["status"];
        delete entityToSend["canCurrentUserEdit"];
        let validationErrors = validateTournament(entityToSend);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log("output entity:");
            console.log(entityToSend);
            this.props.startLoading("Sending tournament...");
            axios.post(serverName+this.props.mode+'/'+this.props.type, entityToSend,
                {
                    headers: {
                        "X-Auth-Token": this.props.security.token
                    }
                })
                .then(res => {
                    this.props.stopLoading();
                    this.setState({entity:res.data});
                    this.props.showSuccessMessage("Tournament: "+res.data.name+" successfully "+this.props.mode+"ed");
                    this.props.disable();
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
        let content = this.createContent();

        let buttons = [];
        if(this.props.mode!=='get' && this.state.entity.canCurrentUserEdit){
            buttons = [
                <Button key="cancel" text={"Cancel"} action={() => this.props.disable()}/>,
                <Button key="save" text={"Save"} action={() => {this.sendEntity()}}/>,
                <ButtonLink key="progress" text={"Progress"} action={() => this.props.disable()}
                            link={`/progress/${this.state.entity.name}`}/>
            ]
        }
        else{
            buttons = [
                <Button key="ok" text={"Ok"} action={() => this.props.disable()}/>,
                <ButtonLink key="progress" text={"Progress"} action={() => this.props.disable()}
                            link={`/progress/${this.state.entity.name}`}/>
            ]
        }

        return(
            <div>
                <PanelTitle name={"TOURNAMENT PANEL"} />
                <div style={Object.assign({},styles.goldAndBrownTheme)} className = {css(resp.panel)}>
                    <Navigation
                        tabNames={tabsNamesMap}
                        setActiveTab={this.setActiveTab.bind(this)}
                        isTabActive={this.isTabActive.bind(this)}/>
                    <div style={{maxHeight:this.state.height*0.52}} className={css(resp.content)}>
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
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
