import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

let acceptedCollectionStatus;
let uniqueNameProperty;

class CancelAcceptOperation extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.collectionType === 'tournaments' || this.props.collectionType === 'games'){
            acceptedCollectionStatus = 'ACCEPTED';
            uniqueNameProperty = 'name'
        }
        else if(this.props.collectionType === 'users'){
            acceptedCollectionStatus = 'PLAYER';
            uniqueNameProperty = 'username'
        }
    }

    getSuccessMessage(elementsToCancelAccept){
        return "Acceptations for "+elementsToCancelAccept.map(function(element){return element[uniqueNameProperty]}).join(", ")+" are canceled";
    }

    getFailureMessage(elementsWithFailedCancellation){
        return "Elements "+elementsWithFailedCancellation
                .map(function(element){return element[uniqueNameProperty]}).join(", ")+" are still accepted " +
            "because you can cancel acceptation only for accepted and not banned elements"
    }

    cancelAcceptElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToCancelAccept = checkedElements.filter(element =>
            element.status===acceptedCollectionStatus  && element.banned===false);
        let elementsWithFailedCancellation = checkedElements.filter(element => element.status!==acceptedCollectionStatus);

        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(elementsToCancelAccept.length>0) {
            let uniqueElementsToBanNames = elementsToCancelAccept.map(function(item) {
                return item[uniqueNameProperty];
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`cancel/accept/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        if(elementsWithFailedCancellation.length>0)
                            showFailureMessage(
                                {
                                    messageText: getFailureMessage(elementsWithFailedCancellation)
                                }
                            );
                        else
                            showSuccessMessage(
                                {
                                    messageText: getSuccessMessage(elementsToCancelAccept)
                                }
                            );
                    })
                    .catch(error => {
                        showNetworkErrorMessage(error);
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Cancel acceptations of checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage(
                {
                    messageText: "Nothing to cancel acceptation. You can cancel acceptation only for accepted and not banned elements."
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "No accept"
                icon = {icons.noEntry}
                operation = {this.cancelAcceptElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( CancelAcceptOperation );