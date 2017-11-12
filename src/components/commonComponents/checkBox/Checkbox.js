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

    changeRelatedEntities(element, checked){
        let relatedEntities = this.props.entityPanel.relatedEntity.relatedEntities;

        if(this.props.entityPanel.relatedEntity.relatedEntityType==="participatedTournaments"){
            this.props.checkElement(this.props.element.name, checked);
            this.setState({checked:checked});
            if(checked){
                relatedEntities.push(
                    {
                        name: element.name,
                        playersOnTableCount: element.playersOnTableCount
                    });
            }
            else{
                relatedEntities = relatedEntities.filter(relatedEntity => relatedEntity.name !== element.name)
            }
            this.props.changeRelatedEntities(relatedEntities);
        }
        else{
            if(!checked || this.props.entityPanel.relatedEntity.relatedEntityLimit>=relatedEntities.length+1){
                this.props.checkElement(this.props.element.name, checked);
                this.setState({checked:checked});
                if(checked){
                    relatedEntities.push(element.name);
                }
                else{
                    let index = relatedEntities.indexOf(element.name);
                    relatedEntities.splice(index,1);
                }
                this.props.changeRelatedEntities(relatedEntities);
            }
            else{
                this.props.showFailureMessage("You can choose only "+this.props.entityPanel.relatedEntity.relatedEntityLimit+" elements");
            }
        }

    }

    render(){
        return(
            <input type="checkbox" className = {css(resp.checkbox)}
                   onClick={
                       () => {
                           let checked=this.state.checked;
                           checked=!checked;
                           if(this.props.entityPanel.mode!=='disabled'){
                               this.changeRelatedEntities(this.props.element, checked);
                           }
                           else{
                               this.props.checkElement(this.props.element.name, checked);
                               this.setState({checked:checked});
                           }
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
        entityPanel: state.entityPanel,
        page: state.page
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
