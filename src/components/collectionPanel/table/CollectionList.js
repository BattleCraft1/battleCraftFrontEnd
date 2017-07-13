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
        let fields = [];

        if(this.state.config.columnsNames!==undefined)
        {
            columns.push(<th>#</th>);
            this.state.config.columnsNames.map(
                columnName =>
                    columns.push(<th>{columnName}</th>)
            );

            if(this.state.pageOfCollection.content!==undefined)
            {
                this.state.pageOfCollection.content.map(
                    element =>
                rows.push(
                    <tr>
                        {fields.push(<th scope="row">1</th>)};
                        {this.state.config.columnsNames.map(
                            columnName =>
                                fields.push(<td>{element[columnName]}</td>)
                        )
                        };
                        {fields};
                        {fields.clear};
                    </tr>
                )
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
