import React from 'react';
import {styles} from '../../../styles'
import DuelTournamentTableRow from './Row/DuelTournamentTableRow'
import EmptyTableRow from './Row/EmptyTournamentTableRow'
import TournamentDataInGroupTournamentRow from './Row/TournamentDataInGroupTournamentRow'
import EmptySecondPlayerInGroupRow from "./Row/EmptySecondPlayerInGroupRow";
import SecondPlayerDataInGroupTournamentRow from "./Row/SecondPlayerDataInGroupTournamentRow";
import '../../../TableInputs/scrollbar.css'

export default class TournamentsTableOutput extends React.Component{
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
            let outputTable = [];
            for(let i=0; i<this.props.value.length; i++){
                if(this.props.value[i].secondPlayerName === undefined){
                    outputTable.push(
                        <DuelTournamentTableRow key={this.props.value[i].name}
                                                disabled = {true}
                                                accepted={false}
                                                name={this.props.value[i].name}/>
                    )
                }
                else{
                    outputTable.push(
                        <TournamentDataInGroupTournamentRow
                            key={this.props.value[i].name}
                            disabled = {true}
                            accepted={false}
                            name={this.props.value[i].name}/>
                    );
                    if(this.props.value[i].secondPlayerName === ""){
                        outputTable.push(<EmptySecondPlayerInGroupRow key={'empty'+i} disabled={this.props.disabled}/>);
                    }
                    else{
                        outputTable.push(
                            <SecondPlayerDataInGroupTournamentRow
                                key={this.props.value[i].secondPlayerName}
                                name = {this.props.value[i].secondPlayerName}
                                disabled = {true}
                                accepted={false}
                            />)
                    }
                }
            }
            return outputTable;
        }
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
