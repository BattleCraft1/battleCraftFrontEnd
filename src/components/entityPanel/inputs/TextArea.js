import React from 'react';
import {resp, styles} from '../styles'
import Label from '../outputs/Label'

export default class TextArea extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name = {this.props.name}/>
                <textarea
                       style = {Object.assign({},styles.optionInput, styles.textArea)}
                       maxLength="100"
                       value = {this.props.value}
                       onChange={(event)=>this.props.changeEntity(this.props.fieldName,event.target.value)}
                />
            </div>
        )
    }
}
