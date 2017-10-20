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
        this.setState({checked: this.props.checked});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked!==undefined && nextProps.checked !== this.props.checked) {
            this.setState({checked: nextProps.checked});
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
                           this.props.checkElement(this.props.elementName, checked);
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
