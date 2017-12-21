import React from 'react';
import ParticipantsTable from './Table/ParticipantsTable'
import ParticipantsGroupsTable from './Table/ParticipantsGroupsTable'
import InviteButton from '../../TableInputs/InviteButton'
import AddGroupSlotButton from '../../TableInputs/AddGroupSlotButton'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class ParticipantsTab extends React.Component{

    startInviteParticipants(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        let invitedParticipantsNames = [];

        for (let i = 0; i < this.props.entity["participants"].length; i++) {
            invitedParticipantsNames.push(this.props.entity["participants"][i][0].name);
        }

        this.props.setRelatedEntity(
            invitedParticipantsNames,
            "participants",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["ORGANIZER","ACCEPTED"]
            }],
            this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"]);
    }

    addNewGroupOfParticipants(){
        let participants = this.props.entity["participants"];
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];
        if((participants.length+1)*2>maxPlayers){
            this.props.showFailureMessage("Participants count must be less than "+maxPlayers)
        }
        else{
        participants.push(
            [
                {
                    "name": undefined,
                    "accepted": false
                },
                {
                    "name": undefined,
                    "accepted": false
                }
            ]
        );
        this.props.changeEntity("participants",participants);
        }
    }

    chooseUserTableBytournamentType(){
        if(this.props.entity["playersOnTableCount"] === 2){
            return <div>
                <ParticipantsTable
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    relatedEntity={this.props.relatedEntity}
                    hidden={this.props.hidden}
                    name="Participants" />
                {!this.props.inputsDisabled &&
                <InviteButton to='/battleCraft/collectionsPanel/users' operation={this.startInviteParticipants.bind(this)}  text="Invite"/>}
            </div>
        }
        else{
            return <div>
                <ParticipantsGroupsTable
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    relatedEntity={this.props.relatedEntity}
                    hidden={this.props.hidden}
                    name="Participants" />
                {!this.props.inputsDisabled &&
                <AddGroupSlotButton operation={this.addNewGroupOfParticipants.bind(this)}  text="Add group"/>}
            </div>
        }
    }

    render(){
        return(
            <div style={Object.assign({},{marginLeft:'10%',marginRight:'10%'})}>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["participants"]}/>
                {this.chooseUserTableBytournamentType()}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( ParticipantsTab );
