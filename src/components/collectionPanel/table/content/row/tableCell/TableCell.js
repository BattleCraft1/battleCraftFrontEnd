import React from 'react';
import TextOutput from '../../../../../commonComponents/textOutput/TextOutput'
import {StyleSheet, css} from 'aphrodite';

export default class TableCell extends React.Component{
    render(){
        return(
            <td className = {css(resp.rowContent)} onClick={this.props.edit}

                style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.props.color})}>
                <TextOutput text={this.props.content} limit={17}/></td>
        )
    }
}

const styles = {
    thead: {
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border: '1px solid',
        color: 'white',
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        background: '#735630',
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
        paddingTop:'10px',
        paddingBottom:'10px',
    },
};

const resp = StyleSheet.create({
    rowContent:{
      overflow:'hidden',
      textOverflow:'elipsis',
        position:'relative',
        textAlign:'center',
        boxSizing:'border-box',
        '@media (max-width: 599px)': {
            width:'70%',
            display: 'inline-block',
            borderRadius:'0'
        },
        '@media (max-width: 1024px)': {
            fontSize:'0.8em',
            paddingLeft:'2px',
            paddingRight:'2px',
        },
    },
});
