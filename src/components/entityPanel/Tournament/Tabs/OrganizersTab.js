import React from 'react';
import UserTable from '../../inputs/Table/Table'
import InviteButton from '../../inputs/Table/InviteButton'

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
        let inputsDisabled = this.props.mode !== 'get';
        return(
            <div>
                <UserTable
                    value={this.props.entity["organizers"]}
                    fieldName="organizers"
                    inputsDisabled = {inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    name="Organisators" />
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["organizers"]}/>
                {inputsDisabled && <InviteButton to='/collectionsPanel/users'
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
