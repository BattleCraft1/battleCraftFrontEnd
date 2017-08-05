import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../../redux/actions/index';
import {serverName} from '../../../../consts/server';


class CollectionList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            checkedElementsUniqueNames:[],
            checkedAll:false,
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

    }

    editCheckedElements(){

    }

    banCheckedElements(){
        console.log("ban "+this.state.checkedElementsUniqueNames);
        axios.post(serverName+`ban/tournaments`,this.state.checkedElementsUniqueNames)
            .then(res => {
                console.log(res.data);
                this.props.getPageRequest();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    unlockCheckedElements(){
        console.log("ban "+this.state.checkedElementsUniqueNames);
        axios.post(serverName+`unlock/`+this.props.collectionType,this.state.checkedElementsUniqueNames)
            .then(res => {
                console.log(res.data);
                this.props.getPageRequest();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteCheckedElements(){
        console.log("delete "+this.state.checkedElementsUniqueNames);
        axios.post(serverName+`delete/`+this.props.collectionType,this.state.checkedElementsUniqueNames)
            .then(res => {
                console.log(res.data);
                this.props.getPageRequest();
                this.checkAllElements();
                this.uncheckAllElements();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    acceptCheckedElements(){
        axios.post(serverName+`accept/`+this.props.collectionType,this.state.checkedElementsUniqueNames)
            .then(res => {
                console.log(res.data);
                this.props.getPageRequest();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    cancelAcceptCheckedElements(){
        axios.post(serverName+`cancel/accept/`+this.props.collectionType,this.state.checkedElementsUniqueNames)
            .then(res => {
                console.log(res.data);
                this.props.getPageRequest();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    prepareRowsOfTable(rows,key){

        this.props.page.content.map(
            tournament =>{
                key++;
                rows.push(
                    <tr key={"tr:"+key} style={{color:"black"}}
                        className={tournament.banned?"danger":tournament.active?"warning":tournament.accepted?"success":""}>
                        <th key={"th:"+key} scope="row"><Checkbox checkedAll={this.state.checkedAll}
                                                                  checkFunction={this.addToCheckedElements.bind(this)}
                                                                  uncheckFunction={this.removeFromCheckedElements.bind(this)}
                                                                  index={"name"}/></th>
                        <td key={"td:name:"+key} >{tournament.name}</td>
                        <td key={"td:province"+key} >{tournament.province}</td>
                        <td key={"td:city"+key} >{tournament.city}</td>
                        <td key={"td:game"+key} >{tournament.game}</td>
                        <td key={"td:players"+key} >{tournament.playersNumber}/{tournament.maxPlayers}</td>
                        <td key={"td:date"+key} >{tournament.dateOfStart}</td>
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
            <div className="row">
                <table className="table bg-primary">
                    <thead>
                    <tr>
                        <th key="all"><Checkbox checkFunction={this.checkAllElements.bind(this)}
                                                uncheckFunction={this.uncheckAllElements.bind(this)} /></th>
                        <th onClick={()=>this.sortByColumnName("name")} key="name">name</th>
                        <th onClick={()=>this.sortByColumnName("province.location")} key="province">province</th>
                        <th onClick={()=>this.sortByColumnName("address.city")} key="city">city</th>
                        <th onClick={()=>this.sortByColumnName("game.name")} key="class">game</th>
                        <th onClick={()=>this.sortByColumnName("freeSlots")} key="players">players</th>
                        <th onClick={()=>this.sortByColumnName("dateOfStart")} key="date">date</th>
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
        );
    }
};

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
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionList );
