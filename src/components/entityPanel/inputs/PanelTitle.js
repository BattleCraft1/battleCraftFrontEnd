import React from 'react';
import {resp, styles} from '../styles'
import {StyleSheet, css} from 'aphrodite';


export default class PanelTitle extends React.Component{

    render(){
        return(
                <div style={styles.panelTitle} className={css(resp.panelTitle)} >{this.props.name}</div>
        )
    }
}
