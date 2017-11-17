import React from 'react';
import { connect } from 'react-redux';
import {styles} from '../../styles';
import Avatar from '../commonComponents/Avatar'

class PlayerListElement extends React.Component {

  constructor(props) {
      super(props);
      this.state = {positionX:0}
  }

  componentDidMount() {
    const position = document.getElementById(this.props.id).getBoundingClientRect();
    this.setState({positionX:position.x})
  }

  getOpacity(){
    let opacity = 1;
    if(document.getElementById(this.props.id) !== null){
      let x = document.getElementById(this.props.id).getBoundingClientRect().x;
      let w = document.getElementById(this.props.id).getBoundingClientRect().width;
      let pw = window.innerWidth;
      let offset = 0.2 * pw;
    if(x+(w/2) < offset)
    {
      opacity = x/offset
    }
    else if(x+(w/2) > pw - offset)
    {
      opacity = (pw - x)/offset
    }
  }
    return opacity>1 ? 1:opacity
  }

    render() {
        return (
            <div id={this.props.id} style = {Object.assign({}, styles.playerListELement, {opacity:this.getOpacity(), height:(this.getOpacity()*100)+'px'})}>
            <Avatar username={this.props.username} s={{height:'80px', width:'70px', boxShadow:'inset 0 0 6px rgb(0, 0, 0), inset 0 0 2px rgb(0, 0, 0)', border:'0', height:'80%'}}/>
            <div style={styles.playerName}>{this.props.username===""?"NO NAME":this.props.username}</div>
            </div>
        );
    }
}

export default PlayerListElement;
