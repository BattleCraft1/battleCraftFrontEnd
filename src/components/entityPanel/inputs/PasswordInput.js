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
                    <input id={this.props.indexOfSearchFields}
                       style={styles.optionInput}
                       type="password"
                       ref={(control) => this.text = control}
                       name={this.props.indexOfSearchFields}
                       placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}
