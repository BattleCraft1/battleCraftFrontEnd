import React from 'react';
import ParticipantsTable from '../../Table/ParticipantsTable'
import ParticipantsGroupsTable from '../../Table/ParticipantsGroupsTable'
import InviteButton from '../../Table/InviteButton'
import AddGroupSlotButton from '../../Table/AddGroupSlotButton'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class ParticipantsTab extends React.Component{

    startInviteParticipants(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(
            this.props.entity["participants"].map(entity => entity.name),
            "participants",
            ["ORGANIZER","ACCEPTED"]);
        this.props.showEntityPanel(false);
    }

    addNewGroupOfParticipants(){
        let participants = this.props.entity["participants"];
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
        console.log(this.props.entity["participants"]);
    }

    chooseUserTableByTournamentType(){
        if(this.props.entity["playersOnTableCount"] === 2){
            return <div>
                <ParticipantsTable
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    name="Participants" />
                {!this.props.inputsDisabled &&
                <InviteButton to='/collectionsPanel/users' operation={this.startInviteParticipants.bind(this)}  text="Invite"/>}
            </div>
        }
        else{
            return <div>
                <ParticipantsGroupsTable
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
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
                {this.chooseUserTableByTournamentType()}
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
