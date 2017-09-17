import React from 'react';
import OperationButton from './operationButton/OperationButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class AddOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    addNewElement(){
        console.log("TO DO ADD");
    }

    render() {
        return (
            <OperationButton
                name = "Add"
                icon = {icons.plus}
                operation = {this.addNewElement.bind(this)}
            />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        confirmation: state.confirmation,
        message: state.message,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( AddOperation );