import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'
import Label from './Label'
import Battle1x1 from './battle/Battle1x1'
import Battle2x2 from './battle/Battle2x2'

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
              <Battle1x1/>
              <Battle2x2/>
              <Battle2x2/>
            </div>
          </div>

        )
    }
}

export default Turn;
