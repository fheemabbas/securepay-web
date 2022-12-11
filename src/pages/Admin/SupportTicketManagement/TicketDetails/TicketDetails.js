import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { withRouter, useHistory, Link } from "react-router-dom"
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import Label from '../../../../components/UI/Label/Label';
import Scrollbars from "react-custom-scrollbars";
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import ZoomImgModal from '../../../../components/ZoomImgModal/ZoomImgModal';
import FileUpload from '../../../../components/FileUpload/FileUpload';
import TextField from '../../../../components/UI/TextField/TextField';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { hideLoader, showLoader, showToast } from "../../../../state/ducks/utils/operations";
import Constant from '../../../../util/constant';
import Message from '../../../../util/message';
import StorageService from "./../../../../services/localstorage.service";
import './TicketDetails.scss';
import { getOneTicketDetails, supportAndTicketComment, supportAndTicketResloved } from '../../../../state/ducks/Job/actions';
import { get } from "lodash";
import { dateFormat, capitalizeFirstLetter, downloadFile } from '../../../../services/helper.service';
import { Thumb } from '../../../Client/SupportTicketManagement/Form/viewMultipleImageThumb';
import useWindowDimension from '../../../../hooks/useWindowDimension';
const disputeForm = {
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

const AdminTicketDetails = (props) => {
  const dimensions = useWindowDimension()
  const history = useHistory();
  const { tickeitDetails } = props
  let [showImageZoom, setShowImageZoom] = useState(false)
  const [form, setFilterForm] = React.useState()
  const [busy, setBusy] = React.useState(false)
  const [role] = useState(localStorage.getItem('loginRole'))
  const [ZoomImgIndex, setZoomImgIndex] = useState()
  const [ShowImage, setShowImage] = useState()
  let [ShowUploadImg, setShowUploadImg] = useState([])
  let TicketId = StorageService.getItem("TicketID")
  const [headerHeight, setHeaderHeight] = useState(0)
  const [backHeight, setBackHeight] = useState(0)

  const onFormSubmit = (data) => {
    let param = new FormData();
    for (let i = 0; i < ShowUploadImg.length; i++) {
      param.append(`images`, ShowUploadImg[i])
    }
    param.append("ticketId", TicketId);
    param.append("description", data.message);
    setBusy(true)
    props.showLoader()
    props.supportAndTicketComment(param).then((res) => {
      setBusy(false)
      form.setValue("message", "")
      setShowUploadImg([])
      setTimeout(() => {
        props.getOneTicketDetails(TicketId)
        props.hideLoader()
        props.showToast({ message: res.message, type: 'success' })
      }, 2000);
    }).catch((errors) => {
      props.showToast({ message: errors ?.response ?.data ?.message, type: 'error' })
    })
  }
  const supportTicketResolved = () => {
    props.showLoader()
    props.supportAndTicketResloved(TicketId).then((res) => {
      props.getOneTicketDetails(TicketId);
      props.hideLoader()
      props.showToast({ message: res.message, type: 'success' })
    }).catch((errors) => {
      props.hideLoader()
      props.showToast({ message: errors ?.response ?.data ?.message, type: 'error' })
    });
  }
  useEffect(() => {
    props.getOneTicketDetails(TicketId)
  }, [])
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setBackHeight(document.getElementsByClassName('backTo')[0].offsetHeight);
  })
  // page redirect //
  const routeBack = () => {
    let path = `/admin/tickets`;
    history.push(path);
  }
  const onImageChange = (acceptedFiles) => {
    setShowUploadImg(ShowUploadImg.concat(acceptedFiles))
  }

  return (
    <div className='ticketdetailMain' style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className="innerContainer">
        <div className='backTo' onClick={() => routeBack()} >
          <i className='icon-back'></i>
          <p className='backTxt'>Back</p>
        </div>
      </div>
      <Scrollbars className="listingScroll" style={{ height: (dimensions.height - headerHeight - backHeight) + 'px' }}>
        <div className="innerContainer">
          <div className='jobDetialInner'>
            <div className='paddSection'>
              <div className='jobDetails'>
                <div className='innerLeft'>
                  <div className='txtBtn'>
                    <p className='idNos'>#{get(tickeitDetails, 'ticketId', '-')}</p>
                    <Label title={get(tickeitDetails, 'title', '-')}></Label>
                  </div>
                </div>
                {Number(role) === Constant.ROLE.STAFF &&
                  <div className="innerRight">
                    {tickeitDetails && tickeitDetails.status !== "RESOLVED" && <button className="btn_resolve" onClick={() => supportTicketResolved()}>Resolved</button>}
                  </div>
                }
              </div>
              <div className='customerDetails'>
                <div className="columnLeft">
                  <div className='detailsLeft'>
                    <p className='title'>Assigned To:</p>
                    <div className='innerTxt'>
                      <p className='bold'>{get(tickeitDetails, 'assignTo', '-')}</p>
                    </div>
                  </div>
                  <div className='detailsLeft'>
                    <p className='title'>Created By:</p>
                    <div className='innerTxt'>
                      <p className='bold'>{get(tickeitDetails, 'createdBy', '-')}</p>
                    </div>
                  </div>
                </div>
                <div className='rightSection'>
                  <p className='title'>Created On:<span className='value'>{tickeitDetails && tickeitDetails.createdAt && dateFormat(tickeitDetails.createdAt, 'DD MMM yyyy')}</span></p>
                  <p className='title'>Status:<span className='value color'>{tickeitDetails && tickeitDetails.status && capitalizeFirstLetter(tickeitDetails.status)}</span></p>
                </div>
              </div>
              {tickeitDetails && tickeitDetails.comments && tickeitDetails.comments.map((comment, i) =>
                <div className='imgSection' key={i}>
                  <div className='innerDetails'>
                    <div className='txtDetails'>
                      <div className='leftPart'>
                        <p className='title'>Commented By</p>
                        <p className='title bold'>{get(comment, 'commentedBy', '-')}</p>
                        {/* <p className='title '>Yata Pay Staff</p> */}
                        <p className='title desp'>{get(comment, 'description', '-')}.</p>
                      </div>
                      <div className='rightPart'>

                        <div className='right'>
                          <p className='title'>Created on</p>
                          <p className='title bold'>{dateFormat(comment.createdAt, 'DD MMM yyyy hh:mm a')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='imagePart'>
                    <ul className='imgUl' >
                      {comment.images && comment.images.map((image) => {
                        let ext = image.split('.').pop()
                        return <>
                          {(ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'JPG' || ext === 'JPEG' || ext === 'PNG' || ext === 'SVG' || ext === 'svg') ?
                            <li className='imgLi' onClick={() => {
                              setShowImageZoom(!showImageZoom)
                              setZoomImgIndex(i)
                              setShowImage(image)
                            }}>
                              <img src={process.env.REACT_APP_CLOUDINARY_URL + image} alt='img' className='imgClass'></img>
                            </li>
                            : (ext === 'pdf') ?
                              <li className='imgLi' >
                                <a href={process.env.REACT_APP_CLOUDINARY_URL + image} target="_blank" className='download'>
                                  <i className='icon-pdf'></i>
                                  {/* <p className='fileName'>Dispute.pdf</p> */}
                                </a>
                              </li>
                              :
                              <li className='imgLi' >
                                <a href={process.env.REACT_APP_CLOUDINARY_RAW_URL + image} className='download' target="_blank"
                                  // onClick={() => downloadFile(process.env.REACT_APP_CLOUDINARY_RAW_URL + image)} 
                                  download>
                                  {(ext === 'doc' || ext === 'docx') && <i className='icon-doc'></i>}
                                  {(ext === 'xls' || ext === 'xlsx') && <i className='icon-xls'></i>}

                                  {/* <p className='fileName'>Dispute.pdf</p> */}
                                </a>
                              </li>
                          }</>
                      })}
                    </ul>
                  </div>
                </div>
              )}
              {Number(role) === Constant.ROLE.STAFF && tickeitDetails?.status === 'PENDING' &&
                <div className='messageSection'>
                  <HookForm
                    defaultForm={{}}
                    init={form => setFilterForm(form)}
                    onSubmit={onFormSubmit}>
                    {(formMethod) => {
                      return (
                        <div className='messageAttched'>
                          <TextField
                            formMethod={formMethod}
                            rules={disputeForm.message.validate}
                            name={disputeForm.message.name}
                            errors={formMethod ?.errors}
                            autoFocus={false}
                            type="text"
                            placeholder="Message goes here.."
                            textarea="textarea"
                          />

                          <div className='fileInput' >
                            <Controller
                              defaultValue=""
                              render={({ onChange }) =>
                                <FileUpload
                                  onDrop={acceptedFiles => {
                                    onChange(acceptedFiles);
                                    onImageChange(acceptedFiles)
                                  }}
                                  multiple={true}
                                  accept='image/jpeg,image/jpg, image/png,.pdf ,.docx ,.doc,.xls,.xlxs'
                                >

                                  <div className="imgBoxEmpty">
                                    <div className='uploadedImg'>
                                      <div className="uploadtxt"><i className='icon-attachment'></i></div>
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
                          <CustomButton type="submit" title="Submit" disabled={!formMethod ?.formState.isValid} loading={busy} />
                        </div>
                      )
                    }}
                  </HookForm>
                </div>
              }
            </div>
          </div>
        </div>
      </Scrollbars>
      <ModalPopup
        showModal={showImageZoom}
        onHide={() => setShowImageZoom(false)}
        className='zoomImg'
        closeIcon={true}
      >
        <ZoomImgModal
          indexZoom={ZoomImgIndex}
          ZoomImg={tickeitDetails && tickeitDetails.comments && tickeitDetails.comments[ZoomImgIndex]}
          title='Photos'
          ShowImage={ShowImage}
          onHide={() => setShowImageZoom(false)}></ZoomImgModal>
      </ModalPopup>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    tickeitDetails: state.job.tickeitDetails
  }
};
const mapDispatchToProps = {
  showToast, getOneTicketDetails, supportAndTicketComment, supportAndTicketResloved, showLoader, hideLoader
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminTicketDetails));


