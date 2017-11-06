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
      this.setState({ elementHeight: this.refs.container.clientHeight });
      console.log(this.refs.container.clientHeight)
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }


    render(){
        return(
          <div style={Object.assign({}, styles.turnContainer)}>
            <Label active={this.props.active} name={ this.props.name } />
            <div ref="container" style={Object.assign({}, styles.turnContent, (this.state.elementHeight > this.state.height)?{overflowY:'scroll', maxHeight:this.state.height*0.75}:{})}>
              <Cell_1x1/>
              <Cell_2x2/>
              <Cell_1x1/>
              <Cell_1x1/>
            </div>
          </div>

        )
    }
}

export default Turn;
