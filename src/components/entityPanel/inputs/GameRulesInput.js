import React from 'react';

import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'
import '../Game/style.css'

import {serverName} from "../../../main/consts/server";
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions/index';

class GameRulesInput extends React.Component{

    updateInputValue(e) {
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
        if(file && (fileType === 'pdf')){
            let formData = new FormData();
            formData.append('gameRules',file);
            axios.post(serverName+`/upload/game/rules?gameName=`+ this.props.name,
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    }
                })
                .then(res => {
                    this.props.showSuccessMessage("Game rules successfully changed");
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
            <div style={{position:'relative', width:'100%', height:'30px'}}>
                {!this.props.disabled && <button style={styles.tableButton} className={css(resp.tableButton)}>
                    <input style={styles.fileInput}
                           id="gameRules" type="file"
                           onChange={(evt)=>this.updateInputValue(evt)}/>
                    <div>Upload game rules</div>
                </button>}
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

export default connect( mapStateToProps, mapDispatchToProps )( GameRulesInput );
