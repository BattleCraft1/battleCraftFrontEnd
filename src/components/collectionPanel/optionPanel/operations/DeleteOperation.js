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

    getSuccessMessage(deletedElementsNames){
        return "Elements "+deletedElementsNames.join(", ")+" are deleted";
    }

    getFailureMessage(elementsWhichCannotBeDeleted){
        return "Elements "+elementsWhichCannotBeDeleted
                .map(function(element){return element.name}).join(", ")+" are not deleted " +
            "because if you want delete element you must ban it firstly"
    }

    deleteElements(){
        let checkedElementsNames = this.props.page.checkedElementsNames;
        let clearCheckedElements = this.props.clearCheckedElements;
        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let collectionType = this.props.collectionType;
        let checkPreviouslyCheckedElements = this.props.checkPreviouslyCheckedElements;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(checkedElementsNames.length>0) {
            let GetPageAndModifyDataDTO = {
                namesOfObjectsToModify: checkedElementsNames,
                getPageObjectsDTO: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`delete/`+collectionType, GetPageAndModifyDataDTO)
                    .then(res => {
                        checkPreviouslyCheckedElements(res.data);
                        clearCheckedElements();
                        showSuccessMessage(getSuccessMessage(checkedElementsNames));
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
        confirmation: state.confirmation,
        message: state.message,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteOperation );