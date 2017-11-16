import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from './styles'

export default class OptionButton extends React.Component {
    render() {
        return(
            <button
                type="button"
                onClick={() => {
                    this.props.operation();
                }}
                style = {Object.assign({}, styles.button, this.props.additionalStyle)}
                className={css(resp.button)}>
                {this.props.name} {this.props.icon}
            </button>
        );
    }
}
