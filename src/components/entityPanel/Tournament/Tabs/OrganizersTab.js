import React from 'react';
import UserTable from '../../Table/UsersTable'
import InviteButton from '../../Table/InviteButton'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';


class OrganizersTab extends React.Component{

    startInviteOrganizers(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(this.props.entity["organizers"].map(entity => entity.name),["ORGANIZER"]);
        this.props.showEntityPanel(false);
    }

    render(){
        return(
            <div style={Object.assign({},{marginLeft:'10%',marginRight:'10%'})}>
                <UserTable
                    value={this.props.entity["organizers"]}
                    fieldName="organizers"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    name="Organizers" />
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["organizers"]}/>
                {this.props.inputsDisabled && <InviteButton to='/collectionsPanel/users'
                                                 operation={this.startInviteOrganizers.bind(this)} text="Invite"/>}
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
