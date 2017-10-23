import React from 'react';
import {styles, resp} from '../styles'
import Label from '../outputs/Label'
import {StyleSheet, css} from 'aphrodite';


export default class SelectInput extends React.Component{

    createOptions(){
        return this.props.options.map(
            (option) => <option value={option} key={option}>{option}</option>
        )
    }

    render(){
        return(
            <div style={styles.inputBlock} className={css(resp.inputBlock)}>
                <Label name={this.props.name}/>
                <select
                    value = {this.props.value}
                    onChange={(event)=>this.props.changeEntity(this.props.fieldName,event.target.value)}
                    disabled={this.props.disabled}
                    style={styles.optionInput}>
                    {this.createOptions()}
                </select>
            </div>
        )
    }
}
