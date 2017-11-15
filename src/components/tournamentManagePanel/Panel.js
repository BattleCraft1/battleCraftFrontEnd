import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'
import Turn from './components/Turn'
import OptionPanel from './components/OptionPanel'
import Popup from './components/Popup'

class Panel extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
          popupShow:false,
          popupType:''
      }
  }

showPopup(pt)
{
  this.setState({
    popupShow:true,
    popupType:pt,
  })
  this.forceUpdate();
}

    render(){
        return(
          <div>
          <div style={Object.assign({}, styles.goldAndBrownTheme, styles.container)}>
            <div style={Object.assign({}, styles.goldAndBrownThemeInset, styles.innerContainer)}>
            <Turn showPopup={this.showPopup.bind(this)} active={true}  name={"TURN 1"}/>
            <Turn showPopup={this.showPopup.bind(this)} active={false} name={"TURN 2"}/>
            <Turn showPopup={this.showPopup.bind(this)} active={false} name={"TURN 3"}/>
            <Turn showPopup={this.showPopup.bind(this)} active={false} name={"TURN 4"}/>
            </div>
          </div>
          <OptionPanel/>
          <Popup isShown={this.state.popupShow} type={this.state.popupType} hidePopup={()=>{this.setState({popupShow:false})}}/>
          </div>
        )
    }
}

export default Panel;
