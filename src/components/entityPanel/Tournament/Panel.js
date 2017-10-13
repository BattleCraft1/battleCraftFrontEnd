import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Button from '../inputs/Button';

import AddressTab from './Tabs/AddressTab';
import BasicDataTab from './Tabs/BasicDataTab';
import OrganizersTab from './Tabs/OrganizersTab';
import ParticipantsTab from './Tabs/ParticipantsTab';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Navigation from './Navigation/Navigation'

import {resp, styles} from '../styles'

const tabsMap = {
    "basicData":BasicDataTab,
    "address":AddressTab,
    "organizers":OrganizersTab,
    "participants":ParticipantsTab
};

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab : "basicData"
        };
    }

    setActiveTab(activeTabName){
        this.setState({activeTab:activeTabName});
    }

    isTabActive(activeTabName){
        return this.state.activeTab == activeTabName;
    }

    createContent(){
        return React.createElement(
            tabsMap[this.state.activeTab],
            {
                mode:this.props.mode
            },
            null)
    }


    render(){
        let content = this.createContent();

        return(
            <div style={styles.goldAndBrownTheme} className = {css(resp.panel)}>
                <Navigation
                    setActiveTab={this.setActiveTab.bind(this)}
                    isTabActive={this.isTabActive.bind(this)}/>
                <div className={css(resp.content)}>
                    {content}
                </div>
                <Button text={"Cancel"} action={() => this.props.hideEntityPanel()}/>
                <Button text={"Save"} action={() => {}}/>
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
