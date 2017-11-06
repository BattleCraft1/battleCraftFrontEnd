import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'
import Turn from './components/Turn'
import OptionPanel from './components/OptionPanel'

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          height:window.innerHeight
        };

        console.log(this.state.height)

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions()
    {
        this.setState({
          height : window.innerHeight,
        })
    }

    componentWillMount(){
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }


    render(){
        return(
          <div>
          <div style={Object.assign({}, styles.goldAndBrownTheme, styles.container)}>
            <div style={Object.assign({}, styles.goldAndBrownThemeInset, styles.innerContainer)}>
            <Turn maxHeight={this.state.height*0.75} active={true}  name={"TURN 1"}/>
            <Turn maxHeight={this.state.height*0.75} active={false} name={"TURN 2"}/>
            <Turn maxHeight={this.state.height*0.75} active={false} name={"TURN 3"}/>
            <Turn maxHeight={this.state.height*0.75} active={false} name={"TURN 4"}/>
            </div>
          </div>
          <OptionPanel/>
          </div>

        )
    }
}

export default Panel;
