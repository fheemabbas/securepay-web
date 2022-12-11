import React from "react";
import './MoreRecord.scss';

const MoreRecord = (props) => {
    let { title, onClick } = props;

    return (
        <h1 className='moreTxt' onClick={() => onClick && onClick()}>{title}</h1>

    )
}



export default MoreRecord;