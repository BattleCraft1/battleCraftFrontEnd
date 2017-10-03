  import {StyleSheet, css} from 'aphrodite';

  const styles = {
    background:{
      zIndex:'99',
      position:'fixed',
      height:'100%',
      width:'100%',
      top:'0',
      left:'0',
      backgroundColor:'rgba(5, 5, 5, 0.55)',
      //display:'none',//DELETE!!
    },
    popupContent:{
      fontFamily:'arial, helvetica, sans-serif',
      boxSizing:'border-box',
      position:'fixed',
      width:'80%',
      margin:'10%',
      marginTop:'12%',
      zIndex:'100',
      borderRadius:'3px',
      background:'#45341d',
      padding:'5px',
      paddingBottom:'10px',
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
      paddingTop:'1%',
      paddingBottom:'1%',
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
      marginLeft:'2%',
      marginRight:'2%',
    },
  }


  const resp = StyleSheet.create({
    popupContent:{
      '@media (max-width: 720px)': {
        width:'96%',
        marginLeft:'2%',
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
    thirdSize:{
      width:'32%',
      display:'inline-block',
      '@media (max-width: 840px)': {
        fontSize:'70%',
      },
    },
  })


  export {resp, styles};
