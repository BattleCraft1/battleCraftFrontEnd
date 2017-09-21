import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../main/consts/collectionsColors';
import LegendField from './LegendField';

export default class LegendPanel extends React.Component{
    render(){
        let legendFields = [];
        if(colors[this.props.collectionType]!==undefined)
        for(let colorName in colors[this.props.collectionType]["normal"]){
            legendFields.push(
                <LegendField
                    key = {colorName}
                    color = {colors[this.props.collectionType]["normal"][colorName]}
                    name = {colorName}
                />
            );
        }

        return (
            <div className = {css(resp.legend)}>
                <th style={Object.assign({}, styles.thead, {display:'block', width:'100%', textAlign:'center', padding:'3px', boxShadow:'inset 0 2px 2px #9c7239'})} >
                    Legend</th>
                {legendFields}
            </div>
        );
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
    }
};

const resp = StyleSheet.create({
    legend:{
        position:'relative',
        width:'90%',
        marginLeft:'5%',
        marginBottom:'10px',
    },
});