import React from 'react';
import OperationButton from './operationButton/OperationButton'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class AddEntityOperation extends React.Component {
    render() {
        return (
            <OperationButton
                name = "Add"
                icon = {icons.plus}
                operation = {()=>{this.props.addEntity(this.props.collectionType.slice(0, -1));}}
            />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AddEntityOperation );