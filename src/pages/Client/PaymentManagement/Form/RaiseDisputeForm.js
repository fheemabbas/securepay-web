import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import FileUpload from "../../../../components/FileUpload/FileUpload";
import { hideLoader, showLoader, showToast } from "../../../../state/ducks/utils/operations";
import { get } from "lodash";
import Message from '../../../../util/message';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './RaiseDisputeForm.scss';
import { dateFormat } from "../../../../services/helper.service";
import Constant from "../../../../util/constant";
import { Thumb } from "../../SupportTicketManagement/Form/viewMultipleImageThumb";
import { disputeRaised, getOneuserDetails } from "../../../../state/ducks/Job/actions";

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
    const { milestone } = props
    // let [showImageName, setShowImageName] = useState()
    const [form, setFilterForm] = React.useState()
    const [busy, setBusy] = React.useState(false)
    let [ShowUploadImg, setShowUploadImg] = useState([])

    const onImageChange = (acceptedFiles) => {
        setShowUploadImg(ShowUploadImg.concat(acceptedFiles))
    }
    const onFormSubmit = (data) => {
        let param = new FormData();
        for (let i = 0; i < ShowUploadImg.length; i++) {
            param.append(`images`, ShowUploadImg[i])
        }
        param.append("jobId", milestone.jobId);
        param.append("milestoneId", milestone._id);
        param.append("description", data.message);
        setBusy(true)
        props.showLoader()

        props.disputeRaised(param).then((res) => {
            setBusy(false)
            form.setValue("message", "")
            setShowUploadImg([])
            props.getOneuserDetails(milestone.jobId)
            props.createChannelSpace(res.payload)
            setTimeout(() => {
                props.hideLoader()
                props.onHide()
                props.showToast({ message: res.message, type: 'success' })
            }, 2000);
        }).catch((errors) => {
            props.showToast({ message: errors ?.response ?.data ?.message, type: 'error' })
        })
    }

    return (
        <div className='disputeSection' >
            <HookForm
                defaultForm={{}}
                init={form => setFilterForm(form)}
                onSubmit={onFormSubmit}
            >
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Query Transaction'></Label>
                            <div className='filterItem'>
                                <div className='messageAttched'>
                                    <TextField
                                        formMethod={formMethod}
                                        rules={disputeForm.message.validate}
                                        name={disputeForm.message.name}
                                        errors={formMethod ?.errors}
                                        autoFocus={true}
                                        type="text"
                                        placeholder="Please enter your query here."
                                        textarea="textarea"
                                    />
                                    {/* <div className="uploadImgSection">
                                        {
                                            showImageName &&
                                            <>
                                                <div className='uploadedImg'>
                                                    <img src={PDF} alt="viewImg" />
                                                    <i className='icon-pdf'></i>
                                                    <p className='fileName'>{showImageName}</p>
                                                </div>
                                                <div className='delete'>
                                                    <Link to="#" className='colorRed' onClick={() => setShowImageName()}>Delete</Link>
                                                </div>

                                            </>
                                        }
                                    </div> */}
                                    {/* <div className='fileInput' >
                                    

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
                                </div> */}
                                    <div className='fileInput' >
                                        <Controller
                                            defaultValue=""
                                            render={({ onChange }) =>
                                                // <FileUpload
                                                //     onDrop={acceptedFiles => {
                                                //         onChange(acceptedFiles);
                                                //         onImageChange(acceptedFiles)
                                                //     }}
                                                //     multiple={true}
                                                //     accept='image/jpeg,image/jpg, image/png,.pdf'
                                                // >

                                                //     <div className="imgBoxEmpty">
                                                //         <div className='uploadedImg'>
                                                //             <div className="uploadtxt"><i className='icon-attachment'></i></div>
                                                //         </div>
                                                //     </div>
                                                // </FileUpload>

                                                <FileUpload
                                                    onDrop={acceptedFiles => {
                                                        onChange(acceptedFiles);
                                                        onImageChange(acceptedFiles)
                                                    }}
                                                    multiple={true}
                                                    accept='image/jpeg,image/jpg, image/png'
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
                                                                                Supported formats: jpeg, jpg, png
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
                                </div>
                                <div className='disputeDetails'>
                                    <div className='details'>
                                        <div className='innterTxt'>
                                            <p className='txt'>Milestone Title</p>
                                            <p className='txt'>{get(milestone, 'title', '-')}</p>
                                        </div>
                                        <div className='innterTxt'>
                                            <p className='txt'>Milestone Amount</p>
                                            <p className='txt bold'>£{get(milestone, 'amount', '0')}</p>
                                        </div>
                                    </div>
                                    <div className='details'>
                                        <div className='innterTxt'>
                                            <p className='txt'>Escrowed Amount</p>
                                            <p className='txt bold'>£{get(milestone, 'amount', '0')} / £{get(milestone, 'escrowDetails.totalAmount', '0')}</p>
                                        </div>
                                        <div className='innterTxt'>
                                            <p className='txt'>Milestone Description</p>
                                            <p className='txt bold scroll_discription'>{get(milestone, 'description', '-')}</p>
                                        </div>
                                    </div>
                                    <div className='details'>
                                        <div className='innterTxt'>
                                            <p className='txt'>Expected Completion Date</p>
                                            <p className='txt bold'>{dateFormat(get(milestone, 'completionDate'), 'DD MMMM yyyy')}</p>
                                        </div>
                                        <div className='innterTxt'>
                                            <p className='txt'>Status</p>
                                            <p className='txt bold'>{Constant.MILESTONESTATUS_CLIENT[get(milestone, 'status')]}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Submit" disabled={!formMethod ?.formState.isValid} loading={busy} />
                                </div>
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
    showToast, disputeRaised, showLoader, hideLoader, getOneuserDetails
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RaiseDisputeForm));


