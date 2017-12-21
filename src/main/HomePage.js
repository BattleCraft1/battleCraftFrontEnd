import React from 'react';

import {StyleSheet, css} from 'aphrodite';

const style1 = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color:'white',
    height: '400px'
};

const style2 = {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center'
};

export default class HomePage extends React.Component{
    render(){
        return (
            <div style={style1}>
                <div style={style2}>
                    <h2>Welcome to</h2>
                    <h1>BattleCraft</h1>
                    <div>
                        BattleCraft is the best tool for organizing and resolving games tournaments!
                    </div>
                </div>
            </div>
        );
    }
}