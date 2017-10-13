import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Tabs from './tabs';
import TabContent from './tabContent';
import TextInput from '../inputs/TextInput'
import DateInput from '../inputs/DateInput'
import TextArea from '../inputs/TextArea'
import SelectInput from '../inputs/SelectInput'

import {resp, styles} from '../styles'


import axios from 'axios';

export default class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          basicDataActive :     true,
          addressActive :       false,
          organisatorsActive :  false,
          participantsActive :  false,
        };
      this.setActive = this.setActive.bind(this);
    }
    clearActive(){
      this.setState({
        basicDataActive :     false,
        addressActive :       false,
        organisatorsActive :  false,
        participantsActive :  false,
      });
    }
    setActive(name){
      this.clearActive()
      console.log("click!")
      if(name == "basic"){
        console.log("basic!", name)
        this.setState({basicDataActive : true,})
      }
      if(name == "adress"){
        this.setState({addressActive : true,})
      }
      if(name == "organisators"){
        this.setState({organisatorsActive : true,})
      }
      if(name == "participants"){
        this.setState({participantsActive : true,})
      }
    }

        render(){
          const basicData =
          <div>
          <TextInput name={"Name"}/>
          <TextInput name={"Tables count"}/>
          <TextInput name={"Max players"}/>
          <TextInput name={"Game"}/>
          <DateInput name={"Start at"}/>
          <DateInput name={"Ends at"}/>
          </div>

          const address =
          <div>
          <SelectInput name={"Province"} options={<option>option1</option>}/>
          <TextInput name={"Name"}/>
          <TextInput name={"City"}/>
          <TextInput name={"Street"}/>
          <TextInput name={"ZIP code"}/>
          <TextArea  name={"Description"}/>
          </div>

          const organisators = <div>ORGANISATORS</div>
          const participants = <div>PARTICIPANTS</div>

          let content =<div className={css(resp.content)}>
                        {this.state.basicDataActive && basicData}
                        {this.state.addressActive && address}
                        {this.state.organisatorsActive && organisators}
                        {this.state.participantsActive && participants}
                      </div>
          return(
            <div style={styles.goldAndBrownTheme} className = {css(resp.panel)}>
              <Tabs setActive={this.setActive.bind(this)}/>
              {content}
            </div>
          )
        }
    }
