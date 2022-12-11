import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { Controller } from 'react-hook-form';
import Scrollbars from "react-custom-scrollbars";
import Label from '../../../../components/UI/Label/Label';
import HookForm from '../../../../components/HookForm/HookForm';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import FileUpload from '../../../../components/FileUpload/FileUpload';
import TextField from '../../../../components/UI/TextField/TextField';
import ZoomImgModal from '../../../../components/ZoomImgModal/ZoomImgModal';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { hideLoader, showLoader, showToast } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import Message from '../../../../util/message';
import StorageService from "./../../../../services/localstorage.service";
import { getOneTicketDetails, supportAndTicketComment } from '../../../../state/ducks/Job/actions';
import { get } from "lodash";
import { dateFormat, capitalizeFirstLetter } from '../../../../services/helper.service';
import './TicketDetails.scss';
import { Thumb } from '../Form/viewMultipleImageThumb';

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

const TicketDetails = (props) => {
  const history = useHistory();
  const { tickeitDetails } = props
  let TicketId = StorageService.getItem("TicketID")
  let [showImageZoom, setShowImageZoom] = useState(false)
  const [form, setFilterForm] = React.useState()
  const [busy, setBusy] = React.useState(false)
  const [ZoomImgIndex, setZoomImgIndex] = useState()
  const dimensions = useWindowDimension();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [backBtnHeight, setBackBtnHeight] = useState(0);
  let [ShowUploadImg, setShowUploadImg] = useState([])
  const [ShowImage, setShowImage] = useState()
  useEffect(() => {
    setHeaderHeight(
      document.getElementsByClassName("headerClient")[0].offsetHeight
    );
    setBackBtnHeight(
      document.getElementsByClassName("backTo")[0].offsetHeight
    );
  });
  useEffect(() => {
    props.getOneTicketDetails(TicketId)
  }, [])
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
      form.setValue("images", "")
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

  // page redirect //
  const routeBack = () => {
    let path = `/tickets`;
    history.push(path);
  }
  const onImageChange = (acceptedFiles) => {
    setShowUploadImg(ShowUploadImg.concat(acceptedFiles))
  }
  return (
    <div className='ticketdetailMain'>
      <div className="innerContainer">
        <div className='backTo'>
          <button onClick={() => routeBack()} className="back_btn">
            <i className='icon-back'></i>
            <p className='backTxt'>Back</p>
          </button>
        </div>
      </div>

      <Scrollbars className="listingScroll" style={{
        height: dimensions.height - headerHeight - backBtnHeight + "px",
      }}>
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
              </div>
              <div className='customerDetails'>
                <div className='detailsLeft'>
                  <p className='title'>Assigned To:</p>
                  <div className='innerTxt'>
                    <p className='bold'>{get(tickeitDetails, 'assignTo', '-')}</p>
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
                          <p className='title bold'>{comment && comment.createdAt && dateFormat(comment.createdAt, 'DD MMM yyyy hh:mm a')}</p>
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
                            <li className='imgLi' style={{ backgroundImage: `url(${process.env.REACT_APP_CLOUDINARY_URL + image}) ` }} onClick={() => {
                              setShowImageZoom(!showImageZoom)
                              setZoomImgIndex(i)
                              setShowImage(image)
                            }}>
                              {/* <img src={process.env.REACT_APP_CLOUDINARY_URL + image} alt='img' className='imgClass'></img> */}
                            </li>
                            : (ext === 'pdf') ?
                              <li className='imgLi'>
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
              {tickeitDetails?.status === 'PENDING' && 
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
          title='Photos'
          indexZoom={ZoomImgIndex}
          ShowImage={ShowImage}
          ZoomImg={tickeitDetails && tickeitDetails.comments && tickeitDetails.comments[ZoomImgIndex]}
          onHide={() => setShowImageZoom(false)}></ZoomImgModal>
        {/* <p>Contrary to popular belief, Lorem Ipsum is not simply random text. </p> */}
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
  showToast, getOneTicketDetails, supportAndTicketComment, showLoader, hideLoader
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketDetails));


