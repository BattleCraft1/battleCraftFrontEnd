import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersFormInputs from './users/FormInputs'
import TournamentsFormInputs from './tournaments/FormInputs'
import GamesFormInputs from './games/FormInputs'
import isNotEmpty from './../../../main/functions/checkIfObjectIsNotEmpty'

import { ActionCreators } from '../../../redux/actions/index';

import {serverName} from '../../../main/consts/server';

import axios from 'axios';

class SearchPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            enums:{}
        };
    }

    async componentDidMount(){
        await this.getEnums();
    }

    async getEnums(){
        await axios.get(serverName+`get/`+this.props.collectionType+`/enums`)
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
            if(isNotEmpty(inputs[inputName]))
                pageRequest.searchCriteria.push(
                    inputs[inputName]
                )
        }
        pageRequest.pageRequest.size = 10;
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest(this.props.collectionType);
    }


    render(){
        let searchForInputs = "loading...";
        if(isNotEmpty(this.state.enums))
        if(this.props.collectionType==="tournaments"){
            searchForInputs = React.createElement(
                TournamentsFormInputs,
                {
                    enums:this.state.enums,
                    search:this.search.bind(this)
                },
                null
            );
        }
        else if(this.props.collectionType==="users"){
            searchForInputs = React.createElement(
                UsersFormInputs,
                {
                    enums:this.state.enums,
                    search:this.search.bind(this)
                },
                null
            );
        }
        else if(this.props.collectionType==="games"){
            searchForInputs = React.createElement(
                GamesFormInputs,
                {
                    enums:this.state.enums,
                    search:this.search.bind(this)
                },
                null
            );
        }

        return(
            <div className="row">
                <form>
                    {searchForInputs}
                </form>
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
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPanel );