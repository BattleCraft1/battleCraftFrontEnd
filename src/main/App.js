import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite';
import Navigator from '../components/navbar/Navbar'
import CollectionPanel from '../components/collectionPanel/CollectionPanel'
import {Switch, Route} from 'react-router-dom';
import ConfirmDialog from '../components/commonComponents/confirmDialog/ConfirmDialog';
import Message from '../components/commonComponents/messageBox/MessageBox';
import Background from '../resources/splashBig2.jpg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../redux/actions/index';

class App extends Component {

    render(){
        return (

          <div>
          <div className={css(resp.backgroundImage)}></div>
          <div className={css(resp.backgroundConent)}></div>
            <div className = {css(resp.base)}>
                <Navigator/>
                <ConfirmDialog/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-1 col-md-1 col-lg-1">
                        </div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <Message/>
                            <Switch>
                                <Route exact path='/collectionsPanel/:collectionType' component={CollectionPanel}/>
                            </Switch>
                        </div>
                        <div className="col-sm-1 col-md-1 col-lg-1">
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

const resp = StyleSheet.create({
    base:{
        position:'absolute',
        width: '100%',
        padding: '20px 0 0 0',
        margin: '0 0 0 0',
        marginBottom:'20px',
    },
    backgroundImage:{
      background: "url("+Background+") no-repeat center center fixed",
      backgroundSize: 'cover',
      position:'fixed',
      minHeight:'100%',
      minWidth:'1024px',
      width:'100%',
      height:'auto',
      zIndex: '-1',
    },

    backgroundConent:{
      position:'fixed',
      width:'74%',
      minHeight:'100%',
      marginLeft:'13%',
      marginBottom:'10px',
      background:'rgba(0,0,0,0.9)',
      background: 'linear-gradient(to right, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.90) )',
      zIndex: '0',
      boxShadow: '0px 0px 10px 20px rgba(0,0,0,0.90)',
      '@media (max-width: 700px)': {
          width:'90%',
          marginLeft:'5%',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.75) )',
          boxShadow: '0px 0px 10px 20px rgba(0,0,0,0.75)',
      },
    }
});

export default App
