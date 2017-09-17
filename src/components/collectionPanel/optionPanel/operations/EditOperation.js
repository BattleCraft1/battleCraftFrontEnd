import React from 'react';
import OperationButton from './operationButton/OperationButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class EditOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    editElement(){
        console.log("TO DO EDIT");
    }

    render() {
        return (
            <OperationButton
                name = "Edit"
                icon = {icons.edit}
                operation = {this.editElement.bind(this)}
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

export default connect( mapStateToProps, mapDispatchToProps )( EditOperation );