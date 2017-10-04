import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from './styles'

export default class OperationButton extends React.Component {
    render() {
        return(
            <button
                type="button"
                onClick={() => {
                    this.props.operation();
                }}
                style = {styles.button}
                className={css(resp.theadElement) + " " + css(resp.button)}>
                {this.props.name} {this.props.icon}
            </button>
        );
    }
}
