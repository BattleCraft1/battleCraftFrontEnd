import React from 'react';
import {styles, resp} from '../styles'
import Label from '../outputs/Label'
import dateFormat from 'dateformat';
import {StyleSheet, css} from 'aphrodite';


export default class DateInput extends React.Component{

    componentDidMount() {
        this.date.value = dateFormat(this.props.value,"yyyy-mm-dd");
        this.time.value = dateFormat(this.props.value,"HH:MM");
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value !== undefined &&
            nextProps.value !== this.props.value){
            this.date.value = dateFormat(nextProps.value,"yyyy-mm-dd");
            this.time.value = dateFormat(nextProps.value,"HH:MM");
        }
    }

    onTimeChange(value){
        let dateString = new Date(this.date.value+" "+value);
        this.props.changeEntity(this.props.fieldName,dateString)
    }

    onDateChange(value){
        let dateString = new Date(value+" "+this.time.value);
        this.props.changeEntity(this.props.fieldName,dateString)
    }

    render(){
        return(
            <div style={styles.inputBlock} className={css(resp.inputBlock)}>
                <div>
                    <Label name={this.props.name}/>
                    <input
                        style={styles.optionInput}
                        type="date"
                        onChange={event => this.onDateChange(event.target.value)}
                        disabled={this.props.disabled}
                        ref = {control => this.date = control}
                    />
                    <input
                        style={styles.optionInput}
                        type="time"
                        onChange={event => this.onTimeChange(event.target.value)}
                        disabled={this.props.disabled}
                        ref = {control => this.time = control}
                    />
                </div>
            </div>
        )
    }
}
