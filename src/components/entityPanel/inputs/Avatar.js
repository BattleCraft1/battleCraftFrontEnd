import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'
import {serverName} from "../../../main/consts/server";

export default class Avatar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          imageIsPresent:true,
          file: '',
          imagePreviewUrl:'',
        }
    }

    handleImageChange(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      let fileType = "";
      let size = 0;//can be used to validate size of file
      if(file){
        fileType = file.type.toString().split("/")[0];
        size = file.size
      }
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      };
      if(file && (fileType === 'image')){
        reader.readAsDataURL(file);
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

    render(){
        return(
          <div>
          <form action="#">
            <button
            style={Object.assign({}, styles.avatarButton,  (this.state.imageIsPresent) ? {backgroundImage:'url('+serverName+`/get/user/`+this.props.username+'/avatar), linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(109, 80, 152, 0.7)'} :{})}
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
