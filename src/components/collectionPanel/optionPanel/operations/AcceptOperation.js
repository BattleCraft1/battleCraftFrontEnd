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

    acceptElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToAccept = checkedElements.filter(element =>
            element.tournamentStatus==="NEW" && element.banned===false);
        let elementsWhichCannotBeAccept = checkedElements.filter(element => element.tournamentStatus!=="NEW");

        let showMessage = this.props.showMessageBox;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessageBox = this.props.showNetworkErrorMessageBox;

        if(elementsToAccept.length>0) {
            let uniqueElementsToBanNames = elementsToAccept.map(function(item) {
                return item['name'];
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
                            showMessage(
                                {
                                    messageText: "Elements "+elementsWhichCannotBeAccept
                                        .map(function(element){return element.name}).join(", ")+" are not accepted " +
                                    "because you can accept only new elements and not banned",
                                    messageType: "alert-danger"
                                }
                            );
                        else
                            showMessage(
                                {
                                    messageText: "Elements "+elementsToAccept.map(function(element){return element.name}).join(", ")+" are accepted",
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
                    header:"Accept checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showMessage(
                {
                    messageText: "Nothing to cancel accept",
                    messageType: "alert-danger"
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "Unlock"
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

export default connect( mapStateToProps, mapDispatchToProps )( DeleteOperation );