import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'

import TournamentPanel from './Tournament/Panel';
import GamePanel from './Game/Panel';
import UserPanel from './User/Panel';


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
            if(!this.props.entityPanel.hidden)
            this.props.disableEntityPanel();
        }
    }

    setEntityPanelRef(node) {
        this.entityPanelRef = node;
    }

    createPanel(){
        let panelType;
        if(this.props.entityPanel.entityType==='tournament')
            panelType = TournamentPanel;
        else if(this.props.entityPanel.entityType==='game')
            panelType = GamePanel;
        else if(this.props.entityPanel.entityType==='user')
            panelType = UserPanel;

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
            <div style = {Object.assign({}, styles.background, this.props.entityPanel.hidden?{display: 'none'}:{display: 'block'})}>
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
