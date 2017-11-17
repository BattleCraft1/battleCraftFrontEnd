import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import TextOutput from '../commonComponents/TextOutput'
import TextInput from '../commonComponents/TextInput'
import Avatar from './AvatarPopup'

export default class TurnCell extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
              <div id='cell1x1' style={Object.assign({}, styles.popupCell)}>
                <div style={Object.assign({}, styles.participantSegment, {background:'rgb(47, 77, 126)', borderColor:'rgb(47, 77, 126)', height:''})}>
                  <Avatar username={this.props.battleData.firstPlayer.name} onClick={()=>this.props.showUsersList()} border={"rgb(20, 37, 65)"} />
                  <div style={Object.assign({}, styles.textOutputContainer, {maxWidth:''})}>
                    <TextOutput title={"nick"} alignment={"center"} value={this.props.battleData.firstPlayer.name} />
                    <TextInput name="points" value={this.props.battleData.firstPlayer.points}/>
                    <TextInput name="total points" value={this.props.playersNamesWithPoints[this.props.battleData.firstPlayer.name]}/>
                  </div>
                </div>
                <div style={Object.assign({}, styles.participantSegment, {background:'rgb(152, 42, 42)', borderColor:'rgb(152, 42, 42)', height:''})}>
                  <div style={Object.assign({},styles.textOutputContainer, {maxWidth:''})}>
                    <TextOutput title={"nick"} alignment={"center"} value={"NO NAME"} />
                    <TextInput name="points" value={this.props.battleData.secondPlayer.points}/>
                    <TextInput name="total points" value={this.props.playersNamesWithPoints[this.props.battleData.secondPlayer.name]}/>
                  </div>
                  <Avatar username={this.props.battleData.secondPlayer.name} onClick={()=>this.props.showUsersList()} border={'rgb(74, 24, 24)'}/>
                </div>
              </div>
            </div>
        )
    }
}
