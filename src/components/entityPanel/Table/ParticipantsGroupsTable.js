import React from 'react';
import {styles} from '../styles'
import UsersGroupTableRow from './Row/ParticipantsGroupTableRow'
import EmptyTableRow from './Row/EmptyTournamentTableRow'
import './scrollbar.css'

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

    createTableRows(){
        if(this.props.value.length===0){
            return <EmptyTableRow/>
        }
        else{
            return this.props.value.map(
                (group,index) => <UsersGroupTableRow key={index}
                                                   group={group}
                                                   index={index}
                                                   disabled = {this.props.disabled}
                                                   delete = {this.deleteElement.bind(this)}/>
            )
        }
    }

    deleteElement(index){
        let elements = this.props.value;
        elements.splice(index, 1);
        this.props.changeEntity(this.props.fieldName,elements)
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
