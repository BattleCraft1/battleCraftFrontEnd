import React from 'react';
import {resp, styles} from '../styles'
import {css} from 'aphrodite';
import TextOutput from './TextOutput'
import Avatar from './AvatarSmall'
import Points from './Points'
import BattleLabel from './BattleLabel'


export default class TurnCell extends React.Component{
  constructor(props) {
      super(props);

      this.state = {
          height:0
      }
  }

  componentDidMount() {
    const height = document.getElementById('cell2x2').clientHeight;
    this.setState({ height });
  }

    render(){
        return(
                <div id="cell2x2" style={Object.assign({}, styles.cell)}>
                <BattleLabel height={this.state.height}/>
                <div style = {{display:'flow-root'}}>
                <div style={Object.assign({}, styles.participantSegment2x2, {borderColor:'rgb(47, 77, 126)'})}>
                <TextOutput title={"nick"} value={'NO NAME'}/>
                <div style={e.subcontainer}>
                <Avatar/>
                <Points title={"points"} color={'rgb(47, 77, 126)'} value={"0"}/>
                <Avatar/>
                </div>
                <TextOutput title={"nick"} alignment={"right"} value={'NO NAME'} />
                </div>
                <div style={Object.assign({}, styles.participantSegment2x2, {borderColor:'rgb(152, 42, 42)'})}>
                <TextOutput title={"nick"} value={'NO NAME'}/>
                <div style={e.subcontainer}>
                <Avatar/>
                <Points title={"points"} color={'rgb(152, 42, 42)'} value={"0"}/>
                <Avatar/>
                </div>
                <TextOutput title={"nick"} alignment={"right"} value={'NO NAME'} />
                </div>
                </div>
                </div>
        )
    }
}

const e = {
name:{
  boxSizing:'border-box',
  display:'block',
  border:'1px solid black',
},
avatar1:{
  boxSizing:'border-box',
  display:'inline-block',
  border:'1px solid black',
  width:'25%',
  height:'50px',
},
pointsContainer:{
  boxSizing:'border-box',
  display:'inline-block',
  border:'1px solid black',
  width:'50%',
  height:'50px',
  textAlign:'center',
},
points:{
  boxSizing:'border-box',
  border:'1px solid black',
  display:'block',
  width:'80%',
  marginLeft:'10%',
  height:'40px',
  marginTop:'4px',
  paddingTop:'10%',
},
subcontainer:{
  boxSizing:'border-box',
  display:'block',
  width:'100%',
  background:'brown',
  display:'-webkit-flex',
},
}
