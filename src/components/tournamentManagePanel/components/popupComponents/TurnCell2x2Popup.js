import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import TextOutput from '../commonComponents/TextOutput'
import Avatar from './AvatarPopup'
import Points from './PointsPopup'



export default class TurnCell extends React.Component{

  constructor(props) {
      super(props);
  }

    render(){
        return(
          <div> <div id="cell2x2" style={Object.assign({}, styles.popupCell)}>
          <div style = {{display:'flow-root'}}>
          <div style={Object.assign({}, styles.participantSegment2x2, {borderColor:'rgb(47, 77, 126)'})}>
          <TextOutput onClick={()=>this.props.toggleList()} title={"nick"} alignment={"left"} value={'NO NAME'}/>
          <div style={e.subcontainer}>
          <Avatar toggleList={this.props.toggleList} popup={true} />
          <Points title={"points"} color={'rgb(47, 77, 126)'} width={"inherit"} pointsBattle={"1"}pointsTurn={"2"}/>
          <Avatar toggleList={this.props.toggleList} popup={true} />
          </div>
          <TextOutput onClick={()=>this.props.toggleList()} title={"nick"} alignment={"right"} value={'NO NAME'} />
          </div>
          </div>
          </div>
          <div id="cell2x2" style={Object.assign({}, styles.popupCell)}>
          <div style = {{display:'flow-root'}}>
          <div style={Object.assign({}, styles.participantSegment2x2, {borderColor:'rgb(152, 42, 42)'})}>
          <TextOutput onClick={()=>this.props.toggleList()} title={"nick"} alignment={"left"} value={'NO NAME'}/>
          <div style={e.subcontainer}>
          <Avatar toggleList={this.props.toggleList} popup={true} />
          <Points title={"points"} color={'rgb(152, 42, 42)'} width={"inherit"} pointsBattle={"1"}pointsTurn={"2"}/>
          <Avatar toggleList={this.props.toggleList} popup={true} />
          </div>
          <TextOutput onClick={()=>this.props.toggleList()} title={"nick"} alignment={"right"} value={'NO NAME'} />
          </div>
          </div>
          </div>
          </div>
        )
    }
}


const e = {
  subcontainer:{
    boxSizing:'border-box',
    display:'block',
    width:'100%',
    background:'brown',
    display:'-webkit-flex',
  },
}
