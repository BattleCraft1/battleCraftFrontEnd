import React, { Component } from 'react';
import styles from './App.css.js';
import MyButton from '../components/mybutton/MyButton'
import Navigator from '../components/navbar/Navbar'
import {StyleRoot} from 'radium';



var style = {
  base:{
    position:'absolute',
    width: '100%',
    height: '100%',
  backgroundColor:'rgb(35, 40, 43)',
  padding: '20px 0 0 0',
  margin: '0 0 0 0',


}}



class App extends Component {

    render(){
        return (
          <StyleRoot style={style.base}>
            <div>
                <Navigator/>
            </div>
            </StyleRoot>
        );
    }
}

export default App;
