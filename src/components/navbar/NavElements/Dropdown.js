import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import styles from '../NavStyle.css.js'

let icons = require('glyphicons');


export default class Dropdown extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            listIsShow:false
        };

        this.setDropdownRef = this.setDropdownRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
            this.setState({listIsShow:false});
        }
    }

    setDropdownRef(node) {
        this.dropdownRef = node;
    }

    toggleList(){
        let listIsShow = this.state.listIsShow;
        this.setState({listIsShow:!listIsShow});
    }

    renderList(){
        return React.Children.map(
            this.props.children,
            (child) => React.cloneElement(child, {
                hideList: this.toggleList.bind(this)
            })
        )
    }

    render(){
        let list = <div className={css(resp.optionList)}>
            {this.renderList()}
        </div>;

        return (
            <div ref={this.setDropdownRef} className={css(resp.container)}>
                <div onClick={this.toggleList.bind(this)} style = {styles.button} className={css(resp.button)}>
                    {this.props.name}{this.state.listIsShow?icons.arrowTriD:icons.arrowTriU}
                </div>
                {this.state.listIsShow && list}
            </div>
        );
    }
};


const resp = StyleSheet.create({
    button:{
        width:"100%",
        position:'relative',
        borderWidth:' 3px 2px 3px 2px',
        cursor: 'pointer',
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
        position:'relative',
        display:'inline-block',
        width:'20%',
        '@media (max-width: 800px)': {
            width:'100%',
        }
    },
    optionList:{
        position:'absolute',
        display:'block',
        left:'1px',
        width:'100%',
        '@media (max-width: 800px)': {
            position:'relative',
            display:'block',
            width:'100%',
            marginLeft:'0',
        }
    },
});