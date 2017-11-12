import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../../../styles'
import {serverName} from "../../../../../../main/consts/server";
import { Link } from 'react-router-dom';

export default class EmptyUserInGroupRow extends React.Component{

    render(){
        return(
            <tr>
                <td style={Object.assign({}, styles.tableAvatarCell,
                    {backgroundImage: `url(${serverName}/get/user/avatar?username=default`})}/>
                <td style={Object.assign({}, styles.tableCell, {width:'100%'} )}>Empty</td>
                {!this.props.disabled &&
                <td colSpan={2} style={Object.assign({}, styles.tableCell, styles.tableButton)}
                    className={css(resp.tableButton)}>
                    <Link onClick={() => this.props.invite(this.props.tournament)} to='/collectionsPanel/users'>
                        <div style={{width:'100%',height:'100%',textDecoration:'none',color:'white'}}>
                            invite
                        </div>
                    </Link>
                </td>}
            </tr>
        )
    }
}
