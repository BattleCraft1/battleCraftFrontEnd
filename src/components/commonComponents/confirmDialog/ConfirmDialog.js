import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions/index';
import {resp, styles} from '../../commonComponents/styles';
import {StyleSheet, css} from 'aphrodite';


class ConfirmDialog extends React.Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.hideConfirmationDialog();
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    hideConfirmationDialog(){
        let confirmation=this.props.confirmation;
        confirmation.isShown=false;
        this.forceUpdate();
    }

    render(){
        return (
            <div>
                {this.props.confirmation.isShown &&
                <div style={styles.background}>
                    <div style={Object.assign({}, styles.modalDialog)} ref={this.setWrapperRef}>
                        <div style = {Object.assign({}, styles.goldAndBrownTheme, styles.modalContent)}>
                            <div style = {styles.modalHeader}>
                                <h4 style = {styles.optionLabel}>{this.props.confirmation.header}</h4>
                            </div>
                            <div style = {styles.modalBody}>
                                <p>{this.props.confirmation.message}</p>
                            </div>
                            <div style = {styles.modalFooter}>
                                <button type="button" style = {styles.button} className={css(resp.button)} data-dismiss="modal"
                                        onClick={()=>this.hideConfirmationDialog()}>Close</button>
                                <button type="button" style = {styles.button}className={css(resp.button)}
                                        onClick={()=>{this.props.confirmation.onConfirmFunction();
                                            this.hideConfirmationDialog();
                                        }}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        confirmation: state.confirmation,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ConfirmDialog );
