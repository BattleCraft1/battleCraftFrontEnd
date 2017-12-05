import React from 'react';
import ReactLoading from 'react-loading';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ActionCreators} from "../../../redux/actions";

class LoadingImage extends React.Component{
    render() {
        return (
            <div>
                {this.props.loading.dataFetched && <div style={{
                    position: 'fixed',
                    display: 'block',
                    top: '0',
                    left: '0',
                    height: '100%',
                    zIndex:'1000000000',
                    width: '100%',
                    paddingLeft: 'calc(50% - 100px)',
                    paddingTop: '20%',
                    textAlign: 'center',
                    background: 'rgba(5, 5, 5, 0.55)'
                }}>
                    <ReactLoading type={"cylon"} color={"#eeeeee"} height='200px' width='200px'/>
                    <h3 style={{
                        color: 'white',
                        marginTop: '5px',
                        textAlign: 'center',
                        zIndex:'1000000000',
                        width: '100%',
                        fontSize:'80%',
                        position:'fixed',
                        left:'0',
                    }}>{this.props.loading.message ? this.props.loading.message : "Loading..."}</h3>
                </div>}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        loading: state.loading
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( LoadingImage );