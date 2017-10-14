import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class TableNeutralHeader extends React.Component{
    render(){
        return(
            <th style={Object.assign({}, styles.thead,{width:this.props.size>0?this.props.size:60})}
                className = {css(resp.theadElement)}>
                {this.props.content}</th>
        )
    }
}

const styles = {
    thead: {
      boxSizing:'border-box',
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border: '1px solid',
        color: 'white',
        //
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        //borderColor:'#4e3e28',
        background: '#735630',

        // backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#b48443), to(#654a25))',
        // WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
    }
};

const resp = StyleSheet.create({
    theadElement:{
        boxShadow:'inset 0 2px 2px #9c7239',
        fontFamily:'arial, helvetica, sans-serif',
        textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
        pading:'0',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            display:'none',
        },
    },
});
