import React from 'react';
import Checkbox from '../../../../../commonComponents/checkBox/Checkbox'
import {StyleSheet, css} from 'aphrodite';

export default class RowChecbox extends React.Component {
    render() {
        return(
        <th className = {css(resp.rowContent)+" "+(resp.smallCheckbox)}
            style = {Object.assign({}, styles.checkbox, styles.thead, {borderRadius: '0px'})}>
            <Checkbox
                elementName = {this.props.elementName}
                checked={this.props.checked}/>
        </th>
        );
    }
}

const styles = {
    checkbox: {
        padding: '8px',
        paddingLeft: '4px',
        paddingRight: '4px',
        borderRight: '0px',
        //backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#d19c55), to(#906b3a))',
        borderBottomColor: '#775930',
        textAlign: 'center',
    },
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
};

const resp = StyleSheet.create({
    smallCheckbox:{
        '@media (max-width: 599px)': {
            width:'10%',
            margin:'0',
            paddingTop:'7px',
            paddingBottom:'7px',
        }
    },
    rowContent:{
        position:'relative',
        textAlign:'center',
        clear:'both',
        '@media (max-width: 599px)': {
            float:'left',
            //top:'48px',
            left:'0px',
            width:'10%',
            marginRight:'90%',
            display: 'block',
            borderRadius:'0',
            position:'relative',
        },
    },
});
