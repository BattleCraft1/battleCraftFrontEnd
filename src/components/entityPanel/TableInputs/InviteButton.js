import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'
import  {Link}  from 'react-router-dom';

export default class InviteButton extends React.Component{
    render(){
        return(
            <Link to={this.props.to}
                  onClick={this.props.operation.bind(this)}><div style={styles.tableButton} className={css(resp.tableButton)}>{this.props.text}</div></Link>
        )
    }
}
