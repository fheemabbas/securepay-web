import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from "react-router-dom"

import Label from '../../../../components/UI/Label/Label';
// import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import TableHeader from '../../../../components/TableHeader/TableHeader';
import TableListing from '../../../../components/TableListing/TableListing';
import Scrollbars from "react-custom-scrollbars";
import Status from '../../../../components/Status/Status';
import NoData from '../../../../components/NoData/NoData';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import CreateMilestoneForm from '../Form/CreateMilestoneForm';
import RaiseDisputeForm from '../Form/RaiseDisputeForm';
import MilestoneHistory from '../../DisputeManagement/Form/MilestoneHistory';
import RejectionComments from '../../DisputeManagement/Form/RejectionComments';
import MilestoneModification from '../../DisputeManagement/Form/MilestoneModification';
import AlertModal from '../../../../components/AlertModal/AlertModal';
import ConfirmModal from '../../../../components/ConfirmMessage/ConfirmModal';
import useWindowDimension from "../../../../hooks/useWindowDimension";
import { get } from "lodash";
import { getOneuserDetails } from '../../../../state/ducks/Job/actions';
import { hideLoader, showToast, showLoader } from "../../../../state/ducks/utils/operations";
import StorageService from "./../../../../services/localstorage.service";

import './JobDetails.scss';
import { connect } from 'react-redux';
import Constant from '../../../../util/constant';
import moment from 'moment';

const headerPending = [
  {
    title: 'Milestone Title / status',
    key: 'milestone-title',
  },
  {
    title: 'Milestone Amount',
    key: 'milestone-amount',
  },
  {
    title: 'Escrowed Amount / Paid Amount ',
    key: 'paid-amount',
  },
  {
    title: 'Milestone Description',
    key: 'milestone-description',
  }
  // {
  //   title: 'Expected Completion Date',
  //   key: '',
  // },
  // {
  //   title: 'Status',
  //   key: '',
  // },
]


