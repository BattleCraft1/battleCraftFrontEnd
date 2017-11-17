import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Background from '../../../../resources/questionAvatar.png';
import {serverName} from "../../../../main/consts/server";


export default class Avatar extends React.Component{

    generateURL(){
        return this.props.username !== ""? `${serverName}get/user/avatar?username=${this.props.username}`: Background
    }

    render(){
        return(
                <div style={Object.assign({}, styles.avatarSmall, {backgroundImage: "url(" +this.generateURL()+ ")"})}/>
        )
    }
}
