import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../../redux/actions/index';

import {serverName} from '../../../../main/consts/server';

import axios from 'axios';

class SearchPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:[],
            tournamentsGames:[],
            tournamentStatus:[]
        };
    }

    componentDidMount(){
        this.getAllTournamentsEnums();
    }

    getAllTournamentsEnums(){
        axios.get(serverName+`get/tournaments/enums`)
            .then(res => {
                this.setState({provincesNames:res.data.provincesNames});
                this.setState({tournamentsGames:res.data.gamesNames});
                res.data.tournamentStatus.push("BANNED");
                this.setState({tournamentStatus:res.data.tournamentStatus});
            })
            .catch(error => {
                this.props.showNetworkErrorMessageBox(error);
            });
    }

    searchTournaments(){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];


        if(this.name.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["name"],
                    "operation":":",
                    "value":this.name.value
                }
            )}
        if(this.dateFrom.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfStart"],
                    "operation":">",
                    "value":this.dateFrom.value
                }
            )}
        if(this.dateTo.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfEnd"],
                    "operation":"<",
                    "value":this.dateTo.value
                }
            )}
        if(this.game.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["game","name"],
                    "operation":":",
                    "value":this.game.value
                }
            )}
        if(this.city.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "city"],
                    "operation":":",
                    "value":this.city.value
                }
            )}
        if(this.province.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "province","location"],
                    "operation":":",
                    "value":this.province.value
                }
            )}
        if(this.tournamentStatus.value!==""){
            if(this.tournamentStatus.value==='BANNED')
                pageRequest.searchCriteria.push(
                    {
                        "keys":["banned"],
                        "operation":":",
                        "value":true
                    }
                );
            else
                pageRequest.searchCriteria.push(
                    {
                        "keys":["tournamentStatus"],
                        "operation":":",
                        "value":this.tournamentStatus.value
                    }
                );
        }
        if(this.freeSlots.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["freeSlots"],
                    "operation":">",
                    "value":parseInt(this.freeSlots.value)
                }
            )}
        if(this.maxPlayers.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["maxPlayers"],
                    "operation":"<",
                    "value":parseInt(this.maxPlayers.value)
                }
            )}
        if(this.playersNumber.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["playersNumber"],
                    "operation":"<",
                    "value":parseInt(this.playersNumber.value)
                }
            )}

        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest(this.props.collectionType);
    }

    prepareProvinceOptions(provincesOptions){
        provincesOptions.push(<option key="nullOption"/>);
        this.state.provincesNames.map(
            provincesName => {
                provincesOptions.push(<option key={provincesName}>{provincesName}</option>);
            }
        )
    }

    prepareTournamentGamesOptions(tournamentGamesOptions){
        tournamentGamesOptions.push(<option key="nullOption"/>);
        this.state.tournamentsGames.map(
            tournamentGame => {
                tournamentGamesOptions.push(<option key={tournamentGame}>{tournamentGame}</option>);
            }
        )
    }

    prepareTournamentStatusOptions(tournamentStatusOptions){
        tournamentStatusOptions.push(<option key="nullOption"/>);
        this.state.tournamentStatus.map(
            tournamentStatus => {
                tournamentStatusOptions.push(<option key={tournamentStatus}>{tournamentStatus}</option>);
            }
        )
    }

    render(){
        let provincesOptions = [];
        let tournamentGamesOptions = [];
        let tournamentStatusOptions = [];

        this.prepareProvinceOptions(provincesOptions);
        this.prepareTournamentGamesOptions(tournamentGamesOptions);
        this.prepareTournamentStatusOptions(tournamentStatusOptions);

        return (
            <div className="row">
                <form>
                    <div className="input-group">
                        <span className="input-group-addon">Name:</span>
                        <input ref={(control) => this.name = control} id="name" type="text" className="form-control" name="name"
                               placeholder="Tournament2017"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">City:</span>
                        <input ref={(control) => this.city = control} id="city" type="text" className="form-control" name="city"
                               placeholder="Lublin"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Province:</span>
                        <select ref={(control) => this.province = control} className="form-control" id="province">
                            {provincesOptions}
                        </select>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Game:</span>
                        <select ref={(control) => this.game = control} className="form-control" id="class">
                            {tournamentGamesOptions}
                        </select>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">From:</span>
                        <input ref={(control) => this.dateFrom = control} type="date" className="form-control" id="dateFrom"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">To:</span>
                        <input ref={(control) => this.dateTo = control}  type="date" className="form-control" id="dateTo"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Max players:</span>
                        <input ref={(control) => this.maxPlayers = control} id="maxPlayers" type="number" className="form-control" name="maxPlayers"/>
                        <span className="input-group-addon">Players number:</span>
                        <input ref={(control) => this.playersNumber = control} id="playersNumber" type="number" className="form-control" name="playersNumber"/>
                        <span className="input-group-addon">Free slots:</span>
                        <input ref={(control) => this.freeSlots = control} id="freeSlots" type="number" className="form-control" name="freeSlots"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Status:</span>
                        <select ref={(control) => this.tournamentStatus = control} className="form-control" id="banned">
                            {tournamentStatusOptions}
                        </select>
                    </div>
                    <button onClick={()=>this.searchTournaments()} type="button" className="btn btn-default">Search</button>
                </form>
            </div>
        );
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPanel );

