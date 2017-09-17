import React from 'react';
import OperationButton from './operationButton/OperationButton'
import {serverName} from '../../../../main/consts/server';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class BanOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    benElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToBan = checkedElements.filter(element => element.banned===false);

        let showMessage = this.props.showMessageBox;
        let collectionType = this.props.collectionType;
        let setPage = this.props.setPage;
        let showNetworkErrorMessageBox = this.props.showNetworkErrorMessageBox;



        if(elementsToBan.length>0) {
            let uniqueElementsToBanNames = elementsToBan.map(function(item) {
                return item['name'];
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsToBanNames,
                getPageObjectsWrapper: this.props.pageRequest
            };

            let operationFunction = function(){
                axios.post(serverName+'ban/'+collectionType,
                    getPageAndModifyDataObjectsWrapper)
                    .then(res => {
                        setPage(res.data);
                        showMessage(
                            {
                                messageText: "Elements "+elementsToBan.map(function(element){return element.name}).join(", ")+" are banned",
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
                    header:"Ban checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction: operationFunction
                }
            )
        }
        else{
            showMessage(
                {
                    messageText: "Nothing to ban",
                    messageType: "alert-danger"
                }
            )
        }
    }

    render() {
        return (
            <OperationButton
                name = "Ban"
                icon = {icons.skullAndBones}
                operation = {this.benElements.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( BanOperation );