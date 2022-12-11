import React from 'react';
import './CustomDropdownAutoSearch.scss';
import SelectSearch from 'react-select-search';
import '../../../../node_modules/react-select-search/style.css';
import Label from '../Label/Label';
import Fuse from 'fuse.js';

const fuseSearch = (options) => {
    const fuse = new Fuse(options, {
        keys: ['name', 'groupName', 'items.name'],
        threshold: 0.3,
    });
    return (value) => {
        if (!value.length) {
            return options;
        }
        let data = fuse.search(value)
        if (data.some(item => item.value === 'addnew')) {
            data.splice(data.findIndex(item => item.value === 'addnew'), 1)
        }
        data.unshift({ name: '+ Add new customer', value: 'addnew' })
        return data;
    };
}

const CustomDropdownAutoSearch = (props) => {
    let { placeholder, labelTitle, options, onChange, isSearchable, disabled } = props
    return (
        <div className="searchMainDropdown">
            <Label title={labelTitle} className="dropdownLabel" />
            <SelectSearch
                search={isSearchable}
                options={options}
                value="sv"
                name="language"
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                disabled={disabled}
                filterOptions={fuseSearch}
            />

        </div>
    )
}

CustomDropdownAutoSearch.defaultProps = {
    disabled: false
}

export default CustomDropdownAutoSearch;

