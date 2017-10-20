import React from 'react';
import UserTable from './UsersTable/UsersTable'
import InviteButton from './UsersTable/InviteButton'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';


class OrganizersTab extends React.Component{

    startInviteOrganizers(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(this.props.entity["organizers"].map(entity => entity.invitedUserName),["ORGANIZER"]);
        this.props.showEntityPanel(false);
    }

    render(){
        return(
            <div>
                <UserTable
                    value={this.props.entity["organizers"]}
                    fieldName="organizers"
                    changeEntity={this.props.changeEntity}
                    name="Organisators" />
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["organizers"]}/>
                <InviteButton operation={this.startInviteOrganizers.bind(this)} text="Invite"/>
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

export default connect( mapStateToProps, mapDispatchToProps )( OrganizersTab );