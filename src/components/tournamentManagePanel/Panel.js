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
                tours:[],
                playersNamesWithPoints:{},
                playersWithoutBattles:{},
                currentTourNumber:0,
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
                await this.prepareToursData(res.data);
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
                this.prepareToursData(res.data);
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    async prepareToursData(tournamentData){
        this.setState({playersOnTableCount:tournamentData.playersOnTableCount});
        if(tournamentData.playersOnTableCount === 4){
            for (let tourNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(tourNumber)) {
                    tournamentData.playersWithoutBattles[tourNumber].push(["", ""]);
                }
            }
        }
        else{
            for (let tourNumber in tournamentData.playersWithoutBattles) {
                if (tournamentData.playersWithoutBattles.hasOwnProperty(tourNumber)) {
                    tournamentData.playersWithoutBattles[tourNumber].push("");
                }
            }
        }
        this.setState({tournamentData:tournamentData});
    }

    createTours(){
        return this.state.tournamentData.tours.map(
            (tour,index) => <Turn
                key={index}
                tourData={tour}
                tourNumber={index}
                haveAlonePlayer={this.state.tournamentData.playersCount%2!==0}
                showBattlePopup={this.showBattlePopup.bind(this)}
                playersOnTableCount={this.state.playersOnTableCount}
                tournamentStatus={this.state.tournamentData.tournamentStatus}
                disabled={index>this.state.tournamentData.currentTourNumber || !this.state.tournamentData.canCurrentUserMenageTournament}
                currentTourNumber={this.state.tournamentData.currentTourNumber}
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

    nextTour(){
        if(this.state.tournamentData.currentTourNumber === this.state.tournamentData.tours.length-1){
            this.props.showFailureMessage("This tournament is finished");
            return;
        }

        let notHaveAlonePlayer = this.state.tournamentData.playersCount%2===0;
        for(let i=0;i<=this.state.tournamentData.currentTourNumber;i++){
            for(let j=0; j<this.state.tournamentData.tours[i].length;j++){
                if(!((notHaveAlonePlayer && this.state.tournamentData.tours[i][j].finished === true) ||
                    (!notHaveAlonePlayer && (this.state.tournamentData.tours[i][j].tableNumber === this.state.tournamentData.tours[i].length-1 ||
                            this.state.tournamentData.tours[i][j].finished === true)))){
                    console.log(notHaveAlonePlayer);
                    console.log(this.state.tournamentData.tours[i][j].finished === true);
                    console.log(this.state.tournamentData.tours[i].tableNumber === this.state.tournamentData.tours[i].length-1);
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in tour: "+(i+1)+" is not finished yet");
                    return;
                }
            }
        }

        this.props.showConfirmationDialog(
            {
                header:"Start next tour",
                message:"Are you sure?",
                onConfirmFunction: () => this.nextTourRequest()
            });
    }


    nextTourRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        this.props.startLoading("Changing tour...");
        axios.get(`${serverName}next/tour/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
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
                this.prepareToursData(res.data);
                this.setState({tournamentData:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    previousTour(){
        if(this.state.tournamentData.currentTourNumber === 0)
            this.props.showFailureMessage("This is first tour of tournament");
        else{

            this.props.showConfirmationDialog(
                {
                    header:"Come back to previous tour",
                    message:"Are you sure? If you come back to previous tour all data from this tour will be lost!",
                    onConfirmFunction: () => this.previousTourRequest()
                });
        }
    }

    previousTourRequest(){
        let tournamentTypeString = this.state.playersOnTableCount === 4?"group":"duel";
        this.props.startLoading("Coming back to previous tour...");
        axios.get(`${serverName}previous/tour/${tournamentTypeString}/tournament?name=${this.state.tournamentName}`,
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
                this.prepareToursData(res.data);
                this.setState({tournamentData:res.data});
            })
            .catch(error => {
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    finishTournament(){
        let haveAlonePlayer = this.state.tournamentData.playersCount%2===0;

        for(let i=0;i<this.state.tournamentData.tours.length;i++){
            for(let j=0; j<this.state.tournamentData.tours[i].length;j++){
                if(haveAlonePlayer && this.state.tournamentData.tours[i].tableNumber !== this.state.tournamentData.tours[i].length-1 &&
                    this.state.tournamentData.tours[i][j].finished === false){
                    this.props.showFailureMessage("Battle on table with number: "+(j+1)+" in tour: "+(i+1)+" is not finished yet");
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
                this.prepareToursData(res.data);
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
                        {this.createTours()}
                    </div>
                </div>
                <OptionPanel
                    disabled={buttonsDisabled}
                    previousTour={this.previousTour.bind(this)}
                    nextTour={this.nextTour.bind(this)}
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
