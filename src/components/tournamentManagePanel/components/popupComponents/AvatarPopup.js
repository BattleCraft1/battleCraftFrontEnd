import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Background from '../../../../resources/questionAvatar.png';


export default class Avatar extends React.Component{
  constructor(props) {
      super(props);
  }
    render(){
        return(
                <div onClick={()=>this.props.toggleList()}style={Object.assign({}, styles.avatar, {float:this.props.float, backgroundImage:"url("+Background+")", borderColor:this.props.border}, this.props.popup ? styles.popupAvatar:"", this.props.s)}>
                </div>
        )
    }
}
