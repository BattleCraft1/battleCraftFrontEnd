import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../../../styles'
import TableRow from './UsersTableRow'
import './scrollbar.css'

export default class Table extends React.Component{
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
        return this.props.value.map(
            row => <TableRow key={row.invitatedUserName}
                             deleteUser = {this.deleteUser.bind(this)}
                             accepted={row.accepted}
                             playerName={row.invitatedUserName}/>
        )
    }

    deleteUser(userName){
        let users = this.props.value;
        users = users.filter(user => {
            return user.invitatedUserName!==userName
        });
        this.props.changeEntity(this.props.fieldName,users)
    }

    render(){
        let rows = this.createTableRows();

        return(
            <div style={{ boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

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
