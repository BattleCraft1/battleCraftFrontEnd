import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'
import Turn from './components/Turn'
import OptionPanel from './components/OptionPanel'
import BattlePopup1x1 from './components/BattlePopup/BattlePopup1x1'
import BattlePopup2x2 from './components/BattlePopup/BattlePopup2x2'

import axios from 'axios';
import {serverName} from "../../main/consts/server";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

class Panel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
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
        }
    }

    showBattlePopup(battleData)
    {
        this.setState({battlePopupUpData:battleData});
        this.setState({showBattlePopup:true});
    }

    async componentDidMount() {
        this.setState({tournamentName:this.props.match.params.tournamentName});
        await this.fetchTournamentProgressData(this.props.match.params.tournamentName);
    }

    async fetchTournamentProgressData(tournamentName){
        await axios.get(`${serverName}progress/tournament?name=${tournamentName}`)
            .then(async res => {
                console.log("tournament data:");
                console.log(res.data);
                await this.setTournamentData(res.data);
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    sendBattleData(battleData){
        console.log("battle before send: ");
    }

    async setTournamentData(tournamentData){
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
                disabled={index>this.state.tournamentData.currentTourNumber}
                currentTourNumber={this.state.tournamentData.currentTourNumber}
            />
        )
    }

    createPopup(){
        if(this.state.playersOnTableCount===2){
            return <BattlePopup1x1 battleData={this.state.battlePopupUpData}
                                   playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                   playersWithoutBattles={JSON.parse(JSON.stringify(this.state.tournamentData.playersWithoutBattles))}
                                   hidePopup={()=>{this.setState({showBattlePopup:false,battlePopupUpData:{}})}}/>
        }
        else if(this.state.playersOnTableCount===4){
            return <BattlePopup2x2 battleData={this.state.battlePopupUpData}
                                   playersNamesWithPoints={this.state.tournamentData.playersNamesWithPoints}
                                   playersWithoutBattles={JSON.parse(JSON.stringify(this.state.tournamentData.playersWithoutBattles))}
                                   hidePopup={()=>{this.setState({showBattlePopup:false,battlePopupUpData:{}})}}/>
        }
        else{
            return <div/>
        }
    }

    render(){
        return(
            <div>
                <div style={Object.assign({}, styles.goldAndBrownTheme, styles.container)}>
                    <div style={Object.assign({}, styles.goldAndBrownThemeInset, styles.innerContainer)}>
                        {this.createTours()}
                    </div>
                </div>
                <OptionPanel/>
                {this.state.showBattlePopup && this.createPopup()}
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

export default connect( mapStateToProps, mapDispatchToProps )( Panel );
