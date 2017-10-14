import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import LegendField from './LegendField';
import {resp, styles} from '../legendPanel/styles'


export default class RankingGameHeader extends React.Component{
    render(){
        return (
            <div style = {styles.legend}>
                <th style={Object.assign({}, styles.thead, {display:'block', width:'100%', textAlign:'center', padding:'3px', boxShadow:'inset 0 2px 2px #9c7239'})} >
                    Ranking</th>
                <LegendField
                    key = {this.props.gameName}
                    size = {"100%"}
                    color = {'rgb(230, 197, 158)'}
                    name = {this.props.gameName}
                />
            </div>
        );
    }
}