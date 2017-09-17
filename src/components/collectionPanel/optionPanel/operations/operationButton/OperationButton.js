import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class OperationButton extends React.Component {
    render() {
        return(
            <button
                type="button"
                onClick={() => {
                    this.props.operation();
                }}
                className={css(resp.theadElement) + " " + css(resp.button)}>
                {this.props.name} {this.props.icon}
            </button>
        );
    }
}

const resp = StyleSheet.create({
    theadElement:{
        boxShadow:'inset 0 2px 2px #9c7239',
        fontFamily:'arial, helvetica, sans-serif',
        textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        textAlign: 'center',

        '@media (max-width: 600px)': {
            display:'none',
        },

        ':hover':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 161, 130)',
        },
        ':active':{
            color:'lightGrey',
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
        },

    },
    button:{
        textAlign:'center',
        dislay:'inline-block',
        position:'relative',
        width:'16%',
        padding: '4px',
        margin:'1px',
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#7d150e), to(#8c3731))',
        backgroundImage: 'linear-gradient(#f66060, #7d150e, #5b0f0a)',
        boxShadow:'inset 0 0 7px #9c7239',
        color:'white',
        outline:'0',
        borderRadius:'2px',
        ':active':{
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
            color:'lightGrey',
            backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
            backgroundImage: 'linear-gradient( #4b110d, #6f1913, #dd5353 )',
        },

        '@media (max-width: 600px)': {
            display:'inline-block',
            width:'30%',
        },
    },
});