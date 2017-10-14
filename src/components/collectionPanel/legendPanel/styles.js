import {StyleSheet, css} from 'aphrodite';

const styles = {
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
    paddingTop:'1px',
    paddingBottom:'1px',
  },
  thead:{
    boxSizing:'border-box',
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
}

const resp = StyleSheet.create({
  legendOption:{
      '@media (max-width: 600px)': {
        display:'inline-block',
        width:'100%',
        margin:'0',
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
      borderRadius:'0',
    },
  },
})

export {resp, styles};
