import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions/index';

import isNotEmpty from './../../../main/functions/checkIfObjectIsNotEmpty'

import UsersFormInputs from './users/FormInputs'
import TournamentsFormInputs from './tournaments/FormInputs'
import RankingFormInputs from './ranking/FormInputs'
import GamesFormInputs from './games/FormInputs'

import {serverName} from '../../../main/consts/server';
import axios from 'axios';

import {resp, styles} from './styles'
import {css} from 'aphrodite';


class SearchPanel extends React.Component{
    constructor(props) {
        super(props);
        this.setSearchPanelRef = this.setSearchPanelRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            display:'block',
            enums:{}
        };

    }

    async componentDidMount(){
        await this.getEnums(this.props.collectionType);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.searchPanelRef && !this.searchPanelRef.contains(event.target)) {
            this.hideSearchPanel();
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.collectionType!==undefined && nextProps.collectionType !== this.props.collectionType) {
            await this.getEnums(nextProps.collectionType);
        }
    }

    async getEnums(collectionType){
        await axios.get(serverName+`get/`+collectionType+`/enums`)
            .then(res => {
                this.setState({enums:res.data});
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    search(inputs){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];
        for(let inputName in inputs){
            if(!isNotEmpty(inputs[inputName]))
                pageRequest.searchCriteria.push(
                    inputs[inputName]
                )
        }
        if(this.props.entityPanel.mode !== 'disabled'){
            pageRequest.searchCriteria.push({
                "keys": ["status"],
                "operation": ":",
                "value": this.props.entityPanel.relatedEntity.relatedEntityType
            });
        }
        pageRequest.pageRequest.page = 0;
        pageRequest.pageRequest.size = 10;
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest(this.props.collectionType);
        this.hideSearchPanel();
    }

    hideSearchPanel(){
        this.props.showSearchPanel(false);
    }

    setSearchPanelRef(node) {
        this.searchPanelRef = node;
    }

    render(){
        let searchFormInputs = "loading...";
        if(!isNotEmpty(this.state.enums))
            if(this.props.collectionType==="tournaments"){
                searchFormInputs = React.createElement(
                    TournamentsFormInputs,
                    {
                        enums:this.state.enums,
                        search:this.search.bind(this),
                        hide:this.hideSearchPanel.bind(this)
                    },
                    null
                );
            }
            else if(this.props.collectionType==="users"){
                searchFormInputs = React.createElement(
                    UsersFormInputs,
                    {
                        entityPanelDisabled: this.props.entityPanel.mode === 'disabled',
                        enums:this.state.enums,
                        search:this.search.bind(this),
                        hide:this.hideSearchPanel.bind(this)
                    },
                    null
                );
            }
            else if(this.props.collectionType==="games"){
                searchFormInputs = React.createElement(
                    GamesFormInputs,
                    {
                        enums:this.state.enums,
                        search:this.search.bind(this),
                        hide:this.hideSearchPanel.bind(this)
                    },
                    null
                );
            }
            else if(this.props.collectionType==="ranking"){
                searchFormInputs = React.createElement(
                    RankingFormInputs,
                    {
                        enums:this.state.enums,
                        search:this.search.bind(this),
                        hide:this.hideSearchPanel.bind(this)
                    },
                    null
                );
            }
        let searchPanel = <div style = {Object.assign({}, styles.background, {display: 'block'})}>
            <div ref={this.setSearchPanelRef} style = {Object.assign({},styles.goldAndBrownTheme ,styles.popupContent, {display:this.state.display})} className={css(resp.popupContent)}>
                <form>
                    {searchFormInputs}
                </form>
            </div>
        </div>;
        return(
            <div>
                {this.props.search && searchPanel}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        search: state.search,
        message: state.message,
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPanel );
