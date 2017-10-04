import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');


class DeleteOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getSuccessMessage(elementsToDelete){
        return "Elements "+elementsToDelete.map(function(element){return element.name}).join(", ")+" are deleted";
    }

    getFailureMessage(elementsWhichCannotBeDeleted){
        return "Elements "+elementsWhichCannotBeDeleted
                .map(function(element){return element.name}).join(", ")+" are not deleted " +
            "because if you want delete element you must ban it firstly"
    }

    deleteElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToDelete = checkedElements.filter(element => element.banned===true || (element.hasOwnProperty('firstname') && element.status ==="NEW"));
        let elementsWhichCannotBeDeleted = checkedElements.filter(element => !element.banned && (!element.hasOwnProperty('firstname') || element.status !=="NEW"));
        this.props.checkAllElements(false);

        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(elementsToDelete.length>0) {
            let uniqueElementsToBanNames = elementsToDelete.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`delete/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        if(elementsWhichCannotBeDeleted.length>0)
                            showFailureMessage(
                                {
                                    messageText: getFailureMessage(elementsWhichCannotBeDeleted)
                                }
                            );
                        else
                            showSuccessMessage(
                                {
                                    messageText: getSuccessMessage(elementsToDelete)
                                }
                            );
                    })
                    .catch(error => {
                        showNetworkErrorMessage(error);
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Delete checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage(
                {
                    messageText: "Nothing to delete. You can delete only banned elements."
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "Delete"
                icon = {icons.warning}
                operation = {this.deleteElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( DeleteOperation );