import { Link } from 'react-router-dom';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import styles from './NavStyle.css.js'


export default class NavElement extends React.Component{

    render(){
        return (
            <Link to={this.props.link} style = {styles.button} className={css(resp.small)}>{this.props.children}</Link>
        );
    }
};

const resp = StyleSheet.create({
    button:{
        width:"20%",
        position:'static',
        borderWidth:' 3px 2px 3px 2px',
        padding: '8px 0px',

        ':hover':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 161, 130)',
          },
        ':active':{
            color:'lightGrey',
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
          },

        '@media (max-width: 600px)': {
            width:'100%',
            marginBottom:'1px',
            borderWidth:' 2px 1px 2px 1px',
            padding: '4px 0px',

        }
    },
});
