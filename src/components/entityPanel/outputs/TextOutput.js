import React from 'react';
import {styles} from '../styles'
import Label from '../outputs/Label'

export default class TextOutput extends React.Component{

    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name={this.props.name}/>
                <input
                    style={styles.optionInput}
                    type="text"
                    disabled={true}
                    value = {this.props.value}
                />
            </div>
        )
    }
}
