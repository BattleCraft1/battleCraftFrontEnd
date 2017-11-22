import React from 'react';
import { connect } from 'react-redux';
import {styles} from '../styles'
import OptionButton from './optionButton/OptionButton'

class OptionPanel extends React.Component {

    render() {
        let operations = [
          <OptionButton key={"previous"} operation={()=>this.props.previousTour()} name={"Previous"}/>,
          <OptionButton key={"next"} operation={()=>this.props.nextTour()} name={"Next"}/>,
          <OptionButton key={"scoreboard"} operation={()=>{this.props.scoreboard()}} name={"Scoreboard"}/>,
          <OptionButton key={"finish"} operation={()=>this.props.finishTournament()} name={"Finish"} additionalStyle={{float:'right'}}/>,
        ];
        return (
            <div style = {styles.buttonGroup}>
                <div style = {Object.assign({}, styles.buttonGroup, styles.buttonGroupInside)}>
                    {!this.props.disabled && operations}
                </div>
            </div>
        );
    }
}

export default OptionPanel;
