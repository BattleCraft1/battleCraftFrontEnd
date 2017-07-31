import React from 'react';
import Option from './NavElement';
import styles from './Navbar.css.js';
import {StyleSheet, css} from 'aphrodite';
import Menu from './ResSmallElement';

var icons = require('glyphicons');



export default class Navigator extends React.Component{
    render(){
        return (
            <div style = {styles.navbar} className={css(resp.small)}>
                <Option link="/collectionsPanel/tournaments">Tournaments</Option>
                <Option link="/collectionsPanel/games">Games</Option>
                <Option link="/collectionsPanel/rankings">Rankings</Option>
                <Option link="/collectionsPanel/tournaments">Account</Option>
                <Option link="/collectionsPanel/users">Users</Option>


                <Menu>Menu {icons.menu}</Menu>
              </div>

        );
    }
};

const resp = StyleSheet.create({
    small: {
      width:'80%',
      marginLeft:'10%',
    },
    hover: {
        ':hover': {
            backgroundColor: 'red'
        }
    },
});
