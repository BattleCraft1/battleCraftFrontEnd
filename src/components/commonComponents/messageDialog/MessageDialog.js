import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions/index';
import {resp, styles} from '../../commonComponents/styles'
import {css} from 'aphrodite';
import Cookies from 'universal-cookie';

const ALERT_COLOR = "rgb(140, 48, 48)";
const ALERT_BORDER_COLOR = "rgb(199, 125, 113)";
const SUCCESS_COLOR = "rgb(51, 110, 135)";
const SUCCESS_BORDER_COLOR = "rgb(123, 174, 196)";
const WARNING_COLOR = "rgb(126, 109, 48)";
const WARNING_BORDER_COLOR = "rgb(187, 171, 117)";


const cookies = new Cookies('auth');

class MessageBox extends React.Component {
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
            this.getMessageColor();
        }
    }

    hideMessageBox(){
        let message=this.props.message;
        message.isShown=false;
        this.props.hideMessageBox();
        this.getMessageColor();
        this.forceUpdate();
    }

    setMessageRef(node) {
        this.popupRef = node;
    }

    logout(){
        this.props.logout();
        cookies.remove('role', { path: '/' });
        cookies.remove('token', { path: '/' });
        cookies.remove('username', { path: '/' });
    }

    getMessageColor(){
        let colorsObject = {};
        if(this.props.message.messageType === "alert-danger"){
          colorsObject = {
            backgroundColor:ALERT_COLOR,
            borderColor:ALERT_BORDER_COLOR
          }
        }
        else if(this.props.message.messageType === "Unauthorized"){
            this.logout();
            colorsObject = {
                backgroundColor:ALERT_COLOR,
                borderColor:ALERT_BORDER_COLOR
            }
        }
        else if(this.props.message.messageType === "alert-success"){
          colorsObject = {
            backgroundColor:SUCCESS_COLOR,
            borderColor:SUCCESS_BORDER_COLOR
          }
        }
        else{
          colorsObject = {
            backgroundColor:WARNING_COLOR,
            borderColor:WARNING_BORDER_COLOR
          }
        }
        return(colorsObject)
    }

    render(){
        return (
            <div style = {styles.messageContainer}>
                {this.props.message.isShown &&
                <div ref={this.setMessageRef}
                     className={css(resp.messageBox)}
                     style = {Object.assign({},styles.messageBox,
                         {backgroundColor:this.getMessageColor().backgroundColor, borderColor:this.getMessageColor().borderColor})}
                     role="alert">{this.props.message.messageText}</div>}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        message: state.message,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( MessageBox );
