import React from 'react';

import TableHeader from './../../headRow/tableHeader/TableHeader'
import TableNeutralHeader from "../tableHeader/TableNeutralHeader";

export default class RowHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <tr>
                <TableNeutralHeader
                    content="no"
                />
                <TableHeader
                    sortBy = "name"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("name")}
                    arrow = {this.props.getArrowGlyph("name")}
                    content="name"
                />
                <TableHeader
                    sortBy = "province.location"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("province.location")}
                    arrow = {this.props.getArrowGlyph("province.location")}
                    content="province"
                />
                <TableHeader
                    sortBy = "address.city"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("address.city")}
                    arrow = {this.props.getArrowGlyph("address.city")}
                    content="city"
                />
                <TableHeader
                    sortBy = "numberOfTournaments"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("numberOfTournaments")}
                    arrow = {this.props.getArrowGlyph("numberOfTournaments")}
                    content="Tournaments number"
                />
                <TableHeader
                    sortBy = "numberOfBattles"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("numberOfBattles")}
                    arrow = {this.props.getArrowGlyph("numberOfBattles")}
                    content="Battles number"
                />
                <TableHeader
                    sortBy = "points"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("points")}
                    arrow = {this.props.getArrowGlyph("points")}
                    content="points"
                />
            </tr>
        );
    }
}
