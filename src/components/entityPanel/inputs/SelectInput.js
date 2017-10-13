import React from 'react';
import {resp, styles} from '../styles'
import Label from './Label'

export default class SelectInput extends React.Component{
    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name={this.props.name}/>
                <select
                    id={this.props.indexOfSearchFields}
                    ref={(control) => this.select = control}
                    style={styles.optionInput}
                    >
                    {this.props.options}
                </select>
            </div>
        )
    }
}
