import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite';
import Navigator from '../components/navbar/Navbar'
import CollectionPanel from '../components/collectionPanel/CollectionPanel'
import {Switch, Route} from 'react-router-dom';

class App extends Component {

    render(){
        return (
            <div className = {css(resp.base)}>
                    <Navigator/>
                    <Switch>
                        <Route exact path='/collectionsPanel/:collectionType' component={CollectionPanel}/>
                    </Switch>
           </div>
        );
    }
}

export default App;

const resp = StyleSheet.create({
base:{
    position:'absolute',
    width: '100%',
    height: '100%',
    backgroundColor:'rgb(0, 0, 0)',
    padding: '20px 0 0 0',
    margin: '0 0 0 0',
  }
  });
