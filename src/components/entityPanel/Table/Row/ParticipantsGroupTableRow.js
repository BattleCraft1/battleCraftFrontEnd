import React from 'react';
import {css} from 'aphrodite';
import UserInGroupRow from './ParticipantInGroupRow'
import EmptyUserInGroupRow from './EmptyUserInGroupRow'
import {resp, styles} from '../../styles'

export default class ParticipantsGroupTableRow extends React.Component{

    createRows(){
        let rows = [];
        if(this.props.group.length === 1){
            rows.push(this.createRow(this.props.group[0],1));
            rows.push(<EmptyUserInGroupRow disabled={true} key="empty"/>);
        }
        else{
            rows.push(this.createRow(this.props.group[0],1));
            rows.push(this.createRow(this.props.group[1],2));
        }
        return rows;
    }

    createRow(user,index){
        if(user.name !== undefined){
            return <UserInGroupRow
                disabled={true}
                key={user.name}
                name = {user.name}
                accepted = {user.accepted}
            />
        }
        else{
            return <EmptyUserInGroupRow disabled={true} key={index}/>
        }
    }

    render(){
        return(
            <div style={{marginTop: '15px'}}>
                {!this.props.disabled &&
                <div>
                    <span onClick={() => this.props.delete(this.props.index)}
                        style={Object.assign({}, styles.tableCell, styles.tableButton,{padding:'10px 20px 10px 20px'})}
                        className={css(resp.tableButton)}>delete group</span>
                    <span
                        style={Object.assign({}, styles.tableCell, styles.tableButton,{padding:'10px 20px 10px 20px'})}
                        className={css(resp.tableButton)}>invite</span>
                </div>}
                <table style={Object.assign( {}, styles.table)}>
                    <tbody>
                    {this.createRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
