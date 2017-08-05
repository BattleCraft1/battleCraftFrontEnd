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
            this.props.showConfirmationDialog(false);
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    render(){
        return (
            <div>
                {this.props.isShownConfirmationDialog &&
                <div style={{position:'fixed',zIndex: 1,left: 0, top: 0, width: '100%', height: '100%',
                    overflow: 'auto', backgroundColor: 'rgb(0,0,0)', backgroundColor: 'rgba(0,0,0,0.4)'}}>
                    <div className="modal-dialog" style={{margin: '30% auto', padding: '20px'}} ref={this.setWrapperRef}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" onClick={()=>this.props.showConfirmationDialog(false)}
                                        aria-label="Close"><span aria-hidden="true">&times;
                            </span></button>
                                <h4 className="modal-title">{this.props.header}</h4>
                            </div>
                            <div className="modal-body">
                                <p>{this.props.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={()=>this.props.showConfirmationDialog(false)}>Close</button>
                                <button type="button" className="btn btn-danger"
                                        onClick={()=>{this.props.onConfirm();
                                            this.props.showConfirmationDialog(false);
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
        isShownConfirmationDialog: state.isShownConfirmationDialog,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ConfirmDialog );