import React from 'react';
import {resp, styles} from '../styles'
import {css} from 'aphrodite';
import Label from '../outputs/Label'

export default class NumberOutput extends React.Component{
    render(){
        return(
            <div style={styles.inputBlock} className={css(resp.inputBlock)}>
                <Label name={this.props.name}/>
                <input style={styles.optionInput}
                       type="number"
                       disabled={true}
                       value = {this.props.value}
                />
            </div>
        )
    }
}
