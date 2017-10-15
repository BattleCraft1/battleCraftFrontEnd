import React from 'react';
import UserTable from './UsersTable/UsersTable'
import InviteButton from './UsersTable/InviteButton'

export default class OrganisatorsTab extends React.Component{

    render(){
        return(
            <div>
                <UserTable
                    value={this.props.entity["organizers"]}
                    fieldName="organizers"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Organisators" />
                <InviteButton text="Invite"/>
            </div>
        )
    }
}