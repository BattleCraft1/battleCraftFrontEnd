import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../../redux/actions/index';

import {serverName} from '../../../../main/consts/server';

import {StyleSheet, css} from 'aphrodite';


import axios from 'axios';

class SearchPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:[],
            tournamentsGames:[]
        };
    }

    componentDidMount(){
        this.getAllProvincesNames();
        this.getAllTournamentGames();
    }

    getAllProvincesNames(){
        axios.get(serverName+`get/allProvinces/names`)
            .then(res => {
                this.setState({provincesNames:res.data});
            })
            .catch(error => {
                this.props.showNetworkErrorMessageBox(error);
            });
    }

    getAllTournamentGames(){
        axios.get(serverName+`get/allGames/names`)
            .then(res => {
                this.setState({tournamentsGames:res.data});
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
                    "keys":["dateOfStart"],
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
        if(this.banned.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["banned"],
                    "operation":":",
                    "value":JSON.parse(this.banned.value)
                }
            )}
        if(this.active.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["active"],
                    "operation":":",
                    "value":JSON.parse(this.active.value)
                }
            )}
        if(this.accepted.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["accepted"],
                    "operation":":",
                    "value":JSON.parse(this.accepted.value)
                }
            )}
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
        this.props.getPageRequest();
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

    render(){
        let provincesOptions = [];
        let tournamentGamesOptions = [];

        this.prepareProvinceOptions(provincesOptions);
        this.prepareTournamentGamesOptions(tournamentGamesOptions);

        return (
            <div className={css(resp.popupContent)}>
                <form>
                    <div className={css(resp.optionContainer)}>
                        <span className={css(resp.optionLabel)}>Name:</span>
                        <input ref={(control) => this.name = control} id="name" type="text" className={css(resp.optionInput)} name="name"
                               placeholder="Tournament2017"/>
                    </div>
                    <div className={css(resp.optionContainer)}>
                        <span className={css(resp.optionLabel)}>City:</span>
                        <input ref={(control) => this.city = control} id="city" type="text" className={css(resp.optionInput)} name="city"
                               placeholder="Lublin"/>
                    </div>
                    <div className={css(resp.optionContainer)}>
                        <span className={css(resp.optionLabel)}>Province:</span>
                        <select ref={(control) => this.province = control} className={css(resp.optionInput)} id="province">
                            {provincesOptions}
                        </select>
                    </div>
                    <div className={css(resp.optionContainer)}>
                        <span className={css(resp.optionLabel)}>Game:</span>
                        <select ref={(control) => this.game = control} className={css(resp.optionInput)} id="class">
                            {tournamentGamesOptions}
                        </select>
                    </div>
                    <div className={css(resp.optionContainer)}>
                        <span className={css(resp.optionLabel)}>From:</span>
                        <input ref={(control) => this.dateFrom = control} type="date" className={css(resp.optionInput)} id="dateFrom"/>
                    </div>
                    <div className={css(resp.optionContainer)}>
                        <span className={css(resp.optionLabel)}>To:</span>
                        <input ref={(control) => this.dateTo = control}  type="date" className={css(resp.optionInput)} id="dateTo"/>
                    </div>
                    <div className={css(resp.optionContainer)}>
                        <span className="input-group-addon">Max players:</span>
                        <input ref={(control) => this.maxPlayers = control} id="maxPlayers" type="number" className="form-control" name="maxPlayers"/>
                        <span className="input-group-addon">Players number:</span>
                        <input ref={(control) => this.playersNumber = control} id="playersNumber" type="number" className="form-control" name="playersNumber"/>
                        <span className="input-group-addon">Free slots:</span>
                        <input ref={(control) => this.freeSlots = control} id="freeSlots" type="number" className="form-control" name="freeSlots"/>
                    </div>
                    <div className={css(resp.optionContainer)}>
                        <span className="input-group-addon">Banned:</span>
                        <select ref={(control) => this.banned = control} className="form-control" id="banned">
                            <option key="nevermind" value=""/>
                            <option key="yes" value={true}>yes</option>
                            <option key="no" value={false}>no</option>
                        </select>
                        <span className="input-group-addon">Active:</span>
                        <select ref={(control) => this.active = control} className="form-control" id="active">
                            <option key="nevermind" value=""/>
                            <option key="yes" value={true}>yes</option>
                            <option key="no" value={false}>no</option>
                        </select>
                        <span className="input-group-addon">Accepted:</span>
                        <select ref={(control) => this.accepted = control} className="form-control" id="active">
                            <option key="nevermind" value=""/>
                            <option key="yes" value={true}>yes</option>
                            <option key="no" value={false}>no</option>
                        </select>
                    </div>
                    <button onClick={()=>this.searchTournaments()} type="button" className={css(resp.searchButton)}>Search</button>
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

const resp = StyleSheet.create({
  popupContent:{
    position:'fixed',
    width:'80%',
    padding:'2%',
    zIndex:'100',
    background:'red',
    display:'none',
  },

  optionContainer:{
    position:'relative',
    display:'inline-block',
    width:'48%',
    background:'green',
    float:'left',
    marginLeft:'1%',
    marginRight:'1%',
  },

  optionLabel:{
  position:'relative',
  display:'inline-block',
  width:'100%',
  textAlign:'center',
  },

  optionInput:{
  position:'relative',
  display:'inline-block',
  width:'100%',
  },

  searchButton:{
    width:'20%',
    float:'right',
    marginTop:'1%',
    marginRight:'1%',
  },

})
