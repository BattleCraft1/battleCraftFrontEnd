import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');


class DeleteOperation extends React.Component {

    getSuccessMessage(deletedElementsNames){
        return "Elements "+deletedElementsNames.join(", ")+" are deleted";
    }

    deleteElements(){
        let checkedElementsNames = this.props.page.checkedElementsNames;
        let clearCheckedElements = this.props.clearCheckedElements;
        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let collectionType = this.props.collectionType;
        let checkPreviouslyCheckedElements = this.props.checkPreviouslyCheckedElements;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getSuccessMessage = this.getSuccessMessage;

        let startLoading=this.props.startLoading;
        let stopLoading=this.props.stopLoading;
        let token = this.props.security.token;

        if(checkedElementsNames.length>0) {
            let GetPageAndModifyDataDTO = {
                namesOfObjectsToModify: checkedElementsNames,
                getPageObjectsDTO: this.props.pageRequest
            };

            let operationFunction = function(){
                startLoading("Deleting...");
                axios.post(serverName+`delete/`+collectionType, GetPageAndModifyDataDTO,
                    {
                        headers: {
                            "X-Auth-Token":token
                        }
                    })
                    .then(res => {
                        stopLoading();
                        checkPreviouslyCheckedElements(res.data);
                        showSuccessMessage(getSuccessMessage(checkedElementsNames));
                    })
                    .catch(error => {
                        stopLoading();
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
            showFailureMessage("Nothing to delete.")
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
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteOperation );