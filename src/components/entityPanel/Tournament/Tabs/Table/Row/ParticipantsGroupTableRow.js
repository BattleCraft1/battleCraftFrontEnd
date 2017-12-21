import React from 'react';
import {css} from 'aphrodite';
import UserInGroupRow from './ParticipantInGroupRow'
import EmptyUserInGroupRow from './EmptyUserInGroupRow'
import {resp, styles} from '../../../../styles'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../../../redux/actions/index';
import  {Link}  from 'react-router-dom';

class ParticipantsGroupTableRow extends React.Component{

    startInviteParticipantsToGroup(){
        this.props.setOperations(["Invite","CancelInvite","Search"]);
        let invitedParticipantsNames = [];
        let invitedInThisGroup = [];

        for (let i = 0; i < this.props.group.length; i++) {
            if(this.props.group[i].name!==undefined)
                invitedInThisGroup.push(this.props.group[i].name);
        }

        for (let i = 0; i < this.props.invited.length; i++) {
            for (let j = 0; j < this.props.invited[i].length; j++) {
                if(this.props.invited[i][j].name!==undefined &&
                    invitedInThisGroup.indexOf(this.props.invited[i][j].name) === -1)
                invitedParticipantsNames.push(this.props.invited[i][j].name);
            }
        }

        let searchCriteria = [];
        searchCriteria.push({
            "keys": ["status"],
            "operation": ":",
            "value": ["ORGANIZER","ACCEPTED"]
        });

        if(invitedParticipantsNames.length>0)
            searchCriteria.push({
                "keys": ["name"],
                "operation": "not in",
                "value": invitedParticipantsNames
            });

        this.props.setRelatedEntity(
            invitedInThisGroup,
            "participantsGroup"+this.props.index,
            searchCriteria,
            2);
    }

    createRows(){
        let rows = [];
        if(this.props.group.length === 1){
            rows.push(this.createRow(this.props.group[0],0));
            rows.push(<EmptyUserInGroupRow disabled={this.props.disabled} key="empty"/>);
        }
        else{
            rows.push(this.createRow(this.props.group[0],0));
            rows.push(this.createRow(this.props.group[1],1));
        }
        return rows;
    }

    createRow(user,index){
        if(user.name !== undefined){
            return <UserInGroupRow
                index={this.props.index}
                disabled={this.props.disabled}
                key={user.name}
                name = {user.name}
                accepted = {user.accepted}
                deleteElement = {this.props.deleteElement}
            />
        }
        else{
            return <EmptyUserInGroupRow disabled={this.props.disabled} key={index}/>
        }
    }

    render(){
        return(
            <div style={{marginTop: '15px'}}>
                {!this.props.disabled &&
                <div>
                    <span onClick={() => this.props.deleteGroup(this.props.index)}
                        style={Object.assign({}, styles.tableCell, styles.tableButton,{padding:'10px 20px 10px 20px'})}
                        className={css(resp.tableButton)}>delete group</span>
                    <Link
                        to='/battleCraft/collectionsPanel/users'
                        onClick={() => this.startInviteParticipantsToGroup()}
                        style={Object.assign({}, styles.tableCell, styles.tableButton,{padding:'10px 20px 10px 20px'})}
                        className={css(resp.tableButton)}>invite group</Link>
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

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( ParticipantsGroupTableRow );
