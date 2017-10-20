import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'

export default class Button extends React.Component{

    render(){
        return(
            <button onClick={this.props.action.bind(this)} style={styles.button} className={css(resp.button)}>{this.props.text}</button>
        )
    }
}
