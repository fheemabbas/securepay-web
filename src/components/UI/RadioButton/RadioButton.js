import React from "react";
import "./RadioButton.scss";

const RadioButton = (props) => {
    return (
        <div className="RadioButton">
            <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} disabled={props.disabled} />
            <label htmlFor={props.id}>{props.label}</label>
            {props.children}
        </div>
    );
}

export default RadioButton;