import React from 'react';
import TournamentsTable from '../../inputs/Table/Table'
import InviteButton from '../../inputs/Table/InviteButton'

import TournamentsTableOutput from '../../outputs/Table/Table'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class OrganizerTab extends React.Component{

    startAddTournaments(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(this.props.entity["organizedTournaments"].map(entity => entity.name),["ACCEPTED"]);
        this.props.showEntityPanel(false);
    }

    render(){
        let inputsDisabled = this.props.mode !== 'get';
        return(
            <div>
                <TournamentsTable
                    value={this.props.entity["organizedTournaments"]}
                    fieldName="organizedTournaments"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Organized tournaments" />
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["organizedTournaments"]}/>
                {inputsDisabled && <InviteButton to='/collectionsPanel/tournaments'
                                                 operation={this.startAddTournaments.bind(this)}  text="Add"/>}
                <TournamentsTableOutput
                    value={this.props.entity["finishedOrganizedTournaments"]}
                    name="Finished tournaments"
                />
                <TournamentsTableOutput
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
    return {
        pageRequest: state.pageRequest,
        entityPanel: state.entityPanel,
        possibleOperations: state.possibleOperations
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( OrganizerTab );