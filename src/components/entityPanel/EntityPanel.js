import React from 'react';
import {StyleSheet, css} from 'aphrodite';
<<<<<<< HEAD
import TournamentPanel from './Tournament/Panel';
import {resp, styles} from './styles'

=======
import {resp, styles} from './styles'

import TournamentPanel from './Tournament/Panel';

>>>>>>> master
import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EntityPanel extends React.Component{
    constructor(props) {
        super(props);
<<<<<<< HEAD
=======

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
>>>>>>> master
    }

    createPanel(){
        let panelType;
        if(this.props.entityPanel.entityType==='tournament')
            panelType = TournamentPanel;

<<<<<<< HEAD
        return React.createElement(
=======
        return panelType ? React.createElement(
>>>>>>> master
            panelType,
            {
                mode:this.props.entityPanel.mode
            },
<<<<<<< HEAD
            null)
    }

    render(){
      let panel = <div/>;
=======
            null) : <div/>
    }

    render(){
      let panel;
>>>>>>> master
      panel = this.createPanel();
        return(
            this.props.entityPanel.mode!=='disabled' &&
            <div style = {Object.assign({}, styles.background, {display: 'block'})}>
<<<<<<< HEAD
                <div style = {Object.assign({}, styles.goldAndBrownTheme, styles.panelContainer)}
=======
                <div ref={this.setEntityPanelRef} style = {Object.assign({}, styles.goldAndBrownTheme, styles.panelContainer)}
>>>>>>> master
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
