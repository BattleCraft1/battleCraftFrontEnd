import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../../../styles'

export default class UserTableButton extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <button style={styles.tableButton} className={css(resp.tableButton)}>{this.props.text}</button>
        )
    }
}