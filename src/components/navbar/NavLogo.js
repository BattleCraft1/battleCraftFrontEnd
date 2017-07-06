var React = require('react');

var Radium = require('radium');

var styles = {
  base: {
    height: '100%',
    width: '20%',
    color: 'white',
    fontSize: '2em',
    float: 'left',
    marginLeft: '14px',
    marginTop: '5px'
  },
  a: {
    display: 'block',
     color: 'white',
     textAlign: 'center',
     textDecoration: 'none'
  }
};

class Logo extends React.Component {
  render() {
    return (
      <li style = {[styles.base]}>
        <a href = "/" style = {styles.a} >
        {this.props.children}
        </a>
      </li>
    );
  }
}


module.exports = Radium(Logo);
