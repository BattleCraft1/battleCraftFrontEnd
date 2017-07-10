var React = require('react');
var Radium = require('radium');



var styles = {

transform:{
  display: 'inline-block',
 verticalAlign: 'middle',
 WebkitTransform: 'perspective(1px) translateZ(0)',
 transform: 'perspective(1px) translateZ(0)',
 boxShadow: '0 0 1px transparent',
 position: 'relative',
 overflow: 'hidden',

':before':{
  content: '',
  position: 'absolute',
  zIndex: '-1',
  left: '50%',
  right: '50%',
  bottom: '0',
  background: '#2098D1',
  height: '4px',
  WebkitTransitionProperty:'left, right',
  transitionProperty:'left, right',
  WebkitTransitionDuration:'0.3s',
  transitionDuration:'0.3s',
  WebkitTransitionTimingFunction:'ease-out',
  transitionTimingFunction: 'ease-out',
},

},




  button:{

    width: '20%',
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
    fontFamily:'arial, helvetica, sans-serif',
      textDecoration:'none',
      display:'inline-block',
      textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
      fontWeight:'bold',
      color:'#FFFFFF',

      backgroundColor: '#805D2C',
      backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
      WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px;',

      ':hover':{
        borderTopColor: 'rgb(249, 249, 249)',
        borderBottomColor: 'rgb(204, 126, 69)',
      },
      ':focus':{
        borderTopColor: 'rgb(249, 249, 249)',
        borderBottomColor: 'rgb(204, 126, 69)',
      },
      ':active':{
        borderTopColor: 'rgb(167, 132, 106)',
        borderBottomColor: 'rgb(204, 161, 130)',
      },
        '@media screen and (max-width: 400px)': {
          display:'none'
        },

  },

  base: {
    display: 'block',
    width: '20%',
    boxSizing: 'border-box',
    float: 'right',
    color: 'white',
    borderStyle: 'inset',
    borderColor: 'gold',
    borderWidth: '6px',
  /*  padding: '5px',
    background: 'grey',
    */
  '@media screen and (max-width: 400px)': {
  //  display:'none',
    background: 'red'

  }
},

  a: {
    display:'block',
    boxSizing: 'border-box',
    width: '100%',
     color: 'white',
     textAlign: 'center',
     padding: '8px 9px',
     textDecoration: 'none',

  }
};


class NavElement extends React.Component{
    render(){
        return (
          <li style = {styles.button}>
                  <a style = {styles.a} href="#">{this.props.children}</a>
          </li>//kolejnosc wystepowania na liscie wiazaca!!
        );
    }
};

module.exports = Radium(NavElement);
