import {StyleSheet} from 'aphrodite';

const styles = {
  background:{
    zIndex:'2',
    position:'fixed',
    height:'100%',
    width:'100%',
    top:'0',
    left:'0',
    backgroundColor:'rgba(5, 5, 5, 0.55)'
  },
  popupContent:{
    fontFamily:'arial, helvetica, sans-serif',
    boxSizing:'border-box',
    position:'fixed',
    width:'60%',
    margin:'20%',
    marginTop:'8%',
    zIndex:'100',
    borderRadius:'3px',
    background:'#45341d',
    padding:'10px',
    paddingBottom:'15px',
    paddingTop:'15px',
    },
  optionContainer:{
    width:'48%',
    float:'left',
    marginLeft:'1%',
    marginRight:'1%',
    borderRadius:'2px',
    marginBottom:'5px',
    marginTop:'5px',
  },
  optionLabel:{
    fontWeight:'700',
    textShadow:'rgba(0, 0, 0, 0.3) -2px -2px 0px',
    paddingTop:'5px',
    paddingBottom:'5px',
    display:'inline-block',
    width:'100%',
    textAlign:'center',
    borderRadius:'2px 2px 0 0',
    border:'0px',
    backgroundImage: 'linear-gradient(#a48c6d, #65462a, #463716)',
    color:'rgb(223, 214, 197)'
  },
  optionInput:{
    boxSizing:'border-box',
    paddingTop:'2%',
    paddingBottom:'2%',
    width:'100%',
    minHeight:'30px',
    borderRadius:'0 0 2px 2px',
    border:'0px',
    background:'#e0d9d0',
    padding:'5px',
    outline:'0',
  },
  button:{
    width:'20%',
    float:'right',
    marginTop:'1%',
    marginRight:'1%',
    paddingTop:'8px',
    paddingBottom:'8px',
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
  goldAndBrownTheme:{
    border:'2px solid',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#614722',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
    boxShadow:'inset 0 0 8px #9c7239',
  },
  middleOption:{
    marginLeft:'0.5%',
    marginRight:'0.5%',
  },
  hSeparator:{
    height:'5px',
  },
  vSeparator:{
    width:'0.5%',
    display:'inline-block',
  },
}


const resp = StyleSheet.create({
  popupContent:{
    '@media (max-width: 720px)': {
      marginTop:'2%',
      width:'96%',
      marginLeft:'2%',
    },
    '@media (max-width: 480px)': {
      fontSize:'80%',
    },
  },
  button:{
    ':active':{
        borderTopColor: 'rgb(204, 126, 69)',
        borderBottomColor: 'rgb(249, 249, 249)',
        color:'lightGrey',
        backgroundImage: 'linear-gradient( #4b110d, #6f1913, #dd5353 )',
      },
  },
  halfSize:{
    width:'49.75%',
    display:'inline-block',
  },
  thirdSize:{
    width:'33%',
    display:'inline-block',
  },
  optionContent:{
    width:'98%',
    marginLeft:'1%',
    marginRight:'1%',
    marginBottom:'2px',
    display:'inline-block',
  },
})


export {resp, styles};
