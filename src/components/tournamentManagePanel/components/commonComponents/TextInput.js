import React from 'react';
import {styles, resp} from '../../styles'
import Label from './Label'
import {StyleSheet, css} from 'aphrodite';


export default class TextInput extends React.Component{

    render(){
        return(
            <div style={Object.assign({}, styles.textOutput, {width:'50%', display:'inline-block', padding:'0'})} className={css(this.props.notResponsive ? "" : resp.inputBlock)}>
                <div style={Object.assign({}, styles.textOutputLabel, {marginBottom:'-2px'})}>{this.props.name}</div>
                    <input
                       style={styles.pointsInput}
                       type="number"
                       value = {this.props.value}
                       onChange={(event) => {this.props.changeData(parseInt(event.target.value))}}
                       disabled={this.props.disabled}
                />
            </div>
        )
    }
}
