import React from 'react';
import Option from './NavElement';
import SmallOption from './NavElementSmall'
import styles from './Navbar.css.js';
import {StyleSheet, css} from 'aphrodite';
import Menu from './ResSmallElement';
import AccountDropdown from './AccountDropdown'
import AccountOption from './AccountOption'

var icons = require('glyphicons');

export default class Navigator extends React.Component{

  constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
      this.state = {accountListVisible: false};

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
      this.handleAccountList = this.handleAccountList.bind(this);
    }


    handleClick(event) {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
      console.log('The link was clicked.');
    }
    handleAccountList(event) {
      this.setState(prevState => ({
        accountListVisible: !prevState.accountListVisible
      }));
      console.log('account list toggle');
    }


    render(){
      const invisible2 =
      {
        display:'none'
      }
      const visible2 =
      {
        display:'inline-block'
      }

      var accountSimbol
      if(this.state.accountListVisible){
          accountSimbol = icons.arrowTriD
      }
      else{
        accountSimbol = icons.arrowTriU
      }

      var list;
      if(this.state.isToggleOn === true)
      {
        list =
        <div>
        <SmallOption link="#" onClick={this.handleClick}>Tournaments</SmallOption>
        <SmallOption link="/collectionsPanel/games">Games</SmallOption>
        <SmallOption link="/collectionsPanel/rankings">Rankings</SmallOption>

        <AccountDropdown toggleAccountList = {this.handleAccountList.bind(this)}>Account {accountSimbol}</AccountDropdown>
        <div style ={this.state.accountListVisible ? {display:'none'}:{display:'block'}}>
        <AccountOption className={css(resp.accountOption)} link="#">Link1</AccountOption>
        <AccountOption className={css(resp.accountOption)} link="#">Link2</AccountOption>


        </div>

        <SmallOption link="/collectionsPanel/users">Users</SmallOption>
        </div>
      }


        return (
            <div style = {styles.navbar} className={css(resp.small)}>
                <Option link="/collectionsPanel/tournaments">Tournaments</Option>
                <Option link="/collectionsPanel/games">Games</Option>
                <Option link="/collectionsPanel/rankings">Rankings</Option>
                <Option toggleAccountList = {this.handleAccountList.bind(this)} >Account</Option>
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
      background:'none',
    },
    hover: {
        ':hover': {
            backgroundColor: 'red',
        },
    },
  invisible:{
    display:'none'
    },

    hamburger:{
      float:'right',
      margin:'0',
      marginRight:'5%',
    },
    accountOption:{
      height:'20px',
      background: 'none'
    }


});
