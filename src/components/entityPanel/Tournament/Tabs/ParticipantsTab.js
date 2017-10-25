import React from 'react';
import UserTable from '../../Table/UsersTable'
import InviteButton from '../../Table/InviteButton'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';

class ParticipantsTab extends React.Component{

    startInviteParticipants(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(this.props.entity["participants"].map(entity => entity.name),["ORGANIZER","ACCEPTED"]);
        this.props.showEntityPanel(false);
    }

    render(){
        return(
            <div style={Object.assign({},{marginLeft:'10%',marginRight:'10%'})}>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["participants"]}/>
                <UserTable
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Participants" />
                {!this.props.inputsDisabled && <InviteButton to='/collectionsPanel/users'
                                                 operation={this.startInviteParticipants.bind(this)}  text="Invite"/>}
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
