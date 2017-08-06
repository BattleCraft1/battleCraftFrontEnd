import { ActionCreators } from '../../../../redux/actions/index';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import {serverName} from '../../../../consts/server';
import {StyleSheet, css} from 'aphrodite';

import dateFormat from 'dateformat';

class CollectionList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            checkedElementsUniqueNames:[],
            checkedAll:false
        };
    }

    sortByColumnName(columnName){
        let pageRequest=this.props.pageRequest;
        pageRequest.pageRequest.property=columnName;
        pageRequest.pageRequest.direction=pageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest();
    }

    addToCheckedElements(elementUniqueName){
        console.log("add "+elementUniqueName);
        let checkedElementsUniqueNames=this.state.checkedElementsUniqueNames;
        checkedElementsUniqueNames.push(elementUniqueName);
        this.setState({checkedElementsUniqueNames:checkedElementsUniqueNames});
    }

    removeFromCheckedElements(elementUniqueName){
        console.log("remove "+elementUniqueName);
        let checkedElementsUniqueNames=this.state.checkedElementsUniqueNames;
        checkedElementsUniqueNames.splice(1,checkedElementsUniqueNames.indexOf(elementUniqueName));
        this.setState({checkedElementsUniqueNames:checkedElementsUniqueNames});
    }


    checkAllElements(){
        console.log("checked all");
        let checkedElementsUniqueNames=this.state.checkedElementsUniqueNames;
        this.props.page.content.map(
            element => {checkedElementsUniqueNames.indexOf(element.name) === -1 ? checkedElementsUniqueNames.push(element.name): console.log();}
        );
        this.setState({checkedElementsUniqueNames:checkedElementsUniqueNames});
        this.setState({checkedAll:true});
    }

    uncheckAllElements(){
        console.log("unchecked all");
        let checkedElementsUniqueNames=this.state.checkedElementsUniqueNames;
        checkedElementsUniqueNames=[];
        this.setState({checkedElementsUniqueNames:checkedElementsUniqueNames});
        this.setState({checkedAll:false});
    }

    addNewElement(){
//to do
    }

    editCheckedElements(){
//to do
    }

    banCheckedElements(){
        if(this.state.checkedElementsUniqueNames.length>0){
            const checkedElementsUniqueNames = this.state.checkedElementsUniqueNames;
            const collectionType = this.props.collectionType;
            const getPageRequest = this.props.getPageRequest;
            this.props.showConfirmationDialog(
                {
                    header:"Ban checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction:function(){
                        axios.post(serverName+`ban/`+collectionType,checkedElementsUniqueNames)
                            .then(res => {
                                console.log(res.data);
                                getPageRequest();
                            })
                            .catch(function (error) {
                                console.log(error);
                            })},
                    isShown: true
                });
        }
    }

    unlockCheckedElements(){
        if(this.state.checkedElementsUniqueNames.length>0){
            const checkedElementsUniqueNames = this.state.checkedElementsUniqueNames;
            const collectionType = this.props.collectionType;
            const getPageRequest = this.props.getPageRequest;
            this.props.showConfirmationDialog(
                {
                    header:"Unlock checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction:function(){axios.post(serverName+`unlock/`+collectionType,checkedElementsUniqueNames)
                        .then(res => {
                            console.log(res.data);
                            getPageRequest();
                        })
                        .catch(function (error) {
                            console.log(error);
                        })},
                    isShown: true
                });
        }
    }

    deleteCheckedElements(){
        if(this.state.checkedElementsUniqueNames.length>0){
            const checkedElementsUniqueNames = this.state.checkedElementsUniqueNames;
            const collectionType = this.props.collectionType;
            const getPageRequest = this.props.getPageRequest;
            const checkAllElements = this.checkAllElements;
            const uncheckAllElements = this.uncheckAllElements;
            this.props.showConfirmationDialog(
                {
                    header:"Delete checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction:function(){axios.post(serverName+`delete/`+collectionType,checkedElementsUniqueNames)
                        .then(res => {
                            console.log(res.data);
                            getPageRequest();
                            checkAllElements();
                            uncheckAllElements();
                        })
                        .catch(function (error) {
                            console.log(error);
                        })},
                    isShown: true
                });
        }
    }

    acceptCheckedElements(){
        if(this.state.checkedElementsUniqueNames.length>0){
            const checkedElementsUniqueNames = this.state.checkedElementsUniqueNames;
            const collectionType = this.props.collectionType;
            const getPageRequest = this.props.getPageRequest;
            this.props.showConfirmationDialog(
                {
                    header:"Accept checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction:function(){axios.post(serverName+`accept/`+collectionType,checkedElementsUniqueNames)
                        .then(res => {
                            console.log(res.data);
                            getPageRequest();
                        })
                        .catch(function (error) {
                            console.log(error);
                        })},
                    isShown: true
                });
        }
    }

    cancelAcceptCheckedElements(){
        if(this.state.checkedElementsUniqueNames.length>0){
            const checkedElementsUniqueNames = this.state.checkedElementsUniqueNames;
            const collectionType = this.props.collectionType;
            const getPageRequest = this.props.getPageRequest;
            this.props.showConfirmationDialog(
                {
                    header:"Cancel accept checked tournaments",
                    message:"Are you sure?",
                    onConfirmFunction:function(){axios.post(serverName+`cancel/accept/`+collectionType,checkedElementsUniqueNames)
                        .then(res => {
                            console.log(res.data);
                            getPageRequest();
                        })
                        .catch(function (error) {
                            console.log(error);
                        })},
                    isShown: true
                });
        }
    }


    prepareRowsOfTable(rows,key){
        this.props.page.content.map(
            tournament =>{
                key++;
                rows.push(
                    <tr key={"tr:"+key}
                        className={tournament.banned?"danger":tournament.active?"warning":tournament.accepted?"success":""}>
                        <th key={"th:"+key} scope="row" style = {Object.assign({}, styles.thead, styles.checkbox, {borderRadius: '0px'})}>
                            <Checkbox checkedAll={this.state.checkedAll}
                                                                  checkFunction={this.addToCheckedElements.bind(this)}
                                                                  uncheckFunction={this.removeFromCheckedElements.bind(this)}
                                                                  index={tournament.name}/></th>
                        <td key={"td:name:"+key} style={Object.assign({}, styles.thead, styles.rowContent)} >{tournament.name}</td>
                        <td key={"td:province"+key}  style={Object.assign({}, styles.thead, styles.rowContent)}>{tournament.province}</td>
                        <td key={"td:city"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>{tournament.city}</td>
                        <td key={"td:game"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>{tournament.game}</td>
                        <td key={"td:players"+key} style={Object.assign({}, styles.thead, styles.rowContent, {textAlign:"center"})}>{tournament.playersNumber}/{tournament.maxPlayers}</td>
                        <td key={"td:date"+key} style={Object.assign({}, styles.thead, styles.rowContent, {textAlign:"center"})}>{dateFormat((new Date(tournament.dateOfStart)),"dd-MM-yyyy hh:mm")}</td>
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
                                <Checkbox checkFunction={this.checkAllElements.bind(this)}
                                                    uncheckFunction={this.uncheckAllElements.bind(this)} /></th>
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
                        <button type="button" className="btn btn-default">Add <span className="glyphicon glyphicon-plus"/></button>
                        <button type="button" className="btn btn-default">Edit <span className="glyphicon glyphicon-pencil"/></button>
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

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checkedAll !== this.props.checkedAll) {
            if(this.props.checkedAll===true)
                this.setState({checked:true});
            else
                this.setState({checked:false});
        }
    }

    render(){
        return(
            <input type="checkbox"
                   onClick={
                       () => {
                           let checked=this.state.checked;
                           checked=!checked;
                           this.setState({checked:checked});
                           if(this.state.checked)
                               this.props.checkFunction(this.props.index);
                           else
                               this.props.uncheckFunction(this.props.index);
                       }
                   }
                   checked={!this.state.checked}/>
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
