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

    cancelAcceptElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToCancelAccept = checkedElements.filter(element =>
            element.tournamentStatus==="ACCEPTED"  && element.banned===false);
        let elementsWithFailedCancellation = checkedElements.filter(element => element.tournamentStatus!=="ACCEPTED");

        let showMessage = this.props.showMessageBox;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessageBox = this.props.showNetworkErrorMessageBox;

        if(elementsToCancelAccept.length>0) {
            let uniqueElementsToBanNames = elementsToCancelAccept.map(function(item) {
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
                        if(elementsWithFailedCancellation.length>0)
                            showMessage(
                                {
                                    messageText: "Elements "+elementsWithFailedCancellation
                                        .map(function(element){return element.name}).join(", ")+" are still accepted " +
                                    "because you can cancel accept only for accepted and not banned elements",
                                    messageType: "alert-danger"
                                }
                            );
                        else
                            showMessage(
                                {
                                    messageText: "Acceptations for "+elementsToCancelAccept.map(function(element){return element.name}).join(", ")+" are canceled",
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
                    header:"Cancel acceptations of checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showMessage(
                {
                    messageText: "Nothing to accept",
                    messageType: "alert-danger"
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "Cancel accept"
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

export default connect( mapStateToProps, mapDispatchToProps )( DeleteOperation );