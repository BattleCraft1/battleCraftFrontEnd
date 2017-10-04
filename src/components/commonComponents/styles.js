import {StyleSheet, css} from 'aphrodite';

const styles = {

  background:{
    position:'fixed',
    zIndex: '99',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0,0,0)',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalDialog:{
    marginTop:'25%',
  },
  modalContent:{
    fontFamily:'arial, helvetica, sans-serif',
    boxSizing:'border-box',
    background:'blue',
    marginLeft:'30%',
    width:'40%',
    padding:'1%',
    borderRadius:'3px',
    background:'#45341d',
  },
  modalHeader:{
    background:'',
  },
  closeX:{
    float:'right',
    width:'30px',
    height:'28px',
    fontSize:'160%',
    padding:'0',
    margin:'0',
  },
  goldAndBrownTheme:{
    border:'2px solid',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#614722',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
    boxShadow:'inset 0 0 8px #9c7239',
  },
  button:{
    fontSize:'100%',
    float:'right',
    marginTop:'1%',
    marginRight:'1%',
    paddingTop:'4px',
    paddingBottom:'4px',
    border:'1px solid',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#E0BA51',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
    backgroundImage: 'linear-gradient(#d55151, #55130f, #4b1310)',
    boxShadow:'inset 0 0 7px #9c7239',
    color:'white',
    outline:'0',
    borderRadius:'2px',
  },
  modalFooter:{
    position:'relative',
    display:'inline-block',
    width:'100%'
  },
  modalBody:{
    color:'rgb(223, 214, 197)',
    textAlign:'center',
  },
  optionLabel:{
    fontWeight:'700',
    textShadow:'rgba(0, 0, 0, 0.3) -2px -2px 0px',
    paddingTop:'1%',
    paddingBottom:'1%',
    display:'inline-block',
    width:'100%',
    textAlign:'center',
    borderRadius:'2px 2px 0 0',
    border:'0px',
    backgroundImage: 'linear-gradient(#a48c6d, #65462a, #463716)',
    color:'rgb(223, 214, 197)',
    margin:'0',
  },
  messageContainer:{
    position:'fixed',
    background:'red',
    zIndex:'1000',
    width:'90%',
    padding:'0',
    top:'15%',
    margin:'0',
    background:'red',
  },
  messageBox:{
    boxSizing:'border-box',
    position:'fixed',
    background:'blue',
    width:'50%',
    marginLeft:'20%',
    padding:'1%',
    borderRadius:'4px',
    border:'1px solid white',
    color:'rgb(230, 225, 227)',
  },
}

const resp = StyleSheet.create({
  button:{
    ':active':{
        borderTopColor: 'rgb(204, 126, 69)',
        borderBottomColor: 'rgb(249, 249, 249)',
        color:'lightGrey',
        backgroundImage: 'linear-gradient( #4b110d, #6f1913, #dd5353 )',
      },
    },
  messageBox:{
    '@media (max-width: 720px)': {
      marginTop:'2%',
      width:'80%',
      marginLeft:'10%',
    },
  }
})

export {resp, styles}
