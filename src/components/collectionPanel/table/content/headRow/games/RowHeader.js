import React from 'react';

import TableHeader from './../../headRow/tableHeader/TableHeader'
import HeaderCheckbox from './../../headRow/headerCheckbox/HeaderCheckbox'
import TableNeutralHeader from "./../tableHeader/TableNeutralHeader";

export default class RowHeader extends React.Component{

    render(){
        return (
            <tr>
                <HeaderCheckbox/>
                <TableHeader
                    sortBy = "name"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("name")}
                    arrow = {this.props.getArrowGlyph("name")}
                    content="name"
                />
                <TableHeader
                    sortBy = "tournamentsNumber"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("tournamentsNumber")}
                    arrow = {this.props.getArrowGlyph("tournamentsNumber")}
                    content="tournaments number"
                />
                <TableHeader
                    sortBy = "creator.name"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("creator.name")}
                    arrow = {this.props.getArrowGlyph("creator.name")}
                    content="creator name"
                />
                <TableHeader
                    sortBy = "dateOfCreation"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("dateOfCreation")}
                    arrow = {this.props.getArrowGlyph("dateOfCreation")}
                    content="creation date"
                />
                <TableNeutralHeader
                    content="rules"
                />
            </tr>
        );
    }
}
