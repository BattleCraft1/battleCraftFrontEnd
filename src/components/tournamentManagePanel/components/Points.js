import React from 'react';
import {resp, styles} from '../styles'
import {css} from 'aphrodite';

export default class Points extends React.Component{

    render(){
        return(
          <div style={Object.assign({}, styles.pointsContainer, {background:this.props.color})}>
          <div style={styles.points}>
          {this.props.title && <div style={Object.assign({}, styles.pointsLabel)}>{this.props.title}</div>}
          {this.props.value}
          </div>
          </div>
        )
    }
}
