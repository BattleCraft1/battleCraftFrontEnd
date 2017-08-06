import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../redux/actions/index';

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
        this.props.showConfirmationDialog(confirmation);
        this.forceUpdate();
    }

    render(){
        return (
            <div>
                {this.props.confirmation.isShown &&
                <div style={{position:'fixed',zIndex: 6666,left: 0, top: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgb(0,0,0)', backgroundColor: 'rgba(0,0,0,0.4)'}}>
                    <div className="modal-dialog" style={{margin: '15% auto', padding: '20px'}} ref={this.setWrapperRef}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"
                                        onClick={()=>this.hideConfirmationDialog()}
                                        aria-label="Close"><span aria-hidden="true">&times;
                            </span></button>
                                <h4 className="modal-title">{this.props.confirmation.header}</h4>
                            </div>
                            <div className="modal-body">
                                <p>{this.props.confirmation.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={()=>this.hideConfirmationDialog()}>Close</button>
                                <button type="button" className="btn btn-danger"
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