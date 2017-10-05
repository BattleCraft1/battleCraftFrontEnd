import React from 'react';
import styles from './NavStyle.css.js'
import { StyleSheet, css } from 'aphrodite';

export default class Dropdown extends React.Component{

    render(){
        return (
            <div style = {styles.button} className={css(resp.dropdown)}  onClick={()=>this.props.toggleAccountList()}>{this.props.children}</div>
        );
    }
};


const resp = StyleSheet.create({
    dropdown: {
      marginBottom:'1px',
      borderWidth:' 2px 1px 2px 1px',
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
        '@media (min-width: 600px)': {
                width:'20%',
                borderWidth:' 3px 2px 3px 2px',
                padding: '8px 0px',
        }
    },
});
