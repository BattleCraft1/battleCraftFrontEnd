import { Link } from 'react-router-dom';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import styles from '../NavStyle.css.js'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';


class NavElement extends React.Component{
    clearCheckedElements(){
        this.props.clearCheckedElements();
        this.props.disableEntityPanel();
    }

    render(){
        return (
            <div className={css(resp.container)}>
                <Link to={this.props.link} onClick={this.clearCheckedElements.bind(this)}
                      style = {styles.button} className={css(resp.button)}>{this.props.name}</Link>
            </div>
        );
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        entityPanel: state.entityPanel
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( NavElement );

const resp = StyleSheet.create({
    button:{
        width:"100%",
        position:'static',
        borderWidth:' 3px 2px 3px 2px',
        padding: '8px 0px',

        ':hover':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 161, 130)',
        },
        ':active':{
            color:'lightGrey',
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
        },

        '@media (max-width: 800px)': {
            width:'100%',
            marginBottom:'1px',
            borderWidth:' 2px 1px 2px 1px',
            padding: '4px 0px',

        }
    },
    container:{
        display:'inline-block',
        width:'20%',
        '@media (max-width: 800px)': {
            width:'100%',
        }
    },
    optionList:{
        left:'0px',
        boxSizing:'border-box',
        position:'absolute',
        display:'block',
        width:'20%',
        '@media (max-width: 800px)': {
            position:'relative',
            display:'block',
            width:'100%',
            marginLeft:'0',
        }
    },
});