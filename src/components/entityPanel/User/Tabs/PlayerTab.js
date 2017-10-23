import React from 'react';
import TournamentsTable from '../../inputs/Table/Table'
import NumberOutput from '../../outputs/NumberOutput'
import InviteButton from '../../inputs/Table/InviteButton'

import TournamentsTableOutput from '../../inputs/Table/Table'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class PlayerTab extends React.Component{

    startAddTournaments(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(this.props.entity["participatedTournaments"].map(entity => entity.name),["ACCEPTED"]);
        this.props.showEntityPanel(false);
    }

    render(){
        let inputsDisabled = this.props.mode !== 'get';
        return(
            <div>
                <TournamentsTable
                    value={this.props.entity["participatedTournaments"]}
                    fieldName="participatedTournaments"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Participated tournaments" />
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["participatedTournaments"]}/>
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
    return {
        pageRequest: state.pageRequest,
        entityPanel: state.entityPanel,
        possibleOperations: state.possibleOperations
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PlayerTab );
