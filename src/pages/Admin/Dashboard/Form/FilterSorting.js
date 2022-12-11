import React from "react";
import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';

import './FilterSorting.scss';

const FilterSorting = (props) => {


    return (

        <FilterDropdown >
            <div className='FilterSorting'>
                <div className='filterItem'>
                    <ul className='headingUl'>
                        {props.children}
                    </ul>
                </div>
            </div>
        </FilterDropdown>

    )
}




export default FilterSorting;