import React from 'react';
import UserTable from './UsersTable/UsersTable'
import PanelButton from './UsersTable/PanelButton'

export default class OrganisatorsTab extends React.Component{
    render(){
        return(
            <div>
                <UserTable name={"Organisators"} />
                <PanelButton text={"Add"}/>
            </div>
        )
    }
}
