import React from 'react';
import {StyleSheet, css} from 'aphrodite';

import axios from 'axios';

export default class TabContent extends React.Component{
    constructor(props) {
        super(props);
    }
        render(){
          return(
            <div className = {css(resp.tabContent)}>
            tabContent
            </div>
          )
        }
    }

const resp = StyleSheet.create({
  tabContent:{
    display:'block',
    background:'blue',
    position:'relative',
    width:'100%',
    height:'90%',
    border:'1px solid black',
    borderTop:'0px',
    boxSizing:'border-box',
  }
})
