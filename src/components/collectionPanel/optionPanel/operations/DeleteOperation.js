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

    deleteElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToDelete = checkedElements.filter(element => element.banned===true);
        let elementsWhichCannotBeDeleted = checkedElements.filter(element => !element.banned);
        this.props.checkAllElements(false);

        let showMessage = this.props.showMessageBox;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessageBox = this.props.showNetworkErrorMessageBox;

        if(elementsToDelete.length>0) {
            let uniqueElementsToBanNames = elementsToDelete.map(function(item) {
                return item['name'];
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
                            showMessage(
                                {
                                    messageText: "Elements "+elementsWhichCannotBeDeleted
                                        .map(function(element){return element.name}).join(", ")+" are not deleted " +
                                    "because if you want delete element you must ban it firstly",
                                    messageType: "alert-danger"
                                }
                            );
                        else
                            showMessage(
                                {
                                    messageText: "Elements "+elementsToDelete.map(function(element){return element.name}).join(", ")+" are deleted",
                                    messageType: "alert-success"
                                }
                            );
                    })
                    .catch(error => {
                        showNetworkErrorMessageBox(error);
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Delete checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showMessage(
                {
                    messageText: "Nothing to delete",
                    messageType: "alert-danger"
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