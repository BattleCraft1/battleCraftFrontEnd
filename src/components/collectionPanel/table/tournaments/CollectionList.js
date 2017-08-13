import { ActionCreators } from '../../../../redux/actions/index';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import {serverName} from '../../../../main/consts/server';
import {StyleSheet, css} from 'aphrodite';
import Checkbox from '../../../commonComponents/checkBox/Checkbox'
import MultiCheckbox from '../../../commonComponents/checkBox/MultiCheckbox'
import TextOutput from '../../../commonComponents/textOutput/TextOutput'

import dateFormat from 'dateformat';

class CollectionList extends React.Component{
    constructor(props) {
        super(props);
    }

    sortByColumnName(columnName){
        let pageRequest=this.props.pageRequest;
        pageRequest.pageRequest.property=columnName;
        pageRequest.pageRequest.direction=pageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest();
    }

    addNewElement(){
        console.log("TO DO ADD");
    }

    editCheckedElements(){
        console.log("TO DO EDIT");
    }

    makeOperation(elements, link, failure, confirmation, successMessage, operationImpossibleMessage){
        let showMessage = this.props.showMessageBox;
        if(elements.length>0) {
            let collectionType = this.props.collectionType;
            let getPageRequest = this.props.getPageRequest;
            let haveFailure=false;
            if(failure.canBeFailed)
            {
                haveFailure = (failure.elements.length > 0);
            }
            let uniqueElementsNames = elements.map(function(item) {
                return item['name'];
            });
            this.props.showConfirmationDialog(
                {
                    header: confirmation.header,
                    message: confirmation.message,
                    onConfirmFunction:function(){axios.post(serverName+link+'/'+collectionType, uniqueElementsNames)
                        .then(res => {
                            console.log(res.data);
                            getPageRequest();
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
                        .catch(function (error) {
                            this.props.showMessageBox({
                                isShown: true,
                                messageText: error.response.data,
                                messageType: "alert-danger"
                            });
                        })},
                    isShown: true
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
                isShown: true,
                messageText: "Elements "+elementsToBan.map(function(element){return element.name}).join(", ")+" are banned",
                messageType: "alert-success"
            },
            {
                isShown: true,
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
                isShown: true,
                messageText: "Elements "+elementsToUnlock.map(function(element){return element.name}).join(", ")+" are unlock",
                messageType: "alert-success"
            },
            {
                isShown: true,
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
                    isShown: true,
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
                isShown: true,
                messageText: "Elements "+elementsToDelete.map(function(element){return element.name}).join(", ")+" are deleted",
                messageType: "alert-success"
            },
            {
                isShown: true,
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
                    isShown: true,
                    messageText: "Elements "+elementsWhichCannotBeAccept
                        .map(function(element){return element.name}).join(", ")+" are not accepted " +
                    "because you can accept only new elements and not banned",
                    messageType: "alert-danger"
                }
            },
            {
                header:"Accept checked tournaments",
                message:"Are you sure?"
            },
            {
                isShown: true,
                messageText: "Elements "+elementsToAccept.map(function(element){return element.name}).join(", ")+" are accepted",
                messageType: "alert-success"
            },
            {
                isShown: true,
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
                    isShown: true,
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
                isShown: true,
                messageText: "Acceptations for "+elementsToCancelAccept.map(function(element){return element.name}).join(", ")+" are canceled",
                messageType: "alert-success"
            },
            {
                isShown: true,
                messageText: "Nothing to cancel accept",
                messageType: "alert-danger"
            }
        );
    }


    prepareRowsOfTable(rows,key){
        this.props.page.content.map(
            tournament =>{
                key++;
                rows.push(
                    <tr key={"tr:"+key}
                        className={tournament.banned?"danger":
                            tournament.tournamentStatus==="FINISHED"?"primary":
                                tournament.tournamentStatus==="ACCEPTED"?"success":"danger"}>
                        <th key={"th:"+key} scope="row" style = {Object.assign({}, styles.thead, styles.checkbox, {borderRadius: '0px'})}>
                            <Checkbox name={tournament.name}/></th>
                        <td key={"td:name:"+key} style={Object.assign({}, styles.thead, styles.rowContent)}
                            onClick={() => {this.editCheckedElements()}}><TextOutput text={tournament.name} limit={17}/></td>
                        <td key={"td:province"+key}  style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={tournament.province} limit={17}/></td>
                        <td key={"td:city"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={tournament.city} limit={17}/></td>
                        <td key={"td:game"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={tournament.game} limit={17}/></td>
                        <td key={"td:players"+key} style={Object.assign({}, styles.thead, styles.rowContent,
                            {textAlign:"center"})}>{tournament.playersNumber}/{tournament.maxPlayers}</td>
                        <td key={"td:date"+key} style={Object.assign({}, styles.thead, styles.rowContent,
                            {textAlign:"center"})}>{dateFormat((new Date(tournament.dateOfStart)),"dd-MM-yyyy hh:mm")}</td>
                    </tr>
                );
            }
        );
    }


    render(){
        let rows = [];
        let key = 0;

        if(this.props.page.content!==undefined)
        {
            this.prepareRowsOfTable(rows,key);
        }

        return (
            <div>
                <div className="row">
                    <table className="table bg-primary" style={styles.table}>
                        <thead>
                        <tr>
                            <th key="all" style={styles.thead}>
                                <MultiCheckbox /></th>
                            <th onClick={()=>this.sortByColumnName("name")}              key="name"     style={styles.thead}>name</th>
                            <th onClick={()=>this.sortByColumnName("province.location")} key="province" style={styles.thead}>province</th>
                            <th onClick={()=>this.sortByColumnName("address.city")}      key="city"     style={styles.thead}>city</th>
                            <th onClick={()=>this.sortByColumnName("game.name")}         key="class"    style={styles.thead}>game</th>
                            <th onClick={()=>this.sortByColumnName("freeSlots")}         key="players"  style={styles.thead}>players</th>
                            <th onClick={()=>this.sortByColumnName("dateOfStart")}       key="date"     style={styles.thead}>date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                    <div className="btn-group">
                        <button type="button" onClick={() => this.addNewElement()} className="btn btn-default">Add
                            <span className="glyphicon glyphicon-plus"/></button>
                        <button type="button" onClick={() => this.banCheckedElements()}className="btn btn-default">Ban
                            <span className="glyphicon glyphicon-lock"/></button>
                        <button type="button" onClick={() => this.unlockCheckedElements()} className="btn btn-default">Unlock
                            <span className="glyphicon glyphicon-list-alt"/></button>
                        <button type="button" onClick={() => {this.deleteCheckedElements();}} className="btn btn-default">Delete
                            <span className="glyphicon glyphicon-minus"/></button>
                        <button type="button" onClick={() => {this.acceptCheckedElements();}} className="btn btn-default">Accept
                            <span className="glyphicon glyphicon-ok"/></button>
                        <button type="button" onClick={() => {this.cancelAcceptCheckedElements();}} className="btn btn-default">Cancel accept
                            <span className="glyphicon glyphicon-remove"/></button>
                    </div>
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
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionList );

const styles = {

    rowContent:{
        borderRadius:'0',
        background:'#c6a57d',
        border:'1px solid',
        padding: '8px',
        paddingLeft:'8px',
        textAlign: 'none',
        backgroundImage: '',
        WebkitBorderImage: '',
        color:'black',
        borderTopColor:'#dfd19e',
        borderBottomColor:'#886e4b',
        borderLeftColor:'#dfd19e',
        borderRightColor:'#886e4b',
        textShadow:' ',
    },
    thead:{
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border:'1px solid',
        color:'white',
        //
        borderTopColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#e3ca86',
        //borderColor:'#4e3e28',
        background:'#735630',
        textAlign: 'center',
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        // backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#b48443), to(#654a25))',
        // WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
        fontFamily:'arial, helvetica, sans-serif',
        textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
    },
    table:{
        position:'relative',
        background:'black',
        width: '100%',
        borderCollapse:'separate',
    },
    checkbox:{
        textAlign: 'center',
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        borderRight: '0px',
        //backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#d19c55), to(#906b3a))',
        borderBottomColor:'#775930',


    }

}

const resp = StyleSheet.create({

})
