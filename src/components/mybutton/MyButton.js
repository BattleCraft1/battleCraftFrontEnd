//This Component is battleground for testing and trying fancy stuff!!!!

var React = require('react');
var Radium = require('radium');

const pulseAnimation = Radium.keyframes({
  '0%': {
    width: '10%'
  },
  '50%': {
    width: '50%'
  },
  '100%': {
    width: '10%'
  }
}, 'pulse');

const loaderKeyframes = Radium.keyframes({
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
});


const style = {
      spinner: {
        border: '16px solid #f3f3f3',
        borderTop: '16px solid #3498db',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        animation: 'x 2s linear infinite',
        animationName: loaderKeyframes,
        ':hover':{
          animation: 'x 3s linear infinite',
          animationName: loaderKeyframes,
        }
    },
    example: {
        animation: 'x 3s ease 0s infinite',
        animationName: pulseAnimation,
        background: 'blue',
        height: '4px',
        margin: '0 auto',

    }
}


const styles = {
  base: {
  backgroundColor: 'blue',
  ':active':{
    backgroundColor: 'red',
  },
  }
}


class Button extends React.Component {
  render() {
    return (
      <button style = {[styles.base]} text = {this.props.children}/>

    );
  }
}


module.exports = Radium(Button);
