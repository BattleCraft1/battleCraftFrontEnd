import React from 'react';
import TournamentsTable from './Table/OrganizedTournamentsTable'
import InviteButton from '../../TableInputs/InviteButton'

import TournamentsTableOutput from './Table/OrganizedTournamentsTableOutput'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class OrganizerTab extends React.Component{

    startAddTournaments(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(
            this.props.entity["organizedTournaments"].map(entity => entity.name),
            "organizedTournaments",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["NEW","ACCEPTED"]
            }],
            Number.POSITIVE_INFINITY);
    }

    render(){
        return(
            <div>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["organizedTournaments"]}/>
                <TournamentsTable
                    relatedEntity={this.props.relatedEntity}
                    hidden={this.props.hidden}
                    value={this.props.entity["organizedTournaments"]}
                    fieldName="organizedTournaments"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Organized tournaments" />
                {!this.props.inputsDisabled && <InviteButton to='/collectionsPanel/tournaments'
                                                 operation={this.startAddTournaments.bind(this)}  text="Add"/>}
                <TournamentsTableOutput
                    value={this.props.entity["finishedOrganizedTournaments"]}
                    name="Finished tournaments"
                />
                <TournamentsTableOutput
                    inputsDisabled={true}
                    value={this.props.entity["createdGames"]}
                    name="Created games"
                />
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

export default connect( mapStateToProps, mapDispatchToProps )( OrganizerTab );