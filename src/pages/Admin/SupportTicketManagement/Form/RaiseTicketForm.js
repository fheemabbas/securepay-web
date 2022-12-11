import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import FileUpload from "../../../../components/FileUpload/FileUpload";
import { showToast } from "../../../../state/ducks/utils/operations";

import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import './RaiseTicketForm.scss';

const ticketForm = {
    subject: {
        name: 'subject',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.SUBJECTEMPTY))
            }, pattern: {
                value: Constant.REGEX.Name,
                message: ((Message.ERRORMESSAGE.ALFAVALID))
            }
        },
    },
    message: {
        name: 'message',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.MESSAGEEMPTY))
            },
        },
    },

}

const RaiseTicketForm = (props) => {
    let [showImageName, setShowImageName] = useState()
    const [form, setFilterForm] = React.useState()
    const [busy, setBusy] = React.useState(false)

    const onFormSubmit = () => {
        setBusy(true)
        setTimeout(() => {
            setBusy(false)
            props.onHide()
            props.showToast({ message: 'Ticket raised successfully', type: 'success' })
        },
            1000)

    }

    const onImageChange = (acceptedFiles) => {
        setShowImageName(acceptedFiles[0].name)
    }


    return (
        <div className='ticketFilter' >
            <HookForm
                defaultForm={{}}
                init={form => setFilterForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Raise a Ticket'></Label>
                            <Label className='subTxt' title='Please provide below mentioned details to raise a ticket.'></Label>
                            <div className='filterItem'>
                                <TextField
                                    formMethod={formMethod}
                                    rules={ticketForm.subject.validate}
                                    name={ticketForm.subject.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Subject*"
                                />
                                <TextField
                                    formMethod={formMethod}
                                    rules={ticketForm.message.validate}
                                    name={ticketForm.message.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Message goes here*"
                                    textarea="textarea"
                                />
                                <div className={showImageName ? 'afterAdded' : 'fileInput'}>
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
                                                            <div className="uploadtxt"><p>Attach</p></div>
                                                        </div>
                                                    </div>
                                                }

                                            </FileUpload>
                                        }
                                        name="image"
                                        control={formMethod.control}
                                    />
                                </div>
                                <div className={!showImageName ? 'afterAdded' : 'uploadImgSection'}>
                                    {
                                        showImageName &&
                                        <>
                                            <div className='uploadedImg'>
                                                <i className='icon-pdf'></i>
                                                <p className='fileName'>{showImageName}</p>
                                            </div>
                                            <div className='delete'>
                                                <Link to="#" className='colorRed' onClick={() => setShowImageName()}>Delete</Link>
                                            </div>

                                        </>
                                    }
                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Raise" disabled={!formMethod?.formState.isValid || !showImageName} loading={busy} />
                                    <CustomButton type="button" title="Cancel" onClick={() => props.onHide()} />
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RaiseTicketForm));

