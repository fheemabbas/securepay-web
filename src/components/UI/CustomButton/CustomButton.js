import React from 'react';
import { Button } from 'react-bootstrap';
import Loader from "../../../assets/images/giphy.gif";
import './CustomButton.scss';
const CustomButton = (props) => {
    let { title, children, disabled, type, loading } = props
    return (
        <Button
            className={loading ? "custombtn btn-loading" : `custombtn ${props.className}`}
            type={type} onKeyDown={props.onKeyDown} disabled={disabled || loading} onClick={props.onClick}>
            {loading ?
                <div className="btn-loader"><img src={Loader} alt="loader" height={20} width={20} /></div> : title}
            {children}</Button>
    )
}

CustomButton.defaultProps = {
    className: 'custombtn',
    loading: false
}

export default CustomButton;

