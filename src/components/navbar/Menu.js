import { StyleSheet, css } from 'aphrodite';
import React from 'react';
import styles from './NavStyle.css.js';


export default class ResSmallElement extends React.Component{
    render(){
        return (
                  <div style = {styles.button} className={css(resp.menu)} onClick={()=>this.props.toggleList()}>{this.props.children}</div>
        )
    }
}


const resp = StyleSheet.create({
    menu: {
      padding: '8px 0px',
      paddingLeft:'8%',
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
        '@media (min-width: 599px)': {
            display: 'none',

        }
    },
})
