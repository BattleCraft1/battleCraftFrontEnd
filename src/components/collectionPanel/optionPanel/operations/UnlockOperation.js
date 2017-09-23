import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');


class UnlockOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getSuccessMessage(elementsToUnlock){
        return "Elements "+elementsToUnlock.map(function(element){return element.name}).join(", ")+" are unlock";
    }

    unlockElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToUnlock = checkedElements.filter(element => element.banned===true);

        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(elementsToUnlock.length>0) {
            let uniqueElementsToBanNames = elementsToUnlock.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`unlock/`+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        showSuccessMessage(
                            {
                                messageText: getSuccessMessage(elementsToUnlock)
                            }
                        );
                    })
                    .catch(error => {
                        showNetworkErrorMessage(error);
                    })
            };
            this.props.showConfirmationDialog(
                {
                    header:"Unlock checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage(
                {
                    messageText: "Nothing to unlock. Only banned elements can be unlock."
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "Unlock"
                icon = {icons.lockOpen}
                operation = {this.unlockElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( UnlockOperation );