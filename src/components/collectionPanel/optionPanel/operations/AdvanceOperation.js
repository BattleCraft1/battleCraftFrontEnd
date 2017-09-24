import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class AdvanceOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getFailureMessage(elementsWhichCannotBeAdvance){
        return "Users "+elementsWhichCannotBeAdvance
                .map(function(element){return element.name}).join(", ")+" are not advance to Organizer " +
            "because if you want advance user to Organizer he must by a Accepted"
    }

    getSuccessMessage(elementsToAdvance){
        return "Users "+elementsToAdvance.map(function(element){return element.name}).join(", ")+" are advanced to Organizer"
    }

    advanceElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToAdvance = checkedElements.filter(element => element.status==='ACCEPTED');
        let elementsWhichCannotBeAdvance = checkedElements.filter(element => element.status!=='ACCEPTED');

        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let setPage = this.props.setPage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(elementsToAdvance.length>0) {
            let uniqueElementsToAdvanceNames = elementsToAdvance.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToAdvanceNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`advance/players`,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        if(elementsWhichCannotBeAdvance.length>0)
                            showFailureMessage(
                                {
                                    messageText: getFailureMessage(elementsWhichCannotBeAdvance)
                                }
                            );
                        else
                            showSuccessMessage(
                                {
                                    messageText: getSuccessMessage(elementsToAdvance)
                                }
                            );
                    })
                    .catch(error => {
                        showNetworkErrorMessage(error);
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Advance checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage(
                {
                    messageText: "Nothing to advance. Only Accepted users can be advanced."
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "Advance"
                icon = {icons.arrowN}
                operation = {this.advanceElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( AdvanceOperation );