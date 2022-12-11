import React from "react";
import './FilterDropdown.scss';

const FilterDropdown = (props) => {

    return (
        <div className={'filterDropdown ' + props.className}>
            {props?.children}
        </div>
    )
}

FilterDropdown.defaultProps = {
    className: 'filterDropdown',
}

export default FilterDropdown;