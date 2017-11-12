import React from 'react';
import TournamentsTable from './Table/ParticipatedTournamentsTable'
import NumberOutput from '../../outputs/NumberOutput'
import InviteButton from '../../TableInputs/InviteButton'

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
        let inputsDisabled = this.props.mode !== 'get';
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
                {inputsDisabled && <InviteButton to='/collectionsPanel/tournaments'
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

