import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {serverName} from '../../../../main/consts/server';


export default class TableAvatarCell extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        width:'0px',
      };
  }

    render(){
        return(
            <div style={Object.assign({background:`url(${serverName}/get/user/avatar?username=${this.props.name})`}, styles.avatarCell)}/>

        )
    }
}

const styles = {
    avatarCell: {
        width:'100%',
        height:'50px',
        border:'1px solid black',
        boxSizing:'border-box',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
};

const resp = StyleSheet.create({

});
