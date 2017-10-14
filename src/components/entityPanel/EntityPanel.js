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
                <div style = {Object.assign({}, styles.goldAndBrownTheme, styles.panelContainer)}
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
