import React from "react";
import './Calender.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calender = (props) => {
    let { showYearDropdown, showMonthDropdown } = props
    return (
        <div className="">
            <DatePicker
                selected={props.selected}
                dateFormat={props.dateFormat}
                placeholderText={props.placeholderText}
                onChange={(e) => props.onChange(e)}
                showYearDropdown={showYearDropdown}
                showMonthDropdown={showMonthDropdown}
                showTimeInput={props.showTimeInput}
                timeInputLabel={props.timeInputLabel}
                readOnly={props.readOnly}
                customInput={props.customInput}
                maxDate={props.maxDate}
                minDate={props.minDate}
            />
        </div>
    )
}

Calender.defaultProps = {
    id: 1,
    checked: false,
    labelTitle: 'Title',
    showYearDropdown: false,
    showMonthDropdown: false,
    showTimeInput: false,
    dateFormat: "dd/MM/yyyy",
    placeholderText: "To Date"
}

export default Calender;