import React from 'react';

import TableCell from './../../row/tableCell/TableCell'
import RowChecbox from './../../row/rowCheckbox/RowChecbox'
import TableResponsiveHeader from './../../headRow/tableHeader/TableResponsiveHeader'

import dateFormat from 'dateformat';

import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../../../../main/consts/collectionsColors'

export default class Row extends React.Component{
    constructor(props) {
        super(props);
    }

    getColor(columnName, tournament){
        if(this.props.isColumnActive(columnName)){
            if(tournament.banned)
                return colors["tournaments"]["active"]["BANNED"];
            else
                return colors["tournaments"]["active"][tournament.tournamentStatus]
        }
        else{
            if(tournament.banned)
                return colors["tournaments"]["normal"]["BANNED"];
            else
                return colors["tournaments"]["normal"][tournament.tournamentStatus]
        }
    }

    addNewElement(){
        console.log("TO DO ADD");
    }

    editCheckedElements(){
        console.log("TO DO EDIT");
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
                    isActive = {this.props.isColumnActive("province")}
                    sortBy = "province.location"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("province")}
                    headerName = "province"
                />
                <TableCell
                    columnName = "province"
                    color = {this.getColor("province", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.province}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("city")}
                    sortBy = "address.city"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("city")}
                    headerName = "city"
                />
                <TableCell
                    columnName = "city"
                    color = {this.getColor("city", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.city}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("game")}
                    sortBy = "game.name"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("game")}
                    headerName = "game"
                />
                <TableCell
                    columnName = "game"
                    color = {this.getColor("game", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.game}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("freeSlots")}
                    sortBy = "freeSlots"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("freeSlots")}
                    headerName = "players"
                />
                <TableCell
                    columnName = "players"
                    color = {this.getColor("freeSlots", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.playersNumber+"/"+this.props.element.maxPlayers}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("dateOfStart")}
                    sortBy = "dateOfStart"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("dateOfStart")}
                    headerName = "start date"
                />
                <TableCell
                    columnName = "dateOfStart"
                    color = {this.getColor("dateOfStart", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {dateFormat((new Date(this.props.element.dateOfStart)),"dd-MM-yyyy hh:mm")}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("dateOfEnd")}
                    sortBy = "dateOfEnd"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("dateOfEnd")}
                    headerName = "end date"
                />
                <TableCell
                    columnName = "dateOfEnd"
                    color = {this.getColor("dateOfEnd", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {dateFormat((new Date(this.props.element.dateOfEnd)),"dd-MM-yyyy hh:mm")}
                />
            </tr>
        );
    }
}

const resp = StyleSheet.create({
    tableRow:{
        '@media (max-width: 600px)': {
            display:'block',
            position:'relative',
            marginBottom:'4px',
        },
    },
});
