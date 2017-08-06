import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite';
import Navigator from '../components/navbar/Navbar'
import CollectionPanel from '../components/collectionPanel/CollectionPanel'
import {Switch, Route} from 'react-router-dom';
import ConfirmDialog from '../components/confirmDialog/ConfirmDialog';
import Message from '../components/messageBox/MessageBox';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../redux/actions/index';

class App extends Component {

    render(){
        return (
            <div className = {css(resp.base)}>
                <Navigator/>
                <ConfirmDialog/>
                <Switch>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-1 col-md-1 col-lg-1">
                            </div>
                            <div className="col-sm-10 col-md-10 col-lg-10">
                                <Message/>
                                <Route exact path='/collectionsPanel/:collectionType' component={CollectionPanel}/>
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1">
                            </div>
                        </div>
                    </div>
                </Switch>
            </div>
        );
    }
}

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

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
