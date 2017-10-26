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
import {pageRequest} from "../../redux/reducers/pageRequest";

class CollectionPanel extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            collectionType:""
        }
    }

    async componentDidMount() {
        this.setPossibleOperations(this.props.match.params.collectionType);
        await this.setState({collectionType: this.props.match.params.collectionType});
        this.createPageRequest(this.state.collectionType);
        await this.getPage(this.state.collectionType,this.props.pageRequest);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.entityPanel.hidden === true &&
            this.props.entityPanel.hidden === false) {
            console.log("entity panel hidden");
            await this.setState({collectionType: nextProps.match.params.collectionType});
            await this.getPage(this.state.collectionType,nextProps.pageRequest);
        }
        else if (nextProps.match.params.collectionType !== this.state.collectionType ||
            (nextProps.entityPanel.mode === 'disabled' &&
                this.props.entityPanel.mode !== 'disabled')) {
            console.log("change collection type or disable entity panel");
            this.createPageRequest(nextProps.match.params.collectionType);
            this.setPossibleOperations(nextProps.match.params.collectionType);
            await this.setState({collectionType: nextProps.match.params.collectionType});
            await this.getPage(this.state.collectionType,nextProps.pageRequest);
        }
        else if(JSON.stringify(nextProps.pageRequest)!==JSON.stringify(this.props.pageRequest)){
            console.log("change page request");
            await this.getPage(this.state.collectionType,nextProps.pageRequest);
        }
    }

    createPageRequest(collectionType){
        if(collectionType==='ranking') {
            this.props.setSearchCriteria(
                [
                    {
                        "keys": ["tour", "tournament", "game","name"],
                        "operation":":",
                        "value":["Warhammer"]
                    }
                ]
            );
            this.props.setPageRequest(10,0, "DESC","points");
        }
        else {
            this.props.setSearchCriteria([]);
            this.props.setPageRequest(10,0, "ASC","name");
        }
    }

    setPossibleOperations(collectionType){
        this.props.setOperations(possibleOperationsForCollections[collectionType])
    }

    async getPage(collectionType,pageRequest){
        await axios.post(serverName+`page/`+collectionType,pageRequest)
            .then(res => {
                console.log(res.data);
                this.props.setPageAndCheckPreviouslyCheckedElements(res.data);
                this.props.setPageRequestSizeAndNumber(this.props.page.numberOfElements,this.props.page.number);
            })
            .catch(error => {
                this.props.setEmptyPage();
                this.props.setPageRequestSizeAndNumber(0,0);
                this.props.showNetworkErrorMessage(error);
            });
    }

    render(){
        let searchPanel = "loading...";
        if(this.state.collectionType!=="")
            searchPanel = React.createElement(
                SearchPanel,
                {
                    collectionType:this.state.collectionType
                },
                null
            );
        return (
            <div className={css(resp.container)}>
                <div className="row">
                    {searchPanel}
                    <CollectionList collectionType={this.state.collectionType}/>
                    <PagePanel collectionType={this.state.collectionType}/>
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
        message: state.message,
        entityPanel: state.entityPanel,
        possibleOperations: state.possibleOperations
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
