import React from 'react';

import TournamentsList from './table/tournaments/CollectionList';
import TournamentsSearchForm from './searchPanel/tournaments/SearchPanel';
import PagePanel from './pagePanel/PagePanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../redux/actions';

import {serverName} from '../../consts/server'

import $ from 'jquery';

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
        $.ajax({
            url: serverName+`page/`+this.props.match.params.collectionType,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            success: (function(data) {
                this.props.setPage(data);
            }).bind(this),
            error: (function (xhr, ajaxOptions, thrownError) {
                this.props.showMessageBox({
                    isShown: true,
                    messageText: xhr.responseText,
                    messageType: "alert-danger"
                });
            }).bind(this),
            data:JSON.stringify(this.props.pageRequest)
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
            <div>
                {collectionSearchPanel}
                {collectionList}
                <PagePanel getPageRequest={this.getPageRequest.bind(this)} collectionType={this.props.match.params.collectionType}/>
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
