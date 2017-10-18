import React from 'react';
import {resp, styles} from '../styles'
import Label from './Label'
import {StyleSheet, css} from 'aphrodite';


export default class SelectInput extends React.Component{
    render(){
        return(
            <div style={styles.inputBlock} className={css(resp.inputBlock)}>
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
