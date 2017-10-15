import React from 'react';
import UserTable from './UsersTable/UsersTable'
import InviteButton from './UsersTable/InviteButton'

export default class ParticipantsTab extends React.Component{
    render(){
        return(
            <div>
                <UserTable
                    value={this.props.entity["participants"]}
                    fieldName="participants"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Participants" />
                <InviteButton text="Invite"/>
            </div>
        )
    }
}