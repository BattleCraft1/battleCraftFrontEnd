import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Input from '../commonComponents/TextInput'

export default class Points extends React.Component{

    render(){
        return(
          <div style={Object.assign({}, styles.pointsContainer, {background:this.props.color, height:''}, this.props.width ? {width:this.props.width}:'')}>
          <div style={Object.assign({}, styles.points, {marginTop:'0', height:''})}>
          {this.props.title && <div style={Object.assign({}, styles.pointsLabel)}>{this.props.title}</div>}
          <input
             style={Object.assign({}, styles.pointsInput, {width:'95%'})}
             type="text"
             value = {this.props.pointsBattle ? this.props.pointsBattle:0}
             disabled={this.props.disabled}
          />

          </div>
          <div style={Object.assign({}, styles.points, {marginTop:'0', height:''})}>
          {this.props.title && <div style={Object.assign({}, styles.pointsLabel)}>{this.props.title}</div>}
          <input
             style={Object.assign({}, styles.pointsInput, {width:'95%'})}
             type="text"
             value = {this.props.pointsTotal ? this.props.pointsTotal:0}
             disabled={this.props.disabled}
          />
          </div>
          </div>
        )
    }
}
