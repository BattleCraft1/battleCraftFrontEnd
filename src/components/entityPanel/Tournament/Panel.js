import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Button from '../inputs/Button';

import AddressTab from './Tabs/AddressTab';
import BasicDataTab from './Tabs/BasicDataTab';
import OrganizersTab from './Tabs/OrganizersTab';
import ParticipantsTab from './Tabs/ParticipantsTab';

<<<<<<< HEAD
=======
import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

>>>>>>> master
import Navigation from './Navigation/Navigation'

import {resp, styles} from '../styles'

const tabsMap = {
    "basicData":BasicDataTab,
    "address":AddressTab,
    "organizers":OrganizersTab,
    "participants":ParticipantsTab
};

<<<<<<< HEAD
export default class Panel extends React.Component{
=======
class Panel extends React.Component{
>>>>>>> master
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
<<<<<<< HEAD
                mode:this.props.entityPanel.mode
=======
                mode:this.props.mode
>>>>>>> master
            },
            null)
    }

<<<<<<< HEAD
=======

>>>>>>> master
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
<<<<<<< HEAD
                <Button text={"Cancel"}/>
                <Button text={"Save"}/>
=======
                <Button text={"Cancel"} action={() => this.props.hideEntityPanel()}/>
                <Button text={"Save"} action={() => {}}/>
>>>>>>> master
            </div>
        )
    }
}
<<<<<<< HEAD
=======

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
>>>>>>> master
