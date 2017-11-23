import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'
import DiceImage from '../../../../resources/Dice.png';
import Background from '../../../../resources/questionAvatar.png';


export default class OptionButton extends React.Component {


getButtonContent()
{
  if(this.props.name === "DICE")
    return(<img src={DiceImage} alt="dice" style={{height:'20px', width:'20px', marginLeft:'4px', marginRight:'4px'}}/>)
  else
    return(<span>{this.props.name} {this.props.icon}</span>)
}

    render() {
        return(
            <button
                type="button"
                onClick={() => {
                    this.props.operation();
                }}
                style = {Object.assign({}, styles.button, this.props.additionalStyle)}
                className={css(resp.button)}>
                {this.getButtonContent()}
            </button>
        );
    }
}