const JobDetails = (props) => {
  const history = useHistory();
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [backHeight, setBackHeight] = useState(0)
  let [showCancelModal, setShowCancelModal] = useState(false)
  let [showDeleteModal, setShowDeleteModal] = useState(false)
  let [showActionModal, setShowActionModal] = useState(false)
  let [showCreateMilestone, setShowCreateMilestone] = useState(false)
  let [showRaiseDispute, setShowRaiseDispute] = useState(false)
  let [showModificationModal, setShowModificationModal] = useState(false)
  let [showRejectCommentModal, setShowRejectCommentModal] = useState(false)
  let [showMilestoneHistoryModal, setShowMilestoneHistoryModal] = useState(false)
  const { jobDetails } = props
  // const onStatusChange = (type) => {
  //   if (type === 'amountChangePending') {
  //     setShowMilestoneHistoryModal(true)
  //   } else if (type === 'rejectComment') {
  //     setShowRejectCommentModal(true)
  //   } else if (type === 'modificationRequestPending') {
  //     setShowModificationModal(true)
  //   }
  // }
  // eslint-disable-next-line 
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setBackHeight(document.getElementsByClassName('backTo')[0].offsetHeight);
  })
  // page redirect //
  const routeDetails = () => {
    let path = `/admin/jobs`;
    history.push(path);
  }
  // page redirect //
  useEffect(() => {
    let JobId = StorageService.getItem("JobId")

    if (props.jobDetails === null) {
      if (JobId) {
        props.showLoader()
        props.getOneuserDetails(JobId).then(() => props.hideLoader())
      } else {
        routeDetails()
      }
    }// eslint-disable-next-line 
  }, [])
  return (
    <div style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className='jobdetailMain' >
        <div className='innerSection'>
          <div className='backTo' onClick={() => routeDetails()} >
            <i className='icon-back'></i>
            <p className='backTxt'>Back</p>
          </div>
        </div>
        <Scrollbars className="listingScroll" style={{ height: (dimensions.height - headerHeight - backHeight) + 'px' }}>
          <div className='innerSection'>
            <div className='jobDetialInner'>
              <div className='jobDetails'>
                <div className='innerLeft'>
                  <div className='txtBtn'>
                    <Label title={get(jobDetails, 'name', 0)}></Label>
                  </div>
                  <div className='desc'>
                    <p className='txt'>{get(jobDetails, 'description', "-")}</p>
                  </div>
                </div>
                <div className='innerRight'>
                  <p className='noTxt'>Admin Commission: <span className='bold'>£{get(jobDetails, 'serviceFee', 0).toFixed(2)}</span></p>
                  <p className='noTxt'>Total Job Amount: <span className='bold'>£{get(jobDetails, 'totalAmount', 0).toFixed(2)}</span></p>
                  <p className='noTxt'>Job Status: <span className='bold'>{Constant.JOBSTATUSADMIN[get(jobDetails, 'status')] || ""}</span></p>
                  {/* <p className='noTxt'>Business Category: <span className='bold'>Architect</span></p> */}
                </div>
              </div>
              <div className='customerDetails'>
                {jobDetails && jobDetails.company && <div className='detailsLeft'>
                  <p className='title'>Business Details:</p>
                  <div className='innerTxt'>
                    <p className='bold'>{get(jobDetails.company, 'name')}</p>
                    <p className='bold'>{get(jobDetails.address, 'houseNo')}, {get(jobDetails.address, 'addressLine2')} {get(jobDetails.address, 'city')} , {get(jobDetails.address, 'region')}  {get(jobDetails.address, 'postalCode')}</p>
                  </div>
                </div>}
                <div className='detailsLeft'>
                  <p className='title'>Customer Details:</p>
                  <div className='innerTxt'>
                    <p className='bold'>{get(jobDetails, 'customerName')}</p>
                    <p className='bold'>{get(jobDetails, 'customerEmail')}</p>
                    <p className='bold'>{get(jobDetails, `dialCode`)} {get(jobDetails, `phoneNumber`)}</p>
                  </div>
                </div>
              </div>
              <div className='tableSection'>
                <div className='header'>
                  <div className="headItem">
                    <TableHeader className='pendingHeader'>
                      {
                        headerPending.map((header, index) => {
                          return <li className='headingItem' key={index}><div className='headerTitle'>{header.title} </div></li>
                        })
                      }
                    </TableHeader>
                  </div>
                </div>
                <div className='listing'>


                  {
                    jobDetails && jobDetails.mileStoneData && jobDetails.mileStoneData.length >= 1 ? jobDetails.mileStoneData.map((listingPending, i) => {
                      return <TableListing className='pendingListing' key={i}>
                        <div className='liPadding'>
                          <li className='headingItem'>
                            {listingPending.title}
                            <div className="status">
                              {<Status className={Constant.JOBSTATUSCLASS[`${listingPending.status}`]} title={Constant.JOBSTATUSADMIN[`${listingPending.status}`]}></Status>}
                            </div>
                          </li>
                          <li className='headingItem' data-content="Milestone Amount">£ {listingPending.amount && listingPending.amount.toFixed(2)}</li>
                          <li className='headingItem' data-content="Escrowed/Paid">£{get(listingPending.escrowDetails, 'totalAmount', 0)}/£0</li>
                          <li className='headingItem' data-content="Milestone Description ">{listingPending.description || "-"}</li>
                          {/* <li className='headingItem' data-content="Expected Date">{moment(listingPending.completionDate).format("DD MMM yyyy") || "-"}</li> */}
                          {/* <li className='headingItem' data-content="Status"></li> */}
                        </div>
                        {/* <li className=' headingItem actionLi'>
                          {
                            listingPending.stickeys.map((status) => {
                              return <Status onClick={() => onStatusChange(status.type)} className={listingPending.requestFlag} title={status.request} color={status.color} backgroundColor={status.backgroundColor} borderRadius={status.borderRadius}></Status>
                            })
                          }
                        </li> */}
                      </TableListing>

                    }) : <NoData title='No Record found'></NoData>
                  }

                </div>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
      <ModalPopup
        showModal={showCreateMilestone}
        onHide={() => setShowCreateMilestone(false)}
        className='createMilestone'
        closeIcon={true}
      >
        <CreateMilestoneForm onHide={() => setShowCreateMilestone(false)}></CreateMilestoneForm>
      </ModalPopup>
      <ModalPopup
        showModal={showRaiseDispute}
        onHide={() => setShowRaiseDispute(false)}
        className='raiseMilestone'
        closeIcon={true}
      >
        <RaiseDisputeForm onHide={() => setShowRaiseDispute(false)}></RaiseDisputeForm>
      </ModalPopup>
      <ModalPopup
        showModal={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        className='cancelJob'
        closeIcon={true}
      >
        <AlertModal title='Alert !' innerTxt='Are you sure you want to cancel the job?' onHide={() => setShowCancelModal(false)}></AlertModal>
      </ModalPopup>
      <ModalPopup
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className='deleteModal'
        closeIcon={true}
      >
        <AlertModal title='Alert !' innerTxt='Are you sure, you want to delete the milestone?'
          titleConfirm='Yes, Delete'
          titleCancel='No, Cancel'
          onHide={() => setShowDeleteModal(false)}>
        </AlertModal>
      </ModalPopup>
      <ModalPopup
        showModal={showActionModal}
        onHide={() => setShowActionModal(false)}
        className='actionModal '
        closeIcon={true}
      >
        <ConfirmModal title='Has the work been completed?'
          titleConfirm='Request Transaction'
          onHide={() => setShowActionModal(false)}>
        </ConfirmModal>
      </ModalPopup>
      <ModalPopup
        showModal={showMilestoneHistoryModal}
        onHide={() => setShowMilestoneHistoryModal(false)}
        className='MilestoneAmountModal'
        closeIcon={true}
      >
        <MilestoneHistory></MilestoneHistory>
      </ModalPopup>
      <ModalPopup
        showModal={showRejectCommentModal}
        onHide={() => setShowRejectCommentModal(false)}
        className='RejectionCommentsModal'
        closeIcon={true}
      >
        <RejectionComments></RejectionComments>
      </ModalPopup>
      <ModalPopup
        showModal={showModificationModal}
        onHide={() => setShowModificationModal(false)}
        className='ModificationModal'
        closeIcon={true}
      >
        <MilestoneModification></MilestoneModification>
      </ModalPopup>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    jobDetails: state.job.userDetails
  }
};

const mapDispatchToProps = {
  hideLoader, showToast, showLoader, getOneuserDetails
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobDetails));



