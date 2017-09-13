import { ActionCreators } from '../../redux/actions';

import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import TournamentsList from './table/tournaments/CollectionList';
import TournamentsSearchForm from './searchPanel/tournaments/SearchPanel';
import UsersList from './table/users/CollectionList';
import UsersSearchForm from './searchPanel/users/SearchPanel';
import PagePanel from './pagePanel/PagePanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {serverName} from '../../main/consts/server'

import axios from 'axios';

class CollectionPanel extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            collectionType:""
        }
    }

    async componentDidMount() {
        this.setState({collectionType: ""});
        await this.getPageRequest(this.props.match.params.collectionType);
        this.setState({collectionType: this.props.match.params.collectionType});
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.collectionType !== undefined &&
            nextProps.match.params.collectionType !== this.props.match.params.collectionType) {
            this.setState({collectionType: ""});
            await this.getPageRequest(nextProps.match.params.collectionType);
            this.setState({collectionType: nextProps.match.params.collectionType});
        }
    }

    async getPageRequest(collectionType){
        console.log(this.props.pageRequest);
        await axios.post(serverName+`page/`+collectionType,this.props.pageRequest)
            .then(res => {
                this.props.setPage(res.data);

                let pageRequest = this.props.pageRequest;
                pageRequest.pageRequest.page=this.props.page.number;
                pageRequest.pageRequest.size=this.props.page.numberOfElements;
                this.props.setPageRequest(pageRequest);
            })
            .catch(error => {
                this.props.showNetworkErrorMessageBox(error);
            });
    }

    render(){
        let collectionList ="";
        let collectionSearchPanel ="";
        if(this.state.collectionType==='tournaments'){
            collectionList=<TournamentsList getPageRequest={this.getPageRequest.bind(this)}
                                            collectionType={this.state.collectionType}/>;
            collectionSearchPanel=<TournamentsSearchForm collectionType={this.state.collectionType}
                                                         getPageRequest={this.getPageRequest.bind(this)} />;
        }
        else if(this.state.collectionType==='users'){
            collectionList=<UsersList getPageRequest={this.getPageRequest.bind(this)}
                                      collectionType={this.state.collectionType}/>;
            collectionSearchPanel=<UsersSearchForm collectionType={this.state.collectionType}
                                                   getPageRequest={this.getPageRequest.bind(this)} />;
        }


        return (
            <div className={css(resp.container)}>
                <div className="row">
                    {collectionList}
                    <PagePanel getPageRequest={this.getPageRequest.bind(this)} collectionType={this.props.match.params.collectionType}/>
                </div>
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
        pageRequest: state.pageRequest,
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionPanel );


const resp = StyleSheet.create({
    container:{
        display:'block',
        position:'relative',
        width:'100%',
        zIndex:'1',
    },

});

const MyContext =
    {
        "content": [
            {
                "tournamentStatus": "ACCEPTED",
                "game": "Warhammer",
                "maxPlayers": 6,
                "freeSlots": 4,
                "province": "lubelskie",
                "city": "Lublin",
                "name": "Tournament1",
                "dateOfStart": 1483880700000,
                "playersNumber": 2,
                "banned": false
            },
            {
                "tournamentStatus": "NEW",
                "game": "Cyber punk",
                "maxPlayers": 6,
                "freeSlots": 4,
                "province": "podlaskie",
                "city": "Białystok",
                "name": "Tournament10",
                "dateOfStart": 1535306700000,
                "playersNumber": 2,
                "banned": false
            },
            {
                "tournamentStatus": "NEW",
                "game": "Star wars",
                "maxPlayers": 8,
                "freeSlots": 6,
                "province": "lubelskie",
                "city": "Zamość",
                "name": "Tournament2xxxxxxxx",
                "dateOfStart": 1518185460000,
                "playersNumber": 2,
                "banned": false
            },
            {
                "tournamentStatus": "NEW",
                "game": "Warhammer 40k",
                "maxPlayers": 6,
                "freeSlots": 4,
                "province": "dolnośląskie",
                "city": "Wrocław",
                "name": "Tournament3",
                "dateOfStart": 1489331700000,
                "playersNumber": 2,
                "banned": true
            },
            {
                "tournamentStatus": "FINISHED",
                "game": "Cyber punk",
                "maxPlayers": 10,
                "freeSlots": 8,
                "province": "małopolskie",
                "city": "Kraków",
                "name": "Tournament4",
                "dateOfStart": 1524673500000,
                "playersNumber": 2,
                "banned": false
            },
            {
                "tournamentStatus": "ACCEPTED",
                "game": "Heroes",
                "maxPlayers": 8,
                "freeSlots": 6,
                "province": "śląskie",
                "city": "Katowice",
                "name": "Tournament5",
                "dateOfStart": 1494674640000,
                "playersNumber": 2,
                "banned": false
            },
            {
                "tournamentStatus": "FINISHED",
                "game": "Lord of the rings",
                "maxPlayers": 6,
                "freeSlots": 4,
                "province": "zachodiopomorskie",
                "city": "Szczecin",
                "name": "Tournament6",
                "dateOfStart": 1541931180000,
                "playersNumber": 2,
                "banned": true
            },
            {
                "tournamentStatus": "ACCEPTED",
                "game": "Warhammer",
                "maxPlayers": 4,
                "freeSlots": 2,
                "province": "wielkopolskie",
                "city": "Poznań",
                "name": "Tournament7",
                "dateOfStart": 1512126360000,
                "playersNumber": 2,
                "banned": false
            },
            {
                "tournamentStatus": "FINISHED",
                "game": "Star wars",
                "maxPlayers": 20,
                "freeSlots": 18,
                "province": "opolskie",
                "city": "Opole",
                "name": "Tournament8",
                "dateOfStart": 1527898320000,
                "playersNumber": 2,
                "banned": false
            },
            {
                "tournamentStatus": "ACCEPTED",
                "game": "Warhammer 40k",
                "maxPlayers": 8,
                "freeSlots": 6,
                "province": "łódzkie",
                "city": "Łódź",
                "name": "Tournament9",
                "dateOfStart": 1499966220000,
                "playersNumber": 2,
                "banned": false
            }
        ],
        "last": true,
        "totalElements": 10,
        "totalPages": 1,
        "size": 10,
        "number": 0,
        "sort": [
            {
                "direction": "ASC",
                "property": "name",
                "ignoreCase": false,
                "nullHandling": "NATIVE",
                "ascending": true,
                "descending": false
            }
        ],
        "numberOfElements": 10,
        "first": true
    }
