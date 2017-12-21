import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'
import Turn from './components/Turn'
import OptionPanel from './components/OptionPanel'
import BattlePopup1x1 from './components/BattlePopup/BattlePopup1x1'
import BattlePopup2x2 from './components/BattlePopup/BattlePopup2x2'
import Scoreboard from './components/scoreboard/Scoreboard1x1'
import Scoreboard2x2 from './components/scoreboard/Scoreboard2x2'

import axios from 'axios';
import {serverName} from "../../main/consts/server";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

import Cookies from 'universal-cookie';

const cookies = new Cookies('auth');

class Panel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showScoreBoard:false,
            tournamentName:"",
            playersOnTableCount:0,
            showBattlePopup:false,
            battlePopupUpData:{},
            tournamentData:{
                turns:[],
                playersNamesWithPoints:{},
                playersWithoutBattles:{},
                currentTurnNumber:0,
                tournamentStatus:"",
                playersOnTableCount:0,
                playersCount:0
            },
            canCurrentUserMenageTournament:false
        }
    }


    showBattlePopup(battleData)
    {
        this.setState({battlePopupUpData:battleData});
        this.setState({showBattlePopup:true});
    }

    async componentDidMount() {
        if(cookies.get('token')!==undefined && cookies.get('role')!==undefined && cookies.get('username')!==undefined){
            await this.props.setTokenAndRole(cookies.get('token'),cookies.get('role'),cookies.get('username'));
        }
        let tournamentName = this.props.match.params.tournamentName.replace("%"," ");
        this.setState({tournamentName:tournamentName});
        await this.fetchTournamentProgressData(tournamentName);
    }

    async fetchTournamentProgressData(tournamentName){
        this.props.startLoading("Fetching tournament progress...");
        await axios.get(`${serverName}progress/tournament?name=${tournamentName}`,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(async res => {
                this.props.stopLoading();
                console.log("tournament data:");
                console.log(res.data);
                await this.prepareTurnsData(res.data);
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    sendBattleData(battleData){
        let battleDataToSend = JSON.parse(JSON.stringify(battleData));
        delete battleDataToSend["finished"];
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        console.log("battle before send: ");
        console.log(battleData);
        this.props.startLoading("Sending battle...");
        axios.post(`${serverName}set/points/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,battleDataToSend,
            {
                headers: {
                    "X-Auth-Token": this.props.security.token
                }
            })
            .then(res => {
                this.props.stopLoading();
                console.log("tournament data:");
                console.log(res.data);
                this.prepareTurnsData(res.data);
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    async prepareTurnsData(tournamentData){
        this.setState({playersOnTableCount:tournamentData.playersOnTableCount});
        if(tournamentData.playersOnTableCount === 4){
            for (let turnNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(turnNumber)) {
                    tournamentData.playersWithoutBattles[turnNumber].push(["", ""]);
                }
            }
        }
        else{
            for (let turnNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(turnNumber)) {
                    tournamentData.playersWithoutBattles[turnNumber].push("");
                }
            }
        }
        this.setState({tournamentData:tournamentData});
    }

    createTurns(){
        return this.state.tournamentData.turns.map(
            (turn,index) => <Turn
                key={index}
                turnData={turn}
                turnNumber={index}
                haveAlonePlayer={this.state.tournamentData.playersCount%2!==0}
                showBattlePopup={this.showBattlePopup.bind(this)}
                playersOnTableCount={this.state.playersOnTableCount}
                tournamentStatus={this.state.tournamentData.tournamentStatus}
                disabled={index>this.state.tournamentData.currentTurnNumber || !this.state.tournamentData.canCurrentUserMenageTournament}
                currentTurnNumber={this.state.tournamentData.currentTurnNumber}
            />
        )
    }

    createPopup(){
        if(this.state.playersOnTableCount===2){
            return <BattlePopup1x1 battleData={this.state.battlePopupUpData}
                                   playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                   playersWithoutBattles={this.state.tournamentData.playersWithoutBattles}
                                   hidePopup={()=>{this.setState({showBattlePopup:false,battlePopupUpData:{}})}}
                                   sendBattleData={this.sendBattleData.bind(this)}/>
        }
        else if(this.state.playersOnTableCount===4){
            return <BattlePopup2x2 battleData={this.state.battlePopupUpData}
                                   playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                   playersWithoutBattles={this.state.tournamentData.playersWithoutBattles}
                                   hidePopup={()=>{this.setState({showBattlePopup:false,battlePopupUpData:{}})}}
                                   sendBattleData={this.sendBattleData.bind(this)}/>
        }
        else{
            return <div/>
        }
    }

    createScoreBoard(){
        if(this.state.playersOnTableCount===2){
            return <Scoreboard playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                               hidePopup={()=>{this.setState({showScoreBoard:false})}}/>
        }
        else if(this.state.playersOnTableCount===4){
            return <Scoreboard2x2 playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                  hidePopup={()=>{this.setState({showScoreBoard:false})}}/>
        }
        else{
            return <div/>
        }
    }

    nextTurn(){
        if(this.state.tournamentData.currentTurnNumber === this.state.tournamentData.turns.length-1){
            this.props.showFailureMessage("This tournament is finished");
            return;
        }

        let notHaveAlonePlayer = this.state.tournamentData.playersCount%2===0;
        for(let i=0;i<=this.state.tournamentData.currentturnNumber;i++){
            for(let j=0; j<this.state.tournamentData.turns[i].length;j++){
                if(!((notHaveAlonePlayer && this.state.tournamentData.turns[i][j].finished === true) ||
                    (!notHaveAlonePlayer && (this.state.tournamentData.turns[i][j].tableNumber === this.state.tournamentData.turns[i].length-1 ||
                            this.state.tournamentData.turns[i][j].finished === true)))){
                    console.log(notHaveAlonePlayer);
                    console.log(this.state.tournamentData.turns[i][j].finished === true);
                    console.log(this.state.tournamentData.turns[i].tableNumber === this.state.tournamentData.turns[i].length-1);
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in turn: "+(i+1)+" is not finished yet");
                    return;
                }
            }
        }

        this.props.showConfirmationDialog(
            {
                header:"Start next turn",
                message:"Are you sure?",
                onConfirmFunction: () => this.nextTurnRequest()
            });
    }


    nextTurnRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        this.props.startLoading("Changing turn...");
        axios.get(`${serverName}next/turn/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.stopLoading();
                console.log("tournament data:");
                console.log(res.data);
                this.setState({playersOnTableCount:res.data.playersOnTableCount});
                this.prepareTurnsData(res.data);
                this.setState({tournamentData:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    previousTurn(){
        if(this.state.tournamentData.currentTurnNumber === 0)
            this.props.showFailureMessage("This is first turn of tournament");
        else{

            this.props.showConfirmationDialog(
                {
                    header:"Come back to previous turn",
                    message:"Are you sure? If you come back to previous turn all data from this turn will be lost!",
                    onConfirmFunction: () => this.previousTurnRequest()
                });
        }
    }

    previousTurnRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        this.props.startLoading("Coming back to previous turn...");
        axios.get(`${serverName}previous/turn/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.stopLoading();
                console.log("tournament data:");
                console.log(res.data);
                this.setState({playersOnTableCount:res.data.playersOnTableCount});
                this.prepareTurnsData(res.data);
                this.setState({tournamentData:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    finishTournament(){
        let haveAlonePlayer = this.state.tournamentData.playersCount%2===0;

        for(let i=0;i<this.state.tournamentData.turns.length;i++){
            for(let j=0; j<this.state.tournamentData.turns[i].length;j++){
                if(haveAlonePlayer && this.state.tournamentData.turns[i].tableNumber !== this.state.tournamentData.turns[i].length-1 &&
                    this.state.tournamentData.turns[i][j].finished === false){
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in turn: "+(i+1)+" is not finished yet");
                    return;
                }
            }
        }

        this.props.showConfirmationDialog(
            {
                header:"Finish tournament",
                message:"Are you sure?",
                onConfirmFunction: () => this.finishTournamentRequest()
            });
    }

    finishTournamentRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";

        this.props.startLoading("Finishing tournament...");
        axios.get(`${serverName}finish/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.stopLoading();
                console.log("tournament data:");
                console.log(res.data);
                this.setState({playersOnTableCount:res.data.playersOnTableCount});
                this.prepareTurnsData(res.data);
                this.setState({tournamentData:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    showScoreBoard(){
        this.setState({showScoreBoard:true})
    }

    render(){

        let buttonsDisabled = this.state.tournamentData.tournamentStatus === "FINISHED" ||
            this.props.security.role==="ROLE_ADMIN" ||
            !this.state.tournamentData.canCurrentUserMenageTournament;

        return(
            <div>
                <div style={Object.assign({}, styles.goldAndBrownTheme, styles.container)}>
                    <div style={Object.assign({}, styles.goldAndBrownThemeInset, styles.innerContainer)}>
                        {this.createTurns()}
                    </div>
                </div>
                <OptionPanel
                    disabled={buttonsDisabled}
                    previousTurn={this.previousTurn.bind(this)}
                    nextTurn={this.nextTurn.bind(this)}
                    finishTournament={this.finishTournament.bind(this)}
                    scoreboard={this.showScoreBoard.bind(this)}
                />
                {this.state.showBattlePopup && this.createPopup()}
                {this.state.showScoreBoard && this.createScoreBoard()}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
