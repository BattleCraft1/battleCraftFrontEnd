import React from 'react';
import {styles, resp} from './styles'
import Label from './Label'
import {StyleSheet, css} from 'aphrodite';


export default class TextInput extends React.Component{

    render(){
        return(
            <div style={Object.assign({}, styles.textContainer, {display:'block'}, this.props.additionalStyle)}>
                <div style={Object.assign({}, styles.textOutputLabel, {marginBottom:'-2px'})}>{this.props.name}</div>
                    <input
                       style={styles.textInput}
                       type={this.props.type ? this.props.type:"text"}
                       value={this.props.value}
                       placeholder={this.props.placeholder}
                       disabled={this.props.disabled}
                />
            </div>
        )
    }
}
