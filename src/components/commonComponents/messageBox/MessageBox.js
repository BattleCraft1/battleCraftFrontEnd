import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions/index';
import {resp, styles} from '../../commonComponents/styles'

const ALERT_COLOR = "rgb(222, 169, 162)"
const ALERT_BORDER_COLOR = "rgb(247, 215, 210)"
const SUCCESS_COLOR = "rgb(162, 204, 222)"
const SUCCESS_BORDER_COLOR = "rgb(195, 229, 244)"
const WARNING_COLOR = "rgb(233, 219, 170)"
const WARNING_BORDER_COLOR = "rgb(249, 240, 211)"

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.setMessageRef = this.setMessageRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message.isShown!==undefined && nextProps.message.isShown !== this.props.message.isShown) {
            if(nextProps.message.isShown){
                window.scrollTo(0,0);
                setTimeout(function(){
                    this.hideMessageBox();
                }.bind(this), 10000);
            }
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.messageRef && !this.messageRef.contains(event.target)) {
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
        this.messageRef = node;
    }

    getMessageColor(){//add Type of message parameter
        console.log("MessagType: ")
        console.log(this.props.message.messageType)
        if(this.props.message.messageType === "alert-danger"){
          var colorsObject = {
            backgroundColor:ALERT_COLOR,
            borderColor:ALERT_BORDER_COLOR
          }
        }
        else if(this.props.message.messageType === "alert-success"){
          var colorsObject = {
            backgroundColor:SUCCESS_COLOR,
            borderColor:SUCCESS_BORDER_COLOR
          }
        }
        else{
          var colorsObject = {
            backgroundColor:WARNING_COLOR,
            borderColor:WARNING_BORDER_COLOR
          }
        }
        return(colorsObject)
    }
//this.props.message.messageType

    render(){
        return (
            <div style = {styles.messageContainer}>
                {this.props.message.isShown &&
                <div ref={this.setMessageRef} style = {Object.assign({},styles.messageBox,
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
