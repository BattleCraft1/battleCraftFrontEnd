import React from 'react';
import {resp, styles} from '../styles'
import Label from './Label'
import {StyleSheet, css} from 'aphrodite';


export default class TextArea extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name = {this.props.name}/>
                <textarea id={this.props.indexOfSearchFields}
                       style = {Object.assign({},styles.optionInput, styles.textArea)}
                       maxLength="120"
                       ref={(control) => this.text = control}
                       name={this.props.indexOfSearchFields}
                       placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}
