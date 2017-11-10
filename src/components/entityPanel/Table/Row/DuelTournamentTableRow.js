import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../styles'

export default class DuelTournamentTableRow extends React.Component{
    render(){
        return(
            <table style={Object.assign( {}, styles.table, {marginTop:'5px'})}>
                <tbody>
                <tr>
                    <td style={Object.assign({}, styles.tableCell, this.props.accepted ?
                        {backgroundImage: 'linear-gradient(rgb(191, 226, 162), rgb(157, 186, 134), rgb(122, 147, 103))'}:{} , {width:'80%'} )}>
                        {this.props.name}</td>
                    {!this.props.disabled &&
                    <td onClick={() => this.props.accept(this.props.name)}
                        style={Object.assign({}, styles.tableCell, styles.tableButton, {width:'10%'})} className={css(resp.tableButton)}>
                        {this.props.accepted ? "reject":"accept"}</td>}
                    {!this.props.disabled &&
                    <td onClick={() => this.props.delete(this.props.name)}
                        style={Object.assign({}, styles.tableCell, styles.tableButton, {width:'10%'})} className={css(resp.tableButton)}>
                        delete</td>}
                </tr>
                </tbody>
            </table>
        )
    }
}
