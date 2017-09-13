import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class LegendPanel extends React.Component{
    render(){
        return (
            <div className = {css(resp.legend)}>
                <th style={Object.assign({}, styles.thead, {display:'block', width:'100%', textAlign:'center', padding:'3px', boxShadow:'inset 0 2px 2px #9c7239'})} >
                    Legend</th>
                <span style={Object.assign({}, styles.rowContent, {background:'rgb(230, 197, 158)'})}
                      className = {css(resp.legendOption)}>
                            NEW</span>
                <span style={Object.assign({}, styles.rowContent, {background:'rgb(116, 152, 88)'})}
                      className = {css(resp.legendOption)}>
                            ACCEPTED</span>
                <span style={Object.assign({}, styles.rowContent, {background:'rgb(142, 108, 63)'})}
                      className = {css(resp.legendOption)}>
                            IN PROGRESS</span>
                <span style={Object.assign({}, styles.rowContent, {background:'rgb(96, 146, 162)'})}
                      className = {css(resp.legendOption)}>
                            FINISHED</span>
                <span style={Object.assign({}, styles.rowContent, {background:'rgb(156, 99, 87)'})}
                      className = {css(resp.legendOption)}>
                            BANNED</span>
            </div>
        );
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
    rowContent: {
        borderRadius: '0',
        background: '#c6a57d',
        border: '1px solid',
        padding: '8px',
        paddingLeft: '8px',
        textAlign: 'none',
        backgroundImage: '',
        WebkitBorderImage: '',
        color: 'black',
        borderTopColor: '#dfd19e',
        borderBottomColor: '#886e4b',
        borderLeftColor: '#dfd19e',
        borderRightColor: '#886e4b',
        textShadow: ' ',
    }
};

const resp = StyleSheet.create({
    legendOption:{
        fontSize:'80%',
        textAlign:'center',
        display:'inline-block',
        position:'relative',
        width:'20%',
        padding:'5px',
        '@media (max-width: 600px)': {
            width:'50%',
        },
    },
    legend:{
        position:'relative',
        width:'90%',
        marginLeft:'5%',
        marginBottom:'10px',
    },
});