import React from 'react';
import OrganizersTable from './Table/OrganizersTable'
import InviteButton from '../../TableInputs/InviteButton'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';


class OrganizersTab extends React.Component{

    startInviteOrganizers(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        this.props.setRelatedEntity(
            this.props.entity["organizers"].map(entity => entity.name),
            "organizers",
            [{
                "keys": ["status"],
                "operation": ":",
                "value": ["ORGANIZER"]
            }]
            ,10);
    }

    render(){
        return(
            <div style={Object.assign({},{marginLeft:'10%',marginRight:'10%'})}>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["organizers"]}/>
                <OrganizersTable
                    value={this.props.entity["organizers"]}
                    fieldName="organizers"
                    disabled = {this.props.inputsDisabled}
                    changeEntity={this.props.changeEntity}
                    relatedEntity={this.props.relatedEntity}
                    hidden={this.props.hidden}
                    name="Organizers" />
                {!this.props.inputsDisabled && <InviteButton to='/battleCraft/collectionsPanel/users'
                                                 operation={this.startInviteOrganizers.bind(this)} text="Invite"/>}
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

export default connect( mapStateToProps, mapDispatchToProps )( OrganizersTab );
