import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import styles from './NavStyle.css.js'

let icons = require('glyphicons');

export default class ResponsiveMenuButton extends React.Component{

    render(){
        return(<div style = {styles.button} className={css(resp.menu)} onClick={()=>this.props.toggleResponsiveList()}>
            Menu <span className={css(resp.hamburger)}>{icons.menu}</span>
        </div>)
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
        '@media (min-width: 799px)': {
            display: 'none',

        }
    },
    hamburger:{
        float:'right',
        margin:'0',
        marginRight:'5%',
    }
});