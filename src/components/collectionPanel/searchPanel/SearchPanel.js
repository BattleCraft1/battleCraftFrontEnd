import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions/index';

import isNotEmpty from './../../../main/functions/checkIfObjectIsNotEmpty'

import UsersFormInputs from './users/FormInputs'
import TournamentsFormInputs from './tournaments/FormInputs'
import RankingFormInputs from './ranking/FormInputs'
import GamesFormInputs from './games/FormInputs'

import {resp, styles} from './styles'
import {css} from 'aphrodite';

const searchFormInputsTypeMap = {
    "tournaments":TournamentsFormInputs,
    "users": UsersFormInputs,
    "games":GamesFormInputs,
    "ranking":RankingFormInputs
};

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

    componentDidMount(){
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
            pageRequest.searchCriteria.concat(this.props.entityPanel.relatedEntity.relatedEntityCriteria);
        }
        pageRequest.pageRequest.page = 0;
        pageRequest.pageRequest.size = 10;
        this.props.setPageRequest(pageRequest);
        this.props.getPage(this.props.collectionType);
        this.hideSearchPanel();
    }

    hideSearchPanel(){
        this.props.showSearchPanel(false);
    }

    setSearchPanelRef(node) {
        this.searchPanelRef = node;
    }

    createSearchFormInputs(){
        return React.createElement(
            searchFormInputsTypeMap[this.props.collectionType],
            {
                search:this.search.bind(this),
                hide:this.hideSearchPanel.bind(this),
                entityPanelDisabled: this.props.entityPanel.mode === 'disabled'
            },
            null
        );
    }

    render(){
        let searchFormInputs = this.createSearchFormInputs();

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
        pageRequest: state.pageRequest,
        search: state.search,
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPanel );
