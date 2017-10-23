import React from 'react';
import {styles} from '../../styles'
import TableRow from './TableRow'
import './scrollbar.css'

export default class Table extends React.Component{
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
        return this.props.value.map(
            row => <TableRow key={row.name}
                             inputsDisabled = {this.props.inputsDisabled}
                             delete = {this.deleteElement.bind(this)}
                             accepted={row.accepted}
                             name={row.name}/>
        )
    }

    deleteElement(name){
        let elements = this.props.value;
        elements = elements.filter(user => {
            return user.name!==name
        });
        this.props.changeEntity(this.props.fieldName,elements)
    }

    render(){
        let rows = this.createTableRows();

        return(
            <div style={{ boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',}}>

                <div style={Object.assign({}, styles.optionLabel, styles.tableHeaderCell)}>{this.props.name}</div>
                <span style={{position:'relative',width:'20%'}}/>
                <div id="container" style={ this.state.height > 199 ? styles.scrollPanel:{}}>
                    <table style={Object.assign( {}, styles.table)}>
                        {rows}
                    </table>
                </div>
            </div>
        )
    }
}
