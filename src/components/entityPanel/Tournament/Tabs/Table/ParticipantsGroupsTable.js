import React from 'react';
import {styles} from '../../../styles'
import UsersGroupTableRow from './Row/ParticipantsGroupTableRow'
import EmptyTableRow from '../../../User/Tabs/Table/Row/EmptyTournamentTableRow'
import '../../../TableInputs/scrollbar.css'

export default class ParticipantsGroupsTable extends React.Component{
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
            this.actualizeRelatedEntityObjects(
                nextProps.relatedEntity.relatedEntityType,
                nextProps.relatedEntity.relatedEntities)
        }
    }

    actualizeRelatedEntityObjects(relatedEntityType,relatedEntities){
        let index = parseInt(relatedEntityType.replace("participantsGroup", ""));
        let participants = this.props.value[index];
        let invitedParticipantsNames = [];

        for (let i = 0; i < 2; i++) {
            if(participants[i]!==undefined)
                invitedParticipantsNames.push(participants[i].name);
            else
                invitedParticipantsNames.push("");
        }

        relatedEntities.forEach(
            elementName => {
                if(invitedParticipantsNames.indexOf(elementName)===-1){
                    participants.push({
                        name:elementName,
                        accepted:false
                    })
                }
            }
        );

        invitedParticipantsNames.forEach(
            elementName => {
                if(relatedEntities.indexOf(elementName)===-1){
                    for (let i = 0; i < participants.length; i++) {
                        if(participants[i].name===elementName){
                            participants.splice(i,1);
                        }
                    }

                }
            }
        );

        this.props.changeEntity(this.props.fieldName,this.props.value);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                (group,index) => <UsersGroupTableRow key={index}
                                                     group={group}
                                                     index={index}
                                                     invited = {this.props.value}
                                                     disabled = {this.props.disabled}
                                                     deleteGroup = {this.deleteGroup.bind(this)}
                                                     deleteElement = {this.deleteElement.bind(this)}/>
            )
        }
    }

    deleteGroup(index){
        let elements = this.props.value;
        elements.splice(index, 1);
        this.props.changeEntity(this.props.fieldName,elements)
    }

    deleteElement(index,name){
        let elements = this.props.value[index];
        for(let i=0;i<2;i++){
            if(elements[i]!==undefined && elements[i].name === name)
                if(elements.length === 2)
                    elements.splice(i, 1);
                else{
                    this.deleteGroup(index);
                    break;
                }

        }
        this.props.changeEntity(this.props.fieldName,this.props.value)
    }

    render(){
        let rows = this.createTableRows();

        return(
            <div style={{marginTop:'5px',  boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

                <div style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell)}>{this.props.name}</div>
                <span style={{position:'relative',width:'20%'}}/>
                <div id="container" style={ this.state.height > 199 ? styles.scrollPanel:{}}>
                    {rows}
                </div>
            </div>
        )
    }
}
