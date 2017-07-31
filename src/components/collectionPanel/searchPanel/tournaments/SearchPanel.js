import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../../redux/actions/index';

import {serverName} from '../../../../consts/server';

class SearchPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            provincesNames:[],
            tournamentsClassesNames:[]
        };
    }

    componentDidMount(){
        this.getAllProvincesNames();
        this.getAllTournamentClassesNames();
    }

    getAllProvincesNames(){
        axios.get(serverName+`get/allProvinces/names`)
            .then(res => {
                console.log(res.data);
                this.setState({provincesNames:res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getAllTournamentClassesNames(){
        axios.get(serverName+`get/allTournamentClasses/names`)
            .then(res => {
                console.log(res.data);
                this.setState({tournamentsClassesNames:res.data});
            })
            .catch(function (error) {
                console.log(error);
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
                    "type":"String",
                    "value":this.name.value
                }
            )}
        if(this.dateFrom.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfStart"],
                    "operation":">",
                    "type":"Date",
                    "value":this.dateFrom.value
                }
            )}
        if(this.dateTo.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["dateOfStart"],
                    "operation":"<",
                    "type":"Date",
                    "value":this.dateTo.value
                }
            )}
        if(this.tournamentClass.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["tournamentClass"],
                    "operation":":",
                    "type":"String",
                    "value":this.tournamentClass.value
                }
            )}
        if(this.city.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "city"],
                    "operation":":",
                    "type":"String",
                    "value":this.city.value
                }
            )}
        if(this.province.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "province","location"],
                    "operation":":",
                    "type":"String",
                    "value":this.province.value
                }
            )}

            console.log(pageRequest.searchCriteria)

        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest();
    }

    prepareProvinceOptions(provincesOptions){
        provincesOptions.push(<option key="nullOption"></option>);
        this.state.provincesNames.map(
            provincesName => {
                provincesOptions.push(<option key={provincesName}>{provincesName}</option>);
            }
        )
    }

    prepareTournamentClassesOptions(tournamentClassesOptions){
        tournamentClassesOptions.push(<option key="nullOption"></option>);
        this.state.tournamentsClassesNames.map(
            tournamentName => {
                tournamentClassesOptions.push(<option key={tournamentName}>{tournamentName}</option>);
            }
        )
    }

    render(){
        let provincesOptions = [];
        let tournamentClassesOptions = [];

        this.prepareProvinceOptions(provincesOptions);
        this.prepareTournamentClassesOptions(tournamentClassesOptions);

        return (
            <div className="row">
                <form>
                    <div className="input-group">
                        <span className="input-group-addon">Name:</span>
                        <input ref={(control) => this.name = control} id="name" type="text" className="form-control" name="name" placeholder="Tournament2017"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">City:</span>
                        <input ref={(control) => this.city = control} id="city" type="text" className="form-control" name="city" placeholder="Lublin"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Province:</span>
                        <select ref={(control) => this.province = control} className="form-control" id="province">
                            {provincesOptions}
                        </select>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Class:</span>
                        <select ref={(control) => this.tournamentClass = control} className="form-control" id="class">
                            {tournamentClassesOptions}
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

