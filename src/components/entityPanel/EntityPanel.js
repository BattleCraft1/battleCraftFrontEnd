import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'

import tournamentPanel from './Tournament/Panel';
import GamePanel from './Game/Panel';
import UserPanel from './User/Panel';


import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const panelTypeMap = {
    'tournament':tournamentPanel,
    'game':GamePanel,
    'user':UserPanel
};

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
        if (this.entityPanelRef && !this.entityPanelRef.contains(event.target)
            && !this.props.entityPanel.hidden) {
            this.props.closeEntityPanel();
        }
    }

    setEntityPanelRef(node) {
        this.entityPanelRef = node;
    }

    createPanel(){
        let panelType = panelTypeMap[this.props.entityPanel.entityType];

        return panelType ? React.createElement(
            panelType,
            {
                mode:this.props.entityPanel.mode,
                type:this.props.entityPanel.entityType,
                name:this.props.entityPanel.entityName,
                relatedEntity:this.props.entityPanel.relatedEntity,
                hidden:this.props.entityPanel.hidden,
                disable:this.props.closeEntityPanel.bind(this),
            },
            null) : <div/>
    }

    render(){
      let panel;
      if(this.props.entityPanel.mode!=='disabled')
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
