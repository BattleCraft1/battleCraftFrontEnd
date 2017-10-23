import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'
import './style.css'

export default class PanelButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            inputValue:"",
            validFile:false,//This is validation flag
        }
    }

    updateInputValue(evt) {
      let value = "No file loaded"
      if(evt.target.files.item(0)){
          let tmp = evt.target.value.toString().split('.')
          if(tmp[tmp.length-1] == "pdf"){
            value = evt.target.files.item(0).name
            this.setState({
              validFile:true,
            });
          }
          else{
             value = "Only pdf files are supported!"
             this.setState({
               validFile:false,
            });
          }
        }
        this.setState({
          inputValue: value,
        })
    }

    getPath(){
      if( this.state.inputValue )
        return(this.state.inputValue)
      return "No file loaded"
    }

    render(){
        return(
          <div style={{position:'relative', width:'100%', height:'30px'}}>
          <form action="#">
            <button style={styles.tableButton} className={css(resp.tableButton)}>
              <input style={styles.fileInput}
               id="my-file" type="file"
               onChange={(evt)=>this.updateInputValue(evt)}/>
              <div>{this.getPath()}</div>
            </button>
          </form>
          </div>
        )
    }
}
