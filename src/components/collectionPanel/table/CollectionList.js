import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions';


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
            element => {checkedElementsUniqueNames.indexOf(element[this.props.config.uniqueColumn]) === -1 ? checkedElementsUniqueNames.push(element[this.props.config.uniqueColumn]): console.log();}
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
        axios.post(`http://localhost:8080/ban/`+this.props.collectionType,this.state.checkedElementsUniqueNames)
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
        axios.post(`http://localhost:8080/unlock/`+this.props.collectionType,this.state.checkedElementsUniqueNames)
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
        axios.post(`http://localhost:8080/delete/`+this.props.collectionType,this.state.checkedElementsUniqueNames)
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

    prepareColumnsOfTable(columns)
    {
        columns.push(<th key="all"><Checkbox checkFunction={this.checkAllElements.bind(this)} uncheckFunction={this.uncheckAllElements.bind(this)} /></th>);
        this.props.config.columns.map(
            column =>
                columns.push(<th onClick={()=>this.sortByColumnName(column.keys.join("."))} key={column.name}>{column.name}</th>)
        );
    }

    prepareRowsOfTable(columns,rows,key){

        this.props.page.content.map(
            element =>{
                key++;
                let fields =[];
                fields.push(<th key={"th:"+key} scope="row"><Checkbox checkedAll={this.state.checkedAll} checkFunction={this.addToCheckedElements.bind(this)} uncheckFunction={this.removeFromCheckedElements.bind(this)} index={element[this.props.config.uniqueColumn]}/></th>);
                this.props.config.columns.map(
                    column =>{
                        let fieldContent;
                        let elementCopy=(element);
                        column.keys.map(
                            key => {
                                fieldContent=elementCopy[key];
                                elementCopy=elementCopy[key];
                            }
                        );
                        fields.push(<td key={"td:"+column.name} >{fieldContent}</td>)}
                );
                rows.push(
                    <tr key={"th:"+key}>
                        {fields}
                    </tr>
                );
            }
        );
    }


    render(){
        let columns = [];
        let rows = [];
        let key = 0;

        if(this.props.config.columns!==undefined)
        {
            this.prepareColumnsOfTable(columns);

            if(this.props.page.content!==undefined)
            {
                this.prepareRowsOfTable(columns,rows,key);
            }
        }

        return (
            <div className="row">
                <table className="table bg-primary">
                    <thead>
                    <tr>
                        {columns}
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="btn-group">
                    <button type="button" className="btn btn-default">Add <span className="glyphicon glyphicon-plus"></span></button>
                    <button type="button" className="btn btn-default">Edit <span className="glyphicon glyphicon-pencil"></span></button>
                    <button type="button" onClick={() => this.banCheckedElements()}className="btn btn-default">Ban <span className="glyphicon glyphicon-lock"></span></button>
                    <button type="button" onClick={() => this.unlockCheckedElements()} className="btn btn-default">Unlock <span className="glyphicon glyphicon-list-alt"></span></button>
                    <button type="button" onClick={() => {this.deleteCheckedElements();}} className="btn btn-default">Delete <span className="glyphicon glyphicon-minus"></span></button>
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
        config: state.config,
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionList );
