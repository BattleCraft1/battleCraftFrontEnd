import {StyleSheet} from 'aphrodite';

const styles = {
  button:{
      textAlign:'center',
      dislay:'inline-block',
      position:'relative',
      minWidth:'13%',
      padding: '4px',
      margin:'1px',
      borderTopColor: '#f2cecb',
      borderBottomColor: '#881710',
      borderRightColor: '#96443e',
      borderLeftColor: '#c38e8b',
      backgroundImage: 'linear-gradient(#f66060, #7d150e, #5b0f0a)',
      color:'white',
      outline:'0',
      borderRadius:'1px',
      marginLeft:'5px',
      marginRight:'5px',
      float:'left',
      borderWidth:'1px',
      textShadow:'0px 0px 4px #1b0808',
    }
};


const resp = StyleSheet.create({
    button:{
        ':hover':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 161, 130)',
            textShadow:'0px 0px 3px #f7f5f5',
        },
        ':active':{
            color:'lightGrey',
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
            backgroundImage: 'linear-gradient( #4b110d, #6f1913, #dd5353 )',
            color:'lightGrey',
        },
        '@media (max-width: 600px)': {
          display:'inline-block',
          width:'30%',
          float:'',
          marginLeft:'2px',
          marginRight:'2px',
        },
    },
});

export {resp, styles};
