import React from 'react';
import { connect } from 'react-redux';
import {styles} from '../styles'
import OptionButton from './optionButton/OptionButton'

const mapOfOperations = {
    "Next"     :null,
    "Previous" :null,
    "Clear"    :null,
};

class OptionPanel extends React.Component {

    render() {
        let operations = [
          <OptionButton operation={()=>{}} name={"Previous"}/>,
          <OptionButton operation={()=>{}} name={"Next"}/>,
          <OptionButton operation={()=>{}} name={"Clear"} additionalStyle={{float:'right'}}/>,
        ];
        return (
            <div style = {styles.buttonGroup}>
                <div style = {Object.assign({}, styles.buttonGroup, styles.buttonGroupInside)}>
                    {operations}
                </div>
            </div>
        );
    }
}

export default OptionPanel;
