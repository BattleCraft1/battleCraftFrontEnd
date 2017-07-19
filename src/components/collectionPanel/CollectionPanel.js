import axios from 'axios';
import React from 'react';

import CollectionList from './table/CollectionList';
import PagePanel from './pagePanel/PagePanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../redux/actions';


class CollectionPanel extends React.Component{
    componentDidMount() {
        this.getConfigRequest();
        this.getPageRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.collectionType !== this.props.match.params.collectionType) {
            this.getConfigRequest();
            this.getPageRequest();
        }
    }

    getConfigRequest(){
        axios.get(`http://localhost:8080/config/`+this.props.match.params.collectionType)
            .then(res => {
                console.log(res.data);
                this.props.setConfig(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getPageRequest(){
        axios.post(`http://localhost:8080/page/`+this.props.match.params.collectionType,this.props.pageRequest)
            .then(res => {
                console.log(res.data);
                this.props.setPage(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1 col-md-2 col-lg-2">
                    </div>
                    <div className="col-sm-10 col-md-8 col-lg-8">
                        <CollectionList getPageRequest={this.getPageRequest.bind(this)} collectionType={this.props.match.params.collectionType}/>
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
        config: state.config,
        pageRequest: state.pageRequest,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionPanel );
