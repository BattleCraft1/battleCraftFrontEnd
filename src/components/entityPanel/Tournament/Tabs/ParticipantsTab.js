import React from 'react';
import UserTable from './UsersTable/UsersTable'
import PanelButton from './UsersTable/PanelButton'

export default class ParticipantsTab extends React.Component{
    render(){
        return(
            <div>
                <UserTable name={"Participants"} />
                <PanelButton text={"Add"}/>
            </div>
        )
    }
}