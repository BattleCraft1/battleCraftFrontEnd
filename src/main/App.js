import React, { Component } from 'react';
import Navigator from './navbar/Navbar';
import styles from './App.css.js';
import {Grid} from 'react-bootstrap';

class App extends Component {

    render(){
        return (
            <div>
                <Navigator/>
                <Grid>
                </Grid>
            </div>
        );
    }
}

export default App;