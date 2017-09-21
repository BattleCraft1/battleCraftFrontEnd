import React from 'react';

import TableHeader from './../../headRow/tableHeader/TableHeader'
import HeaderCheckbox from './../../headRow/headerCheckbox/HeaderCheckbox'
import TableNeutralHeader from "../tableHeader/TableNeutralHeader";

export default class RowHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <tr>
                <HeaderCheckbox/>
                <TableHeader
                    sortBy = "name"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("name")}
                    arrow = {this.props.getArrowGlyph("name")}
                    content="name"
                />
                <TableHeader
                    sortBy = "tournamentsNumber"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("tournamentsNumber")}
                    arrow = {this.props.getArrowGlyph("tournamentsNumber")}
                    content="tournaments number"
                />
                <TableHeader
                    sortBy = "creator.username"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("creatorUsername")}
                    arrow = {this.props.getArrowGlyph("creatorUsername")}
                    content="creator username"
                />
                <TableNeutralHeader
                    content="rules"
                />
            </tr>
        );
    }
}
