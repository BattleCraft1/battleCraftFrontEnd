import React from 'react';
import {styles} from './styles'
import {css} from 'aphrodite';

export default class Label extends React.Component{

    render(){
        return(
                <div style={Object.assign({}, styles.optionLabel)}>{this.props.name}</div>
        )
    }
}

