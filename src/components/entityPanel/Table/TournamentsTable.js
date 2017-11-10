import React from 'react';
import {styles} from '../styles'
import DuelTournamentTableRow from './Row/DuelTournamentTableRow'
import GroupTournamentTableRow from './Row/GroupTournamentTableRow'
import EmptyTableRow from './Row/EmptyTournamentTableRow'
import './scrollbar.css'

export default class TournamentsTable extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            height:0
        }
    }

    componentDidMount() {
        const height = document.getElementById('container').clientHeight;
        this.setState({ height:height });
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                tournament => this.createTableRow(tournament)
            )
        }
    }

    createTableRow(tournament){
        if(tournament.secondPlayerName === undefined){
            return  <DuelTournamentTableRow key={tournament.name}
                                        disabled = {this.props.disabled}
                                        delete = {this.deleteElement.bind(this)}
                                        accept = {this.acceptElement.bind(this)}
                                        accepted={tournament.accepted}
                                        name={tournament.name}/>
        }
        else{
            return  <GroupTournamentTableRow key={tournament.name}
                                        disabled = {this.props.disabled}
                                        delete = {this.deleteElement.bind(this)}
                                        accept = {this.acceptElement.bind(this)}
                                        accepted={tournament.accepted}
                                        name={tournament.name}
                                        secondPlayerAccept={tournament.secondPlayerAccept}
                                        secondPlayerName={tournament.secondPlayerName}/>
        }

    }

    deleteElement(name){
        let elements = this.props.value;
        elements = elements.filter(tournament => {
            return tournament.name!==name
        });
        this.props.changeEntity(this.props.fieldName,elements)
    }

    acceptElement(name){
        let elements = this.props.value;
        let element = elements.find(tournament => {
            return tournament.name===name
        });
        element.accepted = !element.accepted
        this.props.changeEntity(this.props.fieldName,elements)
    }

    render(){
        let rows = this.createTableRows();

        return(
            <div style={{marginTop:'5px', boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

                <div style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell)}>{this.props.name}</div>
                <span style={{position:'relative',width:'20%'}}/>
                <div id="container" style={ this.state.height > 199 ? styles.scrollPanel:{}}>
                    {rows}
                </div>
            </div>
        )
    }
}
