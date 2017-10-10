import { ActionCreators } from '../../redux/actions';

import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import CollectionList from './table/content/CollectionList';
import PagePanel from './pagePanel/PagePanel';
import SearchPanel from './searchPanel/SearchPanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {serverName} from '../../main/consts/server'
import {noServerContext} from '../../main/consts/noServerContext'

import axios from 'axios';

class CollectionPanel extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            collectionType:"tournaments"
        }
    }

    async componentDidMount() {
        if(this.props.match.params.collectionType==='ranking'){
            let pageRequest = this.props.pageRequest;
            pageRequest.pageRequest.direction = "DESC";
            pageRequest.pageRequest.property = "points";
            this.props.setPageRequest(pageRequest);
        }
        this.setState({collectionType: this.props.match.params.collectionType});
        await this.getPageRequest(this.props.match.params.collectionType);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.collectionType !== undefined &&
            nextProps.match.params.collectionType !== this.props.match.params.collectionType) {

            this.setState({collectionType: nextProps.match.params.collectionType});

            let pageRequest = this.props.pageRequest;
            pageRequest.pageRequest.page = 0;
            pageRequest.pageRequest.size = 10;
            if(nextProps.match.params.collectionType==='ranking'){
                pageRequest.pageRequest.direction = "DESC";
                pageRequest.pageRequest.property = "points";
            }
            else{
                pageRequest.pageRequest.direction = "ASC";
                pageRequest.pageRequest.property = "name";
            }
            pageRequest.searchCriteria = [];
            this.props.setPageRequest(pageRequest);
            await this.getPageRequest(nextProps.match.params.collectionType);
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
                this.props.showNetworkErrorMessage(error);
            });
    }

    render(){
        let searchPanel = "loading...";
        if(this.state.collectionType!=="")
            searchPanel = React.createElement(
                SearchPanel,
                {
                    collectionType:this.state.collectionType,
                    getPageRequest:this.getPageRequest.bind(this)
                },
                null
            );
        return (
            <div className={css(resp.container)}>
                <div className="row">
                    {searchPanel}
                    <CollectionList getPageRequest={this.getPageRequest.bind(this)}
                                    collectionType={this.state.collectionType}/>
                    <PagePanel getPageRequest={this.getPageRequest.bind(this)}
                               collectionType={this.state.collectionType}/>
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
    width:'90%',
    marginLeft:'5%',
    zIndex:'1',
    '@media (max-width: 600px)': {
      width:'100%',
      margin:'0',
    },
  },

});
