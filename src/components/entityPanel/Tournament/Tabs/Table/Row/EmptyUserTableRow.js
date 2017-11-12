import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../../../styles'

export default class EmptyUserTableRow extends React.Component{
    render(){
        return(
            <tr>
                <td style={Object.assign({}, styles.tableCell, {width:'100%'} )}>Empty</td>
            </tr>
        )
    }
}
