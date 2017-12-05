import React from 'react';
import ReactLoading from 'react-loading';

export default class LoadingImage extends React.Component{
    render() {
        return (
        <div style={{
            position: 'fixed',
            display: 'block',
            top: '0',
            left: '0',
            height: '100%',
            width: '100%',
            paddingLeft: 'calc(50% - 30px)',
            paddingTop: '20%',
            textAlign: 'center',
            background: 'rgba(40, 40, 40, 0.7)'
        }}>
            <ReactLoading type={"cylon"} color={"#eeeeee"} height='60px' width='60px'/>
            <h3 style={{
                color: 'white',
                marginTop: '5px',
                textAlign: 'center',
                width: '100%',
                fontSize:'80%',
                position:'fixed',
                left:'0',
            }}>{this.props.text ? this.props.text : "Loading..."}</h3>
        </div>
        )
    }
}
