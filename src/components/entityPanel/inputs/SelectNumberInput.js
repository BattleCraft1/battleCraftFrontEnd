import React from 'react';
import {styles, resp} from '../styles'
import Label from '../outputs/Label'
import {StyleSheet, css} from 'aphrodite';

export default class SelectNumberInput extends React.Component{

    createOptions(){
        return Object.keys(this.props.options).map(
            (key, index) => <option value={this.props.options[key]} key={key}>{key}</option>
        )
    }

    render(){
        return(
            <div style={styles.inputBlock} className={css(resp.inputBlock)}>
                <Label name={this.props.name}/>
                <select
                    value = {this.props.value}
                    onChange={(event)=>this.props.changeEntity(this.props.fieldName,parseInt(event.target.value))}
                    disabled={this.props.disabled}
                    style={styles.optionInput}>
                    {this.createOptions()}
                </select>
            </div>
        )
    }
}
