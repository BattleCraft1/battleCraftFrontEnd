import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {serverName} from '../../../../../../main/consts/server';
import Background from '../../../../../../resources/defaultAvatar.jpg';


export default class TableAvatarCell extends React.Component{
    render(){
        return(
          <div className={css(resp.avatarContainer)}>
            <td className = {css(resp.rowContent)+" "+css(resp.defaultAvatar)}
                style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.props.color})}
                onClick={() => {this.props.onClick()}}>
                <img src={serverName+`/get/user/`+this.props.name+`/avatar`} alt="" className={css(resp.avatar)}/>
            </td>
          </div>
        )
    }
}

const styles = {
    thead: {
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border: '1px solid',
        color: 'white',
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        background: '#735630',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
    },
    rowContent: {
        borderRadius: '0',
        background: '#c6a57d',
        border: '1px solid',
        padding: '8px',
        paddingLeft: '8px',
        textAlign: 'none',
        backgroundImage: '',
        WebkitBorderImage: '',
        color: 'black',
        borderTopColor: '#dfd19e',
        borderBottomColor: '#886e4b',
        borderLeftColor: '#dfd19e',
        borderRightColor: '#886e4b',
        paddingTop:'10px',
        paddingBottom:'10px',
    },
};

const resp = StyleSheet.create({
    rowContent:{
      overflow:'hidden',
      textOverflow:'elipsis',
        position:'relative',
        textAlign:'center',
        boxSizing:'border-box',
        '@media (max-width: 599px)': {
            width:'70%',
            display: 'inline-block',
            borderRadius:'0'
        },
        '@media (max-width: 1024px)': {
            fontSize:'0.8em',
            paddingLeft:'2px',
            paddingRight:'2px',
        },
    },
    avatar:{
    },
    defaultAvatar:{
      height:'20px',
      width:'20px',
      borderRadius:'0',
      background: "url("+Background+") center center",
      backgroundSize:'cover',
      '@media (max-width: 599px)': {
        borderRadius:'50%',
        height:'80px',
        width: '80px',
      },
    },
    avatarContainer:{
      float:'right',
      textAlign:'center',
      '@media (max-width: 599px)': {
          width:'80%',
          display: 'inline-block',
          borderRadius:'0'
      },
    }
});
