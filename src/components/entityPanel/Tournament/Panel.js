import React from 'react';
import {css} from 'aphrodite';
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

import checkIfObjectIsNotEmpty from '../../../main/functions/checkIfObjectIsNotEmpty'

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
                "game": "Warhammer",
                "dateOfStart": new Date(),
                "dateOfEnd": new Date(),
                "province": "lubelskie",
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
                    console.log(res.data);
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

        let entity = JSON.parse(JSON.stringify(this.state.entity));
        entity.organizers = this.state.entity.organizers.map(element => element.invitedUserName);
        entity.participants = this.state.entity.participants.map(element => element.invitedUserName);
        this.setState({validationErrors:{
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
        }});
        console.log(this.state.validationErrors);
        let validationErrors = this.validate(entity);
        if(checkIfObjectIsNotEmpty(validationErrors)){
            console.log(entity);
            axios.post(serverName+this.props.entityPanel.mode+'/'+this.props.entityPanel.entityType, entity)
                .then(res => {
                    this.setState({entity:res.data});
                    this.props.showSuccessMessage("Tournament: "+res.data.name+" successfully "+this.props.entityPanel.mode+"ed");
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
            console.log("debug");
            this.setValidationErrors(validationErrors);
        }
    }

    validate(entity){
        let validationErrors = {};
        /*let fieldErrors = {};
        if(!entity.name.match(new RegExp("^[A-Z][A-Za-zzżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9 ]{1,29}$")))
            fieldErrors.dnameChange = "Tournament name must start with big letter and have between 2 to 30 chars";

        if(entity.tablesCount<1 || entity.tablesCount>30)
            fieldErrors.tablesCount = "Tournament name must start with big letter and have between 2 to 30 chars";

        if(entity.maxPlayers>entity.tablesCount*2)
            fieldErrors.maxPlayers = "You cannot create tournament with "+entity.maxPlayers+" players because if you have "+entity.tablesCount+" you can have only "+entity.tablesCount*2+" players";

        if(entity.dateOfStart===undefined || this.getDatesDiffrenceInDays(new Date(),new Date(entity.dateOfStart))<0)
            fieldErrors.dateOfStart = "You cannot start tournament at "+setDateFunction(entity.dateOfStart)+" because this date is outdated";

        if(entity.dateOfEnd===undefined || this.getDatesDiffrenceInDays(new Date(entity.dateOfStart),new Date(entity.dateOfEnd))<0)
            fieldErrors.dateOfEnd = "End date must be later than "+setDateFunction(entity.dateOfStart);

        if(provinces.indexOf(entity.province))
            fieldErrors.provinces = "Invalid province name";

        if(!entity.city.match(new RegExp("^[A-Z][a-zzżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9]{1,39}$")))
            fieldErrors.city = "City must start with big letter and have between 2 and 40 chars";

        if(!entity.street.match(new RegExp("^[0-9a-zzżźćńółęąśŻŹĆĄŚĘŁÓŃA-Z. ]{1,39}$")))
            fieldErrors.street = "Street and have between 2 and 40 chars";

        if(!entity.zipCode.match(new RegExp("^\\d{2}-\\d{3}$")))
            fieldErrors.zipCode = "Zip code have invalid format";

        if(!entity.description.length>100)
            fieldErrors.description = "Description can have only 100 chars";

        if(checkIfObjectIsNotEmpty(fieldErrors)){
            validationErrors.message = "Invalid tournament data";
            validationErrors.fieldErrors = fieldErrors;
        }*/

        return validationErrors;
    }

    getDatesDiffrenceInDays(date1,date2){
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    setValidationErrors(validationException){
        this.props.showFailureMessage(validationException.message);
        let validationErrors = validationException.fieldErrors;
        let validationErrorsState = this.state.validationErrors;
        for (let field in validationErrors) {
            if (validationErrors.hasOwnProperty(field)) {
                validationErrorsState[field] = validationErrors[field]
            }
        }
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
