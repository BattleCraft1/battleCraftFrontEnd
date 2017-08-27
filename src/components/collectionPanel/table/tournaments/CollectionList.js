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

var icons = require('glyphicons');

const NEW_COLOR =             'rgb(230, 197, 158)'
const ACCEPTED_COLOR =        'rgb(116, 152, 88)'
const IN_PROGRESS_COLOR =     'rgb(142, 108, 63)'
const FINISHED_COLOR =        'rgb(96, 146, 162)'
const BANNED_COLOR =          'rgb(156, 99, 87)'

const NEW_COLOR_ACTIVE =          'rgb(226, 203, 175)'
const ACCEPTED_COLOR_ACTIVE =     'rgb(157, 186, 134)'
const IN_PROGRESS_COLOR_ACTIVE =  'rgb(140, 115, 82)'
const FINISHED_COLOR_ACTIVE =     'rgb(120, 170, 186)'
const BANNED_COLOR_ACTIVE =       'rgb(200, 143, 131)'

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
        this.setState({direction:pageRequest.pageRequest.direction})
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest();
        this.handleTheadClick();
    }

    getArrowGlyph(columnName){
      if(this.state.activeColumn == columnName){
        if(this.state.direction === 'ASC'){
            return icons.arrowTriD
        }
        else{
            return icons.arrowTriU
        }
      }
    }

    getColor(columnName, tournament){
      if(this.state.activeColumn != columnName){
        if(tournament.banned)
          return BANNED_COLOR
        else if(tournament.tournamentStatus == "ACCEPTED")
          return ACCEPTED_COLOR
        else if(tournament.tournamentStatus == "FINISHED")
          return FINISHED_COLOR
        else if(tournament.tournamentStatus == "IN_PROGRESS")
          return IN_PROGRESS_COLOR
        return NEW_COLOR
      }
      else{
        if(tournament.banned)
          return BANNED_COLOR_ACTIVE
        else if(tournament.tournamentStatus == "ACCEPTED")
          return ACCEPTED_COLOR_ACTIVE
        else if(tournament.tournamentStatus == "FINISHED")
          return FINISHED_COLOR_ACTIVE
        else if(tournament.tournamentStatus == "IN_PROGRESS")
          return IN_PROGRESS_COLOR_ACTIVE
        return NEW_COLOR_ACTIVE
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
                    <tr key={"tr:"+key}>

                        <th key={"th:"+key} scope="row" className = {css(resp.rowContent, resp.rowLabel)} className = {css(resp.rowContent, resp.smallCheckbox)} style = {Object.assign({}, styles.checkbox, styles.thead, {borderRadius: '0px'})}>
                            <Checkbox name={tournament.name}/></th>

                        <th onClick={()=>{this.sortByColumnName("name")             ; this.handleTheadClick("name"             )}} key="name"
                            style={(this.state.activeColumn === "name"             ) ?  styles.theadActive : styles.thead} className = {css(resp.rowContent)+" "+css(resp.nameLabel)}>name{this.getArrowGlyph("name")}</th>
                        <td key={"td:name:"+key}      className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("name", tournament)})}
                            onClick={() => {this.editCheckedElements()}}><TextOutput text={tournament.name} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("province.location"); this.handleTheadClick("province")}} key="province"
                            style={(this.state.activeColumn === "province") ? styles.theadActive : styles.thead } className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>province{this.getArrowGlyph("province")}</th>
                        <td key={"td:province"+key}   className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("province", tournament)} )}>
                            <TextOutput text={tournament.province} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("address.city")     ; this.handleTheadClick("city"     )}} key="city"
                            style={(this.state.activeColumn === "city"     ) ? styles.theadActive : styles.thead } className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>city{this.getArrowGlyph("city")}</th>
                        <td key={"td:city"+key}       className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("city", tournament)} )}>
                            <TextOutput text={tournament.city} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("game.name")        ; this.handleTheadClick("game"        )}} key="game"
                            style={(this.state.activeColumn === "game"        ) ? styles.theadActive : styles.thead } className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>game{this.getArrowGlyph("game")}</th>
                        <td key={"td:game"+key}       className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("game", tournament)} )}>
                            <TextOutput text={tournament.game} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("freeSlots")        ; this.handleTheadClick("players"        )}} key="players"
                            style={(this.state.activeColumn === "players"        ) ? styles.theadActive : styles.thead } className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>players{this.getArrowGlyph("players")}</th>
                        <td key={"td:players"+key}    className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("players", tournament)} )}>
                            {tournament.playersNumber}/{tournament.maxPlayers}</td>

                        <th onClick={()=>{this.sortByColumnName("dateOfStart")      ; this.handleTheadClick("date"      )}} key="date"
                            style={(this.state.activeColumn === "date"      ) ? styles.theadActive : styles.thead } className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>date{this.getArrowGlyph("date")}</th>
                        <td key={"td:date"+key}       className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("date", tournament), marginBottom:'4px'} )}>
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
                <div className = {css(resp.legend)}>
                  <th style={Object.assign({}, styles.thead, {display:'block', width:'100%', textAlign:'center', padding:'3px'})} >Legend</th>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(230, 197, 158)'})} className = {css(resp.legendOption)}>NEW</span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(116, 152, 88)'})} className = {css(resp.legendOption)}>ACCEPTED</span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(142, 108, 63)'})} className = {css(resp.legendOption)}>IN PROGRESS</span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(96, 146, 162)'})} className = {css(resp.legendOption)}>FINISHED</span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(156, 99, 87)'})} className = {css(resp.legendOption)}>BANNED</span>
                </div>
                    <table className="table bg-primary" style={styles.table}>
                        <thead>
                        <tr>
                            <th key="all" style={styles.thead} className = {css(resp.theadElement)}>
                                <MultiCheckbox /></th>
                            <th onClick={()=>{this.sortByColumnName("name")             ; this.handleTheadClick("name"             )}} key="name"
                            style={styles.thead, (this.state.activeColumn === "name"             ) ?  styles.theadActive : styles.thead} className = {css(resp.theadElement)}>name {this.getArrowGlyph("name")}</th>
                            <th onClick={()=>{this.sortByColumnName("province.location"); this.handleTheadClick("province")}} key="province"
                            style={styles.thead, (this.state.activeColumn === "province") ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>province {this.getArrowGlyph("province")}</th>
                            <th onClick={()=>{this.sortByColumnName("address.city")     ; this.handleTheadClick("city"     )}} key="city"
                            style={styles.thead, (this.state.activeColumn === "city"     ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>city {this.getArrowGlyph("city")}</th>
                            <th onClick={()=>{this.sortByColumnName("game.name")        ; this.handleTheadClick("game"        )}} key="game"
                            style={styles.thead, (this.state.activeColumn === "game"        ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>game {this.getArrowGlyph("game")}</th>
                            <th onClick={()=>{this.sortByColumnName("freeSlots")        ; this.handleTheadClick("players"        )}} key="players"
                            style={styles.thead, (this.state.activeColumn === "players"        ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>players {this.getArrowGlyph("players")}</th>
                            <th onClick={()=>{this.sortByColumnName("dateOfStart")      ; this.handleTheadClick("date"      )}} key="date"
                            style={styles.thead, (this.state.activeColumn === "date"      ) ? styles.theadActive : styles.thead } className = {css(resp.theadElement)}>date {this.getArrowGlyph("date")}</th>
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
        width: '90%',
        marginLeft:'5%',
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
    },
    name:{
      width:'90%',
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

    rowContent:{
      position:'relative',
      textAlign:'center',
      '@media (max-width: 599px)': {
        width:'70%',
        display: 'inline-block',
        borderRadius:'0'
      }
    },
    rowLabel:{
       width:'30%',
      '@media (min-width: 600px)': {
        display:'none',
      }
    },
    rowContainer:{
      position:'static',
      padding:'10px',
      background:'white',
      '@media (max-width: 600px)': {
        marginBottom:'10px',
      }
    },
    nameLabel:{
      width:'20%',
      '@media (min-width: 600px)': {
        display:'none',
      },
    },
    legend:{
      position:'relative',
      width:'90%',
      marginLeft:'5%',
      marginBottom:'10px',
    },

    legendOption:{
      fontSize:'80%',
      textAlign:'center',
      display:'inline-block',
      position:'relative',
      width:'20%',
      padding:'5px',
      '@media (max-width: 600px)': {
        width:'50%',
      },
    },

    smallCheckbox:{
      '@media (max-width: 599px)': {
        width:'10%',
        margin:'0',
        paddingTop:'7px',
        paddingBottom:'7px',
      }
    },
})
