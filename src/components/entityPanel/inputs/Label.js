import React from 'react';
import {resp, styles} from '../styles'
import {StyleSheet, css} from 'aphrodite';


export default class Label extends React.Component{

    render(){
        return(
                <div style={styles.optionLabel} className={css(resp.label)} >{this.props.name}</div>
        )
    }
}
