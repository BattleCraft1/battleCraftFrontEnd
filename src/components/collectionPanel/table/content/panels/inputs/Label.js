import React from 'react';
import {resp, styles} from '../styles'

export default class Label extends React.Component{

    render(){
        return(
                <div style={styles.optionLabel}>{this.props.name}</div>
        )
    }
}
