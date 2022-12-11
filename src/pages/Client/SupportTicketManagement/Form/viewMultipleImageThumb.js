import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Thumb = props => {
    const [thumb, setThumbh] = useState(undefined)
    const { file, OnDeleteClick } = props;
    const ext = file.name.split('.').pop()
    useEffect(() => {
        let reader = new FileReader();

        reader.onloadend = () => {
            setThumbh(reader.result)
        };

        reader.readAsDataURL(props.file);
    }, [props])

    return (
        <>
            <div className='uploadedImg'>

                {(ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'JPG' || ext === 'JPEG' || ext === 'PNG' || ext === 'SVG' || ext === 'svg') ?
                    <img src={thumb} className="uploaded_image" /> :
                    <i className='icon-pdf'></i>}
                <p className='fileName'>{file.name}</p>
            </div>
            <div className='delete'>
                <Link to="#" className='colorRed' onClick={() => OnDeleteClick()}>Delete</Link>
            </div>

        </>
    );
}