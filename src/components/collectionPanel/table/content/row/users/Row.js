import React from 'react';

import TableCell from './../../row/tableCell/TableCell'
import TableAvatarCell from './../../row/tableCell/TableAvatarCell'
import RowUserChecbox from './../../row/rowUserCheckbox/RowUserChecbox'
import TableResponsiveHeader from './../../headRow/tableHeader/TableResponsiveHeader'
import TableRespNeutralHeader from './../../headRow/tableHeader/TableRespNeutralHeader'

import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../../../../main/consts/collectionsColors'

import { ActionCreators } from '../../../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Row extends React.Component{

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

    editEntity(element){
        //TO DO: if user is owner of accout -> edit else -> show
        if(this.props.entityPanel.mode!=='disabled'){
            console.log("show additional entity panel");
            this.props.showAdditionalEntityPanel("user",element.name);
        }
        else{
            console.log("edit entity panel");
            this.props.editEntity("user",element.name);
        }
    }

    render(){
        return (
          <tr className={css(resp.tableRow)}>

                <RowUserChecbox
                    elementName = {this.props.element.name}
                    checked = {this.props.element.checked}
                />

                <TableRespNeutralHeader
                    headerName = "avatar"
                />
                <TableAvatarCell
                    columnName = "avatar"
                    color = {this.getColor("avatar", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    name = {this.props.element.name}
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
                    color = {this.getColor("name", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.name}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("firstname")}
                    sortBy = "firstname"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("firstname")}
                    headerName = "firstname"
                />
                <TableCell
                    columnName = "firstname"
                    color = {this.getColor("firstname", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.firstname}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("lastname")}
                    sortBy = "lastname"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("lastname")}
                    headerName = "lastname"
                />
                <TableCell
                    columnName = "lastname"
                    color = {this.getColor("lastname", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.lastname}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("email")}
                    sortBy = "email"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("email")}
                    headerName = "email"
                />
                <TableCell
                    columnName = "email"
                    color = {this.getColor("email", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.email}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("province")}
                    sortBy = "province"
                    sort = {this.props.sortByColumnName}
                    arrow = {() => this.props.getArrowGlyph("province")}
                    headerName = "province"
                />
                <TableCell
                    columnName = "province"
                    color = {this.getColor("province", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.province}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("city")}
                    sortBy = "address.city"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("city")}
                    headerName = "city"
                />
                <TableCell
                    columnName = "city"
                    color = {this.getColor("city", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.city}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("phoneNumber")}
                    sortBy = "phoneNumber"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("phoneNumber")}
                    headerName = "phoneNumber"
                />
                <TableCell
                    columnName = "phoneNumber"
                    color = {this.getColor("phoneNumber", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.phoneNumber}
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
        entityPanel: state.entityPanel,
        additionalEntityPanel: state.additionalEntityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Row );

const resp = StyleSheet.create({
    tableRow:{
        cursor:'pointer',
        '@media (max-width: 600px)': {
            display:'block',
            position:'relative',
            marginBottom:'4px',
        },
        '@media (max-width: 900px)': {
            fontSize:'0.80em',
        },
    },

});
