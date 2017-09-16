import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class LegendPanel extends React.Component{
    render(){
        return(
            <span style={Object.assign({}, styles.rowContent, {background:this.props.color})}
                className = {css(resp.legendOption)}>
                {this.props.name.replace('_',' ')}
            </span>
        )
    }
}

const styles = {
    rowContent: {
        borderRadius: '0',
        background: '#c6a57d',
        border: '1px solid',
        padding: '8px',
        paddingLeft: '8px',
        textAlign: 'none',
        backgroundImage: '',
        WebkitBorderImage: '',
        color: 'black',
        borderTopColor: '#dfd19e',
        borderBottomColor: '#886e4b',
        borderLeftColor: '#dfd19e',
        borderRightColor: '#886e4b',
        textShadow: ' ',
    }
};

const resp = StyleSheet.create({
    legendOption:{
        fontSize:'80%',
        textAlign:'center',
        display:'inline-block',
        position:'relative',
        width:'20%',
        padding:'5px',
        '@media (max-width: 600px)': {
            width:'50%',
        },
    }
});