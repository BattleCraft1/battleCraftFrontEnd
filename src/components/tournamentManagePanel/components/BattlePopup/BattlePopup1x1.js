import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../../redux/actions/index';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Points from '../popupComponents/PointsPopup'
import Cell_1x1 from '../popupComponents/TurnCell1x1Popup'
import Cell_2x2 from '../popupComponents/TurnCell2x2Popup'
import OptionButton from '../optionButton/OptionButton'
import PlayerList from '../playerList/DuelPlayerList'


class BattlePopup extends React.Component {
    constructor(props) {
        super(props);
        this.setPopupRef = this.setPopupRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            usersListVisible:false,
            numberOfPlayerToChange:-1
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    handleClickOutside(event) {
        if (this.popupRef && !this.popupRef.contains(event.target)) {
            this.props.hidePopup();
        }
    }

    setPopupRef(node) {
        this.popupRef = node;
    }

    showUsersList(numberOfPlayerToChange)
    {
        this.setState({numberOfPlayerToChange:numberOfPlayerToChange});
        this.setState({usersListVisible:true})
    }

    hideUsersList(){
        this.setState({usersListVisible:false})
    }

    changePlayerData(changedPlayerName){
        let battleData = this.props.battleData;
        if(this.state.numberOfPlayerToChange === 0){
            this.changePlayersWithoutBattles(battleData.firstPlayer.name,changedPlayerName);
            battleData.firstPlayer = {
                name:changedPlayerName,
                points:0
            }
        }
        else if(this.state.numberOfPlayerToChange === 1){
            this.changePlayersWithoutBattles(battleData.secondPlayer.name,changedPlayerName);
            battleData.secondPlayer = {
                name:changedPlayerName,
                points:0
            }
        }

        this.setState({usersListVisible:false})
    }

    changePlayersWithoutBattles(playerNameToPush,playerNameToPop){
        let playersWithoutBattles = this.props.playersWithoutBattles[this.props.battleData.tourNumber];
        if(playerNameToPush!==""){
            playersWithoutBattles.unshift(playerNameToPush);
        }
        if(playerNameToPop!==""){
            playersWithoutBattles.splice(playersWithoutBattles.indexOf(playerNameToPop),1);
        }

    }

    render(){

        return (
            <div>
                <div style={styles.popupBackground}/>
                <div ref={this.setPopupRef}>
                    <div style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>TABLE {this.props.battleData.tableNumber}</div>

                        <Cell_1x1
                            playersNamesWithPoints={this.props.playersNamesWithPoints}
                            battleData={this.props.battleData}
                            showUsersList={this.showUsersList.bind(this)}/>

                        <div style={{marginTop:'2px'}}>
                            <OptionButton operation={()=>{}} name={"Save"}/>
                            <OptionButton operation={()=>{this.props.hidePopup()}} name={"Cancel"}/>
                            <OptionButton operation={()=>{}} name={"Clear"} additionalStyle={{float:'right'}}/>
                        </div>
                    </div>
                    {this.state.usersListVisible &&
                    <PlayerList hideList={() => this.hideUsersList()}
                                changePlayerData={this.changePlayerData.bind(this)}
                                playersWithoutBattles={this.props.playersWithoutBattles[this.props.battleData.tourNumber]}/>}
                </div>
            </div>

        )
    }
}



export default BattlePopup
