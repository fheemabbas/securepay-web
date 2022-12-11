import React from "react";
import './NoData.scss';

const NoData = (props) => {
    let { title } = props;

    return (
        <h1 className='NoText'>{title}</h1>

    )
}



export default NoData;