import React from "react";
import './TableListing.scss';

const TableListing = (props) => {
    let { onClick, className } = props;

    return (
        <div className={'tableListing ' + className} onClick={onClick}>
            <ul className='headingUl'>
                {props.children}
            </ul>
        </div>
    )
}



export default TableListing;