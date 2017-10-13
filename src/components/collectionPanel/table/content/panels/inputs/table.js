import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'
import TableRow from './tableRow'
import '../scrollbar.css'

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

    render(){
        return(
          <div style={{ boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

            <div style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell)}>{this.props.name}</div><span style={{position:'relative',width:'20%'}}/>
            <div id="container" style={ this.state.height > 199 ? styles.scrollPanel:{}}>
            <table style={Object.assign( {}, styles.table)}>
            <TableRow accepted={true} playerName={"Tom"}/>
            <TableRow accepted={true} playerName={"Jerry"}/>
            <TableRow accepted={true} playerName={"Tom"}/>
            <TableRow accepted={true} playerName={"Jerry"}/>
            <TableRow accepted={true} playerName={"Tom"}/>
            <TableRow accepted={true} playerName={"Jerry"}/>
            <TableRow accepted={true} playerName={"Tom"}/>
            <TableRow accepted={true} playerName={"Jerry"}/>

            {this.props.rows}
            </table>
            </div>
          </div>
        )
    }
}
