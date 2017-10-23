import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'

export default class Avatar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          imageIsPresent:false,
          file: '',
          imagePreviewUrl:'',
        }
    }

    handleImageChange(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      let fileType = ""
      let size = 0//can be used to validate size of file
      if(file){
        fileType = file.type.toString().split("/")[0]
        size = file.size
      }
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      if(file && (fileType === 'image')){
        reader.readAsDataURL(file)
        this.setState({
          imageIsPresent:true,
        });
      }
      else{
        this.setState({
          imageIsPresent:false,
        });
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
          <div>
          <form action="#">
            <button
            style={Object.assign({}, styles.avatarButton,  (this.state.imageIsPresent) ? {backgroundImage:'url('+this.state.imagePreviewUrl+'), linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(109, 80, 152, 0.7)'} :{})}
            className={css(resp.avatarButton)}
            onMouseEnter={()=>{this.setState({hover:true})}}
            onMouseLeave={()=>{this.setState({hover:false})}}>
              <input style={styles.fileInput}
               required
               type="file"
               onChange={(evt)=>this.handleImageChange(evt)}/>
               {!this.state.imageIsPresent && <div>Click to load avatar</div>}
               {(this.state.imageIsPresent && this.state.hover) && <span style={{position:'relative', top:'70px'}}>Click to change avatar</span>}
            </button>
          </form>
          </div>
        )
    }
}
