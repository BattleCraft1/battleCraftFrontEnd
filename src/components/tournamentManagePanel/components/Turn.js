import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'
import Label from './commonComponents/Label'
import Cell_1x1 from './turnContent/TurnCell1x1'
import Cell_2x2 from './turnContent/TurnCell2x2'

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
            <div ref="container" style={Object.assign({}, styles.turnContent, (this.state.elementHeight*1.4 > this.state.height)?{overflowY:'scroll', maxHeight:this.state.height*0.65}:{})}>
              <Cell_1x1 showPopup={this.props.showPopup}/>
              <Cell_2x2 showPopup={this.props.showPopup}/>
              <Cell_1x1 showPopup={this.props.showPopup}/>
              <Cell_1x1 showPopup={this.props.showPopup}/>
            </div>
          </div>

        )
    }
}

export default Turn;
