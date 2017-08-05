import axios from 'axios';
import React from 'react';

import TournamentsList from './table/tournaments/CollectionList';
import TournamentsSearchForm from './searchPanel/tournaments/SearchPanel';
import PagePanel from './pagePanel/PagePanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../redux/actions';

import {serverName} from '../../consts/server'


class CollectionPanel extends React.Component{
    componentDidMount() {
        this.getPageRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.collectionType !== this.props.match.params.collectionType) {
            this.getPageRequest();
        }
    }

    getPageRequest(){
        axios.post(serverName+`page/`+this.props.match.params.collectionType,this.props.pageRequest)
            .then(res => {
                console.log(res.data);
                this.props.setPage(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        let collectionList;
        let collectionSearchPanel;
        if(this.props.match.params.collectionType==='tournaments'){
            collectionList=<TournamentsList getPageRequest={this.getPageRequest.bind(this)} collectionType={this.props.match.params.collectionType}/>;
            collectionSearchPanel=<TournamentsSearchForm getPageRequest={this.getPageRequest.bind(this)} />;
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1 col-md-2 col-lg-2">
                    </div>
                    <div className="col-sm-10 col-md-8 col-lg-8">
                        {collectionSearchPanel}
                        {collectionList}
                        <PagePanel getPageRequest={this.getPageRequest.bind(this)} collectionType={this.props.match.params.collectionType}/>
                    </div>
                    <div className="col-sm-1 col-md-2 col-lg-2">
                    </div>
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
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionPanel );
