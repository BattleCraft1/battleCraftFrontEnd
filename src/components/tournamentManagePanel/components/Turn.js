import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'
import Label from './Label'
import Cell_1x1 from './TurnCell1x1'
import Cell_2x2 from './TurnCell2x2'

class Turn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
          <div style={Object.assign({}, styles.turnContainer)}>
            <Label active={this.props.active} name={ this.props.name } />
            <div style={Object.assign({}, styles.turnContent)}>
              <Cell_1x1/>
              <Cell_2x2/>

            </div>
          </div>

        )
    }
}

export default Turn;
