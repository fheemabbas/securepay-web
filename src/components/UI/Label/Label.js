import React from "react";
import './Label.scss';

const Label = (props) => {
    let { title } = props;

    return (
        <h1 className={'titleText ' + props.className}>{title}</h1>
    )
}


Label.defaultProps = {
    className: 'titleText',
}
export default Label;