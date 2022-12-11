import React, { useContext, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import CustomDropdown from './../../../components/UI/CustomDropdown/CustomDropdown';

import es from "date-fns/locale/es"; // the locale you want
import pt from "date-fns/locale/pt"; // the locale you want

import "react-datepicker/dist/react-datepicker.css";

import './CalenderCustom.scss';
import { getMonth } from "date-fns";

Array.range = function (a, b, step) {
    var A = [];
    if (typeof a == 'number') {
        A[0] = a;
        step = step || 1;
        while (a + step <= b) {
            A[A.length] = a += step;
        }
    }
    else {
        var s = 'abcdefghijklmnopqrstuvwxyz';
        if (a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }
        s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
        A = s.split('');
    }
    return A;
}

const Calender = (props) => {
    let { placeholder, maxDate, currantYear, minDate } = props
    registerLocale(localStorage.getItem('rcml-lang'), localStorage.getItem('rcml-lang') === 'es' ? es : pt)
    const currentDate = new Date().getDate();
    // const currentMonth = new Date().getMonth() + 1;
    const [yearsmain, setSelectedYearsMain] = useState({
        id: "103",
        value: currantYear
    })


    const allmonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const [monthmain, setSelectedMonthMain] = useState({
        id: new Date().getMonth(),
        value: allmonths[new Date().getMonth()]
    })

    const [years, setYears] = useState([])
    const [months, setMonths] = useState([])
    const fullYears = Array.range(1900, currantYear, 1);



    useEffect(() => {
        let years = fullYears.sort((f, s) => s - f).
            map((item, index) => {
                return (
                    {
                        id: index.toString(),
                        value: item
                    }
                )
            });
        let months = allmonths.map((item, index) => {
            return (
                {
                    id: index.toString(),
                    value: item
                }
            )
        })
        setYears(years)
        setMonths(months)
    }, [])

    return (
        <div className="calendar_Section">
            <DatePicker
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                        <div className="drop-inline">
                            <div className='cal-month'>
                                <CustomDropdown
                                    dropDownItems={months}
                                    value={monthmain}
                                    onChange={selected => { setSelectedMonthMain(selected); changeMonth(selected.id) }}
                                // onChange={({ target: { value } }) =>
                                //     changeMonth(months.indexOf(value))
                                // }
                                >
                                </CustomDropdown>
                                {/* <select
                                value={months[new Date(date).getMonth()]}
                                onChange={({ target: { value } }) =>
                                    changeMonth(months.indexOf(value))
                                }
                            >
                                {months.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select> */}
                            </div>
                            <div className='cal-year'>
                                <CustomDropdown
                                    dropDownItems={years}
                                    value={yearsmain}
                                    onChange={selected => { setSelectedYearsMain(selected); changeYear(selected.value) }}
                                >
                                </CustomDropdown>
                                {/* <select
                                value={new Date(date).getFullYear()}
                                onChange={({ target: { value } }) => changeYear(value)}
                            >
                                {years.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select> */}
                            </div>
                            <div className='cal-arrow'>
                                <button className="btn-date-arrow prev" onClick={() => {
                                    decreaseMonth();
                                    setSelectedMonthMain({ id: parseInt(monthmain.id) === 0 ? 11 : parseInt(monthmain.id) - 1, value: allmonths[parseInt(monthmain.id) === 0 ? 11 : parseInt(monthmain.id) - 1] })
                                }} disabled={prevMonthButtonDisabled}>
                                    <i className="icon icon-uparrow"></i>
                                </button>
                                <button className="btn-date-arrow next" onClick={() => {
                                    increaseMonth();
                                    setSelectedMonthMain({ id: parseInt(monthmain.id) === 11 ? 0 : parseInt(monthmain.id) + 1, value: allmonths[parseInt(monthmain.id) === 11 ? 0 : parseInt(monthmain.id) + 1] })
                                }} disabled={nextMonthButtonDisabled}>
                                    <i className="icon icon-downarrow"></i>
                                </button>
                            </div>
                        </div>
                    )}
                locale={localStorage.getItem('rcml-lang')}
                selected={props.selected}
                dateFormat={props.dateFormat}
                placeholderText={props.placeholderText}
                placeholderText={placeholder}
                onChange={(e) => props.onChange(e)}
                // openToDate={new Date(currantYear + "/" + monthmain.value + "/" + currentDate)}
                showYearDropdown={props.showYearDropdown}
                showMonthDropdown={props.showMonthDropdown}
                showTimeInput={props.showTimeInput}
                timeInputLabel={props.timeInputLabel}
                readOnly={props.readOnly}
                customInput={props.customInput}
                maxDate={props.maxDate}
                minDate={props.minDate}
            />
            <i className='icon-calendar customIcon'></i>
        </div>
    )
}

Calender.defaultProps = {
    id: 1,
    checked: false,
    LABEL_TITLE: 'Title',
    showYearDropdown: false,
    showMonthDropdown: false,
    showTimeInput: false,
    dateFormat: "dd/MM/yyyy",
    placeholderText: "To Date"
}

export default Calender;