import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {possibleOperations} from '../../../main/consts/possibleOperations'
import AcceptOperation from './operations/AcceptOperation'
import AddOperation from './operations/AddOperation'
import BanOperation from './operations/BanOperation'
import CancelAcceptOperation from './operations/CancelAcceptOperation'
import DeleteOperation from './operations/DeleteOperation'
import EditOperation from './operations/EditOperation'
import UnclokOperation from './operations/UnlockOperation'

export default class OptionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mapOfOperations = {
            "Add":AddOperation,
            "Ban":BanOperation,
            "Cancel":CancelAcceptOperation,
            "Delete":DeleteOperation,
            "Edit":EditOperation,
            "Unlock":UnclokOperation,
            "Accept":AcceptOperation
        };

        let operations = [];
        for(let possibleOperation in possibleOperations[this.props.collectionType])
        {
            operations.push(
                React.createElement(
                    mapOfOperations[possibleOperations[this.props.collectionType][possibleOperation]],
                    {collectionType:this.props.collectionType},
                    null
                )
            );
        }

        return (
            <div className={css(resp.buttonGroup)}>
                <div className={css(resp.buttonGroup)}>
                    {operations}
                </div>
            </div>
        );
    }
}

const resp = StyleSheet.create({
    buttonGroup:{
        width:'90%',
        marginLeft:'5%',
        textAlign:'center',
        paddingTop:'4px',
        paddingBottom:'4px',
        background:'#45341d',
        boxShadow:'inset 0 0 4px #9c7239',
        borderCollapse: 'separate',

        border:'1px solid',
        color:'rgb(204, 126, 69)',
        borderTopColor: '#E0BA51',
        borderBottomColor: '#614722',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
    },
});