import React from 'react';
import {resp, styles} from '../styles'
import {css} from 'aphrodite';

export default class Label extends React.Component{

    render(){
        return(
                <div style={Object.assign({}, styles.optionLabel, this.props.active ? styles.optionLabelActive:{})} className={css(resp.label)} >{this.props.name}</div>
        )
    }
}
