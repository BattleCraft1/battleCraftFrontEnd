import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'

import tournamentPanel from './Tournament/Panel';
import UserPanel from './User/Panel';

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const panelTypeMap = {
    'tournament':tournamentPanel,
    'user':UserPanel
};


class AdditionalEntityPanel extends React.Component{
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
                this.props.disableAdditionalEntityPanel();
        }
    }

    setEntityPanelRef(node) {
        this.entityPanelRef = node;
    }

    createPanel(){
        let panelType = panelTypeMap[this.props.additionalEntityPanel.additionalEntityType];

        return panelType ? React.createElement(
            panelType,
            {
                mode:'get',
                type:this.props.additionalEntityPanel.additionalEntityType,
                name:this.props.additionalEntityPanel.additionalEntityName,
                hidden:false,
                relatedEntity:{},
                disable:this.props.disableAdditionalEntityPanel.bind(this),
            },
            null) : <div/>
    }

    render(){
        let panel;
        if(this.props.additionalEntityPanel.additionalEntityName!=="")
            panel = this.createPanel();
        return(
            this.props.additionalEntityPanel.additionalEntityName!=="" &&
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
        additionalEntityPanel:state.additionalEntityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AdditionalEntityPanel );
