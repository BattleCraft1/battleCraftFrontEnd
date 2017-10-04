import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../legendPanel/styles'

export default class LegendPanel extends React.Component{
    render(){
        return(
            <span style={Object.assign({}, styles.legendOption, {background:this.props.color})}
                className = {css(resp.rowContent) + " " +css(resp.legendOption)}>
                {this.props.name.replace('_',' ')}
            </span>
        )
    }
}
