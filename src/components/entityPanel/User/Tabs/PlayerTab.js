import React from 'react';
import NumberOutput from '../../outputs/NumberOutput'
import InviteButton from '../../TableInputs/InviteButton'

import TournamentsTable from './Table/ParticipatedTournamentsTable'
import TournamentsTableOutput from './Table/ParticipatedTournamentsTableOutput'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class PlayerTab extends React.Component{

    startAddTournaments(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(
            this.props.entity["participatedTournaments"].map(entity => {
                return{
                    name: entity.name,
                    playersOnTableCount: entity.playersOnTableCount
                }
            }),
            "participatedTournaments",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["NEW","ACCEPTED"]
            }],
            Number.POSITIVE_INFINITY);
    }

    startInviteSecondPlayerToGroup(tournamentName){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(
            [],
            "secondPlayerFor"+tournamentName,
            [
                {
                    "keys": ["status"],
                    "operation": ":",
                    "value": ["ACCEPTED","ORGANIZER"]
                },
                {
                    "keys": ["name"],
                    "operation": "not in",
                    "value": [this.props.entity['name'],""]
                },
                {
                    "keys": ["name"],
                    "operation": "not participate",
                    "value": [tournamentName]
                }
            ],
            1);
    }

    render(){
        return(
            <div>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["participatedTournaments"]}/>
                <TournamentsTable
                    inviteSecondPlayer={this.startInviteSecondPlayerToGroup.bind(this)}
                    relatedEntity={this.props.relatedEntity}
                    hidden={this.props.hidden}
                    value={this.props.entity["participatedTournaments"]}
                    fieldName="participatedTournaments"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Participated tournaments" />
                {!this.props.inputsDisabled && <InviteButton to='/collectionsPanel/tournaments'
                                                 operation={this.startAddTournaments.bind(this)}  text="Add"/>}
                <TournamentsTableOutput
                    value={this.props.entity["finishedParticipatedTournaments"]}
                    name="Finished tournaments"
                />
                <NumberOutput
                    value={this.props.entity["points"]}
                    name="Points"/>
                <NumberOutput
                    value={this.props.entity["numberOfBattles"]}
                    name="Battles Count"/>
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

export default connect( mapStateToProps, mapDispatchToProps )( PlayerTab );

