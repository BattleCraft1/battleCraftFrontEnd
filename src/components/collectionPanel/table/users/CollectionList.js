import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Checkbox from '../../../commonComponents/checkBox/Checkbox'
import MultiCheckbox from '../../../commonComponents/checkBox/MultiCheckbox'
import TextOutput from '../../../commonComponents/textOutput/TextOutput'
import OptionPanel from '../../optionPanel/tournaments/OptionPanel'

import dateFormat from 'dateformat';

class CollectionList extends React.Component{
    constructor(props) {
        super(props);
    }

    sortByColumnName(columnName){
        let pageRequest=this.props.pageRequest;
        pageRequest.pageRequest.property=columnName;
        pageRequest.pageRequest.direction=pageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest(this.props.collectionType);
    }

    prepareRowsOfTable(rows,key){
        this.props.page.content.map(
            user =>{
                key++;
                rows.push(
                    <tr key={"tr:"+key}>
                        <th key={"th:"+key} scope="row" style = {Object.assign({}, styles.thead, styles.checkbox, {borderRadius: '0px'})}>
                            <Checkbox name={user.name}/></th>
                        <td key={"td:username:"+key} style={Object.assign({}, styles.thead, styles.rowContent)}
                            onClick={() => {this.editCheckedElements()}}><TextOutput text={user.username} limit={17}/></td>
                        <td key={"td:name"+key}  style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={user.name} limit={17}/></td>
                        <td key={"td:surname"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={user.surname} limit={17}/></td>
                        <td key={"td:email"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={user.email} limit={17}/></td>
                        <td key={"td:province"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={user.province} limit={17}/></td>
                        <td key={"td:city"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={user.city} limit={17}/></td>
                        <td key={"td:phoneNumber"+key} style={Object.assign({}, styles.thead, styles.rowContent)}>
                            <TextOutput text={user.phoneNumber?user.phoneNumber:'no phone number'} limit={17}/></td>
                    </tr>
                );
            }
        );
    }


    render(){
        let rows = [];
        let key = 0;

        if(this.props.page.content!==undefined)
        {
            this.prepareRowsOfTable(rows,key);
        }

        return (
            <div>
                <div className="row">
                    <table className="table bg-primary" style={styles.table}>
                        <thead>
                        <tr>
                            <th key="all" style={styles.thead}>
                                <MultiCheckbox /></th>
                            <th onClick={()=>this.sortByColumnName("username")}              key="username"     style={styles.thead}>username</th>
                            <th onClick={()=>this.sortByColumnName("name")} key="name" style={styles.thead}>name</th>
                            <th onClick={()=>this.sortByColumnName("surname")}      key="surname"     style={styles.thead}>surname</th>
                            <th onClick={()=>this.sortByColumnName("email")}         key="email"    style={styles.thead}>email</th>
                            <th onClick={()=>this.sortByColumnName("province.location")}         key="province"  style={styles.thead}>province</th>
                            <th onClick={()=>this.sortByColumnName("address.city")}       key="city"     style={styles.thead}>city</th>
                            <th onClick={()=>this.sortByColumnName("phoneNumber")}       key="phoneNumber"     style={styles.thead}>phoneNumber</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                    <OptionPanel collectionType={this.props.collectionType}/>
                </div>
            </div>
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

export default connect( mapStateToProps, mapDispatchToProps )( CollectionList );

const styles = {

    rowContent:{
        borderRadius:'0',
        background:'#c6a57d',
        border:'1px solid',
        padding: '8px',
        paddingLeft:'8px',
        textAlign: 'none',
        backgroundImage: '',
        WebkitBorderImage: '',
        color:'black',
        borderTopColor:'#dfd19e',
        borderBottomColor:'#886e4b',
        borderLeftColor:'#dfd19e',
        borderRightColor:'#886e4b',
        textShadow:' ',
    },
    thead:{
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border:'1px solid',
        color:'white',
        //
        borderTopColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#e3ca86',
        //borderColor:'#4e3e28',
        background:'#735630',
        textAlign: 'center',
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        // backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#b48443), to(#654a25))',
        // WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
        fontFamily:'arial, helvetica, sans-serif',
        textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
    },
    table:{
        position:'relative',
        background:'black',
        width: '100%',
        borderCollapse:'separate',
    },
    checkbox:{
        textAlign: 'center',
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        borderRight: '0px',
        //backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#d19c55), to(#906b3a))',
        borderBottomColor:'#775930',


    }

};
