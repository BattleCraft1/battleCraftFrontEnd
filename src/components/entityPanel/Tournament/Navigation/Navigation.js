import React from 'react';
import NavElement from './../../Navigation/NavElement'

export default class Navigation extends React.Component{
    render(){
        return(
            <div>
                <NavElement
                    name = "Basic data"
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = "basicData"
                />
                <NavElement
                    name = "Address"
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = "address"
                />
                <NavElement
                    name = "Organizers"
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = "organizers"
                />
                <NavElement
                    name = "Participants"
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = "participants"
                />
            </div>
        )
    }
}