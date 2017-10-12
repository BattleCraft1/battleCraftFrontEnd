import React from 'react';
import {resp, styles} from '../styles'
import Label from './Label'

export default class TextInput extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name={this.props.name}/>
                    <input id={this.props.indexOfSearchFields}
                       style={styles.optionInput}
                       type="text"
                       ref={(control) => this.text = control}
                       name={this.props.indexOfSearchFields}
                       placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}
