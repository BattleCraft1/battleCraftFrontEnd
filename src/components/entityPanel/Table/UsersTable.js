import React from 'react';
import {styles} from '../styles'
import UserTableRow from './Row/UserTableRow'
import EmptyTableRow from './Row/EmptyTableRow'
import './scrollbar.css'

export default class UserTable extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            height:0
        }
    }

    componentDidMount() {
        const height = document.getElementById('container').clientHeight;
        this.setState({ height:height });
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                row => <UserTableRow key={row.name}
                                     disabled = {this.props.disabled}
                                     delete = {this.deleteElement.bind(this)}
                                     accepted={row.accepted}
                                     name={row.name}/>
            )
        }
    }

    deleteElement(name){
        let elements = this.props.value;
        elements = elements.filter(user => {
            return user.name!==name
        });
        this.props.changeEntity(this.props.fieldName,elements)
    }

    render(){
        let rows = this.createTableRows();

        return(
            <div style={{marginTop:'5px',  boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

                <div style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell)}>{this.props.name}</div>
                <span style={{position:'relative',width:'20%'}}/>
                <div id="container" style={ this.state.height > 199 ? styles.scrollPanel:{}}>
                    <table style={Object.assign( {}, styles.table)}>
                        {rows}
                    </table>
                </div>
            </div>
        )
    }
}
