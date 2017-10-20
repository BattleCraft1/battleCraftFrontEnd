import React from 'react';

class TextOutput extends React.Component {
    render() {
        let text;
        if(this.props.text===null || this.props.text===undefined)
            text="brak";
        else
            text=this.props.text;
        return(
            <span title={text}>
                { ((text).length > this.props.limit) ?
                    (((text).substring(0,this.props.limit-3)) + '...') :
                    text }
            </span>
        );
    }
}

export default TextOutput;