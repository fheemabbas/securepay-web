import React from "react";
import './CustomCard.scss';

const CustomCard = (props) => {
    let { className } = props;


    return (
        <div className={'customCard ' + props.className}>
            {props.children}
        </div>
    )
}


CustomCard.defaultProps = {
    className: 'customCard',
}

export default CustomCard;