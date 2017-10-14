import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from './styles'

import TournamentPanel from './Tournament/Panel';

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EntityPanel extends React.Component{
    constructor(props) {
        super(props);

        this.setEntityPanelRef = this.setEntityPanelRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.entityPanelRef && !this.entityPanelRef.contains(event.target)) {
            this.props.hideEntityPanel();
        }
    }

    setEntityPanelRef(node) {
        this.entityPanelRef = node;
    }

    createPanel(){
        let panelType;
        if(this.props.entityPanel.entityType==='tournament')
            panelType = TournamentPanel;

        return panelType ? React.createElement(
            panelType,
            {
                mode:this.props.entityPanel.mode
            },
            null) : <div/>
    }

    render(){
      let panel;
      panel = this.createPanel();
        return(
            this.props.entityPanel.mode!=='disabled' &&
            <div style = {Object.assign({}, styles.background, {display: 'block'})}>
                <div ref={this.setEntityPanelRef} style = {Object.assign({}, styles.goldAndBrownTheme, styles.panelContainer)}
                     className = {css(resp.popupContent)}>
                    {panel}
                </div>
            </div>
        );
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

export default connect( mapStateToProps, mapDispatchToProps )( EntityPanel );
