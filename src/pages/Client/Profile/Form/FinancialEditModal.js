import React, { useEffect, useState } from "react";
import './FinancialEditModal.scss';
import { connect } from "react-redux";
import { withRouter, Link, } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import Scrollbars from "react-custom-scrollbars";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import HookForm from '../../../../components/HookForm/HookForm';
import FileUpload from "../../../../components/FileUpload/FileUpload";
import TextField from '../../../../components/UI/TextField/TextField';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';
import { showToast } from "../../../../state/ducks/utils/operations";
import { editBankDetails } from "../../../../state/ducks/Job/actions";
import StorageService from "./../../../../services/localstorage.service";

const buscategorylist = [
    {
        id: "1",
        value: 'Architect'
    },
    {
        id: "2",
        value: 'Mechanic'
    },
    {
        id: "3",
        value: 'Doctor'
    },
    {
        id: "4",
        value: 'Contractor'
    },
    {
        id: "5",
        value: 'Carpenter'
    },
    {
        id: "6",
        value: 'Plumber'
    }
]
const profileForm = {
    // businessCategory: {
    //     name: 'businessCategory',
    //     validate: {
    //         required: {
    //             value: true,
    //             message: 'required'
    //         },
    //     }
    // },
    accountNumber: {
        name: "accountNumber",
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.ACCOUNTNUMBEREMPTY,
            },
            pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: Message.ERRORMESSAGE.ALFANUMINVALID,
            },
            // maxLength: { value: 16, message: "Must be 8 digits long" },
            minLength: { value: 8, message: "Account number must be 8 digits long." },
        },
    },
    sortCode: {
        name: "sortCode",
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.SORTCODEEMPTY,
            },
            pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: Message.ERRORMESSAGE.SORTCODEVAILID,
            },
            maxLength: { value: 6, message: "Must be 6 digits " },
            minLength: { value: 6, message: "Must be 6 digits " },
        },
    },
    selectvalue: {
        name: 'selectvalue',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.MININVALID))
            },
            validate: value => value ?._id !== '' || 'error message'  // <p>error message</p>

        },
    },

}
const FinancialEditModal = (props) => {
    const [form, setLoginForm] = React.useState()
    let [showImageName, setShowImageName] = useState()
    const [busy, setBusy] = React.useState(false)
    const [identityProofDocument, setidentityProofDocument] = useState()
    const [identityProof, setidentityProof] = useState()
    // const [job, setSelectedJob] = useState()
    const [ext, setExt] = useState()
    const [isError, setisError] = useState(false)
    const [file_size, setfile_size] = useState()
    useEffect(() => {
        if (props.identityProof) {
            setExt(props.identityProof.split('.')[1])
            setShowImageName(props.identityProof)
            setidentityProof(props.identityProof)
            setidentityProofDocument(process.env.REACT_APP_CLOUDINARY_URL + props.identityProof)
        }
    }, [props.identityProof])
    const onImageChange = (acceptedFiles) => {
        console.log(acceptedFiles);
        if(acceptedFiles.length > 0){
            setfile_size(acceptedFiles[0].size);
            if (acceptedFiles[0].size >= 32 * 1024 && acceptedFiles[0].size < 10485760) {
                setisError(false)
                setShowImageName(acceptedFiles[0].name)
                setExt((acceptedFiles[0].name).split('.')[1])
                const reader = new FileReader();
                reader.addEventListener("load", (event) => {
                    setidentityProofDocument(event.target.result);
                });
                reader.readAsDataURL(acceptedFiles[0]);
                setidentityProof(acceptedFiles[0])
            } else {
                setisError(true)
                setidentityProof()
                setShowImageName()
                setidentityProofDocument()
            }
        }
    }
    const onFormSubmit = (data) => {
        setBusy(true)
        let param = new FormData();
        param.append("identityProof", identityProof);
        param.append("accountNumber", data.accountNumber);
        param.append("sortCode", data.sortCode);
        setBusy(true)
        props.editBankDetails(param).then((res) => {
            setBusy(false)
            StorageService.setItem("user", res.payload)
            props.onHide()
            props.showToast({ message: res.message, type: 'success' })
        }).catch((error) => {
            setBusy(false)

            props.onHide()
            props.showToast({ message: error ?.response ?.data ?.message, type: 'error' })
        })
    }
    return (
        <div className='financialEditModal' >
            <div className="popupScroll">
                <div className="boxContain">
                    <HookForm
                        defaultForm={{}}
                        init={form => setLoginForm(form)}
                        onSubmit={onFormSubmit}>
                        {(formMethod) => {
                            return (
                                <div className="form">

                                    <div className="mainPart">
                                        <div className="informationDetailTitle">Financial Information</div>

                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.accountNumber.validate}
                                            name={profileForm.accountNumber.name}
                                            errors={formMethod ?.errors}
                                            autoFocus={true}
                                            defaultValue={props.userBankInfo && props.userBankInfo ?.accountNumber}
                                            type="text"
                                            placeholder="Bank account number"
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.sortCode.validate}
                                            name={profileForm.sortCode.name}
                                            errors={formMethod ?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="Sort code"
                                            defaultValue={props.userBankInfo && props.userBankInfo ?.sortCode}
                                        />
                                        <div className={"documentRow"}>
                                            <div className="inputTitle">KYC Documents</div>
                                            {<Controller
                                                defaultValue=""
                                                render={({ onChange }) =>
                                                    <FileUpload
                                                        onDrop={acceptedFiles => {
                                                            onChange(acceptedFiles);
                                                            onImageChange(acceptedFiles)
                                                        }}
                                                        accept='image/jpeg,image/jpg, image/png'

                                                    // parentClassname={!identityProofDocument && "dropzoneCustom_none"}
                                                    >
                                                        {!identityProofDocument && <div className="imgBoxEmpty">
                                                            <div className="uploadtxt"><p> + Upload identity proof</p></div>
                                                            {isError && <div className="errormessage">{Message.ERRORMESSAGE.SUPPORTEDFILESIZE}</div>}
                                                        </div>}
                                                        {identityProofDocument &&
                                                            <div className="imgBoxEmpty">
                                                                <div className='uploadedImg'>
                                                                    <div >
                                                                        {ext !== "pdf" ? <img className="image_show" src={identityProofDocument}></img> : <p className='fileName'>{showImageName} </p>}
                                                                    </div><div className='colorRed' onClick={() => { setidentityProofDocument(); setShowImageName(); }}>
                                                                        Delete</div> </div>
                                                            </div>}
                                                    </FileUpload>
                                                }
                                                name="image"
                                                control={formMethod.control}
                                            />}

                                        </div>

                                    </div>
                                    <div className="btnRow">
                                        <CustomButton type="submit" title="Update" disabled={!formMethod ?.formState.isValid || !showImageName} loading={busy} />
                                        <Link to="#" className="cancelBtn" onClick={() => props.onHide()}>Cancel</Link>
                                    </div>
                                </div>
                            )
                        }}
                    </HookForm>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    showToast, editBankDetails
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FinancialEditModal));