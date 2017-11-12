import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../../../styles'
import {serverName} from "../../../../../../main/consts/server";

export default class EmptyUserInGroupRow extends React.Component{

    createTd(){
        if(!this.props.disabled){
            return <td colSpan={2} style={Object.assign({}, styles.tableCell, {width:'100%'} )}>Empty</td>
        }
        else {
            return <td style={Object.assign({}, styles.tableCell, {width:'100%'} )}>Empty</td>
        }
    }

    render(){
        return(
            <tr>
                <td style={Object.assign({}, styles.tableAvatarCell,
                    {backgroundImage: `url(${serverName}/get/user/avatar?username=default`})}/>
                {this.createTd()}
            </tr>
        )
    }
}
