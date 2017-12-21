import React from 'react';

import {resp, styles} from '../../styles'
import {css} from 'aphrodite';

import Cell_2x2 from '../popupComponents/TurnCell2x2Popup'
import OptionButton from '../optionButton/OptionButton'
import PlayerList from '../playerList/GroupPlayerList'

import compareArrays from '../../../../main/functions/compareArrays'

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
            numberOfPlayersToChange:-1,
            componentReady:false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.setState({battleData:JSON.parse(JSON.stringify(this.props.battleData))});
        this.setState({playersWithoutBattles:JSON.parse(JSON.stringify(this.props.playersWithoutBattles[this.props.battleData.turnNumber]))});
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

    showUsersList(numberOfPlayersToChange)
    {
        this.setState({numberOfPlayersToChange:numberOfPlayersToChange});
        this.setState({usersListVisible:true})
    }

    hideUsersList(){
        this.setState({usersListVisible:false})
    }


    chooseRandomPlayers(){
        let playersNames = this.state.playersWithoutBattles;

        playersNames.splice(playersNames.indexOf(["",""]),1);
        let battleData = this.state.battleData;

        if(!compareArrays(battleData.firstPlayersGroup.playersNames,["",""]) &&
            playersNames.indexOf(battleData.firstPlayersGroup.playersNames) === -1){
            playersNames.unshift(battleData.firstPlayersGroup.playersNames);
        }
        if(!compareArrays(battleData.secondPlayersGroup.playersNames,["",""]) &&
            playersNames.indexOf(battleData.secondPlayersGroup.playersNames) === -1) {
            playersNames.unshift(battleData.secondPlayersGroup.playersNames);
        }

        let firstRandomNames = playersNames[Math.floor(Math.random()*playersNames.length)];
        let secondRandomNames = playersNames[Math.floor(Math.random()*playersNames.length)];
        if(compareArrays(firstRandomNames,secondRandomNames)){
            let indexOfFirstNames = playersNames.indexOf(firstRandomNames);
            if(indexOfFirstNames > 0){
                secondRandomNames = playersNames[indexOfFirstNames-1];
            }
            else{
                secondRandomNames = playersNames[indexOfFirstNames+1];
            }
        }

        playersNames.splice(playersNames.indexOf(firstRandomNames),1);
        battleData.firstPlayersGroup = {
            playersNames:firstRandomNames,
            playersPoints:0
        };

        playersNames.splice(playersNames.indexOf(secondRandomNames),1);
        battleData.secondPlayersGroup = {
            playersNames:secondRandomNames,
            playersPoints:0
        };

        playersNames.push(["",""]);
        this.setState({battleData:battleData,playersWithoutBattles:playersNames});
    }

    changePlayersData(changedPlayersNames){
        let battleData = this.state.battleData;
        if(this.state.numberOfPlayersToChange === 0){
            this.changePlayersWithoutBattles(battleData.firstPlayersGroup.playersNames,changedPlayersNames);
            battleData.firstPlayersGroup = {
                playersNames:changedPlayersNames,
                playersPoints:0
            }
        }
        else if(this.state.numberOfPlayersToChange === 1){
            this.changePlayersWithoutBattles(battleData.secondPlayersGroup.playersNames,changedPlayersNames);
            battleData.secondPlayersGroup = {
                playersNames:changedPlayersNames,
                playersPoints:0
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
        this.state.battleData.firstPlayersGroup.playersNames = ["",""];
        this.state.battleData.secondPlayersGroup.playersNames = ["",""];
        this.state.battleData.firstPlayersGroup.playersPoints = 0;
        this.state.battleData.secondPlayersGroup.playersPoints = 0;
        this.props.sendBattleData(this.state.battleData);
        this.props.hidePopup();
    }

    changePlayersWithoutBattles(playerNamesToPush,playerNamesToPop){
        let playersWithoutBattles = this.state.playersWithoutBattles;
        if(!compareArrays(playerNamesToPush,["",""])){
            playersWithoutBattles.unshift(playerNamesToPush);
        }
        if(!compareArrays(playerNamesToPop,["",""])){
            playersWithoutBattles.splice(playersWithoutBattles.indexOf(playerNamesToPop),1);
        }
        this.setState({playersWithoutBattles:playersWithoutBattles});
    }

    changePointsOfFirstPlayersGroup(points){
        let battleData = this.state.battleData;
        battleData.firstPlayersGroup.playersPoints = points;
        this.setState({battleData:battleData});
    }

    changePointsOfSecondPlayersGroup(points){
        let battleData = this.state.battleData;
        battleData.secondPlayersGroup.playersPoints = points;
        this.setState({battleData:battleData});
    }

    sendBattleData(){
        if(isNaN(this.state.battleData.firstPlayersGroup.playersPoints) || this.state.battleData.firstPlayersGroup.playersPoints === undefined){
            this.props.showFailureMessage("First player points cannot be empty");
        }
        else if(isNaN(this.state.battleData.secondPlayersGroup.playersPoints) || this.state.battleData.secondPlayersGroup.playersPoints === undefined){
            this.props.showFailureMessage("Second player points cannot be empty");
        }
        else if(this.state.battleData.firstPlayersGroup.playersPoints + this.state.battleData.secondPlayersGroup.playersPoints>20 ||
            this.state.battleData.firstPlayersGroup.playersPoints<0 || this.state.battleData.secondPlayersGroup.playersPoints<0){
            this.props.showFailureMessage("Points number should be between 0 to 20 and summary of points should not be greater than 20");
        }
        else if(this.state.battleData.firstPlayersGroup.playersNames[0] === ""){
            this.props.showFailureMessage("First player in first group slot cannot be empty");
        }
        else if(this.state.battleData.firstPlayersGroup.playersNames[1] === ""){
            this.props.showFailureMessage("Second player in first group slot cannot be empty");
        }
        else if(this.state.battleData.secondPlayersGroup.playersNames[0] === ""){
            this.props.showFailureMessage("First player in first group slot cannot be empty");
        }
        else if(this.state.battleData.secondPlayersGroup.playersNames[1] === ""){
            this.props.showFailureMessage("Second player in first group slot cannot be empty");
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
                    <div ref={this.setMessageRef} style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>TABLE {this.props.battleData.tableNumber}</div>

                        <Cell_2x2
                            changePointsOfFirstPlayersGroup={this.changePointsOfFirstPlayersGroup.bind(this)}
                            changePointsOfSecondPlayersGroup={this.changePointsOfSecondPlayersGroup.bind(this)}
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
                                changePlayersData={this.changePlayersData.bind(this)}
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
