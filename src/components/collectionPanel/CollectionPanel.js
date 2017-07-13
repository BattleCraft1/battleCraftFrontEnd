import axios from 'axios';
import React from 'react';
import CollectionList from './table/CollectionList';


class CollectionPanel extends React.Component{
    componentDidMount() {
        axios.get(`http://localhost:8080/`)
            .then(res => {
                console.log(res.data);
                const tournaments = res.data;
                this.setState({ tournaments });
            });
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1 col-md-2 col-lg-2">
                    </div>
                    <div className="col-sm-10 col-md-8 col-lg-8">
                        <CollectionList collectionType={this.props.match.params.collectionType}/>
                    </div>
                    <div className="col-sm-1 col-md-2 col-lg-2">
                    </div>
                </div>
            </div>
        );
    }
};

export default CollectionPanel;
