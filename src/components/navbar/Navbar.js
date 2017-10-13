import React from 'react';
import Option from './NavElement';
import {StyleSheet, css} from 'aphrodite';
import Menu from './Menu';
import Dropdown from './Dropdown'
import AccountOption from './AccountOption'
import DropdownOption from './DropdownOption'


var icons = require('glyphicons');

export default class Navigator extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        isToggleOn: true,
        accountListVisible: true,
        tournaments: false,
        games: false,
        rankings: false,
        users: false,
        account: false,
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
      if(this.state.width < 600){
        this.setState({tournamentListDisplay:'inline-block'})
      }
      else{
        this.setState({tournamentListDisplay:'none'})
      }

    }

    componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      document.removeEventListener('mousedown', this.handleClickOutside);
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

    onMouseHover() {
        console.log("Enter")
        if(this.state.width > 600)
        this.setState({tournamentListDisplay:'block'})
    }
    onMouseLeave(){
      console.log("Leave")
      if(this.state.width > 600)
      this.setState({tournamentListDisplay:'none'})
    }

    clearMenu(){
      console.log("Clear")
      this.setState({tournaments: false,
                     games:false,
                     rankings:false,
                     users:false,
                     account:false})
    }

    getTournaments(){
      return(this.state.tournaments &&<div>
        <DropdownOption link="/collectionsPanel/tournaments">Tournaments page</DropdownOption>
        </div>)
      }
    getGames(){
      return(this.state.games &&<div>
        <DropdownOption link="/collectionsPanel/games">games page</DropdownOption>
        </div>)
    }
    getRankings(){
      return(this.state.rankings &&<div>
        <DropdownOption link="/collectionsPanel/rankings">rankings page</DropdownOption>
        </div>)
    }
    getUsers(){
      return(this.state.users &&<div>
        <DropdownOption link="/collectionsPanel/users">users page</DropdownOption>
        </div>)
    }
    getAccounts(){
      return(this.state.account &&<div>
              <DropdownOption link="#">users page</DropdownOption>
              <DropdownOption link="#">users page</DropdownOption>
        </div>
      )
    }

    handleClickOutside(event) {
        if (this.messageRef && !this.messageRef.contains(event.target)) {
            this.clearMenu();
        }
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

                <Option list={this.getTournaments()} offset="0%" onClick={()=> {this.clearMenu(), this.setState({tournaments:!this.state.tournaments})}} link="#">Tournaments</Option>
                <Option list={this.getGames()}       offset="20%" onClick={()=> {this.clearMenu(), this.setState({games:!this.state.games})}} link="#">Games</Option>
                <Option list={this.getRankings()}    offset="40%" onClick={()=> {this.clearMenu(), this.setState({rankings:!this.state.rankings})}} link="#">Rankings</Option>
                <Option list={this.getUsers()}       offset="60%" onClick={()=> {this.clearMenu(), this.setState({users:!this.state.users})}} link="#">Users</Option>
                <Option list={this.getAccounts()}    offset="80%" onClick={()=> {this.clearMenu(), this.setState({account:!this.state.account})}} link="#">Account</Option>
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
    tournaments:{
      width:'100%',
      position:'relative',
      '@media (min-width: 599px)': {
          position:'absolute',
          width:'20%',
          marginLeft:'0%',
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
    optionList:{
      position:'absolute',
      display:'block',
      width:'20%',
      '@media (max-width: 600px)': {
          position:'relative',
          display:'inline-block',
          width:'100%',
          marginLeft:'0',
      }
    }

});
