import React from 'react';

import TableHeader from './../../headRow/tableHeader/TableHeader'
import HeaderCheckbox from './../../headRow/headerCheckbox/HeaderCheckbox'

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
                    sortBy = "province.location"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("province")}
                    arrow = {this.props.getArrowGlyph("province")}
                    content="province"
                />
                <TableHeader
                    sortBy = "address.city"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("city")}
                    arrow = {this.props.getArrowGlyph("city")}
                    content="city"
                />
                <TableHeader
                    sortBy = "game.name"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("game")}
                    arrow = {this.props.getArrowGlyph("game")}
                    content="game"
                />
                <TableHeader
                    sortBy = "freeSlots"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("freeSlots")}
                    arrow = {this.props.getArrowGlyph("freeSlots")}
                    content="players"
                />
                <TableHeader
                    sortBy = "dateOfStart"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("dateOfStart")}
                    arrow = {this.props.getArrowGlyph("dateOfStart")}
                    content="start date"
                />
                <TableHeader
                    sortBy = "dateOfEnd"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("dateOfEnd")}
                    arrow = {this.props.getArrowGlyph("dateOfEnd")}
                    content="end date"
                />
            </tr>
        );
    }
}
