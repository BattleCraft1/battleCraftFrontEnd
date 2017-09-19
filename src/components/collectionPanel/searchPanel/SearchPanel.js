import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersFormInputs from './users/FormInputs'
import TournamentsFormInputs from './users/FormInputs'

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

    componentDidMount(){
        this.getEnums();
    }

    getEnums(){
        axios.get(serverName+`get/`+this.props.collectionType+`/enums`)
            .then(res => {
                this.setState({enums:res.data});
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    search(inputs){

    }


    render(){
        let searchFormInputsType;
        if(this.props.collectionType==="tournaments"){
            searchFormInputsType = TournamentsFormInputs;
        }
        else if(this.props.collectionType==="users"){
            searchFormInputsType = UsersFormInputs;
        }
        let searchForInputs =
            React.createElement(
                searchFormInputsType,
                {
                    enums:this.state.enums,
                    search:this.search.bind(this)
                },
                null
            );
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