import React from 'react';
import { connect } from 'react-redux';
import {styles} from '../styles'
import Player from './playerListComponents/PlayerListElement'
import PlayerDual from './playerListComponents/PlayerListDualElement'

class PlayerList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          width:0,
      }
  }
  componentDidMount() {
    if(!this.props.visible) return;
    const position = document.getElementById('players').clientWidth;
    this.setState({
      width:position,
      visible:this.state.visible,
    })
  }

    render() {
        return (
            this.props.visible && <div id="players" onScroll={()=>{this.setState({width:this.state.width})}} style = {Object.assign({}, styles.playerList)}>
              <Player parentWidth={this.state.width} id={1}/>
              <PlayerDual parentWidth={this.state.width} id={2}/>
              <Player parentWidth={this.state.width} id={3}/>
              <Player parentWidth={this.state.width} id={4}/>
              <Player parentWidth={this.state.width} id={5}/>
              <Player parentWidth={this.state.width} id={6}/>
              <Player parentWidth={this.state.width} id={7}/>
              <Player parentWidth={this.state.width} id={8}/>
              <Player parentWidth={this.state.width} id={9}/>
              <Player parentWidth={this.state.width} id={10}/>
              <Player parentWidth={this.state.width} id={11}/>
              <Player parentWidth={this.state.width} id={12}/>
              <Player parentWidth={this.state.width} id={13}/>
              <Player parentWidth={this.state.width} id={14}/>
              <Player parentWidth={this.state.width} id={15}/>
              <Player parentWidth={this.state.width} id={16}/>
            </div>
        );
    }
}

export default PlayerList;
