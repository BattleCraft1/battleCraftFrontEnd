import { ActionCreators } from '../../redux/actions';

import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import TournamentsList from './table/tournaments/CollectionList';
import TournamentsSearchForm from './searchPanel/tournaments/SearchPanel';
import PagePanel from './pagePanel/PagePanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {serverName} from '../../main/consts/server'

import axios from 'axios';

class CollectionPanel extends React.Component{
    componentDidMount() {
        this.getPageRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.collectionType!==undefined &&
            nextProps.match.params.collectionType !== this.props.match.params.collectionType) {
            this.getPageRequest();
        }
    }

    getPageRequest(){
        axios.post(serverName+`page/`+this.props.match.params.collectionType,this.props.pageRequest)
            .then(res => {
                this.props.setPage(res.data);
            })
            .catch(error => {
                this.props.showMessageBox({
                    isShown: true,
                    messageText: error.response.data,
                    messageType: "alert-danger"
                });
            });
    }

    render(){
        let collectionList;
        let collectionSearchPanel;
        if(this.props.match.params.collectionType==='tournaments'){
            collectionList=<TournamentsList getPageRequest={this.getPageRequest.bind(this)}
                                            collectionType={this.props.match.params.collectionType}/>;
            collectionSearchPanel=<TournamentsSearchForm getPageRequest={this.getPageRequest.bind(this)} />;
        }


        return (
            <div className={css(resp.container)}>
                <div className="row">
                        {collectionSearchPanel}
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

})

const MyContext = {
    "content": [
        {
            "game": "Warhammer",
            "maxPlayers": 6,
            "freeSlots": 4,
            "province": "lubelskie",
            "city": "Lublin",
            "name": "Tournament1",
            "dateOfStart": 1483877100000,
            "playersNumber": 2,
            "active": true,
            "accepted": true,
            "banned": true
        },
        {
            "game": "Cyber punk",
            "maxPlayers": 6,
            "freeSlots": 4,
            "province": "podlaskie",
            "city": "Białystok",
            "name": "Tournament10",
            "dateOfStart": 1535299500000,
            "playersNumber": 2,
            "active": false,
            "accepted": true,
            "banned": false
        },
        {
            "game": "Star wars",
            "maxPlayers": 8,
            "freeSlots": 6,
            "province": "lubelskie",
            "city": "Zamość",
            "name": "Tournament2",
            "dateOfStart": 1518181860000,
            "playersNumber": 2,
            "active": false,
            "accepted": true,
            "banned": false
        },
        {
            "game": "Warhammer 40k",
            "maxPlayers": 6,
            "freeSlots": 4,
            "province": "dolnośląskie",
            "city": "Wrocław",
            "name": "Tournament3",
            "dateOfStart": 1489328100000,
            "playersNumber": 2,
            "active": true,
            "accepted": true,
            "banned": false
        },
        {
            "game": "Cyber punk",
            "maxPlayers": 10,
            "freeSlots": 8,
            "province": "małopolskie",
            "city": "Kraków",
            "name": "Tournament4",
            "dateOfStart": 1524666300000,
            "playersNumber": 2,
            "active": true,
            "accepted": false,
            "banned": false
        },
        {
            "game": "Heroes",
            "maxPlayers": 8,
            "freeSlots": 6,
            "province": "śląskie",
            "city": "Katowice",
            "name": "Tournament5",
            "dateOfStart": 1494667440000,
            "playersNumber": 2,
            "active": true,
            "accepted": true,
            "banned": false
        },
        {
            "game": "Lord of the rings",
            "maxPlayers": 6,
            "freeSlots": 4,
            "province": "zachodiopomorskie",
            "city": "Szczecin",
            "name": "Tournament6",
            "dateOfStart": 1541927580000,
            "playersNumber": 2,
            "active": false,
            "accepted": false,
            "banned": false
        },
        {
            "game": "Warhammer",
            "maxPlayers": 4,
            "freeSlots": 2,
            "province": "wielkopolskie",
            "city": "Poznań",
            "name": "Tournament7",
            "dateOfStart": 1512122760000,
            "playersNumber": 2,
            "active": true,
            "accepted": true,
            "banned": true
        },
        {
            "game": "Star wars",
            "maxPlayers": 20,
            "freeSlots": 18,
            "province": "opolskie",
            "city": "Opole",
            "name": "Tournament8",
            "dateOfStart": 1527934320000,
            "playersNumber": 2,
            "active": false,
            "accepted": false,
            "banned": false
        },
        {
            "game": "Warhammer 40k",
            "maxPlayers": 8,
            "freeSlots": 6,
            "province": "łódzkie",
            "city": "Łódź",
            "name": "Tournament9",
            "dateOfStart": 1499959020000,
            "playersNumber": 2,
            "active": true,
            "accepted": true,
            "banned": false
        }
    ],
    "totalPages": 1,
    "totalElements": 10,
    "last": true,
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
    "first": true,
    "numberOfElements": 10
}
