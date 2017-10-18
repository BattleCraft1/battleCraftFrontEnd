import React from 'react';
import UserTable from './UsersTable/UsersTable'
import PanelButton from './UsersTable/PanelButton'

export default class OrganisatorOfTab extends React.Component{
    render(){
        return(
            <div>
                <UserTable name={"My tournaments"} />
                <PanelButton text={"Add"}/>
            </div>
        )
    }
}
