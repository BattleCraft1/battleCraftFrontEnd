import React from 'react';

import TableHeader from './../../headRow/tableHeader/TableHeader'
import HeaderCheckbox from './../../headRow/headerCheckbox/HeaderCheckbox'
import TableNeutralHeader from "../tableHeader/TableNeutralHeader";
import {StyleSheet, css} from 'aphrodite';


export default class RowHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <tr className={css(resp.rowContent)}>
                <HeaderCheckbox/>
                <TableNeutralHeader
                    content="avatar"
                />
                <TableHeader
                    sortBy = "name"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("name")}
                    arrow = {this.props.getArrowGlyph("name")}
                    content="name"
                />
                <TableHeader
                    sortBy = "firstname"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("firstname")}
                    arrow = {this.props.getArrowGlyph("firstname")}
                    content="firstname"
                />
                <TableHeader
                    sortBy = "lastname"
                    sort = {this.props.sortByColumnName.bind(this)}
                    isActive = {this.props.isColumnActive("lastname")}
                    arrow = {this.props.getArrowGlyph("lastname")}
                    content="lastname"
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

const resp = StyleSheet.create({
  rowContent:{
      position:'relative',
      textAlign:'center',
      '@media (max-width: 599px)': {
          width:'70%',
          display: 'inline-block',
          borderRadius:'0'
      },
      '@media (max-width: 1024px)': {
          fontSize:'0.8em',
          paddingLeft:'2px',
          paddingRight:'2px',
      },
  },
});
