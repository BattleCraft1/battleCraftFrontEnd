import React from 'react';
import {resp, styles} from '../styles'
import Label from '../outputs/Label'
import {css} from 'aphrodite';


export default class PasswordInput extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={styles.inputBlock} className={css(this.props.notResponsive ? "" : resp.inputBlock)}>
                <Label name={this.props.name}/>
                    <input
                        style={styles.optionInput}
                        type="password"
                        value = {this.props.value}
                        disabled={this.props.disabled}
                        onChange={(event)=>this.props.changeEntity(this.props.fieldName,event.target.value)}
                />
            </div>
        )
    }
}
