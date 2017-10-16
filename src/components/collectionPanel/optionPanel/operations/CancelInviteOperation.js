import React from 'react';
import OperationButton from './operationButton/OperationButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class CancelInviteOperation extends React.Component {
    constructor(props) {
        super(props);
    }

    cancelInvite(){
        this.props.setRelatedEntity([],"");
        this.props.clearCheckedElements();
        this.props.showEntityPanel(true);
    }

    render() {
        return (
            <OperationButton
                name = "Cancel"
                icon = {icons.cancel}
                operation = {this.cancelInvite.bind(this)}
            />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        entityPanel:state.entityPanel,
        page:state.page
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CancelInviteOperation );