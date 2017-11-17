import React from 'react';

import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Cell_2x2 from '../popupComponents/TurnCell2x2Popup'
import OptionButton from '../optionButton/OptionButton'
import PlayerList from '../playerList/GroupPlayerList'
import compareArrays from '../../../../main/functions/compareArrays'


class BattlePopup extends React.Component {
    constructor(props) {
        super(props);
        this.setPopupRef = this.setPopupRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            usersListVisible:false,
            numberOfPlayersToChange:-1
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

    showUsersList(numberOfPlayersToChange)
    {
        this.setState({numberOfPlayersToChange:numberOfPlayersToChange});
        this.setState({usersListVisible:true})
    }

    hideUsersList(){
        this.setState({usersListVisible:false})
    }

    changePlayersData(changedPlayersNames){
        let battleData = this.props.battleData;
        if(this.state.numberOfPlayersToChange === 0){
            this.changePlayersWithoutBattles(battleData.firstPlayersGroup.playersNames,changedPlayersNames);
            battleData.firstPlayersGroup = {
                playersNames:changedPlayersNames,
                points:0
            }
        }
        else if(this.state.numberOfPlayersToChange === 1){
            this.changePlayersWithoutBattles(battleData.secondPlayersGroup.playersNames,changedPlayersNames);
            battleData.secondPlayersGroup = {
                playersNames:changedPlayersNames,
                points:0
            }
        }

        this.setState({usersListVisible:false})
    }

    changePlayersWithoutBattles(playerNamesToPush,playerNamesToPop){
        let playersWithoutBattles = this.props.playersWithoutBattles[this.props.battleData.tourNumber];
        if(!compareArrays(playerNamesToPush,["",""])){
            playersWithoutBattles.unshift(playerNamesToPush);
        }
        if(!compareArrays(playerNamesToPop,["",""])){
            playersWithoutBattles.splice(playersWithoutBattles.indexOf(playerNamesToPop),1);
        }

    }

    render(){

        return (
            <div>
                <div style={styles.popupBackground}/>
                <div ref={this.setPopupRef}>
                    <div ref={this.setMessageRef} style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>TABLE {this.props.battleData.tableNumber}</div>

                        <Cell_2x2
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
                                changePlayersData={this.changePlayersData.bind(this)}
                                playersWithoutBattles={this.props.playersWithoutBattles[this.props.battleData.tourNumber]}/>}
                </div>
            </div>

        )
    }
}



export default BattlePopup
