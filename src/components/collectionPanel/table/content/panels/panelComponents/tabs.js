import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'

import axios from 'axios';

export default class TabButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          basicDataActive :     true,
          addressActive :       false,
          organisatorsActive :  false,
          participantsActive :  false,
        };
    }

    clearActive(){
      this.setState({
        basicDataActive :     false,
        addressActive :       false,
        organisatorsActive :  false,
        participantsActive :  false,
      });
    }



        render(){
          return(
            <div>
              <div  onClick={()=>{this.clearActive(), this.setState({basicDataActive:true}); this.props.setActive("basic")}}
                    style={  Object.assign({}, styles.tabButton, this.state.basicDataActive ? {borderRight:'2px solid #805D2C'} : styles.tabNotActive) }
                    >
                    TabButton
              </div>
              <div  onClick={()=>{this.clearActive(), this.setState({addressActive:true}); this.props.setActive("adress")}}
                    style={  Object.assign({}, styles.tabButton, this.state.addressActive ? {borderRight:'2px solid #805D2C', borderLeft:'2px solid #e3ca86'} : styles.tabNotActive) }
                    >
                    TabButton
              </div>
              <div  onClick={()=>{this.clearActive(), this.setState({organisatorsActive:true}); this.props.setActive("organisators")}}
                    style={  Object.assign({}, styles.tabButton, this.state.organisatorsActive ? {borderRight:'2px solid #805D2C', borderLeft:'2px solid #e3ca86'} : styles.tabNotActive) }
                    >
                    TabButton
              </div>
              <div  onClick={()=>{this.clearActive(), this.setState({participantsActive:true}); this.props.setActive("participants")}}
                    style={  Object.assign({}, styles.tabButton, this.state.participantsActive ? {borderLeft:'2px solid #e3ca86'} : styles.tabNotActive) }
                    >
                    TabButton
              </div>
            </div>
          )
        }
    }


// this.setState({tournaments:!this.state.tournaments}) }}
// style ={(this.state.width < 600 && this.state.isToggleOn) ? {display:'none'}:{display:'block'}}
