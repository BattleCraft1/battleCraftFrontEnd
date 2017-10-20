import React from 'react';
import UserTable from './UsersTable/UsersTable'
import PanelButton from './UsersTable/PanelButton'

export default class ParticipantOfTab extends React.Component{
    render(){
        return(
            <div>
                <UserTable name={"My participations"} />
                <PanelButton text={"Add"}/>
            </div>
        )
    }
}
