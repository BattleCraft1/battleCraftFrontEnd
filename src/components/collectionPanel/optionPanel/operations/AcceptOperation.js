import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');


class AcceptOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getFailureMessage(elementsWhichCannotBeAccept){
        return "Elements " +
            elementsWhichCannotBeAccept.map(function(element){return element.name}).join(", ")+
            " are not accepted because you can accept only new elements and not banned"
    }

    getSuccessMessage(acceptedElementsNames){
        return "Elements "+acceptedElementsNames.join(", ")+" are accepted";
    }

    acceptElements(){
        let checkedElementsNames = this.props.page.checkedElementsNames;
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
                GetPageDTO: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`accept/`+collectionType, GetPageAndModifyDataDTO)
                    .then(res => {
                        checkPreviouslyCheckedElements(res.data);
                        showSuccessMessage(getSuccessMessage(checkedElementsNames));
                    })
                    .catch(error => {
                        showNetworkErrorMessage(error);
                    })
            };

            this.props.showConfirmationDialog(
                {
                    header:"Accept checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to accept.")
        }
    }

    render() {
        return (
            <OperationButton
                name = "Accept"
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

export default connect( mapStateToProps, mapDispatchToProps )( AcceptOperation );