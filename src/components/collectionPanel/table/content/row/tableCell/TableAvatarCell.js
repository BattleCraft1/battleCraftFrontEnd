import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {serverName} from '../../../../../../main/consts/server';

export default class TableAvatarCell extends React.Component{
    render(){
        return(
            <td className = {css(resp.rowContent)}
                style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.props.color})}
                onClick={() => {this.props.onClick()}}>
                <img src={serverName+`/get/user/`+this.props.username+`/avatar`} alt="avatar" className="img-responsive"/></td>
        )
    }
}

const styles = {
    thead: {
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
    },
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
    },
};

const resp = StyleSheet.create({
    rowContent:{
        position:'relative',
        textAlign:'center',
        '@media (max-width: 599px)': {
            width:'70%',
            display: 'inline-block',
            borderRadius:'0'
        }
    },
});