import React from 'react';

import {styles, resp} from './styles';
import {css, StyleSheet} from 'aphrodite';
import Label from './Label';
import Input from './TextInput';
import Button from './optionButton/OptionButton';
import CheckBox from './CheckBox'

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.setMessageRef = this.setMessageRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.popupRef && !this.popupRef.contains(event.target)) {
            this.hideMessageBox();
        }
    }

    hideMessageBox(){
        this.props.showLoginPanel(false);
    }

    setMessageRef(node) {
        this.popupRef = node;
    }

    render(){
        return (
            <div>
                {this.props.loginPanel.isShown &&
                <div style = {styles.loginPanel}  className={css(resp.loginPanel)}>
                <Label name={"Login"}/>
                <div ref={this.setMessageRef}>
                <Input placeholder={"type your login"} name={"username"}/>
                <Input type={"password"} placeholder={"password"} name={"password"}/>
                <Button operation={this.hideMessageBox.bind(this)} name={"Cancel"}/>
                <Button operation={()=>{}} name={"Login"} additionalStyle={{float:'right'}}/>
                <CheckBox/>
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
        loginPanel: state.loginPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( LoginPanel );



