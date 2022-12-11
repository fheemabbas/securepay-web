import React from "react";
import './Status.scss';

const Status = (props) => {
    let { title, className, onClick } = props;

    return (
        <div onClick={onClick} className={'statusMain ' + className} style={{ backgroundColor: props.backgroundColor, borderRadius: props.borderRadius }}>
            <h1 className='statusTxt' style={{ color: props.color }}>{title}</h1>
        </div >
    )
}

Status.defaultProps = {
    color: 'black',
    backgroundColor: '#ffffff',
    borderRadius: '50px'
}

export default Status;