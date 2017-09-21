import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../redux/actions/index';
import {StyleSheet, css} from 'aphrodite';


class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : false
        };
    }

    componentDidMount(){
        let element=this.props.page.content.filter(element => element.name===this.props.name);
        this.setState({checked: element.checked});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page!==undefined && nextProps.page !== this.props.page) {
            let element=nextProps.page.content.filter(element => element.name===this.props.name)[0];
            if(element!==undefined)
            this.setState({checked: element.checked});
        }
    }

    render(){
        return(
            <input type="checkbox" className = {css(resp.checkbox)}
                   onClick={
                       () => {
                           let checked=this.state.checked;
                           checked=!checked;
                           this.setState({checked:checked});
                           this.props.checkElement(this.props.name, checked);
                       }
                   }
                   checked={this.state.checked}/>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Checkbox );


const resp = StyleSheet.create({
  checkbox:{
    textAlign:'center',
    position:'relative',
    margin:'0',
    padding:'0',
    height:'14px',
    width:'14px',
  }
})
