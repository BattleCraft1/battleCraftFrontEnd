import React from 'react';
import NavElement from './../../Navigation/NavElement'

export default class Navigation extends React.Component{
    render(){
        return(
            <div>
            <NavElement
                name = "Personal informations"
                setActiveTab = {this.props.setActiveTab.bind(this)}
                isTabActive={this.props.isTabActive.bind(this)}
                tabToActiveName = "personalData"
                />
                <NavElement
                    name = "Address"
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = "address"
                />
                <NavElement
                    name = "Organisator of"
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = "organisator"
                />
                <NavElement
                    name = "Participant of"
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = "participant"
                />

            </div>
        )
    }
}
