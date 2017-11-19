import React from 'react';
import {styles} from '../../../styles'
import DuelTournamentTableRow from './Row/DuelTournamentTableRow'
import EmptyTableRow from './Row/EmptyTournamentTableRow'
import TournamentDataInGroupTournamentRow from './Row/TournamentDataInGroupTournamentRow'
import EmptySecondPlayerInGroupRow from "./Row/EmptySecondPlayerInGroupRow";
import SecondPlayerDataInGroupTournamentRow from "./Row/SecondPlayerDataInGroupTournamentRow";
import '../../../TableInputs/scrollbar.css'

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.hidden === false &&
            this.props.hidden === true && nextProps.relatedEntity.operationCanceled === false) {
            if(nextProps.relatedEntity.relatedEntityType==='participatedTournaments')
                this.actualizeParticipants(nextProps.relatedEntity.relatedEntities);
            else
                this.actualizeSecondPlayerInGroup(nextProps.relatedEntity.relatedEntityType,nextProps.relatedEntity.relatedEntities);
        }
    }

    actualizeParticipants(relatedEntities){
        let participatedTournaments = this.props.value;
        let participatedTournamentsNames = participatedTournaments.map(entity => entity.name);
        let relatedEntitiesNames = relatedEntities.map(entity => entity.name);
        relatedEntities.forEach(
            element => {
                if(participatedTournamentsNames.indexOf(element.name)===-1){
                    if(element.playersOnTableCount === 4)
                        participatedTournaments.push({
                            secondPlayerName: "",
                            secondPlayerAccept: false,
                            name: element.name,
                            accepted: false
                        });
                    else
                        participatedTournaments.push({
                            name: element.name,
                            accepted: false
                        })
                }
            }
        );
        participatedTournamentsNames.forEach(
            elementName => {
                if(relatedEntitiesNames.indexOf(elementName)===-1){
                    participatedTournaments = participatedTournaments.filter(element => element.name!==elementName);
                }
            }
        );
        this.props.changeEntity(this.props.fieldName,participatedTournaments);
    }

    actualizeSecondPlayerInGroup(tournamentNameMarker,secondPlayerName){
        let tournamentName = tournamentNameMarker.replace("secondPlayerFor", "");
        let tournament = this.props.value.find(tournament => tournament.name === tournamentName);
        if(tournament.hasOwnProperty("secondPlayerName"));
        tournament.secondPlayerName = secondPlayerName[0];
        this.props.changeEntity(this.props.fieldName,this.props.value);
    }

    deletePlayerFromGroupTournament(tournamentName){
        let participatedTournaments = this.props.value;
        for(let index in participatedTournaments){
            if(participatedTournaments[index].name === tournamentName){
                participatedTournaments[index].secondPlayerName = "";
                participatedTournaments[index].secondPlayerAccept = false;
            }
        }
        this.props.changeEntity(this.props.fieldName,participatedTournaments);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            let outputTable = [];
            for(let i=0; i<this.props.value.length; i++){
                if(this.props.value[i].secondPlayerName === undefined){
                    outputTable.push(
                        <DuelTournamentTableRow key={this.props.value[i].name+i}
                                                disabled = {this.props.disabled}
                                                delete = {this.deleteElement.bind(this)}
                                                accept = {this.acceptElement.bind(this)}
                                                accepted={this.props.value[i].accepted}
                                                name={this.props.value[i].name}/>
                    )
                }
                else{
                    outputTable.push(
                        <TournamentDataInGroupTournamentRow
                            key={this.props.value[i].name+i}
                            disabled = {this.props.disabled}
                            delete = {this.deleteElement.bind(this)}
                            accept = {this.acceptElement.bind(this)}
                            accepted={this.props.value[i].accepted}
                            name={this.props.value[i].name}/>
                    );
                    if(this.props.value[i].secondPlayerName === ""){
                        outputTable.push(<EmptySecondPlayerInGroupRow
                            invite={this.props.inviteSecondPlayer}
                            key={'empty'+i}
                            tournament={this.props.value[i].name}
                            disabled={this.props.disabled}/>);
                    }
                    else{
                        outputTable.push(
                            <SecondPlayerDataInGroupTournamentRow
                                deleteElement={this.deletePlayerFromGroupTournament.bind(this)}
                                tournament={this.props.value[i].name}
                                key={this.props.value[i].secondPlayerName+i}
                                name = {this.props.value[i].secondPlayerName}
                                accepted = {this.props.value[i].secondPlayerAccept}
                                disabled = {this.props.disabled}
                            />)
                    }
                }
            }
            return outputTable;
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
        element.accepted = !element.accepted;
        this.props.changeEntity(this.props.fieldName,elements)
    }

    render(){
        let rows = this.createTableRows();

        return(
            <div style={{marginTop:'5px', boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

                <div style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell)}>{this.props.name}</div>
                <span style={{position:'relative',width:'20%'}}/>
                <div id="container" style={ this.state.height > 199 ? styles.scrollPanel:{}}>
                    <table style={Object.assign( {}, styles.table)}>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
