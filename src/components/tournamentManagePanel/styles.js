import {StyleSheet} from 'aphrodite';

const styles = {
  container:{
    boxSizing:'border-box',
      position:'relative',
      background:'rgb(180, 144, 90)',
      width:'90%',
      marginLeft:'5%',
      padding:'0px',
      paddingTop:'6px',
      paddingLeft:'6px',
      paddingRight:'6px',
  },
  innerContainer:{
    boxSizing:'border-box',
    position:'relative',
    background:'rgb(224, 190, 138)',
    width:'100%',
    height:'100%',
    padding:'10px',
    overflowX:'scroll',
    overflowY:'scroll',
    display:'inline-block',
    whiteSpace:'nowrap',
    margin:'0px',
  },
  goldAndBrownTheme:{
    border:'2px solid',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#614722',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
    boxShadow:'inset 0 0 8px #9c7239',
  },
  goldAndBrownThemeInset:{
    border:'2px solid',
    borderBottomColor: '#E0BA51',
    borderTopColor: '#614722',
    borderLeftColor: '#805D2C',
    borderRightColor: '#e3ca86',
    boxShadow:'inset 0 0 8px #9c7239',
  },
  optionLabel:{
    boxSizing:'border-box',
    fontWeight:'700',
    textShadow:'rgba(0, 0, 0, 0.3) -2px -2px 0px',
    paddingTop:'3px',
    paddingBottom:'3px',
    display:'inline-block',
    width:'100%',
    textAlign:'center',
    borderRadius:'2px 2px 0 0',
    backgroundColor:'rgba(101, 70, 42, 1)',
    //backgroundImage:'linear-gradient(45deg, rgba(231, 224, 188, 0.1),rgb(214, 208, 179) 60%,rgba(231, 224, 188, 0.1)), linear-gradient(91deg,rgba(103, 94, 56, 1) -3%,rgba(251, 250, 249, 0.9) 6%, rgba(219, 216, 216, 0.1) 6.5%',
    backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 10%, rgba(101, 70, 42, 1) 60%, rgba(255, 255, 255, 0.4) 65%)',
    color:'rgb(223, 214, 197)',
    border:'1px black solid',
    borderTopRightRadius:'5px',
    borderTopLeftRadius:'5px',
    borderBottom:'0',
  },
  optionLabelActive:{
    backgroundColor:'rgb(92, 135, 76)',
    backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 10%, rgba(101, 70, 42, 0) 60%, rgba(255, 255, 255, 0.4) 65%)',
    borderColor:'rgb(44, 80, 36)',
    borderBottomColor:'black',
  },
  turnContainer:{
    margin:'0',
    boxSizing:'border-box',
    display:'inline-block',
    minWidth:'100px',
    minHeight:'100px',
  },
  turnContent:{
    display:'relative',
    background:'rgb(158, 129, 73)',
    border:'1px solid black',
    minHeight:'100px',
  },
  cell:{
    border:'1px solid black',
    margin:'2px',
    backgroundColor:'rgb(154, 140, 81)',
    marginBottom:'4px',
    marginTop:'4px',
    display:'flow-root',
    height:'100%',
    backgroundImage:'linear-gradient(45deg, rgba(231, 224, 188, 0.1),rgb(214, 208, 179) 60%,rgba(231, 224, 188, 0.1)), linear-gradient(91deg,rgba(103, 94, 56, 1) -3%,rgba(251, 250, 249, 0.9) 6%, rgba(219, 216, 216, 0.1) 6.5%)',
    boxShadow:'inset 0px 0px 1px white, 0px 0px 4px black',
    padding:'4px',
    paddingBottom:'0',
  },
  avatar:{
    boxSizing:'border-box',
    border:'1px solid brown',
    height:'70px',
    width:'80px',
    background:'rgb(168, 170, 173)',
    display:'inline-block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  textOutput:{
    position:'relative',
    display:'block',
    border:'1px solid',
    borderTopColor:'rgb(235, 229, 205)',
    borderLeftColor:'rgb(177, 172, 155)',
    borderRightColor:'rgb(124, 118, 98)',
    borderBottomColor:'rgb(88, 83, 65)',
    boxSizing:'border-box',
    height:'50%',
    paddingLeft:'4px',
    paddingRight:'4px',
    overflow:'hidden',
    background:'rgb(210, 197, 142)',
    backgroundImage: 'linear-gradient(-45deg, rgba(0,0,0,0),rgba(0,0,0,0),rgba(255,255,255,0.8),rgba(0,0,0,0),rgba(0,0,0,0))',
    boxShadow:'inset 0 0 5px rgb(152, 139, 91)',
  },
  textOutputContainer:{
    boxSizing:'border-box',
    display:'inline-block',
    height:'70px',
    border:'1px black solid',
    margin:'0px',
    top:'0px',
    width:'-webkit-fill-available',
    maxWidth:'160px',
    minWidth:'100px',
  },
  textOutputLabel:{
    boxSizing:'border-box',
    height:'12px',
    fontSize:'10px',
    width:'fit-content',
    width:'100%',
  },

  participantSegment:{
    display:'-webkit-flex',
    border:'2px solid',
    boxShadow:'1px -1px 4px black, -1px 1px 4px black',
},
participantSegment2x2:{
  border:'2px solid',
  boxShadow:'1px -1px 4px black, -1px 1px 4px black',
},
avatarSmall:{
  boxSizing:'border-box',
  display:'inline-block',
  border:'1px solid black',
  width:'25%',
  height:'50px',
  background:'rgb(168, 170, 173)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
},
value:{
  boxSizing:'border-box',
  //border:'1px solid black',
  fontSize:'13px',
},
pointsContainer:{
  boxSizing:'border-box',
  display:'inline-block',
  border:'1px solid black',
  width:'50%',
  height:'50px',
  textAlign:'center',
},
points:{
  boxSizing:'border-box',
  border:'1px solid black',
  display:'block',
  width:'80%',
  marginLeft:'10%',
  height:'40px',
  marginTop:'4px',
  background:'rgb(167, 153, 140)',
},
pointsLabel:{
  fontSize:'70%',
  borderBottom:'1px black solid',
  backgroundColor:'rgb(91, 68, 19)',
  color:'rgb(213, 223, 220)',
  backgroundImage: 'linear-gradient(-45deg, rgba(0,0,0,0),rgba(0,0,0,0),rgba(255,255,255,0.2),rgba(0,0,0,0))',
  textShadow:'0px 0px 6px #000000',
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
buttonGroupInside:{
  width:'99%',
  marginLeft:'0.5%',
  display:'flow-root',
},
};

const resp = StyleSheet.create({

});

export {resp, styles};