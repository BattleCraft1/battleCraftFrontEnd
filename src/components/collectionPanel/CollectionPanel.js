import React from 'react';

import {StyleSheet, css} from 'aphrodite';

import CollectionList from './table/content/CollectionList';
import PagePanel from './pagePanel/PagePanel';
import SearchPanel from './searchPanel/SearchPanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

import {serverName} from '../../main/consts/server'

import {possibleOperationsForCollections} from "../../main/consts/possibleOperationsForCollections";

import axios from 'axios';

class CollectionPanel extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            collectionType:""
        }
    }

    async componentDidMount() {
        this.setPossibleOperations(this.props.match.params.collectionType);
        await this.getPageRequest(this.props.match.params.collectionType);
        await this.setState({collectionType: this.props.match.params.collectionType});
        this.createPageRequest(this.state.collectionType);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.entityPanel.hidden === true &&
            this.props.entityPanel.hidden === false) {
            await this.setState({collectionType: nextProps.match.params.collectionType});
            this.createPageRequestForEntityPanel(nextProps.entityPanel.relatedEntity.relatedEntityCriteria);
            await this.getPageRequest(this.state.collectionType);
            this.props.checkElements(nextProps.entityPanel.relatedEntity.relatedEntityNames,true)
        }
        else if (nextProps.match.params.collectionType !== this.state.collectionType ||
            (nextProps.entityPanel.mode === 'disabled' &&
                this.props.entityPanel.mode !== 'disabled')) {
            this.createPageRequest(nextProps.match.params.collectionType);
            this.setPossibleOperations(nextProps.match.params.collectionType);
            await this.setState({collectionType: nextProps.match.params.collectionType});
            await this.getPageRequest(this.state.collectionType);
        }
    }

    createPageRequestForEntityPanel(relatedEntityCriteria){
        this.props.setPageRequest({
            searchCriteria:[{
                "keys": ["status"],
                "operation": ":",
                "value": relatedEntityCriteria
            }],
            pageRequest:{
                direction : "ASC",
                property : "name",
                size : 10,
                page : 0
            }
        });
    }

    createPageRequest(collectionType){
        if(collectionType==='ranking') {
            this.props.setPageRequest({
                searchCriteria:[{
                        "keys": ["tour", "tournament", "game","name"],
                        "operation":":",
                        "value":["Warhammer"]
                    }],
                pageRequest:{
                    direction : "DESC",
                    property : "points",
                    size : 10,
                    page : 0
                }
            });
        }
        else {
            this.props.setPageRequest({
                searchCriteria:[],
                pageRequest:{
                    direction : "ASC",
                    property : "name",
                    size : 10,
                    page : 0
                }
            });
        }
    }

    setPossibleOperations(collectionType){
        this.props.setOperations(possibleOperationsForCollections[collectionType])
    }

    async getPageRequest(collectionType){
        console.log(this.props.pageRequest);
        await axios.post(serverName+`page/`+collectionType,this.props.pageRequest)
            .then(res => {
                this.props.checkPreviouslyCheckedElements(res.data);
                this.props.setPageRequest({
                    searchCriteria:this.props.pageRequest.searchCriteria,
                    pageRequest:{
                        direction : this.props.pageRequest.pageRequest.direction,
                        property : this.props.pageRequest.pageRequest.property,
                        size : this.props.page.numberOfElements,
                        page : this.props.page.number
                    }
                });
            })
            .catch(error => {
                if(this.props.entityPanel.mode !== 'disabled')
                {
                    this.props.setEmptyPage();
                    this.props.setPageRequest({
                        searchCriteria:this.props.pageRequest.searchCriteria,
                        pageRequest:{
                            direction : this.props.pageRequest.pageRequest.direction,
                            property : this.props.pageRequest.pageRequest.property,
                            size : 0,
                            page : 0
                        }
                    });
                }
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
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        entityPanel: state.entityPanel
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
