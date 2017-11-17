import React from 'react';
import { connect } from 'react-redux';
import {styles} from '../../styles'
import Player from '../playerListComponents/PlayerListElement'
import PlayerDual from '../playerListComponents/PlayerListDualElement'

export default class GroupPlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.setListRef = this.setListRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            width:0,
        }
    }
    componentDidMount() {
        const position = document.getElementById('players').clientWidth;
        this.setState({
            width:position,
            visible:this.state.visible,
        })
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
            (players,index) => <PlayerDual key={index} players={players} parentWidth={this.state.width} id={index}/>
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
