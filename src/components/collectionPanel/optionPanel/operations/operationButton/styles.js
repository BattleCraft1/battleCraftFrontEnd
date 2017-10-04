import {StyleSheet, css} from 'aphrodite';

const styles = {
  button:{
      textAlign:'center',
      dislay:'inline-block',
      position:'relative',
      minWidth:'13%',
      padding: '4px',
      margin:'1px',
      borderTopColor: '#E0BA51',
      borderBottomColor: '#E0BA51',
      borderRightColor: '#805D2C',
      borderLeftColor: '#e3ca86',
      backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#7d150e), to(#8c3731))',
      backgroundImage: 'linear-gradient(#f66060, #7d150e, #5b0f0a)',
      boxShadow:'inset 0 0 7px #9c7239',
      color:'white',
      outline:'0',
      borderRadius:'2px',
    }
}


const resp = StyleSheet.create({
    theadElement:{
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
    },
    button:{
        ':active':{
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
            color:'lightGrey',
            backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
            backgroundImage: 'linear-gradient( #4b110d, #6f1913, #dd5353 )',
        },
        '@media (max-width: 600px)': {
            display:'inline-block',
            width:'30%',
        },
    },
});

export {resp, styles};
