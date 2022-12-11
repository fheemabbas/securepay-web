import React, { useEffect, useState } from 'react';
import './ToggleButton.scss';
const ToggleButtonCustom = (props) => {
    let { rightLabel, leftLabel, onChange, checked, UpdateStatus, userid, tabletype, setUserID, setStatus, userID, userStatus, setShowDeleteModal } = props;
    const [ischeck, setisoncheck] = useState(checked)

    useEffect(() => {
        setisoncheck(checked)
    }, [userid])
    useEffect(() => {
        userID === userid && setisoncheck(userStatus)
    }, [userID, userStatus])
    return (
        <div className="toggleMain">
            <div className="rejectTxt">{leftLabel}</div>
            <label className="switch">
                <input type="checkbox" onChange={e => {
                    onChange && onChange(e.target.checked)
                    if (tabletype === "user-management") {

                        setUserID(userid)
                        setStatus(ischeck)
                        setShowDeleteModal()

                    }

                }} checked={!ischeck} />
                <span className="slider round"></span>
            </label>
            <div className="approveTxt">{rightLabel}</div>
            {props.children}
        </div>

    )
}

export default ToggleButtonCustom;

