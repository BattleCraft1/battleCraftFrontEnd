import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'

import {serverName} from "../../../main/consts/server";
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions/index';

class Avatar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          hover:false
        }
    }

    handleImageChange(e) {
        e.preventDefault();
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            this.props.showFailureMessage("No file");
        }
        let file = files[0];
        let fileType = "";
        if(file){
            fileType = file.type.toString().split("/")[1];
        }
        if(file && (fileType === 'bmp' || fileType === 'gif' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png')){
            let formData = new FormData();
            formData.append('avatar',file);
            axios.post(serverName+`upload/user/avatar?username=`+ this.props.username,
                formData,
                {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                }
            })
                .then(res => {
                    this.props.showSuccessMessage("Avatar successfully changed");
                })
                .catch(error => {
                    this.props.showNetworkErrorMessage(error);
                });
        }
        else{
            this.props.showFailureMessage("Extension: "+fileType+" is not acceptable extension of user avatar. You should try with jpg, gif, bmp or png");
        }
    }

    render(){
        return(
            <div>
                <button
                    style={Object.assign({}, styles.avatarButton, {backgroundImage:'url('+serverName+`/get/user/`+this.props.username+'/avatar), linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(109, 80, 152, 0.7)'})}
                    className={css(resp.avatarButton)}
                    onMouseEnter={()=>{!this.props.disabled && this.setState({hover:true})}}
                    onMouseLeave={()=>{!this.props.disabled && this.setState({hover:false})}}>
                    {!this.props.disabled && <input style={styles.fileInput}
                                                    required
                                                    type="file"
                                                    onChange={(evt)=>this.handleImageChange(evt)}/>}
                    <div className={css(element.hoverElement)}><span style={{position:'absolute', bottom:'10px', left:'0px', width:'100%'}}>Click to change avatar</span></div>
                </button>
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Avatar );


const element = StyleSheet.create({
  hoverElement:{
    position:'relative',
    opacity:'0',
    height:'100%',
    width:'100%',
    textAlign:'',
    ':hover':{
      opacity:'1',
    },
  }
})
