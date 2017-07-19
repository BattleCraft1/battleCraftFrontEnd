import { Link } from 'react-router-dom';
import React from 'react';
import styles from './NavElement.css.js'
import { StyleSheet, css } from 'aphrodite';

export default class NavElement extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (

            <Link to={"#"} style = {styles.button} className={css(resp.small)}>{this.props.children}</Link>

        );
    }
};




const resp = StyleSheet.create({
    small: {
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
            display: 'none',

        }
    },
});
