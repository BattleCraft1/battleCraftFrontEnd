import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../styles'

export default class EmptyTournamentTableRow extends React.Component{
    render(){
        return(
            <table style={Object.assign( {}, styles.table)}>
                <tbody>
                <tr>
                    <td style={Object.assign({}, styles.tableCell, {width:'100%'} )}>Empty</td>
                </tr>
                </tbody>
            </table>
        )
    }
}
