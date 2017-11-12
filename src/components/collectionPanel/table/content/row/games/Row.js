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
import setDate from './../../../../../../main/functions/setDateFunction'

let icons = require('glyphicons');

class Row extends React.Component{

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

    editEntity(element){
        this.props.editEntity("game",element.name);
    }

    downloadGameRules(gameName){
        axios.get(serverName+`/get/game/rules?gameName=${gameName}`,{responseType:'arraybuffer'})
            .then(res => {
                let headers = res.headers;
                let blob = new Blob([res.data],{type:headers['content-type']});
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = gameName+".pdf";
                link.click();

            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    render(){
        return (
            <tr className={css(resp.tableRow)}>
                <RowChecbox
                    element = {this.props.element}
                    checked = {this.props.element.checked}
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
                    isActive = {this.props.isColumnActive("tournamentsNumber")}
                    sortBy = "tournamentsNumber"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("tournamentsNumber")}
                    headerName = "tournamentsNumber"
                />
                <TableCell
                    columnName = "tournamentsNumber"
                    color = {this.getColor("tournamentsNumber", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.tournamentsNumber}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("creatorName")}
                    sortBy = "creator.name"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("creatorName")}
                    headerName = "creatorName"
                />
                <TableCell
                    columnName = "creatorName"
                    color = {this.getColor("creatorName", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {this.props.element.creatorName}
                />

                <TableResponsiveHeader
                    isActive = {this.props.isColumnActive("dateOfCreation")}
                    sortBy = "dateOfCreation"
                    sort = {this.props.sortByColumnName}
                    arrow = {this.props.getArrowGlyph("dateOfCreation")}
                    headerName = "creation date"
                />
                <TableCell
                    columnName = "dateOfCreation"
                    color = {this.getColor("dateOfCreation", this.props.element)}
                    edit={() => this.editEntity(this.props.element)}
                    content = {setDate(this.props.element.dateOfCreation)}
                />

                <TableRespNeutralHeader
                    headerName = "rules"
                />
                <TableIconCell
                    columnName = "rules"
                    color = {this.getColor("rules", this.props.element)}
                    action = {() => this.downloadGameRules(this.props.element.name)}
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
    return {};
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
    },
});
