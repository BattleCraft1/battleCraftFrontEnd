import axios from 'axios';
import React from 'react';


class CollectionList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            config: {},
            pageOfCollection: {},
            getCollectionPageRequest: {pageRequest:{
                size:10,
                page:0,
                direction: "ASC",
                property: "name"
            },
                searchCriteria:[
                ]
            },
            checkedElementsUniqueNames:[]
        };
    }

    componentDidMount() {
        this.getConfigRequest();
        this.getPageRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.collectionType !== this.props.collectionType || nextProps.collectionType !== undefined) {
            this.props.collectionType=nextProps.collectionType;
            this.getConfig(this.props.collectionType);
            this.getPage(this.props.collectionType);
        }
    }

    getConfigRequest(){
        axios.get(`http://localhost:8080/config/`+this.props.collectionType)
            .then(res => {
                console.log(res.data);
                this.setState({config: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getPageRequest(){
        axios.post(`http://localhost:8080/page/`+this.props.collectionType,this.state.getCollectionPageRequest)
            .then(res => {
                console.log(res.data);
                this.setState({pageOfCollection: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    sortByColumnName(columnName){
        let getCollectionPageRequest=this.state.getCollectionPageRequest;
        getCollectionPageRequest.pageRequest.property=columnName;
        getCollectionPageRequest.pageRequest.direction=getCollectionPageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.setState({getCollectionPageRequest:getCollectionPageRequest});
        this.getPageRequest();
    }

    addToCheckedElements(elementUniqueName){
        console.log("added "+elementUniqueName);
        let checkedElementsUniqueNames=this.state.checkedElementsUniqueNames;
        checkedElementsUniqueNames.push(elementUniqueName);
        this.setState({checkedElementsUniqueNames:checkedElementsUniqueNames});
    }

    removeFromCheckedElements(elementUniqueName){
        console.log("removed "+elementUniqueName);
        let checkedElementsUniqueNames=this.state.checkedElementsUniqueNames;
        checkedElementsUniqueNames.splice(1,checkedElementsUniqueNames.indexOf(elementUniqueName));
        this.setState({checkedElementsUniqueNames:checkedElementsUniqueNames});
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
                this.getPageRequest();
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
                this.getPageRequest();
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
                this.getPageRequest();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    prepareColumnsOfTable(columns)
    {
        columns.push(<th key="all"><input type="checkbox" value=""/></th>);
        this.state.config.columns.map(
            column =>
                columns.push(<th onClick={()=>this.sortByColumnName(column.keys.join("."))} key={column.name}>{column.name}</th>)
        );
    }

    prepareRowsOfTable(columns,rows,key){
        this.state.pageOfCollection.content.map(
            element =>{
                key++;
                let fields =[];
                fields.push(<th key={"th:"+key} scope="row"><Checkbox addElement={this.addToCheckedElements.bind(this)} removeElement={this.removeFromCheckedElements.bind(this)} index={element[this.state.config.uniqueColumn]}/></th>);
                this.state.config.columns.map(
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

        if(this.state.config.columns!==undefined)
        {
            this.prepareColumnsOfTable(columns);

            if(this.state.pageOfCollection.content!==undefined)
            {
                this.prepareRowsOfTable(columns,rows,key);
            }
        }

        return (
            <div>
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
                    <button type="button" onClick={() => this.deleteCheckedElements()} className="btn btn-default">Delete <span className="glyphicon glyphicon-minus"></span></button>
                </div>
            </div>
        );
    }
};

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:true,
        };
    }

    render(){
        return(
            <input type="checkbox" onChange={() => {
                let checked=this.state.checked;
                checked=!checked;
                this.setState({checked:checked});
                if(this.state.checked)
                    this.props.addElement(this.props.index);
                else
                    this.props.removeElement(this.props.index);
            }} value=""/>
        );
    }
}

export default CollectionList;
