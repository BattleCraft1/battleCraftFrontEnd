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
        animationName: loaderKeyframes,
        animation: 'x 2s linear infinite'
    },
    example: {
        animation: 'x 3s ease 0s infinite',
        animationName: pulseAnimation,
        background: 'blue',
        height: '4px',
        margin: '0 auto'
    }
}


class Button extends React.Component {
  render() {
    return (
      <div>
        <div style={
          style.example
        } />
        <div style={
            style.spinner
        } />
      </div>

    );
  }
}


module.exports = Radium(Button);
