import { ActionCreators } from '../../../../redux/actions/index';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import {serverName} from '../../../../main/consts/server';
import {StyleSheet, css} from 'aphrodite';
let icons = require('glyphicons');

class OptionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    editCheckedElements(){
        console.log("TO DO EDIT");
    }

    makeOperation(elements, link, failure, confirmation, successMessage, operationImpossibleMessage){
        let showMessage = this.props.showMessageBox;
        console.log(elements);
        if(elements.length>0) {
            let collectionType = this.props.collectionType;
            let setPage = this.props.setPage;
            let showNetworkErrorMessageBox = this.props.showNetworkErrorMessageBox;
            let haveFailure=false;
            if(failure.canBeFailed)
            {
                haveFailure = (failure.elements.length > 0);
            }
            let uniqueElementsNames = elements.map(function(item) {
                return item['name'];
            });
            let getPageAndModifyDataObjectsWrapper = {
                namesOfObjectsToModify: uniqueElementsNames,
                getPageObjectsWrapper: this.props.pageRequest
            };
            this.props.showConfirmationDialog(
                {
                    header: confirmation.header,
                    message: confirmation.message,
                    onConfirmFunction:function(){
                        axios.post(serverName+link+'/'+collectionType,
                            getPageAndModifyDataObjectsWrapper)
                            .then(res => {
                                setPage(res.data);
                                if(failure.canBeFailed)
                                    if(haveFailure)
                                    {
                                        showMessage(failure.message);
                                        return;
                                    }
                                    else
                                    {
                                        showMessage(successMessage);
                                        return;
                                    }
                                showMessage(successMessage);
                            })
                            .catch(error => {
                                showNetworkErrorMessageBox(error);
                            })}
                });
        }
        else{
            showMessage(operationImpossibleMessage)
        }
    }

    banCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToBan = checkedElements.filter(element => element.banned===false);
        this.makeOperation(
            elementsToBan
            ,
            `ban`,
            {
                canBeFailed: false
            },
            {
                header:"Ban checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToBan.map(function(element){return element.name}).join(", ")+" are banned",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to ban",
                messageType: "alert-danger"
            }
        );
    }

    unlockCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToUnlock = checkedElements.filter(element => element.banned===true);
        this.makeOperation(
            elementsToUnlock
            ,
            `unlock`,
            {
                canBeFailed: false,
            },
            {
                header:"Unlock checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToUnlock.map(function(element){return element.name}).join(", ")+" are unlock",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to unlock",
                messageType: "alert-danger"
            }
        );
    }

    deleteCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToDelete = checkedElements.filter(element => element.banned===true);
        let elementsWhichCannotBeDeleted = checkedElements.filter(element => !element.banned);
        this.props.checkAllElements(false);
        this.makeOperation(
            elementsToDelete
            ,
            `delete`,
            {
                canBeFailed: true,
                elements: elementsWhichCannotBeDeleted,
                message:{
                    messageText: "Elements "+elementsWhichCannotBeDeleted
                        .map(function(element){return element.name}).join(", ")+" are not deleted " +
                    "because if you want delete element you must ban it firstly",
                    messageType: "alert-danger"
                }
            },
            {
                header:"Delete checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToDelete.map(function(element){return element.name}).join(", ")+" are deleted",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to delete",
                messageType: "alert-danger"
            }
        );
    }

    acceptCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToAccept = checkedElements.filter(element =>
            element.tournamentStatus==="NEW" && element.banned===false);
        let elementsWhichCannotBeAccept = checkedElements.filter(element => element.tournamentStatus!=="NEW");
        this.makeOperation(
            elementsToAccept
            ,
            `accept`,
            {
                canBeFailed: true,
                elements: elementsWhichCannotBeAccept,
                message:{
                    messageText: "Elements "+elementsWhichCannotBeAccept
                        .map(function(element){return element.name}).join(", ")+" are not accepted " +
                    "because you can accept only new and not banned elements",
                    messageType: "alert-danger"
                }
            },
            {
                header:"Accept checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Elements "+elementsToAccept.map(function(element){return element.name}).join(", ")+" are accepted",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to accept",
                messageType: "alert-danger"
            }
        );
    }

    cancelAcceptCheckedElements(){
        let checkedElements = this.props.page.content.filter(element => element.checked===true);
        let elementsToCancelAccept = checkedElements.filter(element =>
            element.tournamentStatus==="ACCEPTED"  && element.banned===false);
        let elementsWithFailedCancellation = checkedElements.filter(element => element.tournamentStatus!=="ACCEPTED");
        this.makeOperation(
            elementsToCancelAccept
            ,
            `cancel/accept`,
            {
                canBeFailed: true,
                elements: elementsWithFailedCancellation,
                message:{
                    messageText: "Elements "+elementsWithFailedCancellation
                        .map(function(element){return element.name}).join(", ")+" are still accepted " +
                    "because you can cancel accept only for accepted and not banned elements",
                    messageType: "alert-danger"
                }
            },
            {
                header:"Cancel acceptations of checked tournaments",
                message:"Are you sure?"
            },
            {
                messageText: "Acceptations for "+elementsToCancelAccept.map(function(element){return element.name}).join(", ")+" are canceled",
                messageType: "alert-success"
            },
            {
                messageText: "Nothing to cancel accept",
                messageType: "alert-danger"
            }
        );
    }

    render() {

        return (
            <div className={css(resp.buttonGroup)}>
                <div className={css(resp.buttonGroup)}>
                    <button type="button" onClick={() => {this.addNewElement();}}                   className={css(resp.theadElement) +" "+ css(resp.button)}>
                        Add {icons.plus}</button>
                    <button type="button" onClick={() => {this.banCheckedElements();}}              className={css(resp.theadElement) +" "+ css(resp.button)}>
                        Ban {icons.skullAndBones}</button>
                    <button type="button" onClick={() => {this.unlockCheckedElements();}}           className={css(resp.theadElement) +" "+ css(resp.button)}>
                        Unlock {icons.lockOpen}</button>
                    <button type="button" onClick={() => {this.deleteCheckedElements();}}           className={css(resp.theadElement) +" "+ css(resp.button)}>
                        Delete {icons.warning}</button>
                    <button type="button" onClick={() => {this.acceptCheckedElements();}}           className={css(resp.theadElement) +" "+ css(resp.button)}>
                        Accept {icons.checkHeavyWhite}</button>
                    <button type="button" onClick={() => {this.cancelAcceptCheckedElements();}}     className={css(resp.theadElement) +" "+ css(resp.button)}>
                        Cancel {icons.noEntry}</button>
                </div>
            </div>
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

export default connect( mapStateToProps, mapDispatchToProps )( OptionPanel );

const resp = StyleSheet.create({
    buttonGroup:{
        width:'90%',
        marginLeft:'5%',
        textAlign:'center',
        paddingTop:'4px',
        paddingBottom:'4px',
        background:'#45341d',
        boxShadow:'inset 0 0 4px #9c7239',
        borderCollapse: 'separate',

        border:'1px solid',
        color:'rgb(204, 126, 69)',
        borderTopColor: '#E0BA51',
        borderBottomColor: '#614722',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
    },
    theadElement:{
        boxShadow:'inset 0 2px 2px #9c7239',
        fontFamily:'arial, helvetica, sans-serif',
        textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        textAlign: 'center',

        '@media (max-width: 600px)': {
            display:'none',
        },

        ':hover':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 161, 130)',
        },
        ':active':{
            color:'lightGrey',
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
        },

    },
    button:{
        textAlign:'center',
        dislay:'inline-block',
        position:'relative',
        width:'16%',
        padding: '4px',
        margin:'1px',
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#7d150e), to(#8c3731))',
        backgroundImage: 'linear-gradient(#f66060, #7d150e, #5b0f0a)',
        boxShadow:'inset 0 0 7px #9c7239',
        color:'white',
        outline:'0',
        borderRadius:'2px',
        ':active':{
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
            color:'lightGrey',
            backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
            backgroundImage: 'linear-gradient( #4b110d, #6f1913, #dd5353 )',
        },

        '@media (max-width: 600px)': {
            display:'inline-block',
            width:'30%',
        },
    },
});