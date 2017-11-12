import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'

export default class AddGroupSlotButton extends React.Component{
    render(){
        return(
                <div  onClick={this.props.operation.bind(this)}
                      style={styles.tableButton} className={css(resp.tableButton)}>{this.props.text}</div>
        )
    }
}