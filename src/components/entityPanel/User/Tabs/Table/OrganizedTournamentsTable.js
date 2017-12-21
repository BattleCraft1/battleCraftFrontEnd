import React from 'react';
import {styles} from '../../../styles'
import DueltournamentTableRow from './Row/DuelTournamentTableRow'
import EmptyTableRow from './Row/EmptyTournamentTableRow'
import '../../../TableInputs/scrollbar.css'

export default class OrganizedtournamentsTable extends React.Component{
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
            this.actualizeRelatedEntityObjects(nextProps.relatedEntity.relatedEntities)
        }
    }

    actualizeRelatedEntityObjects(relatedEntities){
        let organizedtournaments = this.props.value;
        let relatedEntitiesNames = organizedtournaments.map(entity => entity.name);
        relatedEntities.forEach(
            elementName => {
                if(relatedEntitiesNames.indexOf(elementName)===-1){
                    organizedtournaments.push({
                        name:elementName,
                        accepted:false
                    })
                }
            }
        );
        relatedEntitiesNames.forEach(
            elementName => {
                if(relatedEntities.indexOf(elementName)===-1){
                    let organizerToDelete = organizedtournaments.find(element => element.name===elementName);
                    organizedtournaments.splice(organizedtournaments.indexOf(organizerToDelete),1);
                }
            }
        );
        this.props.changeEntity(this.props.fieldName,organizedtournaments);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(tournament =>
                <DueltournamentTableRow key={tournament.name}
                                        disabled = {this.props.disabled}
                                        delete = {this.deleteElement.bind(this)}
                                        accept = {this.acceptElement.bind(this)}
                                        accepted={tournament.accepted}
                                        name={tournament.name}/>
            )
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
