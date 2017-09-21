import React from 'react';

import TableCell from './../../row/tableCell/TableCell'
import TableIconCell from '../tableCell/TableIconCell'
import RowChecbox from './../../row/rowCheckbox/RowChecbox'
import TableResponsiveHeader from './../../headRow/tableHeader/TableResponsiveHeader'
import TableRespNeutralHeader from './../../headRow/tableHeader/TableRespNeutralHeader'

import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../../../../main/consts/collectionsColors'
import axios from 'axios';
import { ActionCreators } from '../../../../../../redux/actions';
import {serverName} from "../../../../../../main/consts/server";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let icons = require('glyphicons');

class Row extends React.Component{
    constructor(props) {
        super(props);
    }

    getColor(columnName, game){
        if(this.props.isColumnActive(columnName)){
            if(game.banned)
                return colors["games"]["active"]["BANNED"];
            else
                return colors["games"]["active"][game.status]
        }
        else{
            if(game.banned)
                return colors["games"]["normal"]["BANNED"];
            else
                return colors["games"]["normal"][game.status]
        }
    }

    addNewElement(){
        console.log("TO DO ADD");
    }

    editCheckedElements(){
        console.log("TO DO EDIT");
    }

    downloadGameRules(gameName){
        axios.get(serverName+`/get/game/`+gameName+`/rules`)
            .then(res => {
                this.props.showSuccessMessage({
                    messageText: "rules of game: "+gameName+" downloaded"
                });
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    render(){
        return (
            <tr className={css(resp.tableRow)}>
                <RowChecbox
                    property = "name"
                    value = {this.props.element.name}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("name")}
                    sortBy = "name"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("name")}
                    headerName = "name"
                />
                <TableCell
                    columnName = "name"
                    color = {this.getColor("name", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.name}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("tournamentsNumber")}
                    sortBy = "tournamentsNumber"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("tournamentsNumber")}
                    headerName = "tournamentsNumber"
                />
                <TableCell
                    columnName = "tournamentsNumber"
                    color = {this.getColor("tournamentsNumber", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.tournamentsNumber}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("creatorUsername")}
                    sortBy = "creator.username"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("creatorUsername")}
                    headerName = "creatorUsername"
                />
                <TableCell
                    columnName = "creatorUsername"
                    color = {this.getColor("creatorUsername", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.creatorUsername}
                />

                <TableRespNeutralHeader
                    headerName = "rules"
                />
                <TableIconCell
                    columnName = "rules"
                    color = {this.getColor("rules", this.props.element)}
                    onClick = {() => this.downloadGameRules(this.props.element.name)}
                    icon = {icons.attachment}
                />
            </tr>
        );
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Row );

const resp = StyleSheet.create({
    tableRow:{
        '@media (max-width: 600px)': {
            display:'block',
            position:'relative',
            marginBottom:'4px',
        },
    },
});
