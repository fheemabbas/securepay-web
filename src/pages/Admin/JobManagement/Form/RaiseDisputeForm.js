import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import FileUpload from "../../../../components/FileUpload/FileUpload";
import { showToast } from "../../../../state/ducks/utils/operations";

import Message from '../../../../util/message';

import './RaiseDisputeForm.scss';
import { Link } from "react-router-dom";

const disputeForm = {

    message: {
        name: 'message',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.DISPUTEEMPTY))
            },
        },
    },

}

const RaiseDisputeForm = (props) => {
    let [showImageName, setShowImageName] = useState()
    const [form, setFilterForm] = React.useState()
    const [busy, setBusy] = React.useState(false)

    const onImageChange = (acceptedFiles) => {
        setShowImageName(acceptedFiles[0].name)
    }
    const onFormSubmit = () => {
        setBusy(true)
        setTimeout(() => {
            setBusy(false)
            props.onHide()
            props.showToast({ message: 'Dispute has been raised successfully', type: 'success' })
        },
            1000)

    }

    return (
        <div className='disputeSection' >
            <HookForm
                defaultForm={{}}
                init={form => setFilterForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Dispute Reason'></Label>
                            <div className='filterItem'>
                                <div className='messageAttched'>
                                    <TextField
                                        formMethod={formMethod}
                                        rules={disputeForm.message.validate}
                                        name={disputeForm.message.name}
                                        errors={formMethod ?.errors}
                                        autoFocus={true}
                                        type="text"
                                        placeholder="Dispute reason goes here...."
                                        textarea="textarea"
                                    />
                                    <div className="uploadImgSection">
                                        {
                                            showImageName &&
                                            <>
                                                <div className='uploadedImg'>
                                                    {/* <img src={PDF} alt="viewImg" /> */}
                                                    <i className='icon-pdf'></i>
                                                    <p className='fileName'>{showImageName}</p>
                                                </div>
                                                <div className='delete'>
                                                    <Link to="#" className='colorRed' onClick={() => setShowImageName()}>Delete</Link>
                                                </div>

                                            </>
                                        }
                                    </div>
                                    <div className='fileInput' >
                                        <Controller
                                            defaultValue=""
                                            render={({ onChange }) =>
                                                <FileUpload
                                                    onDrop={acceptedFiles => {
                                                        onChange(acceptedFiles);
                                                        onImageChange(acceptedFiles)
                                                    }}
                                                >
                                                    {
                                                        !showImageName &&
                                                        <div className="imgBoxEmpty">
                                                            <div className='uploadedImg'>
                                                                <div className="uploadtxt"><i className='icon-attachment'></i></div>
                                                            </div>
                                                        </div>
                                                    }

                                                </FileUpload>
                                            }
                                            name="image"
                                            control={formMethod.control}
                                        />
                                    </div>
                                </div>
                                <div className='disputeDetails'>
                                    <div className='details'>
                                        <div className='innterTxt'>
                                            <p className='txt'>Milestone Title</p>
                                            <p className='txt'>Est sit aliqua dolor do amet sint.</p>
                                        </div>
                                        <div className='innterTxt'>
                                            <p className='txt'>Milestone Amount</p>
                                            <p className='txt bold'>£1500</p>
                                        </div>
                                    </div>
                                    <div className='details'>
                                        <div className='innterTxt'>
                                            <p className='txt'>Escrowed Amount</p>
                                            <p className='txt bold'>£1500 / £0</p>
                                        </div>
                                        <div className='innterTxt'>
                                            <p className='txt'>Milestone Description</p>
                                            <p className='txt bold'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet int.</p>
                                        </div>
                                    </div>
                                    <div className='details'>
                                        <div className='innterTxt'>
                                            <p className='txt'>Expected Completion Date</p>
                                            <p className='txt bold'>15 July 2020</p>
                                        </div>
                                        <div className='innterTxt'>
                                            <p className='txt'>Status</p>
                                            <p className='txt bold'>Ongoing</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Submit" disabled={!formMethod ?.formState.isValid || !showImageName} loading={busy} />
                                </div>
                            </div>

                        </div>
                    )
                }}
            </HookForm>
        </div>


    )
}



const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {

    showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RaiseDisputeForm));


