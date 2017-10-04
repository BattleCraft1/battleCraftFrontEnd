import React from 'react';
import Option from './NavElement';
import {StyleSheet, css} from 'aphrodite';
import Menu from './Menu';
import AccountDropdown from './AccountDropdown'
import AccountOption from './AccountOption'

var icons = require('glyphicons');

export default class Navigator extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        isToggleOn: true,
        accountListVisible: true,
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
      this.handleAccountList = this.handleAccountList.bind(this);
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions(){
      this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    handleClick(event) {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }
    handleAccountList(event) {
      this.setState(prevState => ({
        accountListVisible: !prevState.accountListVisible
      }));
    }


    render(){

      var accountSimbol
      if(this.state.accountListVisible){
          accountSimbol = icons.arrowTriD
      }
      else{
        accountSimbol = icons.arrowTriU
      }
        return (
            <div className={css(resp.navbar)}>
             <Menu toggleList = {this.handleClick.bind(this)}>Menu <span className={css(resp.hamburger)}>{icons.menu}</span></Menu>
             <div style ={(this.state.width < 600 && this.state.isToggleOn) ? {display:'none'}:{display:'block'}}>
                <Option link="/collectionsPanel/tournaments">Tournaments</Option>
                <Option link="/collectionsPanel/games">Games</Option>
                <Option link="/collectionsPanel/ranking">Ranking</Option>
                <Option link="/collectionsPanel/users">Users</Option>
                <AccountDropdown toggleAccountList = {this.handleAccountList.bind(this)}>Account <span className={css(resp.arrow)}>{accountSimbol}</span></AccountDropdown>

                  <div style ={this.state.accountListVisible ? {display:'none'}:{display:'block'}} className={css(resp.account)}>
                  <div style = {{position:'relative', display:'inline-block', width:'100%'}}>
                  <AccountOption link="#">Link1</AccountOption>
                  <AccountOption link="#">Link2</AccountOption>
                  </div>
                  </div>
              </div>
          </div>

        );
    }
};

const resp = StyleSheet.create({

    account:{
      width:'100%',
      position:'relative',
      '@media (min-width: 599px)': {
          position:'absolute',
          width:'20%',
          marginLeft:'80%',
        }
    },
    navbar:{
      position:'relative',
      marginBottom:'20px',
      width:'70%',
      marginLeft:'15%',
      background:'none',
    },
    hamburger:{
      float:'right',
      margin:'0',
      marginRight:'5%',
    },
    arrow:{
      position:'absolute',
      fontSize:'70%',
      float:'right',
      margin:'0',
      marginLeft:'0.5em',
      marginTop:'3px',
    },
});
