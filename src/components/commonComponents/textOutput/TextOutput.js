import React from 'react';

class TextOutput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <span title={this.props.text}>
                { ((this.props.text).length > this.props.limit) ?
                    (((this.props.text).substring(0,this.props.limit-3)) + '...') :
                    this.props.text }
            </span>
        );
    }
}

export default TextOutput;