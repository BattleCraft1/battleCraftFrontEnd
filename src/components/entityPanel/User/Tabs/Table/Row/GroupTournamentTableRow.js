import React from 'react';
import {css} from 'aphrodite';
import TournamentDataInGroupTournamentRow from './TournamentDataInGroupTournamentRow'
import EmptySecondPlayerInGroupRow from "./EmptySecondPlayerInGroupRow";
import SecondPlayerDataInGroupTournamentRow from "./SecondPlayerDataInGroupTournamentRow";

export default class GroupTournamentTableRow extends React.Component{

    createUserRow(){
        if(this.props.secondPlayerName === ""){
            return <EmptySecondPlayerInGroupRow disabled={this.props.disabled}/>
        }
        else{
            return <SecondPlayerDataInGroupTournamentRow
                name = {this.props.secondPlayerName}
                accepted = {this.props.secondPlayerAccept}
                disabled = {this.props.disabled}
            />
        }
    }



    render(){
        return(<TournamentDataInGroupTournamentRow disabled = {this.props.disabled}
                                        delete = {this.props.deleteGroup}
                                        accept = {this.props.acceptElement}
                                        accepted={this.props.accepted}
                                        name={this.props.name}/>,
                this.createUserRow()
        )
    }
}
