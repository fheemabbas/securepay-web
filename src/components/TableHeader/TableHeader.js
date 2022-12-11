import React from "react";
import './TableHeader.scss';

const TableHeader = (props) => {
    let { className } = props;

    return (
        <div className={'headingListing ' + className}>
            <ul className='headingTable'>
                {props.children}
            </ul>
        </div>
    )
}



export default TableHeader;