import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import { withRouter, useHistory } from 'react-router-dom';
import FilterForm from '../Form/FilterForm';
import Label from '../../../../components/UI/Label/Label';
import Status from '../../../../components/Status/Status';
import { hideLoader, showLoader, showToast } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import FilterSorting from '../../DisputeManagement/Form/FilterSorting';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
// import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import './JobListing.scss';
// import JobInvitationForm from '../Form/JobInvitationForm';
import { getCustomer, getOneuserDetails } from '../../../../state/ducks/Job/actions';
import { isCheckValueAndSetParams } from '../../../Client/PaymentManagement/PaymentListing/PaymentListing';
import Constant from '../../../../util/constant';
import NoData from '../../../../components/NoData/NoData';
import PaymentHistory from '../../../Client/PaymentManagement/Form/PaymentHistory';

const sortingData = [
  {
    id: "1",
    jobDetail: 'Job details'
  },
  {
    id: "2",
    jobDetail: 'Milestoone details'
  },
  {
    id: "3",
    jobDetail: 'Completion date'
  },
]


let TempuserListing = []
function JobListing(props) {
  const scrollBar = useRef();

  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)
  const [tableHeadingHeight, setTableHeadingHeight] = useState(0)
  let [showSortDropdown, setShowSortDropdown] = useState(false)
  let [showFilterDropdown, setShowFilterDropdown] = useState(false)
  // let [showStaffModal, setShowStaffModal] = useState(false)
  const [UserListingData, setUserListing] = useState([])
  const [jobStatus, setJobStatus] = useState()
  const [minimum, setMinimum] = useState("")
  const [maximum, setMaximum] = useState("")
  const [feesMinimum, setfeesMinimum] = useState("")
  const [feesMaximum, setfeesMaximum] = useState("")
  const [jobSearch, setJobSearch] = useState("")
  const [sortBy, setSortBy] = useState()
  const [sort, setSort] = useState(false)
  const [page, setPage] = useState(1)
  const [isJobfilter, setisJobfilter] = useState(false)
  const [timer, setTimer] = useState()
  const [userID, setUserID] = useState()
  const [jobId, setJobId] = useState('')
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)


  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setTitleHeight(document.getElementsByClassName('titleText')[0].offsetHeight);
    setSearchHeight(document.getElementsByClassName('searchFilter')[0].offsetHeight);
    setTableHeadingHeight(document.getElementsByClassName('Table-header')[0].offsetHeight);

  })
  const history = useHistory();
  const routeChange = () => {
    let path = `jobs/create`;
    history.push(path);
  }
  const getUserListing = () => {
    let link
    if (sortBy && sortBy.by === "asc") {
      link = `job/get?page=${page}&limit=${13}${isCheckValueAndSetParams('&adminfeesMin=', feesMinimum)}${isCheckValueAndSetParams('&adminfeesMax=', feesMaximum)}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', jobSearch)}${isCheckValueAndSetParams('&status=', jobStatus)}`

    } else if (sortBy && sortBy.by === "desc") {
      link = `job/get?limit=${10}&page=${page}${isCheckValueAndSetParams('&adminfeesMin=', feesMinimum)}${isCheckValueAndSetParams('&adminfeesMax=', feesMaximum)}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', jobSearch)}${isCheckValueAndSetParams('&status=', jobStatus)}`

    } else {
      link = `job/get?page=${page}&limit=${10}${isCheckValueAndSetParams('&adminfeesMin=', feesMinimum)}${isCheckValueAndSetParams('&adminfeesMax=', feesMaximum)}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}${isCheckValueAndSetParams('&search=', jobSearch)}${isCheckValueAndSetParams('&status=', jobStatus)}`

    }
    props.getCustomer(link).then((response) => {
      let res = response.data || response
      if (page === 1 && jobSearch !== "") {
        TempuserListing = [...res.payload.jobDetail]
        setUserListing(TempuserListing)

      } else if (page === 1 && isJobfilter) {
        TempuserListing = [...res.payload.jobDetail]
        setUserListing(TempuserListing)
      } else if (page === 1 && sortBy) {
        TempuserListing = [...res.payload.jobDetail]
        setUserListing(TempuserListing)
      } else {
        if (page === 1) {
          TempuserListing = res.payload.jobDetail
          setUserListing(TempuserListing)
        } else {
          TempuserListing.push(...res.payload.jobDetail)
          setUserListing(TempuserListing.concat(res.payload.jobDetail))
        }
        // setUserListing(TempuserListing)

      }

    })
  }
  const filterOperation = (filterby) => {
    if (sort && filterby === sortBy.filter) {
      setPage(1)
      setSortBy({ filter: filterby, by: "asc" });
      setSort(false);
    } else {
      setPage(1)

      setSortBy({ filter: filterby, by: "desc" });
      setSort(true);
    }
  };
  const routeDetails = (id, status) => {
    let path = `jobs/details`;
    window.localStorage.setItem("JobId", id)
    window.localStorage.setItem("jobStatus", status)

    history.push(path);
    props.showLoader()

    props.getOneuserDetails(id).then(() => props.hideLoader())
  };
  useEffect(() => {
    getUserListing()
  }, [jobSearch, isJobfilter, sort, sortBy, jobStatus, page, minimum, maximum, feesMinimum, feesMaximum])

  return (
    <div style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className='jobs_listing_page'>
        <div className='jobInnerSection'>
          <Label title='Job Management'></Label>
          <div className='searchFilter'>
            <div className='searchSection'>
              <SearchBox placeholder='Title, Client Details, Customer Details'
                onClear={() => {
                  setPage(1)
                  setJobSearch("")
                  TempuserListing = []
                }}
                onSearch={(value) => {
                  clearTimeout(timer);
                  let temp = setTimeout(function () {

                    setJobSearch(value)

                    setPage(1)
                  }, 500);
                  setTimer(temp)
                }}
              ></SearchBox>
              <div className='filterBtn'>
                <button className='filterIcon' onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                  <i className='icon-filter'></i>
                  {isJobfilter && <span className="dot_filter"></span>}
                </button>
                {showFilterDropdown &&
                  <>
                    <div className='overLay' onClick={() => setShowFilterDropdown(false)} ></div>
                    <FilterForm
                      max={maximum}
                      min={minimum}
                      feesmax={feesMaximum}
                      feesmin={feesMinimum}
                      jobstatus={jobStatus}
                      setminimum={(min) => setMinimum(min)}
                      setmaximum={(max) => setMaximum(max)}
                      setfeesminimum={(min) => setfeesMinimum(min)}
                      setfeesmaximum={(max) => setfeesMaximum(max)}
                      setstatus={(status) => setJobStatus(status)}
                      setisjobFilter={(flag) => { setisJobfilter(flag) }}
                      close={() => setShowFilterDropdown(false)}
                      setpage={(num) => setPage(num)}
                    ></FilterForm>
                  </>
                }
              </div>
              <div className='sortingIcon'>
                <i className='icon-sort' onClick={() => setShowSortDropdown(!showSortDropdown)}></i>
                {showSortDropdown &&
                  <>
                    <div className='overLay' onClick={() => setShowSortDropdown(false)} ></div>
                    <FilterSorting >

                      {
                        sortingData.map((sortingData) => {
                          return <li className='headingItem'>{sortingData.jobDetail}</li>

                        })
                      }
                    </FilterSorting>
                  </>
                }
              </div>
            </div>
            {/* <div className='createJob'>
              <CustomButton type="button" title="Job Invitation" onClick={() => setShowStaffModal(!showStaffModal)} />
            </div> */}
          </div>
          <div className="table_list_Main">
            <div className="Table-row Table-header">
              <div className="table-row-inline">
                <div className="Table-row-item">Job Title <button className="icon-sort" onClick={() => filterOperation("name")}></button></div>
                <div className="Table-row-item">Created by <button className="icon-sort" onClick={() => filterOperation("createdBy")}></button></div>
                <div className="Table-row-item">Job For <button className="icon-sort" onClick={() => filterOperation("jobFor")}></button></div>
                {/* <div className="Table-row-item">Business Category <button className="icon-sort"></button></div> */}
                <div className="Table-row-item">Job Amount <button className="icon-sort" onClick={() => filterOperation("totalAmount")}></button></div>
                <div className="Table-row-item">Admin Fees <button className="icon-sort" onClick={() => filterOperation("serviceFee")}></button></div>
                <div className="Table-row-item">Job Status </div>
                <div className="Table-row-item">Activity </div>
              </div>
            </div>
            <Scrollbars className="list_data"
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = scrollBar.current.getValues();

                if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                  setPage(page + 1);
                }

              }}
              ref={scrollBar}
              style={{ height: (dimensions.height - headerHeight - titleHeight - searchHeight - tableHeadingHeight - 15) + 'px' }}>

              {
                UserListingData && UserListingData.length > 0 ? UserListingData.map((listing, i) => {
                  return (
                    <div className="Table-row" key={i}>
                      <div className="table-row-inline cursurpointer" onClick={() => routeDetails(listing._id, Constant.JOBSTATUSCUSTOMER[`${listing.status}`])}>
                        <div className="Table-row-item" data-header="Header1">{listing.name}</div>
                        <div className="Table-row-item" data-header="Header2">{listing.createdBy}</div>
                        <div className="Table-row-item" data-header="Header3">{listing.jobFor}</div>
                        {/* <div className="Table-row-item" data-header="Header4">{listing.businessCategory}</div> */}
                        <div className="Table-row-item" data-header="Header5">£ {listing.totalAmount && listing.totalAmount.toFixed(2)}</div>
                        <div className="Table-row-item" data-header="Header6">£ {listing.serviceFee && listing.serviceFee.toFixed(2)}</div>
                        <div className="Table-row-item" data-header="Header7">
                          {/* {listing.statusFlag ? <Status className={listing.statusFlag} title={listing.status}></Status> : listing.status} */}
                          {
                            <Status
                              className={Constant.JOBSTATUSCLASS[`${listing.status}`]}
                              title={Constant.JOBSTATUSADMIN[`${listing.status}`]}

                            ></Status>
                          }
                        </div>
                        <div className="Table-row-item" data-header="Header8">{listing.status === "REJECTED" ?
                          <i onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setJobId(listing.rejectHistory)
                            setShowPaymentHistory(true)
                          }} className="icon-info cancel"></i> :
                          <i className='icon-check'></i>}</div>
                      </div>
                    </div>
                  )
                }) : <NoData title="No record found" />
              }
            </Scrollbars>

          </div>
        </div>
      </div>
      {/* <ModalPopup
        showModal={showStaffModal}
        onHide={() => setShowStaffModal(false)}
        className='job_invitation'
        closeIcon={true}
      >
        <JobInvitationForm />
      </ModalPopup> */}
      <ModalPopup
        showModal={showPaymentHistory}
        onHide={() => setShowPaymentHistory(false)}
        className='paymentHistory'
        closeIcon={true}
      >
        <PaymentHistory jobId={jobId}></PaymentHistory>
      </ModalPopup>
      {/* <ModalPopup
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
      </ModalPopup> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getCustomerList: state.job && state.job.getCustomerReducer && state.job.getCustomerReducer.jobDetail || []
  }
};

const mapDispatchToProps = {
  showToast, getCustomer, getOneuserDetails, showLoader, hideLoader
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobListing));
