import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';

export default class Label extends React.Component{

    render(){
        return(
                <div style={Object.assign({}, styles.optionLabel, {width:this.props.width, boxSizing:'border-box'})} >{this.props.name}</div>
        )
    }
}
