import React from 'react';
import {resp, styles} from '../styles'
import {css} from 'aphrodite';

export default class BattleLabel extends React.Component{

    render(){
        return(
                <span style={Object.assign({}, e.style, {height:this.props.height})}>BATTLE<span style={e.number}>{this.props.number}12</span></span>
        )
    }
}


const e = {
  style:{
      boxSizing:'border-box',
      writingMode:'vertical-lr',
      textOrientation:'upright',
      margin:'0px',
      position:'relative',
      float:'left',
      textAlign:'center',
      fontWeight:'600',
      textShadow:'0 0 2px white',
  },
  number:{
    writingMode:'horizontal-tb',
    textOrientation:'mixed',
    textShadow:'1px 1px 4px white, -1px -1px 4px white, 1px -1px 4px white, -1px 1px 4px white',
  },
}
