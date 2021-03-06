import React from 'react';

import {StyleSheet, css} from 'aphrodite';

import TableOfEntities from './table/content/TableOfEntities';
import PagePanel from './pagePanel/PagePanel';
import SearchPanel from './searchPanel/SearchPanel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

import {serverName} from '../../main/consts/server'

import possibleOperationsForCollections from "../../main/functions/possibleOperationsForCollections";

import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies('auth');

class CollectionPanel extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            collectionType:""
        }
    }

    async componentDidMount() {
        let collectionType = this.props.match.params.collectionType;
        if(cookies.get('token')!==undefined && cookies.get('role')!==undefined && cookies.get('username')!==undefined){
            await this.props.setTokenAndRole(cookies.get('token'),cookies.get('role'),cookies.get('username'));
        }
        this.setPossibleOperations(collectionType,this.props.security.role);
        this.createPageRequest(collectionType);
        await this.setState({collectionType: collectionType});
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.entityPanel.hidden === true &&
            this.props.entityPanel.hidden === false &&
            nextProps.entityPanel.mode !== 'disabled') {
            let collectionType = nextProps.match.params.collectionType;
            await this.setState({collectionType: collectionType});
            this.createPageRequestForEntityPanel(nextProps.entityPanel.relatedEntity.relatedEntityCriteria);
            this.setElementsToCheckForEntityPanel(nextProps.entityPanel.relatedEntity.relatedEntities);
            await this.getPage(this.state.collectionType);
        }
        else if (nextProps.match.params.collectionType !== this.state.collectionType ||
            (nextProps.entityPanel.hidden === false &&
                this.props.entityPanel.hidden === true &&
                this.props.entityPanel.mode !== 'disabled') ||
            nextProps.security.role !== this.props.security.role) {
            let collectionType = nextProps.match.params.collectionType;
            this.createPageRequest(collectionType);
            console.log(nextProps.security.role);
            console.log(this.props.security.role);
            this.setPossibleOperations(collectionType,nextProps.security.role);
            await this.setState({collectionType: collectionType});
            await this.getPage(this.state.collectionType);
        }
    }

    setElementsToCheckForEntityPanel(relatedEntities){
        if(this.props.entityPanel.relatedEntity.relatedEntityType==="participatedTournaments"){
            let relatedEntitiesNames = relatedEntities.map(
                relatedEntity => relatedEntity.name
            );
            this.props.setElementsToCheck(relatedEntitiesNames);
        }
        else{
            this.props.setElementsToCheck(relatedEntities);
        }
    }

    createPageRequestForEntityPanel(relatedEntityCriteria){
        this.props.setPageRequest({
            searchCriteria:relatedEntityCriteria,
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
                    "keys": ["turn", "tournament", "game","name"],
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

    setPossibleOperations(collectionType,role){
        this.props.setOperations(possibleOperationsForCollections(collectionType,role))
    }

    async getPage(collectionType){
        console.log("page request:");
        console.log(this.props.pageRequest);
        this.props.startLoading("Fetching page of data...");
        await axios.post(serverName+`page/`+collectionType,this.props.pageRequest,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                console.log("page of data:");
                console.log(res.data);
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
                this.props.stopLoading();
            })
            .catch(error => {
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
                this.props.stopLoading();
                this.props.showNetworkErrorMessage(error);
            });
    }

    render(){
        let searchPanel = <div/>;
        if(this.state.collectionType!=="")
            searchPanel = React.createElement(
                SearchPanel,
                {
                    collectionType:this.state.collectionType,
                    getPage:this.getPage.bind(this)
                },
                null
            );
        return (
            <div className={css(resp.container)}>
                <div className="row">
                    {searchPanel}
                    <TableOfEntities getPage={this.getPage.bind(this)}
                                     collectionType={this.state.collectionType}/>
                    <PagePanel getPage={this.getPage.bind(this)}
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
        entityPanel: state.entityPanel,
        possibleOperations: state.possibleOperations,
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionPanel );


const resp = StyleSheet.create({
    container:{
        display:'block',
        position:'relative',
        clear:'left',
        width:'90%',
        marginLeft:'5%',
        zIndex:'1',
        '@media (max-width: 600px)': {
            width:'100%',
            margin:'0',
        },
    },

});
