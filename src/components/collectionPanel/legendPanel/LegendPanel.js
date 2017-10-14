import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {colors} from './../../../main/consts/collectionsColors';
import LegendField from './LegendField';
import {resp, styles} from '../legendPanel/styles'


export default class LegendPanel extends React.Component{
    render(){
        let legendFields = [];
        if(colors[this.props.collectionType]!==undefined){
            let size = 100/Object.keys(colors[this.props.collectionType]["normal"]).length+'%';
            for(let colorName in colors[this.props.collectionType]["normal"]){
                legendFields.push(
                    <LegendField
                        key = {colorName}
                        size = {size}
                        color = {colors[this.props.collectionType]["normal"][colorName]}
                        name = {colorName}
                    />
                );
            }
        }
        return (
            <div style = {styles.legend}>
                <div style={Object.assign({}, styles.thead, {display:'block', width:'100%', textAlign:'center', padding:'3px', boxShadow:'inset 0 2px 2px #9c7239'})} >
                    Legend</div>
                {legendFields}
            </div>
        );
    }
}
