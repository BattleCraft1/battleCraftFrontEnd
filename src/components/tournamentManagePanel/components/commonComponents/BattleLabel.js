import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';

export default class BattleLabel extends React.Component{

    render(){
        return(
                <p style={Object.assign({}, e.style, {height:this.props.height})}>TABLE<span style={e.number}>{this.props.tableNumber+1}</span></p>
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
      marginRight:'3px',

  },
  number:{
    writingMode:'horizontal-tb',
    textOrientation:'mixed',
    textShadow:'1px 1px 4px white, -1px -1px 4px white, 1px -1px 4px white, -1px 1px 4px white',
  },
}
