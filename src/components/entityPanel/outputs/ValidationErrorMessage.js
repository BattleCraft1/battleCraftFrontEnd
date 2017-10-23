import React from 'react';
import {resp, styles} from '../styles'
import {css} from 'aphrodite';

export default class ValidationErrorMessage extends React.Component{

    render(){
        return(
            <div style={this.props.validationErrorMessage ? styles.validationMessage : {display:'none'}}>{this.props.validationErrorMessage}</div>
        )
    }
}
