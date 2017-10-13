import React from 'react';
import {resp, styles} from '../styles'
import Label from './Label'

export default class DateInput extends React.Component{

    render(){
        return(
            <div style={styles.inputBlock}>
                <Label name={this.props.name}/>
                <input id={this.props.indexOfSearchFields}
                       style={styles.optionInput}
                       type="date"
                       ref={(control) => this.date = control}
                       name={this.props.indexOfSearchFields}
                       />
            </div>
        )
    }
}
