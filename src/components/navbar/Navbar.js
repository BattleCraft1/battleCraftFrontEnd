import React from 'react';
import Option from './NavElement';
import SmallOption from './NavElementSmall'
import styles from './Navbar.css.js';
import {StyleSheet, css} from 'aphrodite';
import Menu from './ResSmallElement';

var icons = require('glyphicons');

export default class Navigator extends React.Component{

  constructor(props) {
      super(props);
      this.state = {isToggleOn: true};

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
      console.log('The link was clicked.');
    }


    render(){

      var list;
      if(this.state.isToggleOn === true)
      {
        list =
        <div>
        <SmallOption link="#" onClick={this.handleClick}>Tournaments</SmallOption>
        <SmallOption link="/collectionsPanel/games">Games</SmallOption>
        <SmallOption link="/collectionsPanel/rankings">Rankings</SmallOption>
        <SmallOption link="/collectionsPanel/tournaments">Account</SmallOption>
        <SmallOption link="/collectionsPanel/users">Users</SmallOption>
        </div>
      }


        return (
            <div style = {styles.navbar} className={css(resp.small)}>
                <Option link="#" onClick={this.handleClick}>Tournaments</Option>
                <Option link="/collectionsPanel/games">Games</Option>
                <Option link="/collectionsPanel/rankings">Rankings</Option>
                <Option link="/collectionsPanel/tournaments">Account</Option>
                <Option link="/collectionsPanel/users">Users</Option>

                <Menu toggleList = {this.handleClick.bind(this)}>Menu <span className={css(resp.hamburger)}>{icons.menu}</span></Menu>
                {list}


              </div>

        );
    }
};

const resp = StyleSheet.create({
    small: {
      width:'80%',
      marginLeft:'10%',
      background:'none'
    },
    hover: {
        ':hover': {
            backgroundColor: 'red'
        },
   invisible:{
     display:'none',
    }
    },

    hamburger:{
      float:'right',
      margin:'0',
      marginRight:'5%',
    }
});
