import React from 'react';
import { connect } from 'react-redux';
import {styles} from '../../styles'
import Player from '../playerListComponents/PlayerListElement'
import PlayerDual from '../playerListComponents/PlayerListDualElement'

export default class DuelPlayerList extends React.Component {
  constructor(props) {
      super(props);
      this.setListRef = this.setListRef.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.state = {
          width:0,
      }
  }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        const position = document.getElementById('players').clientWidth;
        this.setState({
            width:position
        })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.listRef && !this.listRef.contains(event.target)) {
            this.props.hideList();
        }
    }

    setListRef(node) {
        this.listRef = node;
    }

    createPlayersList(){
        return this.props.playersWithoutBattles.map(
            (player,index) => <Player key={index} username={player} onClick={()=>this.props.changePlayerData(player)} parentWidth={this.state.width} id={index}/>
        )
    }

    render() {
        return (
            <div id="players" ref={this.setListRef} onScroll={()=>{this.setState({width:this.state.width})}} style = {Object.assign({}, styles.playerList)}>
                {this.createPlayersList()}
            </div>
        );
    }
}
