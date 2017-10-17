import React from 'react';
import {resp, styles} from '../styles'
import Label from '../outputs/Label'

export default class SelectInput extends React.Component{

    createOptions(){
        return this.props.options.map(
            option => <option key={option}>{option}</option>
        )
    }

    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name={this.props.name}/>
                <select
                    value = {this.props.value}
                    onChange={(event)=>this.props.changeEntity(this.props.fieldName,event.target.value)}
                    style={styles.optionInput}>
                    {this.createOptions()}
                </select>
            </div>
        )
    }
}
