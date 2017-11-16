import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';

export default class TextOutput extends React.Component{

    render(){
        return(
                <div onClick={()=>{this.props.onClick ? this.props.onClick() : {} }} style={Object.assign({}, styles.textOutput, {textAlign:this.props.alignment})}>
                {this.props.title && <div style={Object.assign({}, styles.textOutputLabel, {textAlign:this.props.alignment}:{})}>
                <span style={{paddingLeft:'10px', paddingRight:'10px', backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0), rgba(121, 91, 14, 0.19), rgba(0,0,0,0))'}}>{this.props.title}</span>
                </div>}
                <div style={Object.assign({}, styles.value)}>{this.props.value}</div>
                </div>
        )
    }
}
