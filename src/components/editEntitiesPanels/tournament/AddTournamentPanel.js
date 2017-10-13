import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Panel from '../panelComponents/panel';
import Button from '../panelComponents/button';
import {resp, styles} from '../styles'


export default class AddTournamentPanel extends React.Component{
    switchTab(){
      console.log('switch')
    }

    render(){
      return(
        <div style = {Object.assign({}, styles.background, {display: 'block'})}>
          <div
          style = {Object.assign({}, styles.goldAndBrownTheme, styles.panelContainer)}
          className = {css(resp.popupContent)}>
          <Panel/>
          <Button text={"Cancel"}/>
          <Button text={"Save"}/>
          </div>
        </div>
      );
    }
}
