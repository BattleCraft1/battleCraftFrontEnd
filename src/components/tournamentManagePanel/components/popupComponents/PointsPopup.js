import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Input from '../commonComponents/TextInput'

export default class Points extends React.Component{

    render(){
        return(
          <div style={Object.assign({}, styles.pointsContainer, {background:this.props.color, height:''}, this.props.width ? {width:this.props.width}:'')}>
          <div style={Object.assign({}, styles.points, {marginTop:'0', height:''})}>
          <div style={Object.assign({}, styles.pointsLabel)}>points</div>
          <input
             style={Object.assign({}, styles.pointsInput, {width:'95%'})}
             type="number"
             value = {this.props.pointsBattle}
             onChange={(event) => {this.props.changeData(parseInt(event.target.value))}}
             disabled={false}
          />

          </div>
          <div style={Object.assign({}, styles.points, {marginTop:'0', height:''})}>
           <div style={Object.assign({}, styles.pointsLabel)}>total points</div>
          <input
             style={Object.assign({}, styles.pointsInput, {width:'95%'})}
             type="text"
             value = {this.props.pointsTotal}
             disabled={true}
          />
          </div>
          </div>
        )
    }
}
