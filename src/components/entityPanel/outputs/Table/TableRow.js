import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../styles'

export default class TableRow extends React.Component{
    render(){
        return(
            <tr>
                <td style={Object.assign({}, styles.tableCell, {backgroundImage: 'linear-gradient(rgb(191, 226, 162), rgb(157, 186, 134), rgb(122, 147, 103))'} , {width:'80%'} )}>
                    {this.props.name}</td>
            </tr>
        )
    }
}
