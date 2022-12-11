import React, { useState } from "react";
import { Controller } from 'react-hook-form';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HookForm from '../../../../components/HookForm/HookForm';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { showToast } from "../../../../state/ducks/utils/operations";
import FileUpload from "../../../../components/FileUpload/FileUpload";


import './AddDocumentForm.scss';





const AddDocumentForm = (props) => {
    const [form, setFilterForm] = React.useState()
    // const onFormSubmit = () => { }
    let [showImageName, setShowImageName] = useState()
    let [image, setImage] = useState()
    const [busy, setBusy] = React.useState(false)




    const onFormSubmit = () => {
        setBusy(true)
        setTimeout(() => {
            setBusy(false)
            props.onHide()
            props.showToast({ message: 'Document uploaded successfully', type: 'success' })

        }, 1000)

    }
    const onImageChange = (acceptedFiles) => {
        setShowImageName(acceptedFiles[0].name)
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            setImage(event.target.result)
        });
        reader.readAsDataURL(acceptedFiles[0]);
    }



    return (
        <div className='createMile' >
            <HookForm
                defaultForm={{}}
                init={form => setFilterForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (<div className="form">
                        <Label title={props.title}></Label>
                        {/* <Controller
                            defaultValue=""
                            render={({ onChange }) =>
                                <FileUpload
                                    onDrop={acceptedFiles => {
                                        onChange(acceptedFiles);
                                        onImageChange(acceptedFiles)
                                    }}>
                                    <div className="imgBoxEmpty">
                                        {image ? <img src={image} alt="viewImg" /> : <p>Upload</p>}
                                    </div>
                                </FileUpload>
                            }
                            name="image"
                            control={formMethod.control}
                        /> */}
                        <div className={showImageName ? 'afterAdded' : 'fileInput'}>
                            <Controller
                                defaultValue=""
                                name="image"
                                control={formMethod.control}
                                render={({ onChange }) =>
                                    <FileUpload
                                        onDrop={acceptedFiles => {
                                            onChange(acceptedFiles);
                                            onImageChange(acceptedFiles)
                                        }}
                                    >
                                        <div className="imgBoxEmpty">
                                            {image ?
                                                <>
                                                    <div className='withImage'>
                                                        <img src={image} alt="viewImg" />
                                                    </div>
                                                    <div className='overlayClose'>

                                                        <i className='icon-close' onClick={() => setImage()}></i>
                                                    </div>
                                                </>
                                                :
                                                <div className='uploadedImg'>
                                                    <div className="uploadtxt"><p>Upload</p></div>
                                                </div>
                                            }
                                        </div>
                                    </FileUpload>
                                }
                            />
                        </div>

                        <div className="custombtnfield">
                            <CustomButton type="submit" title="Submit" disabled={!formMethod?.formState.isValid} loading={busy} />
                            <CustomButton type="button" title="Cancel" onClick={() => props.onHide()} />
                        </div>
                    </div>

                    )

                }}

            </HookForm>
        </div >

    )
}



const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddDocumentForm));
