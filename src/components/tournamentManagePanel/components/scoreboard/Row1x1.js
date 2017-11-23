import React from 'react';

import TableCell from '../commonComponents/TableCell'
import TableAvatarCell from '../commonComponents/TableAvatarCell'

import {StyleSheet, css} from 'aphrodite';

class Row1x1 extends React.Component{

    render(){
        return (<div style={{float:'left'}}>
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
                    content = {this.props.name}
                    width = {this.props.width*0.65}
                />
                <TableCell
                    columnName = "no"
                    color = {'rgb(217, 159, 117)'}
                    edit = {() => {}}
                    content = {this.props.points}
                    width = {this.props.width*0.2}
                />
                </div>
        );
    }
}

export default Row1x1 ;
