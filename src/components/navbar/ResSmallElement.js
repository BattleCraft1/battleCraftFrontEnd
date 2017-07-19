import { StyleSheet, css } from 'aphrodite';
import React from 'react';


var styles = {

  button:{
    width:"100%",
    borderTopColor: '#E0BA51',
    borderRightColor: '#805D2C',
    borderBottomColor: '#E0BA51',
    borderLeftColor: '#e3ca86',

    borderWidth:' 4px 3px 4px 3px',
    borderStyle: 'solid',
    WebkitBorderRadius: '1px',
    MozBorderRadius: '1px',
    borderRadius: '1px',

    fontSize:'100%',
    boxSizing: 'border-box',
    padding: '8px 0px',
    fontFamily:'arial, helvetica, sans-serif',
    textDecoration:'none',
    display:'inline-block',
    textShadow:'-2px -2px 0 rgba(0,0,0,0.3)',
    fontWeight:'bold',
    color:'#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#805D2C',
    backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
    WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px;',
  },

};


export default class ResSmallElement extends React.Component{
    render(){
        return (
                  <a style = {styles.button} className={css(resp.small)} href="#">{this.props.children}</a>
        );
    }
};


const resp = StyleSheet.create({
    small: {
      ':hover':{
          borderTopColor: 'rgb(249, 249, 249)',
          borderBottomColor: 'rgb(204, 126, 69)',
      },
      ':focus':{
          borderTopColor: 'rgb(249, 249, 249)',
          borderBottomColor: 'rgb(204, 161, 130)',
        },
      ':active':{
          color:'lightGrey',
          borderTopColor: 'rgb(204, 126, 69)',
          borderBottomColor: 'rgb(249, 249, 249)',
        },
        '@media (min-width: 599px)': {
            display: 'none',

        }
    },
});
