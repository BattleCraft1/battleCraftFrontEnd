import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'
import  {Link}  from 'react-router-dom';

export default class ButtonLink extends React.Component{

    render(){
        return(
            <Link onClick={this.props.action.bind(this)}
                  to={this.props.link}
                  style={styles.buttonLink}
                  className={css(resp.buttonLink)}>{this.props.text}</Link>
        )
    }
}
