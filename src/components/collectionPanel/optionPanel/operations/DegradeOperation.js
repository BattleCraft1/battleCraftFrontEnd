import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class DegradeOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    getFailureMessage(elementsWhichCannotBeDegrade){
        return "Users "+elementsWhichCannotBeDegrade
                .map(function(element){return element.name}).join(", ")+" are not degrade to Accepted " +
            "because if you want degrade user to Accepted he must by a Organizer"
    }

    getSuccessMessage(elementsToDegrade){
        return "Users "+elementsToDegrade.map(function(element){return element.name}).join(", ")+" are degrade to Accepted"
    }

    degradeElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToDegrade = checkedElements.filter(element => element.status==='ORGANIZER');
        let elementsWhichCannotBeDegrade = checkedElements.filter(element => element.status!=='ORGANIZER');

        let showSuccessMessage = this.props.showSuccessMessage;
        let showFailureMessage = this.props.showFailureMessage;
        let setPage = this.props.setPage;
        let showNetworkErrorMessage = this.props.showNetworkErrorMessage;
        let getFailureMessage = this.getFailureMessage;
        let getSuccessMessage = this.getSuccessMessage;

        if(elementsToDegrade.length>0) {
            let uniqueElementsToDegradeNames = elementsToDegrade.map(function(item) {
                return item.name;
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToDegradeNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+`degrade/organizers`,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        if(elementsWhichCannotBeDegrade.length>0)
                            showFailureMessage(
                                {
                                    messageText: getFailureMessage(elementsWhichCannotBeDegrade)
                                }
                            );
                        else
                            showSuccessMessage(
                                {
                                    messageText: getSuccessMessage(elementsToDegrade)
                                }
                            );
                    })
                    .catch(error => {
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
            showFailureMessage(
                {
                    messageText: "Nothing to degrade. You can only degrade Organizers"
                }
            )
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
        confirmation: state.confirmation,
        message: state.message,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( DegradeOperation );