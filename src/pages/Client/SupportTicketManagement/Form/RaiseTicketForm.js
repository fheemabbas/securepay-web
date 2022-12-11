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
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import './RaiseTicketForm.scss';
import { supportAndTicket } from "../../../../state/ducks/Job/actions";
import { Thumb } from "./viewMultipleImageThumb";

const ticketForm = {
    subject: {
        name: 'subject',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
        },
    },
    message: {
        name: 'message',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
        },
    },

}

const RaiseTicketForm = (props) => {
    let [showImageName, setShowImageName] = useState()
    const [form, setFilterForm] = React.useState()
    const [busy, setBusy] = React.useState(false)
    let [ShowUploadImg, setShowUploadImg] = useState([])
    const onFormSubmit = (data) => {
        let param = new FormData();
        for (let i = 0; i < ShowUploadImg.length; i++) {
            param.append(`images`, ShowUploadImg[i])
        }
        param.append("title", data.subject);
        param.append("description", data.message);
        setBusy(true)
        props.supportAndTicket(param).then((res) => {
            setBusy(false)
            props.onHide()
            props.showToast({ message: res.message, type: 'success', time: 35000 })
        }).catch((errors) => {
            props.showToast({ message: errors?.response?.data?.message, type: 'error' })
        })
    }
    const onImageChange = (acceptedFiles) => {
        setShowImageName(acceptedFiles)
        setShowUploadImg(ShowUploadImg.concat(acceptedFiles))
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
                            <Label title='Get Support'></Label>
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
                                <div className={'fileInput'}>
                                    <Controller
                                        defaultValue=""
                                        render={({ onChange }) =>
                                            <FileUpload
                                                onDrop={acceptedFiles => {
                                                    onChange(acceptedFiles);
                                                    onImageChange(acceptedFiles)
                                                }}
                                                multiple={true}
                                                accept='image/jpeg,image/jpg, image/png,.pdf ,.docx ,.doc,.xls,.xlsx'
                                            >

                                                <div className="imgBoxEmpty">
                                                    <div className='uploadedImg'>
                                                        <div className="uploadtxt"><p><i className='icon-attachment'></i>Attach</p></div>
                                                        <span className="custom_tooltip">
                                                            {['bottom'].map((placement) => (
                                                                <OverlayTrigger

                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Tooltip id={`custom_tooltip`}>
                                                                            Supported formats: PDF, Doc, XLS, DOCX, JPEG, and PNG
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <span className="icon-info-bold" />
                                                                </OverlayTrigger>
                                                            ))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </FileUpload>
                                        }
                                        name="image"
                                        control={formMethod.control}
                                    />
                                </div>
                                {ShowUploadImg && ShowUploadImg.map((file, i) => (
                                    <div className="uploadImgSection">
                                        <Thumb
                                            key={i} file={file}
                                            OnDeleteClick={() => {
                                                setShowUploadImg(ShowUploadImg.filter((item) => item.name !== file.name))
                                            }}
                                        />
                                    </div>
                                ))}
                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Raise" disabled={!formMethod?.formState.isValid} loading={busy} />
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

    showToast, supportAndTicket
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RaiseTicketForm));

