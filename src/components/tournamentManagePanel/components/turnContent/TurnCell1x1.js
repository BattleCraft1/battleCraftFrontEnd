import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import TextOutput from '../commonComponents/TextOutput'
import Avatar from '../commonComponents/Avatar'
import BattleLabel from '../commonComponents/BattleLabel'



export default class TurnCell extends React.Component{

  constructor(props) {
      super(props);

      this.state = {
          height:0
      }
  }

  componentDidMount() {
    const height = document.getElementById('cell1x1').clientHeight;
    this.setState({ height });
  }

    render(){
        return(
              <div>
                <div onClick={()=>{this.props.showPopup ? this.props.showPopup(1):{}}} id='cell1x1' style={Object.assign({}, styles.cell)}>
                <BattleLabel height={this.state.height}/>
                <div style={Object.assign({}, styles.participantSegment, {borderColor:'rgb(47, 77, 126)'})}>
                  <Avatar border={"rgb(20, 37, 65)"} />
                  <div style={styles.textOutputContainer}>
                  <TextOutput title={"nick"} alignment={"center"} value={"NO NAME"} />
                  <TextOutput title={"points"} alignment={'center'} value={"0"} />
                  </div>
                </div>
                <div style={Object.assign({}, styles.participantSegment, {borderColor:'rgb(152, 42, 42)'})}>
                  <div style={Object.assign({},styles.textOutputContainer)}>
                  <TextOutput title={"nick"} alignment={"center"} value={"NO NAME"} />
                  <TextOutput title={"points"} alignment={'center'} value={"0"} />
                  </div>
                  <Avatar border={'rgb(74, 24, 24)'}/>
                </div>
                </div>
              </div>
        )
    }
}
