import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class TableRespNeutralHeader extends React.Component{
    render(){
        return(
            <th style={styles.thead}
                className = {css(resp.rowContent)+" "+css(resp.nameLabel)}>
                {this.props.headerName}</th>
        )
    }
}

const styles = {
    thead: {
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border: '1px solid',
        color: 'white',
        //
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        //borderColor:'#4e3e28',
        background: '#735630',

        // backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#b48443), to(#654a25))',
        // WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
    },
};

const resp = StyleSheet.create({
    rowContent:{
        position:'relative',
        textAlign:'center',
        '@media (max-width: 599px)': {
            width:'70%',
            display: 'inline-block',
            borderRadius:'0'
        }
    },
    nameLabel:{
        paddingTop:'8px',
        paddingBottom:'8px',
        width:'30%',
        '@media (min-width: 600px)': {
            display:'none',
        },
    },
});