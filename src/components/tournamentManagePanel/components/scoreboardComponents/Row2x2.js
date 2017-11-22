import React from 'react';

import TableCell from '../commonComponents/TableCell'
import TableAvatarCell from '../commonComponents/TableAvatarCell'

import {StyleSheet, css} from 'aphrodite';

class Row2x2 extends React.Component{

    render(){
        return (
          <div style = {{textAlign:'center'}}>
          <div style={{display:'inline-block', float:'left', marginBottom:'-5px'}}>
                <TableAvatarCell
                    columnName = "avatar"
                    color = {'rgb(217, 159, 117)'}
                    edit = {() => {}}
                    name = ""
                    width = {this.props.width*0.08}
                />
                <TableCell
                    columnName = "no"
                    color = {'rgb(217, 159, 117)'}
                    edit = {() => {}}
                    content = {this.props.name1}
                    width = {this.props.width*0.65}
                />
                </div>
                <div style={{float:'left'}}>
                <TableAvatarCell
                    columnName = "avatar"
                    color = {'rgb(217, 159, 117)'}
                    edit = {() => {}}
                    name = ""
                    width = {this.props.width*0.08}
                />
                <TableCell
                    columnName = "no"
                    color = {'rgb(217, 159, 117)'}
                    edit = {() => {}}
                    content = {this.props.name2}
                    width = {this.props.width*0.65}
                />
                </div>
                <div style={{float:'left'}}>
                <TableCell
                    columnName = "no"
                    color = {'rgb(217, 159, 117)'}
                    edit = {() => {}}
                    content = {this.props.points2}
                    width = {this.props.width*0.2}
                    s = {{height:'80px', top:"-40px", marginBottom:'-40px'}}
                />
                </div>
                </div>
        );
    }
}

export default Row2x2 ;
