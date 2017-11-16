import React from 'react';
import OperationButton from './operationButton/OperationButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class InviteOperation extends React.Component {

    inviteElements(){
        this.props.clearCheckedElements();
        this.props.showEntityPanel();
    }

    render() {
        return (
            <OperationButton
                name = "Invite"
                icon = {icons.arrowCompassInvertedR}
                operation = {this.inviteElements.bind(this)}
            />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( InviteOperation );