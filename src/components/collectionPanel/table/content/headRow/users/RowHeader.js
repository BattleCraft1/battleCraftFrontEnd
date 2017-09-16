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
                <TableNeutralHeader
                    content="avatar"
                />
                <TableHeader
                    sortBy = "username"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("username")}
                    arrow = {this.props.getArrowGlyph("username")}
                    content="username"
                />
                <TableHeader
                    sortBy = "surname"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("surname")}
                    arrow = {this.props.getArrowGlyph("surname")}
                    content="surname"
                />
                <TableHeader
                    sortBy = "email"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("email")}
                    arrow = {this.props.getArrowGlyph("email")}
                    content="email"
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
                    sortBy = "phoneNumber"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("phoneNumber")}
                    arrow = {this.props.getArrowGlyph("phoneNumber")}
                    content="phone number"
                />
            </tr>
        );
    }
}
