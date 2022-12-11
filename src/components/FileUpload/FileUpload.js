import React from 'react';
import {useDropzone} from 'react-dropzone';
import './FileUpload.scss';

const FileUpload = (props) => {
    let { parentClassname, multiple, onDrop, error, setRef } = props;
    const {
        getRootProps,
        getInputProps
      } = useDropzone({
        accept: props.accept,
        onDrop: files => onDrop(files)
      });
    return (
        <>
            <div className={parentClassname}>
                <div className={`dropzoneCustom ${error ? 'error' : ''}`}>
                    {/* <Dropzone onDrop={acceptedFiles => { onDrop && onDrop(acceptedFiles) }} ref={setRef}> */}
                        {/* {({ getRootProps, getInputProps }) => { */}
                            <div className="txtDropzone" {...getRootProps()}>
                                <input {...getInputProps()} multiple={multiple} accept={props.accept} />
                                {props.children}
                            </div>
                        {/* }}
                    </Dropzone> */}
                </div>
            </div>
            {error ? <div className="errorTxtFile"><span className="joyclub-Info"></span><p>{error}</p></div> : null}
        </>
    )
}

FileUpload.defaultProps = {
    hasLabel: true,
    parentClassname: 'fileUploadMain',
    btnVsible: false

}

export default FileUpload;