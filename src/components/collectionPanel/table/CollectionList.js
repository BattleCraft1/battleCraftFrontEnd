import axios from 'axios';
import React from 'react';


class CollectionList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            config: {},
            pageOfCollection: {}
        };
    }

    componentDidMount() {
        this.getConfig(this.props.collectionType);
        this.getPage(this.props.collectionType);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.collectionType !== this.props.collectionType || nextProps.collectionType !== undefined) {
            this.props.collectionType=nextProps.collectionType;
            this.getConfig(this.props.collectionType);
            this.getPage(this.props.collectionType);
        }
    }

    getConfig(nameOfCollection){
        axios.get(`http://localhost:8080/config/`+nameOfCollection)
            .then(res => {
                console.log(res.data);
                this.setState({config: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getPage(nameOfCollection){
        axios.post(`http://localhost:8080/page/`+nameOfCollection,{pageRequest:{
            size:10,
            page:0,
            direction: "ASC",
            property: "name"
        },
            searchCriteria:[
            ]
        })
            .then(res => {
                console.log(res.data);
                this.setState({pageOfCollection: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render(){
        let columns = [];
        let rows = [];
        let key =0;

        if(this.state.config.columns!==undefined)
        {
            columns.push(<th key="#">#</th>);
            this.state.config.columns.map(
                column =>
                    columns.push(<th key={column.name}>{column.name}</th>)
            );

            if(this.state.pageOfCollection.content!==undefined)
            {
                this.state.pageOfCollection.content.map(
                    element =>{
                        key++;
                        console.log(element);
                        let fields =[];
                        fields.push(<th key={"th:"+key} scope="row">{key}</th>);
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
        }

        return (
            <table className="table table-striped">
                <thead className="thead-inverse">
                <tr>
                    {columns}
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
};

export default CollectionList;
