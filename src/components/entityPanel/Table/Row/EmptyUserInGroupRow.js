import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../styles'
import {serverName} from "../../../../main/consts/server";

export default class EmptyUserInGroupRow extends React.Component{
    render(){
        return(
            <tr>
                <td style={Object.assign({}, styles.tableAvatarCell,
                    {backgroundImage: `url(${serverName}/get/user/avatar?username=default`})}/>
                <td style={Object.assign({}, styles.tableCell,
                    !this.props.disabled?{width:'80%'}:{width:'100%'} )}>Empty</td>
                {!this.props.disabled && <td style={Object.assign({}, styles.tableCell, styles.tableButton)} className={css(resp.tableButton)}>invite</td>}
            </tr>
        )
    }
}
