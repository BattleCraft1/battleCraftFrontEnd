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
                    <tr key={"tr:"+key} className={css(resp.tableRow)}>

                        <th key={"th:"+key} className = {css(resp.rowContent, resp.rowLabel)} className = {css(resp.rowContent, resp.smallCheckbox)} style = {Object.assign({}, styles.checkbox, styles.thead, {borderRadius: '0px'})}>
                            <Checkbox style = { Object.assign({}, {margin:'0px'}) } name={tournament.name}/></th>

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
                        <td key={"td:date"+key}       className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("date", tournament)} )}>
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
                <div>
                <div className = {css(resp.legend)}>
                  <th style={Object.assign({}, styles.thead, {boxSizing: 'border-box', position:'relative', display:'inline-block', width:'100%', textAlign:'center', padding:'3px 0 3px 0', boxShadow:'inset 0 2px 2px #9c7239'})} >Legend</th>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(230, 197, 158)'})} className = {css(resp.legendOption)}>NEW        </span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(116, 152, 88)'})}  className = {css(resp.legendOption)}>ACCEPTED   </span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(142, 108, 63)'})}  className = {css(resp.legendOption)}>IN PROGRESS</span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(96, 146, 162)'})}  className = {css(resp.legendOption)}>FINISHED   </span>
                  <span style={Object.assign({}, styles.rowContent, {background:'rgb(156, 99, 87)'})}   className = {css(resp.legendOption)}>BANNED     </span>
                </div>
                    <table className="" style={styles.table}>
                        <thead>
                        <tr>
                            <th key="all" style={styles.thead} className = {css(resp.theadElement)}>
                                <MultiCheckbox /></th>
                            <th onClick={()=>{this.sortByColumnName("name")             ; this.handleTheadClick("name"             )}} key="name"
                            style={styles.thead, (this.state.activeColumn === "name"             ) ?  styles.theadActive : styles.thead} className = {css(resp.theadElement)}>name {this.getArrowGlyph("name")}</th>
                            <th onClick={()=>{this.sortByColumnName("province.location"); this.handleTheadClick("province")}} key="province"
                            style={styles.thead, (this.state.activeColumn === "province") ? styles.theadActive : styles.thead } className          = {css(resp.theadElement)}>province {this.getArrowGlyph("province")}</th>
                            <th onClick={()=>{this.sortByColumnName("address.city")     ; this.handleTheadClick("city"     )}} key="city"
                            style={styles.thead, (this.state.activeColumn === "city"     ) ? styles.theadActive : styles.thead } className         = {css(resp.theadElement)}>city {this.getArrowGlyph("city")}</th>
                            <th onClick={()=>{this.sortByColumnName("game.name")        ; this.handleTheadClick("game"        )}} key="game"
                            style={styles.thead, (this.state.activeColumn === "game"        ) ? styles.theadActive : styles.thead } className      = {css(resp.theadElement)}>game {this.getArrowGlyph("game")}</th>
                            <th onClick={()=>{this.sortByColumnName("freeSlots")        ; this.handleTheadClick("players"        )}} key="players"
                            style={styles.thead, (this.state.activeColumn === "players"        ) ? styles.theadActive : styles.thead } className   = {css(resp.theadElement)}>players {this.getArrowGlyph("players")}</th>
                            <th onClick={()=>{this.sortByColumnName("dateOfStart")      ; this.handleTheadClick("date"      )}} key="date"
                            style={styles.thead, (this.state.activeColumn === "date"      ) ? styles.theadActive : styles.thead } className        = {css(resp.theadElement)}>date {this.getArrowGlyph("date")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
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
        textAlign: 'center',
        backgroundImage: '',
        WebkitBorderImage: '',
        color:'black',
        borderTopColor:'#dfd19e',
        borderBottomColor:'#886e4b',
        borderLeftColor:'#dfd19e',
        borderRightColor:'#886e4b',
        textShadow:' ',
        boxSizing: 'border-box',
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
        borderSpacing:'0px',
        position:'relative',
        background:'black',
        width: '90%',
        marginLeft:'5%',
        marginBottom:'4px',
        borderCollapse:'separate',
    },
    checkbox:{
        margin: '0',
        height:'10%',
        borderRight: '0px',
        textAlign: 'center',
    },
    name:{
      width:'90%',
    }


}

const resp = StyleSheet.create({
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
      margin:'0',
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

    tableRow:{
      '@media (max-width: 600px)': {
        display:'block',
        position:'relative',
      },
    },

    buttonGroup:{
      boxSizing:'border-box',
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

    rowContent:{
      boxSizing:'border-box',
      position:'relative',
      textAlign:'center',
      margin:'0',
      paddingTop:'8px',
      paddingBottom:'8px',
      '@media (max-width: 599px)': {
        width:'70%',
        paddingTop: '2%',
        paddingBottom: '2%',
        display: 'inline-block',
        borderRadius:'0'
      }
    },
    rowLabel:{
      boxSizing:'border-box',
       width:'30%',
       paddingTop: '2%',
       paddingBottom: '2%',
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
      height:'30%',
      width:'20%',
      margin:'0',
      paddingTop: '2%',
      paddingBottom: '2%',
      boxSizing:'border-box',
      '@media (min-width: 600px)': {
        display:'none',
      },
    },
    legend:{
      position:'relative',
      width:'90%',
      marginLeft:'5%',
      marginBottom:'10px',
      padding:'0',
    },

    legendOption:{
      display:'inline-block',
      position:'relative',
      width:'20%',
      paddingTop:'3px',
      paddingBottom:'3px',
      '@media (max-width: 600px)': {
        display:'inline-block',
        width:'100%',
        margin:'0',

      },
    },

    smallCheckbox:{
      boxSizing:'border-box',
      textAlign:'center',
      '@media (max-width: 599px)': {
        width:'10%',
        margin:'0',
        paddingTop: '2.5%',
        paddingBottom: '1.5%',
      }
    },
})
