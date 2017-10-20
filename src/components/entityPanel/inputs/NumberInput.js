import React from 'react';
import {styles} from '../styles'
import Label from '../outputs/Label'

export default class NumberInput extends React.Component{
    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name={this.props.name}/>
                <input style={styles.optionInput}
                       type="number"
                       value = {this.props.value}
                       disabled={this.props.disabled}
                       onChange={(event)=>{this.props.changeEntity(this.props.fieldName,parseInt(event.target.value))}}
                />
            </div>
        )
    }
}