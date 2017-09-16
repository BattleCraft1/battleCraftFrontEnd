import { ActionCreators } from '../../redux/actions';

import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import CollectionList from './table/content/CollectionList';
import PagePanel from './pagePanel/PagePanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {serverName} from '../../main/consts/server'
import {noServerContex} from '../../main/consts/noServerContex'

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
                console.log()
                this.props.showNetworkErrorMessageBox(error);
            });
    }

    render(){
        return (
            <div className={css(resp.container)}>
                <div className="row">
                    <CollectionList getPageRequest={this.getPageRequest.bind(this)}
                                    collectionType={this.state.collectionType}/>
                    {/*<SearchForm collectionType={this.state.collectionType}
                                getPageRequest={this.getPageRequest.bind(this)} />*/}
                    <PagePanel getPageRequest={this.getPageRequest.bind(this)}
                               collectionType={this.props.match.params.collectionType}/>
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
