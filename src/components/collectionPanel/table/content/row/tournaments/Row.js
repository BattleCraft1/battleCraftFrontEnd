import React from 'react';

import TableCell from './../../row/tableCell/TableCell'
import RowChecbox from './../../row/rowCheckbox/RowChecbox'
import TableResponsiveHeader from './../../headRow/tableHeader/TableResponsiveHeader'

import setDate from './../../../../../../main/functions/setDateFunction'

import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../../../../main/consts/collectionsColors'

import { ActionCreators } from '../../../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Row extends React.Component{
    constructor(props) {
        super(props);
    }

    getColor(columnName, tournament){
        if(this.props.isColumnActive(columnName)){
            if(tournament.banned)
                return colors["tournaments"]["active"]["BANNED"];
            else
                return colors["tournaments"]["active"][tournament.status]
        }
        else{
            if(tournament.banned)
                return colors["tournaments"]["normal"]["BANNED"];
            else
                return colors["tournaments"]["normal"][tournament.status]
        }
    }

    editEntity(name){
        console.log(name);
        this.props.editEntity("tournament",name);
    }

    render(){
        return (
            <tr className={css(resp.tableRow)}>
                <RowChecbox
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
                    edit={() => this.editEntity(this.props.element.name)}
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
                    edit={() => this.editEntity(this.props.element.name)}
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
                    edit={() => this.editEntity(this.props.element.name)}
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
                    edit={() => this.editEntity(this.props.element.name)}
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
                    edit={() => this.editEntity(this.props.element.name)}
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
                    edit={() => this.editEntity(this.props.element.name)}
                    content = {setDate(this.props.element.dateOfStart)}
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
                    edit={() => this.editEntity(this.props.element.name)}
                    content = {setDate(this.props.element.dateOfEnd)}
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
        entityPanel:state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Row );

const resp = StyleSheet.create({
    tableRow:{
        cursor:'pointer',
      overflow:'hidden',
      textOverflow:'elipsis',
        '@media (max-width: 600px)': {
            display:'block',
            position:'relative',
            marginBottom:'4px',
        },
    },
});
