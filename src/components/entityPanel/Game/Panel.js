import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import PanelButton from './PanelButton';
import Button from '../inputs/Button';
import TextInput from '../inputs/TextInput';
import PanelTitle from '../inputs/PanelTitle';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {resp, styles} from '../styles'


class Panel extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        return(
          <div>
          <PanelTitle name={"GAME PANEL"} />
            <div style={styles.goldAndBrownTheme} className = {css(resp.smallPanel)}>
                <div className={css(resp.content)}>
                 <TextInput notResponsive={true} name={"Game name"}/>
                 <PanelButton text={"Load rules"}/>
                </div>
                <Button text={"Cancel"} action={() => this.props.hideEntityPanel()}/>
                <Button text={"Save"} action={() => {}}/>
            </div>
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
