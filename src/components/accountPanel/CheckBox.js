import React from 'react';
import {styles} from './styles'
import {css} from 'aphrodite';

export default class CheckBox extends React.Component{

    render(){
        return(
            <div style={styles.checkBox}>
                <input type="checkbox"></input>
                Remember?
            </div>
        )
    }
}

