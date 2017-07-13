import { Link } from 'react-router-dom';
import React from 'react';
import styles from './NavElement.css'

class NavElement extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
          <li style = {styles.button}>
            <Link to={this.props.link} style = {styles.a}>{this.props.children}</Link>
          </li>//kolejnosc wystepowania na liscie wiazaca!!
        );
    }
};

export default NavElement;
