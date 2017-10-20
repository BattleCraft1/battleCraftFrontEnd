import React from 'react';
import {styles} from '../styles'
import Label from '../outputs/Label'

export default class TextInput extends React.Component{

    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name={this.props.name}/>
                    <input
                       style={styles.optionInput}
                       type="text"
                       value = {this.props.value}
                       onChange={(event)=>this.props.changeEntity(this.props.fieldName,event.target.value)}
                />
            </div>
        )
    }
}
