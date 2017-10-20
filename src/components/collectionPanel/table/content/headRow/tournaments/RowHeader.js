import React from 'react';

import TableHeader from './../../headRow/tableHeader/TableHeader'
import HeaderCheckbox from './../../headRow/headerCheckbox/HeaderCheckbox'
import {StyleSheet, css} from 'aphrodite';


export default class RowHeader extends React.Component{

    render(){
        return (
            <tr className={css(resp.rowContent)}>
                <HeaderCheckbox/>
                <TableHeader
                    sortBy = "name"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("name")}
                    arrow = {this.props.getArrowGlyph("name")}
                    content="name"
                />
                <TableHeader
                    sortBy = "province"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("province")}
                    arrow = {this.props.getArrowGlyph("province")}
                    content="province"
                />
                <TableHeader
                    sortBy = "address.city"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("address.city")}
                    arrow = {this.props.getArrowGlyph("address.city")}
                    content="city"
                />
                <TableHeader
                    sortBy = "game.name"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("game.name")}
                    arrow = {this.props.getArrowGlyph("game.name")}
                    content="game"
                />
                <TableHeader
                    sortBy = "freeSlots"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("freeSlots")}
                    arrow = {this.props.getArrowGlyph("freeSlots")}
                    content="players"
                />
                <TableHeader
                    sortBy = "dateOfStart"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("dateOfStart")}
                    arrow = {this.props.getArrowGlyph("dateOfStart")}
                    content="start date"
                />
                <TableHeader
                    sortBy = "dateOfEnd"
                    sort = {this.props.sortByColumnName}
                    isActive = {this.props.isColumnActive("dateOfEnd")}
                    arrow = {this.props.getArrowGlyph("dateOfEnd")}
                    content="end date"
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
