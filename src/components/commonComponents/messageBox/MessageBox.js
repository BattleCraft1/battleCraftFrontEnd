import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions/index';

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
                }.bind(this), 5000);
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
        }
    }

    hideMessageBox(){
        let message=this.props.message;
        message.isShown=false;
        this.props.showMessageBox(message);
        this.forceUpdate();
    }

    setMessageRef(node) {
        this.messageRef = node;
    }

    render(){
        return (
            <div className="row">
                {this.props.message.isShown &&
                <div ref={this.setMessageRef} className={"alert "+this.props.message.messageType} role="alert">{this.props.message.messageText}</div>}
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
