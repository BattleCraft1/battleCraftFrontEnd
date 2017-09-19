import React from 'react';

import TableCell from './../../row/tableCell/TableCell'
import TableAvatarCell from './../../row/tableCell/TableAvatarCell'
import RowChecbox from './../../row/rowCheckbox/RowChecbox'
import TableResponsiveHeader from './../../headRow/tableHeader/TableResponsiveHeader'
import TableRespNeutralHeader from './../../headRow/tableHeader/TableRespNeutralHeader'

import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../../../../main/consts/collectionsColors'


export default class Row extends React.Component{
    constructor(props) {
        super(props);
    }

    getColor(columnName, user){
        if(this.props.isColumnActive(columnName)){
            if(user.banned)
                return colors["users"]["active"]["BANNED"];
            else
                return colors["users"]["active"][user.status]
        }
        else{
            if(user.banned)
                return colors["users"]["normal"]["BANNED"];
            else
                return colors["users"]["normal"][user.status]
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
                    property = "username"
                    value = {this.props.element.username}
                />

                <TableRespNeutralHeader
                    headerName = "avatar"
                />
                <TableAvatarCell
                    columnName = "avatar"
                    color = {this.getColor("avatar", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    username = {this.props.element.username}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("username")}
                    sortBy = "username"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("username")}
                    headerName = "username"
                />
                <TableCell
                    columnName = "username"
                    color = {this.getColor("username", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.username}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("surname")}
                    sortBy = "surname"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("surname")}
                    headerName = "surname"
                />
                <TableCell
                    columnName = "surname"
                    color = {this.getColor("surname", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.surname}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("email")}
                    sortBy = "email"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("email")}
                    headerName = "email"
                />
                <TableCell
                    columnName = "email"
                    color = {this.getColor("email", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.email}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("province")}
                    sortBy = "province.location"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {() => this.props.getArrowGlyph("province")}
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
                    isActive = {this.props.isColumnActive("phoneNumber")}
                    sortBy = "phoneNumber"
                    sort = {this.props.sortByColumnName.bind(this)}
                    arrow = {this.props.getArrowGlyph("phoneNumber")}
                    headerName = "phoneNumber"
                />
                <TableCell
                    columnName = "phoneNumber"
                    color = {this.getColor("phoneNumber", this.props.element)}
                    onClick = {this.editCheckedElements.bind(this)}
                    content = {this.props.element.phoneNumber}
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
