import React from 'react';

export default (optionsNames) => {
    let options = [];

    optionsNames.forEach(
        optionName => {
            options.push(<option value={optionName} key={optionName}>{optionName}</option>);
        }
    );

    return options;
}