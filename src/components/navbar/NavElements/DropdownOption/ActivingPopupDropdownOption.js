import React from 'react';
import styles from '../../NavStyle.css.js'
import { StyleSheet, css } from 'aphrodite';

export default class NavElementSmall extends React.Component{

    render(){
        return (
            <div onClick={() => {this.props.function(); this.props.hideList();}}
                 style = {styles.button} className={css(resp.option)}>{this.props.name}</div>
        );
    }
};

const resp = StyleSheet.create({
    option: {
        cursor:'pointer',
        marginBottom:'1px',
        borderWidth:'1px',
        fontSize:'85%',
        display:'inline-block',
        position:'relative',
        zIndex:'2',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#916831), to(#624722))',
        WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px;',
        ':hover':{
            backgroundColor: 'rgb(249, 249, 249)',
            backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
            WebkitBorderImage: '-webkit-linear-gradient(left, #473419, #735327) 0 0 20px;',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 161, 130)',
            backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
            WebkitBorderImage: '-webkit-linear-gradient(left, #473419, #735327) 0 0 20px;',
        },
        ':active':{
            backgroundColor: 'rgb(249, 249, 249)',
            color:'lightGrey',
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
        },
        '@media (min-width: 600px)': {
            width:'100%',
        }
    },
});