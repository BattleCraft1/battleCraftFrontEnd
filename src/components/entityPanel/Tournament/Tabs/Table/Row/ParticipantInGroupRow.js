import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../../../styles'
import {serverName} from "../../../../../../main/consts/server";

export default class ParticipantInGroupRow extends React.Component{
    render(){
        return(
            <tr>
                <td style={Object.assign({}, styles.tableAvatarCell,
                    {backgroundImage: `url(${serverName}/get/user/avatar?username=${this.props.name}`})}/>
                <td style={Object.assign({}, styles.tableCell, this.props.accepted ?
                    {backgroundImage: 'linear-gradient(rgb(191, 226, 162), rgb(157, 186, 134), rgb(122, 147, 103))'}:{} ,
                    !this.props.disabled?{width:'80%'}:{width:'100%'} )}>
                    {this.props.name}</td>
                {!this.props.disabled &&
                <td style={Object.assign({}, styles.tableCell, styles.tableButton)}
                    onClick={() => this.props.deleteElement(this.props.index,this.props.name)}
                    className={css(resp.tableButton)}>delete</td>}
            </tr>
        )
    }
}
