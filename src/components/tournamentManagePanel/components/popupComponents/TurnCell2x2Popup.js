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
                  <TextOutput title={"nick"} alignment={"left"} value={this.props.battleData.firstPlayersGroup.playersNames[0]}/>
                  <div style={e.subcontainer}>
                    <Avatar username={this.props.battleData.firstPlayersGroup.playersNames[0]}  onClick={()=>this.props.showUsersList(0)} popup={true} />
                    <Points color={'rgb(47, 77, 126)'} width={"inherit"}
                            changeData={this.props.changePointsOfFirstPlayersGroup}
                            pointsBattle={this.props.battleData.firstPlayersGroup.playersPoints}
                            pointsTotal={this.props.playersNamesWithPoints[this.props.battleData.firstPlayersGroup.playersNames[0]]}/>
                    <Avatar username={this.props.battleData.firstPlayersGroup.playersNames[1]}  onClick={()=>this.props.showUsersList(0)} popup={true} />
                  </div>
                  <TextOutput itle={"nick"} alignment={"right"} value={this.props.battleData.firstPlayersGroup.playersNames[1]} />
                </div>
              </div>
            </div>
              <div id="cell2x2" style={Object.assign({}, styles.popupCell)}>
                <div style = {{display:'flow-root'}}>
                  <div style={Object.assign({}, styles.participantSegment2x2, {borderColor:'rgb(152, 42, 42)'})}>
                    <TextOutput title={"nick"} alignment={"left"} value={this.props.battleData.secondPlayersGroup.playersNames[0]}/>
                    <div style={e.subcontainer}>
                      <Avatar username={this.props.battleData.secondPlayersGroup.playersNames[0]}  onClick={()=>this.props.showUsersList(1)} popup={true} />
                      <Points color={'rgb(152, 42, 42)'} width={"inherit"}
                              changeData={this.props.changePointsOfSecondPlayersGroup}
                              pointsBattle={this.props.battleData.secondPlayersGroup.playersPoints}
                              pointsTotal={this.props.playersNamesWithPoints[this.props.battleData.secondPlayersGroup.playersNames[0]]}/>
                      <Avatar username={this.props.battleData.secondPlayersGroup.playersNames[1]}  onClick={()=>this.props.showUsersList(1)} popup={true} />
                    </div>
                    <TextOutput title={"nick"} alignment={"right"} value={this.props.battleData.secondPlayersGroup.playersNames[1]} />
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
        width:'100%',
        background:'brown',
        display:'-webkit-flex',
    },
}
