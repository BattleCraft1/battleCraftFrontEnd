import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../../../styles'
import { Link } from 'react-router-dom';

export default class UserTableButton extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Link to='/collectionsPanel/users' onClick={this.props.operation.bind(this)}
                  style={styles.tableButton} className={css(resp.tableButton)}>{this.props.text}</Link>
        )
    }
}