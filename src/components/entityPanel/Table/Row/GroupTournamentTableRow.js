import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../../styles'
import DuelTournamentTableRow from './DuelTournamentTableRow'
import EmptyUserInGroupRow from "./EmptyUserInGroupRow";
import ParticipantInGroupRow from "./ParticipantInGroupRow";

export default class GroupTournamentTableRow extends React.Component{

    createUserRow(){
        if(this.props.secondPlayerName === ""){
            return <EmptyUserInGroupRow disabled={this.props.disabled}/>
        }
        else{
            return <ParticipantInGroupRow
                name = {this.props.secondPlayerName}
                accepted = {this.props.secondPlayerAccept}
                disabled = {this.props.disabled}
            />
        }
    }

    render(){
        return(
            <div>
                <DuelTournamentTableRow disabled = {this.props.disabled}
                                        delete = {this.props.deleteElement}
                                        accept = {this.props.acceptElement}
                                        accepted={this.props.accepted}
                                        name={this.props.name}/>
                <table style={Object.assign( {}, styles.table)}>
                    <tbody>
                    {this.createUserRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}
