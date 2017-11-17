import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Background from '../../../../resources/questionAvatar.png';
import {serverName} from "../../../../main/consts/server";


export default class Avatar extends React.Component{
    constructor(props) {
        super(props);
    }

    generateURL(){
        return this.props.username !== ""? `${serverName}get/user/avatar?username=${this.props.username}`: Background
    }

    render(){
        return(
            <div
                onClick={() => this.props.onClick()}
                style={Object.assign({}, styles.avatar, {float:this.props.float, backgroundImage:"url("+this.generateURL()+")",
                borderColor:this.props.border}, this.props.popup ? styles.popupAvatar:"", this.props.s)}>
            </div>
        )
    }
}
