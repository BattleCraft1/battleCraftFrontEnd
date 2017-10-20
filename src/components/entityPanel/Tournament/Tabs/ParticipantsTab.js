import React from 'react';
import UserTable from './UsersTable/UsersTable'
import InviteButton from './UsersTable/InviteButton'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class ParticipantsTab extends React.Component{

    startInviteParticipants(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(this.props.entity["participants"].map(entity => entity.invitedUserName),["ORGANIZER","ACCEPTED"]);
        this.props.showEntityPanel(false);
    }

    render(){
        let inputsDisabled = this.props.mode !== 'get';
        return(
            <div>
                <UserTable
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Participants" />
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["participants"]}/>
                {inputsDisabled && <InviteButton operation={this.startInviteParticipants.bind(this)}  text="Invite"/>}
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

export default connect( mapStateToProps, mapDispatchToProps )( ParticipantsTab );