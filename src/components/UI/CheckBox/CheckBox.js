import React, { useState, useEffect } from "react";
import './CheckBox.scss';

const CheckBox = (props) => {
    let { labelTitle, id, onCheckedChange, register, name } = props;
    const [checked, setChecked] = useState(!!props.checked)

    useEffect(() => {
        setChecked(props.checked)
    }, [props.checked])

    const onChecked = (e) => {
        setChecked(e.target.checked)
        onCheckedChange && onCheckedChange(e.target.checked)
    }

    return (
        <div className="checkboxMain">
            <input type="checkbox" ref={register} name={name} value={labelTitle || ''} id={id} className='checkbox' checked={checked ? checked : false} onChange={onChecked} />
            <label className='nutritionProducts pointerC' id="checkLabel" htmlFor={id}>{labelTitle}</label>
        </div>
    )
}

CheckBox.defaultProps = {
    id: 1,
    checked: false,
    labelTitle: 'Title',
}

export default CheckBox;