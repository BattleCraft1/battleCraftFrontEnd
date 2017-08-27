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

        this.state = {
          activeColumn: ""
        };
    }

    handleTheadClick(activeColumn)
    {
      this.setState({activeColumn:activeColumn})
      console.log("clicked on: " + this.state.activeColumn);
    }

    sortByColumnName(columnName){
        let pageRequest=this.props.pageRequest;
        pageRequest.pageRequest.property=columnName;
        pageRequest.pageRequest.direction=pageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest();
        this.handleTheadClick();
    }

    getColor(columnName, tournament){
      if(this.state.activeColumn != columnName){
        if(tournament.banned)
          return 'rgb(156, 99, 87)'
        else if(tournament.tournamentStatus == "ACCEPTED")
          return 'rgb(116, 152, 88)'
        else if(tournament.tournamentStatus == "FINISHED")
          return 'rgb(96, 146, 162)'
        return 'rgb(230, 197, 158)'
      }
      else{
        if(tournament.banned)
          return 'rgb(200, 143, 131)'
        else if(tournament.tournamentStatus == "ACCEPTED")
          return 'rgb(157, 186, 134)'
        else if(tournament.tournamentStatus == "FINISHED")
          return 'rgb(120, 170, 186)'
        return 'rgb(226, 203, 175)'
      }
    }

    getGradient(columnName, tournament){
      if(this.state.activeColumn == columnName){
        if(tournament.banned)
          return '-webkit-gradient(linear, left top, left bottom, from(rgba(255, 0, 0, 0.2)), to(rgb(230, 197, 158)))'
        else if(tournament.tournamentStatus == "ACCEPTED")
          return '-webkit-gradient(linear, left top, left bottom, from(rgba(0, 255, 0, 0.2)), to(rgb(230, 197, 158)))'
        else if(tournament.tournamentStatus == "FINISHED")
          return '-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 255, 0.2)), to(rgb(230, 197, 158)))'
        return '-webkit-gradient(linear, left top, left bottom, from(rgba(255, 0, 0, 0)), to(rgb(230, 197, 158)))'
      }
        else{
          if(tournament.banned)
            return '-webkit-linear-gradient(rgba(255, 0, 0, 0.3), rgb(230, 197, 158), rgb(230, 197, 158))'
          else if(tournament.tournamentStatus == "ACCEPTED")
            return '-webkit-gradient(linear, left bottom, left top, from(rgba(0, 255, 0, 0.3)), to(rgb(230, 197, 158)))'
          else if(tournament.tournamentStatus == "FINISHED")
            return '-webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 255, 0.3)), to(rgb(230, 197, 158)))'
          return '-webkit-gradient(linear, left bottom, left top, from(rgba(255, 0, 0, 0)), to(rgb(230, 197, 158)))'

        }
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
                    onConfirmFunction:function(){axios.post(serverName+link+'/'+collectionType,
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
            elementsToDelete,
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
                    "because you can accept only new elements and not banned",
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


    prepareRowsOfTable(rows,key){
        this.props.page.content.map(
            tournament =>{
                key++;
                rows.push(
                    <tr key={"tr:"+key}
                        className={tournament.banned?{color:'#906a3d'}:tournament.tournamentStatus==="FINISHED"?{color:'#906a3d'}:tournament.tournamentStatus==="ACCEPTED"?{color:'#ad4949'}:{color:'#8f3d3d'}}>
                        <th key={"th:"+key} scope="row" style = {Object.assign({}, styles.checkbox, styles.thead, {borderRadius: '0px'})}>
                            <Checkbox name={tournament.name}/></th>
                        <td key={"td:name:"+key}        style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundImage: this.getGradient("name", tournament)})}
                            onClick={() => {this.editCheckedElements()}}><TextOutput text={tournament.name} limit={17}/></td>
                        <td key={"td:province"+key}     style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundImage: this.getGradient("province.location", tournament)} )}>
                            <TextOutput text={tournament.province} limit={17}/></td>
                        <td key={"td:city"+key}         style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundImage: this.getGradient("address.city", tournament)} )}>
                            <TextOutput text={tournament.city} limit={17}/></td>
                        <td key={"td:game"+key}         style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundImage: this.getGradient("game.name", tournament)} )}>
                            <TextOutput text={tournament.game} limit={17}/></td>
                        <td key={"td:players"+key}      style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundImage: this.getGradient("freeSlots", tournament)} )}>
                            {tournament.playersNumber}/{tournament.maxPlayers}</td>
                        <td key={"td:date"+key}         style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundImage: this.getGradient("dateOfStart", tournament)} )}>
                            {dateFormat((new Date(tournament.dateOfStart)),"dd-MM-yyyy hh:mm")}</td>
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
                            <th key="all" style={styles.thead} className = {css(resp.theadElement)}>
                                <MultiCheckbox /></th>
                            <th onClick={()=>{this.sortByColumnName("name")             ; this.handleTheadClick("name"             )}} key="name"
                            style={styles.thead, (this.state.activeColumn === "name"             ) ?  styles.theadActive : styles.thead} className = {css(resp.theadElement)}>name</th>
                            <th onClick={()=>{this.sortByColumnName("province.location"); this.handleTheadClick("province.location")}} key="province"
                            style={styles.thead, (this.state.activeColumn === "province.location") ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>province</th>
                            <th onClick={()=>{this.sortByColumnName("address.city")     ; this.handleTheadClick("address.city"     )}} key="city"
                            style={styles.thead, (this.state.activeColumn === "address.city"     ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>city</th>
                            <th onClick={()=>{this.sortByColumnName("game.name")        ; this.handleTheadClick("game.name"        )}} key="game"
                            style={styles.thead, (this.state.activeColumn === "game.name"        ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>game</th>
                            <th onClick={()=>{this.sortByColumnName("freeSlots")        ; this.handleTheadClick("freeSlots"        )}} key="players"
                            style={styles.thead, (this.state.activeColumn === "freeSlots"        ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>players</th>
                            <th onClick={()=>{this.sortByColumnName("dateOfStart")      ; this.handleTheadClick("dateOfStart"      )}} key="date"
                            style={styles.thead, (this.state.activeColumn === "dateOfStart"      ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                    <div className="btn-group">
                        <button type="button" onClick={() => {this.addNewElement();}}                   className="btn btn-default">Add
                            <span className="glyphicon glyphicon-plus"/></button>
                        <button type="button" onClick={() => {this.banCheckedElements();}}              className="btn btn-default">Ban
                            <span className="glyphicon glyphicon-lock"/></button>
                        <button type="button" onClick={() => {this.unlockCheckedElements();}}           className="btn btn-default">Unlock
                            <span className="glyphicon glyphicon-list-alt"/></button>
                        <button type="button" onClick={() => {this.deleteCheckedElements();}}           className="btn btn-default">Delete
                            <span className="glyphicon glyphicon-minus"/></button>
                        <button type="button" onClick={() => {this.acceptCheckedElements();}}           className="btn btn-default">Accept
                            <span className="glyphicon glyphicon-ok"/></button>
                        <button type="button" onClick={() => {this.cancelAcceptCheckedElements();}}     className="btn btn-default">Cancel accept
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
        message: state.message,
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
    rowContentActive:{
        background:'#906a3d'
    },
    thead:{
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border:'1px solid',
        color:'white',
        //
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        //borderColor:'#4e3e28',
        background:'#735630',

        // backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#b48443), to(#654a25))',
        // WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
    },
    theadActive:{
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border:'1px solid',

        color:'lightGrey',
        borderTopColor: 'rgb(204, 126, 69)',
        borderBottomColor: 'rgb(249, 249, 249)',
        background:'#735630',

        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
    },
    table:{
        position:'relative',
        background:'black',
        width: '100%',
        borderCollapse:'separate',
    },
    checkbox:{
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        borderRight: '0px',
        //backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#d19c55), to(#906b3a))',
        borderBottomColor:'#775930',
        textAlign: 'center',
    }

}

const resp = StyleSheet.create({
    theadElement:{
      fontFamily:'arial, helvetica, sans-serif',
      textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
      padding: '8px',
      paddingLeft:'4px',
      paddingRight:'4px',
      textAlign: 'center',

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
})
