import React from 'react';
import {styles} from '../../../styles'
import UserTableRow from './Row/UserTableRow'
import EmptyTableRow from './Row/EmptyUserTableRow'
import '../../../TableInputs/scrollbar.css'

export default class ParticipantsTable extends React.Component{
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
            this.props.hidden === true && this.props.relatedEntity.operationCanceled === false) {
            this.actualizeRelatedEntityObjects(nextProps.relatedEntity.relatedEntities)
        }
    }

    actualizeRelatedEntityObjects(relatedEntities){
        let participants = this.props.value;
        let invitedParticipantsNames = [];

        for (let i = 0; i < participants.length; i++) {
            invitedParticipantsNames.push(participants[i][0].name);
        }
        relatedEntities.forEach(
            elementName => {
                if(invitedParticipantsNames.indexOf(elementName)===-1){
                    participants.push([{
                        name:elementName,
                        accepted:false
                    }])
                }
            }
        );
        invitedParticipantsNames.forEach(
            elementName => {
                if(relatedEntities.indexOf(elementName)===-1){
                    for (let i = 0; i < participants.length; i++) {
                        if(participants[i][0].name===elementName){
                            participants.splice(i,1);
                        }
                    }

                }
            }
        );
        this.props.changeEntity(this.props.fieldName,participants);
    }

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                user => <UserTableRow key={user[0].name}
                                     disabled = {this.props.disabled}
                                     delete = {this.deleteElement.bind(this)}
                                     accepted={user[0].accepted}
                                     name={user[0].name}/>
            )
        }
    }

    deleteElement(name){
        let elements = this.props.value;
        for (let i = 0; i < elements.length; i++) {
            if(elements[i][0].name===name){
                elements.splice(i,1);
            }
        }
        this.props.changeEntity(this.props.fieldName,elements)
    }

    render(){
        let rows = this.createTableRows();

        return(
            <div style={{marginTop:'5px',  boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

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
