import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'
import TableRow from './tableRow'

export default class Table extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <table style={styles.table}>
            <th style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell, {width:'80%'})}>{this.props.name}</th><th style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell, {width:'20%'})}>Delete</th>
            <TableRow accepted={true} playerName={"Tom"}/>
            <TableRow accepted={true} playerName={"Jerry"}/>
            <TableRow accepted={true} playerName={"Phill"}/>
            <TableRow accepted={false} playerName={"Lucas"}/>
            {this.props.rows}
            </table>
        )
    }
}
