var React = require('react');
var Radium = require('radium');
var Option = require('./NavElement');
var Logo = require('./NavLogo');
/*var style = {
  width: '60%',

  '@media (min-width: 320px)':{
    width: '30%'
  },

  ulBase: {
    background: 'grey',
    border: '2px black solid',
    borderRadius: 4,
    color: 'white',
    padding: '1.5em'
  }
};
*/

var styles = {
  ul: {
    boxSizing: 'border-box',
    listStyleType: 'none',
    overflow:'hidden',
    //backgroundColor: '#423316',
    width: '70%',
    margin: '0',
    padding: '0',
    marginLeft: '15%',
  '@media screen and (max-width: 400px)': {
      width: '100%',
      marginLeft:'0',
    }
  },
};

class Navigator extends React.Component{
    render(){
        return (
          <div style = {[styles.ul]}>
            <Option>Turnieje</Option>
            <Option>Gry</Option>
            <Option>Rankingi</Option>
            <Option >MojeKonto</Option>
            <Option>Button</Option>
            </div>//kolejnosc wystepowania na liscie wiazaca!!

        //  <li styles = {styles.li}><a style = {styles.a} href="#news">News</a></li>

            /*
          <ul style= {style.base}>
            <li><a href="default.asp">Home</a></li>
            <li><a href="news.asp">News</a></li>
            <li><a href="contact.asp">Contact</a></li>
            <li><a href="about.asp">About</a></li>
          </ul>
*/
        );
    }
};

module.exports = Radium(Navigator);
