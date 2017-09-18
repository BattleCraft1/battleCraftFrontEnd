import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

let uniqueNameProperty;

class AcceptOperation extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.collectionType === 'tournaments'){
            uniqueNameProperty = 'name'
        }
        else if(this.props.collectionType === 'users'){
            uniqueNameProperty = 'username'
        }
    }

    getFailureMessage(elementsWhichCannotBeAccept){
        return "Elements " +
            elementsWhichCannotBeAccept.map(function(element){return element[uniqueNameProperty]}).join(", ")+
            " are not accepted because you can accept only new elements and not banned"
    }

    getSuccessMessage(elementsToAccept){
        return "Elements "+elementsToAccept.map(function(element){return element[uniqueNameProperty]}).join(", ")+" are accepted";
    }

    acceptElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToAccept = checkedElements.filter(element =>
            element.status==="NEW" && element.banned===false);
        let elementsWhichCannotBeAccept = checkedElements.filter(element => element.status!=="NEW");

        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(elementsToAccept.length>0) {
            let uniqueElementsToBanNames = elementsToAccept.map(function(item) {
                return item[uniqueNameProperty];
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`accept/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        if(elementsWhichCannotBeAccept.length>0)
                            showFailureMessage(
                                {
                                    messageText: getFailureMessage(elementsWhichCannotBeAccept)
                                }
                            );
                        else
                            showSuccessMessage(
                                {
                                    messageText: getSuccessMessage(elementsWhichCannotBeAccept)
                                }
                            );
                    })
                    .catch(error => {
                        showNetworkErrorMessage(error);
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Accept checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage(
                {
                    messageText: "Nothing to accept. Only new elements can be accepted."
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "Accept"
                icon = {icons.checkHeavyWhite}
                operation = {this.acceptElements.bind(this)}
            />
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
        confirmation: state.confirmation,
        message: state.message,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AcceptOperation );