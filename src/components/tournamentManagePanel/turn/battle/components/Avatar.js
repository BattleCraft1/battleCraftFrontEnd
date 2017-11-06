import React from 'react';
import {resp, styles} from '../../../styles'
import {css} from 'aphrodite';
import Background from '../../../../../resources/questionAvatar.png';


export default class Avatar extends React.Component{

    render(){
        return(
                <div style={Object.assign({}, styles.avatar, {float:this.props.float, backgroundImage:"url("+Background+")", borderColor:this.props.border})}>
                </div>
        )
    }
}
