import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class TableCell extends React.Component{
    render(){
        return(
            <div style={Object.assign({}, styles.textCell, this.props.double ? {height:'100px'}:{})}>
                <div style={styles.text}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

const styles = {
    textCell:{
        display:'table',
        //margin:'5px',
        marginBottom:'0',
        marginTop:'0',
        width:'100%',
        height:'50px',
        textAlign:'center',
        verticalAlign:'center',
        position:'relative',
        border:'1px solid #524527',
        boxSizing:'border-box',
        background:'rgb(245, 208, 134)',
        backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 5%, rgb(148, 123, 66) 77%, rgba(255, 255, 255, 0.4) 82%)',
    },

    text:{
        //transform:'translate(-50%, -50%)',
        display: 'table-cell',
        verticalAlign: 'middle',
        textShadow:'0px 0px 2px #555555, 0px 0px 4px #aaaaaa',
        color:'#ffffff',
    },
};

const resp = StyleSheet.create({

});
