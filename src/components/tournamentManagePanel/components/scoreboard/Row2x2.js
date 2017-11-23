import React from 'react';

import TableCell from '../commonComponents/TableCell'
import TableAvatarCell from '../commonComponents/TableAvatarCell'

import {StyleSheet, css} from 'aphrodite';

class Row1x1 extends React.Component{

    render(){
        let width = 40;
        return (<div style={styles.rowContent}>
                <div style={Object.assign({}, styles.rowCell, {width:'40px'})}>
                    {!this.props.idx && <div style={{height:'30px'}}></div>}
                    <TableAvatarCell
                        width = {this.props.width*0.08}
                    />
                    <TableAvatarCell
                        width = {this.props.width*0.08}
                    />
                </div>
                <div style={Object.assign({}, styles.rowCell, {width:'calc(70%)'})}>
                    {!this.props.idx && <div style={styles.rowLabel}>NAME</div>}
                    <TableCell
                        content = {this.props.name1}
                    />
                    <TableCell
                        content = {this.props.name2}
                    />
                </div>
                <div style={Object.assign({}, styles.rowCell, {width:'calc(30%)'})}>
                    {!this.props.idx && <div style={styles.rowLabel}>SCORE</div>}
                    <TableCell
                        content = {this.props.points}
                        double={true}
                    />
                </div>
            </div>
        );
    }
}

export default Row1x1 ;


const styles = {
    rowContent:{
        display:'inline-flex',
        width:'100%',
        margin:'0',
    },
    rowCell:{
        display:'block',
    },
    rowLabel:{
        width:'100%',
        height:'30px',
        boxSizing:'border-box',
        fontWeight:'700',
        textShadow:'rgba(0, 0, 0, 0.3) -2px -2px 0px',
        paddingTop:'3px',
        paddingBottom:'3px',
        display:'inline-block',
        width:'100%',
        textAlign:'center',
        borderRadius:'2px 2px 0 0',
        backgroundColor:'rgba(101, 70, 42, 1)',
        //backgroundImage:'linear-gradient(45deg, rgba(231, 224, 188, 0.1),rgb(214, 208, 179) 60%,rgba(231, 224, 188, 0.1)), linear-gradient(91deg,rgba(103, 94, 56, 1) -3%,rgba(251, 250, 249, 0.9) 6%, rgba(219, 216, 216, 0.1) 6.5%',
        backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 10%, rgba(101, 70, 42, 1) 60%, rgba(255, 255, 255, 0.4) 65%)',
        color:'rgb(223, 214, 197)',
        border:'1px black solid',
        borderTopRightRadius:'5px',
        borderTopLeftRadius:'5px',
        borderBottom:'0',
    },
};