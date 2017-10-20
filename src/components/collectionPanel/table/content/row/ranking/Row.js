import React from 'react';

import TableCell from './../../row/tableCell/TableCell'
import TableResponsiveHeader from './../../headRow/tableHeader/TableResponsiveHeader'
import TableRespNeutralHeader from './../../headRow/tableHeader/TableRespNeutralHeader'

import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../../../../main/consts/collectionsColors'

export default class Row extends React.Component{

    getColor(columnName, tournament){
        if(this.props.isColumnActive(columnName)){
                return colors["ranking"]["active"]["NORMAL"];
        }
        else{
                return colors["ranking"]["normal"]["NORMAL"];
        }
    }

    render(){
        return (
            <tr className={css(resp.tableRow)}>
                <TableRespNeutralHeader
                    headerName = "No."
                />
                <TableCell
                    columnName = "no"
                    color = {this.getColor("no")}
                    edit = {() => {}}
                    content = {this.props.number}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("name")}
                    sortBy = "name"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("name")}
                    headerName = "name"
                />
                <TableCell
                    columnName = "name"
                    color = {this.getColor("name")}
                    edit = {() => {}}
                    content = {this.props.element.name}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("province")}
                    sortBy = "playerAddress.province"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("province")}
                    headerName = "province"
                />
                <TableCell
                    columnName = "province"
                    color = {this.getColor("province")}
                    edit = {() => {}}
                    content = {this.props.element.playerProvince}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("city")}
                    sortBy = "playerAddress.city"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("city")}
                    headerName = "city"
                />
                <TableCell
                    columnName = "city"
                    color = {this.getColor("city")}
                    edit = {() => {}}
                    content = {this.props.element.playerCity}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("numberOfTournaments")}
                    sortBy = "numberOfTournaments"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("numberOfTournaments")}
                    headerName = "Tournaments number"
                />
                <TableCell
                    columnName = "numberOfTournaments"
                    color = {this.getColor("numberOfTournaments")}
                    edit = {() => {}}
                    content = {this.props.element.numberOfTournaments}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("numberOfBattles")}
                    sortBy = "numberOfBattles"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("numberOfBattles")}
                    headerName = "Battles number"
                />
                <TableCell
                    columnName = "numberOfBattles"
                    color = {this.getColor("numberOfBattles")}
                    edit = {() => {}}
                    content = {this.props.element.numberOfBattles}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("points")}
                    sortBy = "points"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("points")}
                    headerName = "points"
                />
                <TableCell
                    columnName = "points"
                    color = {this.getColor("points")}
                    edit = {() => {}}
                    content = {this.props.element.points}
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