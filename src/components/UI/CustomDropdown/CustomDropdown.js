import React from "react";
import "./CustomDropdown.scss";
import PropTypes from "prop-types";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const CustomDropdown = (props) => {
  let { dropDownItems, placeholder, onChange, value } = props;
  // const getTitle = () => {
  //     if (dropDownItems && dropDownItems.id) {
  //         const item = dropDownItems.find(i => i.id === dropDownItems.id)
  //         return (item && item.value) || placeholder
  //     } else {
  //         return placeholder
  //     }
  // }
  const getObject = (value) => {
    const type = props.dropDownItems.find((el) => el.id === value); // find an object with id
    return type;
  };

  return (
    <div className="customDropdown">
      <DropdownButton
        key={dropDownItems?.id}
        id={`dropdown-variants-${dropDownItems?.id}`}
        title={value.value || placeholder}
        // title={getTitle()}
        // onSelect={evt => onSelect(dropDownItems.find(i => i.id === evt))}
        onSelect={(val) => {
          let selectedObj = getObject(val);
          onChange &&
            onChange({ value: selectedObj.value, id: selectedObj.id });
        }}
        className={value ? "selected" : ""}
      >
        <div className="dropdownData">
          {dropDownItems.map((item) => (
            <Dropdown.Item eventKey={item.id} key={item.id}>{item.value}</Dropdown.Item>
          ))}
        </div>
      </DropdownButton>
    </div>
  );
};

CustomDropdown.propTypes = {
  onClick: PropTypes.func,
};

export default CustomDropdown;
