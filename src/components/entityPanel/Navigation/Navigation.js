import React from 'react';
import NavElement from './NavElement'

export default class Navigation extends React.Component{
    render(){
        let navElements = [];

        for(let tabName in this.props.tabNames){
            navElements.push(
                <NavElement
                    key = {tabName}
                    name = {this.props.tabNames[tabName]}
                    setActiveTab = {this.props.setActiveTab.bind(this)}
                    isTabActive={this.props.isTabActive.bind(this)}
                    tabToActiveName = {tabName}
                />
            );
        }

        return(
            <div>
                {navElements}
            </div>
        )
    }
}