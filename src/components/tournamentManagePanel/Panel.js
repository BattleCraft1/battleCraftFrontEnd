import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'
import Turn from './components/Turn'
import OptionPanel from './components/OptionPanel'

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
          <div>
          <div style={Object.assign({}, styles.goldAndBrownTheme, styles.container)}>
            <div style={Object.assign({}, styles.goldAndBrownThemeInset, styles.innerContainer)}>
            <Turn active={true}  name={"TURN 1"}/>
            <Turn active={false} name={"TURN 2"}/>
            <Turn active={false} name={"TURN 3"}/>
            <Turn active={false} name={"TURN 4"}/>
            <Turn active={false} name={"TURN 5"}/>
            <Turn active={false} name={"TURN 6"}/>

            </div>
          </div>
          <OptionPanel/>
          </div>

        )
    }
}

export default Panel;
