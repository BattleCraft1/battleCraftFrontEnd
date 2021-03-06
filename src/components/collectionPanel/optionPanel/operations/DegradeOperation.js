import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class DegradeOperation extends React.Component {

    getFailureMessage(elementsWhichCannotBeDegrade){
        return "Users "+elementsWhichCannotBeDegrade
                .map(function(element){return element.name}).join(", ")+" are not degrade to Accepted " +
            "because if you want degrade user to Accepted he must by a Organizer"
    }

    getSuccessMessage(degradedElementsNames){
        return "Users "+degradedElementsNames.join(", ")+" are degrade to Accepted"
    }

    degradeElements(){
        let checkedElementsNames = this.props.page.checkedElementsNames;
        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
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
                startLoading("Degrading...");
                axios.post(serverName+`degrade/organizers`, GetPageAndModifyDataDTO,
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
                    header:"Degrade checked elements",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showFailureMessage("Nothing to degrade.")
        }
    }

    render() {
        return (
            <OperationButton
                name = "Degrade"
                icon = {icons.arrowS}
                operation = {this.degradeElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( DegradeOperation );