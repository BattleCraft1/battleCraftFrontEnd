import React from 'react';

import {resp, styles} from '../../styles'
import {css} from 'aphrodite';

import Cell_1x1 from '../popupComponents/TurnCell1x1Popup'
import OptionButton from '../optionButton/OptionButton'
import PlayerList from '../playerList/DuelPlayerList'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';


class BattlePopup extends React.Component {
    constructor(props) {
        super(props);
        this.setPopupRef = this.setPopupRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            battleData:{},
            playersWithoutBattles:[],
            usersListVisible:false,
            numberOfPlayerToChange:-1,
            componentReady:false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.setState({battleData:JSON.parse(JSON.stringify(this.props.battleData))});
        this.setState({playersWithoutBattles:JSON.parse(JSON.stringify(this.props.playersWithoutBattles[this.props.battleData.tourNumber]))});
        this.setState({componentReady:true});
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

    chooseRandomPlayers(){
        let playersNames = this.state.playersWithoutBattles;
        playersNames.splice(playersNames.indexOf(""),1);
        let battleData = this.state.battleData;

        if(battleData.firstPlayer.name!=="" && playersNames.indexOf(battleData.firstPlayer.name) === -1){
            playersNames.unshift(battleData.firstPlayer.name);
        }
        if(battleData.secondPlayer.name!=="" && playersNames.indexOf(battleData.secondPlayer.name) === -1) {
            playersNames.unshift(battleData.secondPlayer.name);
        }

        let firstRandomName = playersNames[Math.floor(Math.random()*playersNames.length)];
        let secondRandomName = playersNames[Math.floor(Math.random()*playersNames.length)];
        if(secondRandomName === firstRandomName){
            let indexOfFirstName = playersNames.indexOf(firstRandomName);
            if(indexOfFirstName > 0){
                secondRandomName = playersNames[indexOfFirstName-1];
            }
            else{
                secondRandomName = playersNames[indexOfFirstName+1];
            }
        }

        playersNames.splice(playersNames.indexOf(firstRandomName),1);
        battleData.firstPlayer = {
            name:firstRandomName,
            points:0
        };

        playersNames.splice(playersNames.indexOf(secondRandomName),1);
        battleData.secondPlayer = {
            name:secondRandomName,
            points:0
        };

        playersNames.push("");
        this.setState({battleData:battleData,playersWithoutBattles:playersNames});
    }

    changePlayerData(changedPlayerName){
        let battleData = this.state.battleData;
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

        this.setState({usersListVisible:false,battleData:battleData})
    }

    clearBattleData(){
        this.props.showConfirmationDialog(
            {
                header:"Clear data for battle",
                message:"Are you sure?",
                onConfirmFunction: () => this.clearBattleDataFunction()
            }
        )
    }

    clearBattleDataFunction(){
        this.state.battleData.firstPlayer.name = "";
        this.state.battleData.secondPlayer.name = "";
        this.state.battleData.firstPlayer.points = 0;
        this.state.battleData.secondPlayer.points = 0;
        this.props.sendBattleData(this.state.battleData);
        this.props.hidePopup();
    }

    changePlayersWithoutBattles(playerNameToPush,playerNameToPop){
        let playersWithoutBattles = this.state.playersWithoutBattles;
        if(playerNameToPush!==""){
            playersWithoutBattles.unshift(playerNameToPush);
        }
        if(playerNameToPop!==""){
            playersWithoutBattles.splice(playersWithoutBattles.indexOf(playerNameToPop),1);
        }
        this.setState({playersWithoutBattles:playersWithoutBattles});
    }

    changePointsOfFirstPlayer(points){
        let battleData = this.state.battleData;
        battleData.firstPlayer.points = points;
        this.setState({battleData:battleData});
    }

    changePointsOfSecondPlayer(points){
        let battleData = this.state.battleData;
        battleData.secondPlayer.points = points;
        this.setState({battleData:battleData});
    }

    sendBattleData(){
        if(isNaN(this.state.battleData.firstPlayer.points) || this.state.battleData.firstPlayer.points === undefined){
            this.props.showFailureMessage("First player points cannot be empty");
        }
        else if(isNaN(this.state.battleData.secondPlayer.points) || this.state.battleData.secondPlayer.points === undefined){
            this.props.showFailureMessage("Second player points cannot be empty");
        }
        else if(this.state.battleData.firstPlayer.points + this.state.battleData.secondPlayer.points>20 ||
            this.state.battleData.firstPlayer.points<0 || this.state.battleData.secondPlayer.points<0){
            this.props.showFailureMessage("Points number should be between 0 to 20 and summary of points should not be greater than 20");
        }
        else if(this.state.battleData.firstPlayer.name === ""){
            this.props.showFailureMessage("First player slot cannot be empty");
        }
        else if(this.state.battleData.secondPlayer.name === ""){
            this.props.showFailureMessage("Second player slot cannot be empty");
        }
        else{
            let sendBattleData = this.props.sendBattleData;
            let hidePopup = this.props.hidePopup;
            let battleData = this.state.battleData;

            this.props.showConfirmationDialog(
                {
                    header:"Save data for battle",
                    message:"Are you sure?",
                    onConfirmFunction: () => {
                        sendBattleData(battleData);
                        hidePopup();
                    }
                }
            )
        }
    }

    render(){

        return (
            <div>
                <div style={styles.popupBackground}/>
                {this.state.componentReady && <div ref={this.setPopupRef}>
                    <div style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>TABLE {this.state.battleData.tableNumber}</div>

                        <Cell_1x1
                            changePointsOfFirstPlayer={this.changePointsOfFirstPlayer.bind(this)}
                            changePointsOfSecondPlayer={this.changePointsOfSecondPlayer.bind(this)}
                            playersNamesWithPoints={this.props.playersNamesWithPoints}
                            battleData={this.state.battleData}
                            showUsersList={this.showUsersList.bind(this)}/>

                        <div style={{marginTop:'2px'}}>
                            <OptionButton operation={()=>{this.sendBattleData()}} name={"Save"}/>
                            <OptionButton operation={()=>{this.props.hidePopup()}} name={"Cancel"}/>
                            <OptionButton operation={()=>{this.chooseRandomPlayers()}} name={"DICE"} additionalStyle={{minWidth:'0', padding:'0'}}/>
                            <OptionButton operation={()=>{this.clearBattleData()}} name={"Clear"} additionalStyle={{float:'right'}}/>
                        </div>
                    </div>
                    {this.state.usersListVisible &&
                    <PlayerList hideList={() => this.hideUsersList()}
                                changePlayerData={this.changePlayerData.bind(this)}
                                playersWithoutBattles={this.state.playersWithoutBattles}/>}
                </div>}
            </div>

        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( BattlePopup );
