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
            <div style={Object.assign({}, styles.avatarCell)}>
                <div className={css(resp.avatar)}
                     style={{width:'100%', height:'38px', background:`url(${serverName}/get/user/avatar?username=${this.props.name}&${new Date().getTime()})`}}/>
            </div>
        )
    }
}

const styles = {
    avatarCell: {
        width:'100%',
        height:'50px',
        background:'green',
        border:'1px solid black',
        boxSizing:'border-box',
    },
};

const resp = StyleSheet.create({

});
