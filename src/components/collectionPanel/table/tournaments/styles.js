import {StyleSheet, css} from 'aphrodite';

const styles = {
    rowContent:{
      borderRadius:'0',
      background:'#c6a57d',
      border:'1px solid',
      textAlign: 'center',
      backgroundImage: '',
      WebkitBorderImage: '',
      color:'black',
      borderTopColor:'#dfd19e',
      borderBottomColor:'#886e4b',
      borderLeftColor:'#dfd19e',
      borderRightColor:'#886e4b',
      textShadow:' ',
      boxSizing: 'border-box',
    },
    rowContentActive:{
      background:'#906a3d'
    },
    thead:{
      borderCollapse: 'separate',
      borderRadius: '4px 4px 0 0',
      border:'1px solid',
      color:'white',
      borderTopColor: '#E0BA51',
      borderBottomColor: '#E0BA51',
      borderRightColor: '#805D2C',
      borderLeftColor: '#e3ca86',
      background:'#735630',
      backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
    },
    theadActive:{
      borderCollapse: 'separate',
      borderRadius: '4px 4px 0 0',
      border:'1px solid',
      color:'lightGrey',
      borderTopColor: 'rgb(204, 126, 69)',
      borderBottomColor: 'rgb(249, 249, 249)',
      background:'#735630',
      backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
    },
    table:{
      borderSpacing:'0px',
      position:'relative',
      background:'black',
      width: '90%',
      marginLeft:'5%',
      marginBottom:'4px',
      borderCollapse:'separate',
    },
    checkbox:{
      margin: '0',
      height:'10%',
      borderRight: '0px',
      textAlign: 'center',
    },
    name:{
      width:'90%',
    },
    button:{
      textAlign:'center',
      dislay:'inline-block',
      position:'relative',
      width:'16%',
      padding: '4px',
      margin:'0',
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
    },
    buttonGroup:{
      boxSizing:'border-box',
      width:'90%',
      marginLeft:'5%',
      textAlign:'center',
      paddingTop:'4px',
      paddingBottom:'4px',
      background:'#45341d',
      boxShadow:'inset 0 0 4px #9c7239',
      borderCollapse: 'separate',
      border:'1px solid',
      color:'rgb(204, 126, 69)',
      borderTopColor: '#E0BA51',
      borderBottomColor: '#614722',
      borderRightColor: '#805D2C',
      borderLeftColor: '#e3ca86',
    },
    legend:{
      position:'relative',
      width:'90%',
      marginLeft:'5%',
      marginBottom:'10px',
      padding:'0',
    },
    legendOption:{
      display:'inline-block',
      position:'relative',
      width:'20%',
      paddingTop:'3px',
      paddingBottom:'3px',
    },
}

const resp = StyleSheet.create({
    theadElement:{
      boxShadow:'inset 0 2px 2px #9c7239',
      fontFamily:'arial, helvetica, sans-serif',
      textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
      padding: '8px',
      paddingLeft:'4px',
      paddingRight:'4px',
      textAlign: 'center',
      '@media (max-width: 600px)': {
        display:'none',
      },
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
    tableRow:{
      '@media (max-width: 600px)': {
        display:'block',
        position:'relative',
      },
    },
    rowContent:{
      boxSizing:'border-box',
      position:'relative',
      textAlign:'center',
      margin:'0',
      paddingTop:'8px',
      paddingBottom:'8px',
      '@media (max-width: 599px)': {
        width:'70%',
        paddingTop: '2%',
        paddingBottom: '2%',
        display: 'inline-block',
        borderRadius:'0'
      }
    },
    rowLabel:{
      boxSizing:'border-box',
       width:'30%',
       paddingTop: '2%',
       paddingBottom: '2%',
      '@media (min-width: 600px)': {
        display:'none',
      }
    },
    nameLabel:{
      height:'30%',
      width:'20%',
      paddingTop: '2%',
      paddingBottom: '2%',
      boxSizing:'border-box',
      '@media (min-width: 600px)': {
        display:'none',
      },
    },
    legendOption:{
      '@media (max-width: 600px)': {
        display:'inline-block',
        width:'100%',
        margin:'0',
      },
    },
    smallCheckbox:{
      boxSizing:'border-box',
      textAlign:'center',
      '@media (max-width: 599px)': {
        width:'10%',
        margin:'0',
        paddingTop: '2.5%',
        paddingBottom: '1.5%',
      }
    },
})

export {resp, styles};
