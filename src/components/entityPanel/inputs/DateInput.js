import React from 'react';
import {styles} from '../styles'
import Label from '../outputs/Label'
import dateFormat from 'dateformat';

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
            <div>
                <div style={styles.inputBlock}>
                    <Label name={this.props.name}/>
                    <input
                        style={styles.optionInput}
                        type="date"
                        onChange={event => this.onDateChange(event.target.value)}
                        ref = {control => this.date = control}
                    />
                    <input
                        style={styles.optionInput}
                        type="time"
                        onChange={event => this.onTimeChange(event.target.value)}
                        ref = {control => this.time = control}
                    />
                </div>
            </div>
        )
    }
}
