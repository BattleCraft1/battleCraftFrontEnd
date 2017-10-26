import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');


class UnlockOperation extends React.Component {

    getSuccessMessage(unlockedElementsNames){
        return "Elements "+unlockedElementsNames.join(", ")+" are unlock";
    }

    unlockElements(){
        let checkedElementsNames = this.props.page.checkedElementsNames;
        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let collectionType = this.props.collectionType;
        let setPageAndCheckPreviouslyCheckedElements = this.props.setPageAndCheckPreviouslyCheckedElements;
        let setPageRequestSizeAndNumber = this.props.setPageRequestSizeAndNumber;
        let setEmptyPage = this.props.setEmptyPage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(checkedElementsNames.length>0) {
            let GetPageAndModifyDataDTO = {
                namesOfObjectsToModify: checkedElementsNames,
                getPageObjectsDTO: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`unlock/`+collectionType, GetPageAndModifyDataDTO)
                    .then(res => {
                        setPageAndCheckPreviouslyCheckedElements(res.data);
                        setPageRequestSizeAndNumber(res.data.numberOfElements,res.data.number);
                        showSuccessMessage(getSuccessMessage(checkedElementsNames));
                    })
                    .catch(error => {
                        setEmptyPage();
                        setPageRequestSizeAndNumber(0,0);
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
            showFailureMessage("Nothing to unlock.")
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