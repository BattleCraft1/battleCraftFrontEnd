import React, { Component } from 'react';
import Navigator from '../components/navbar/Navbar'
import CollectionPanel from '../components/collectionPanel/CollectionPanel'
import {StyleRoot} from 'radium';
import styles from './App.css';
import {Switch, Route} from 'react-router-dom';

class App extends Component {

    render(){
        return (
            <div>
                <div className="col-lg-1 col-md-1 col-sm-0"></div>
                <StyleRoot style={styles.base}>
                    <Navigator/>
                    <Switch>
                        <Route exact path='/collectionsPanel/:collectionType' component={CollectionPanel}/>
                    </Switch>
                </StyleRoot>
                <div className="col-lg-1 col-md-1 col-sm-0"></div>
            </div>
        );
    }
}

export default App;
