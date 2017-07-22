import { Link } from 'react-router-dom';
import React from 'react';
import styles from './NavElementSmall.css.js'
import { StyleSheet, css } from 'aphrodite';

export default class AccountDropdown extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div style = {styles.button} className={css(resp.small)}  onClick={()=>this.props.toggleAccountList()}>{this.props.children}</div>
        );
    }
};




const resp = StyleSheet.create({
    small: {
      marginBottom:'1px',
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
            display: 'none',

        }
    },
});
