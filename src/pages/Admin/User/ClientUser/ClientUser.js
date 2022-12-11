import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import { withRouter, useHistory } from 'react-router-dom';
import FilterForm from '../Form/FilterForm';
import John from '../../../../assets/images/john.svg';
import Jerom from '../../../../assets/images/jerom.svg';
import Floyd from '../../../../assets/images/floyd.svg';
import Ralph from '../../../../assets/images/ralph.svg';
import Bessie from '../../../../assets/images/bessie.svg';
import Label from '../../../../components/UI/Label/Label';
import Darlene from '../../../../assets/images/darlene.svg';
import Darrell from '../../../../assets/images/darrell.svg';
import Courtney from '../../../../assets/images/courtney.svg';
import { showToast } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import FilterSorting from '../../DisputeManagement/Form/FilterSorting';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import AlertModal from '../../../../components/AlertModal/AlertModal';
import './ClientUser.scss';
import ToggleButtonCustom from '../../../../components/UI/ToggleButton/ToggleButton';
import UpateCommissionRate from '../Form/UpateCommissionRate';
import { getCustomer, UpdateCustomerStatus } from '../../../../state/ducks/Job/actions';
import { isCheckValueAndSetParams } from '../../../Client/PaymentManagement/PaymentListing/PaymentListing.js';
import { get } from "lodash";
import NoData from '../../../../components/NoData/NoData';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import JobInvitationForm from '../Form/JobInvitationForm';

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
function ClientUser(props) {
  const scrollBar = useRef();
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)
  const [tableHeadingHeight, setTableHeadingHeight] = useState(0)
  let [showSortDropdown, setShowSortDropdown] = useState(false)
  let [showUpateCommissionModal, setShowUpateCommissionModal] = useState(false)
  let [showDeleteModal, setShowDeleteModal] = useState(false)
  let [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [minimum, setMinimum] = useState(undefined)
  const [maximum, setMaximum] = useState(undefined)
  const [userSearch, setUserSearch] = useState("")
  const [sortBy, setSortBy] = useState()
  const [sort, setSort] = useState(false)
  const [page, setPage] = useState(1)
  const [isUserfilter, setisUserfilter] = useState(false)
  const [timer, setTimer] = useState()
  const [userID, setUserID] = useState()
  const [UserListingData, setUserListing] = useState([])
  const [userStatus, setUserStatus] = useState([])
  const [showuserModal, setshowuserModal] = useState(false)
  const [option, setOption] = useState();
  const [form, setForgotForm] = useState()
  let [showStaffModal, setShowStaffModal] = useState(false)
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setTitleHeight(document.getElementsByClassName('titleText')[0].offsetHeight);
    setSearchHeight(document.getElementsByClassName('searchFilter')[0].offsetHeight);
    setTableHeadingHeight(document.getElementsByClassName('Table-header')[0].offsetHeight);

  })
  const getUserListing = () => {
    let link
    if (sortBy && sortBy.by === "asc") {
      link = `customer/get?page=${page}&limit=${13}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', userSearch)}`

    } else if (sortBy && sortBy.by === "desc") {
      link = `customer/get?limit=${10}&page=${page}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', userSearch)}`

    } else {
      link = `customer/get?page=${page}&limit=${10}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}${isCheckValueAndSetParams('&search=', userSearch)}`

    }
    props.getCustomer(link).then((response) => {
      let res = response.data || response

      if (page === 1 && userSearch !== "") {
        TempuserListing = [...res.payload.customerDetails]
        setUserListing(TempuserListing)

      } else if (page === 1 && isUserfilter) {
        TempuserListing = [...res.payload.customerDetails]
        setUserListing(TempuserListing)
      } else if (page === 1 && sortBy) {
        TempuserListing = [...res.payload.customerDetails]
        setUserListing(TempuserListing)
      } else {
        if (page === 1) {
          TempuserListing = res.payload.customerDetails
          setUserListing(TempuserListing)
        } else {
          TempuserListing.push(...res.payload.customerDetails)
          setUserListing(TempuserListing.concat(res.payload.customerDetails))
        }
        // setUserListing(TempuserListing)

      }

    })
  }
  const UpdateStatus = (id, status) => {
    let params = {
      isEnable: status
    }
    props.UpdateCustomerStatus(id, params).then((res) => {
      setUserStatus(status)

      setShowDeleteModal(false)
      setTimeout(() => {
        props.showToast({ message: res.message, type: 'success' })
      },
        1000)
      return true
    }).catch(() => {
      return false
    })
  }
  const history = useHistory();
  const routeChange = () => {
    let path = `jobs/create`;
    history.push(path);
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
  // useEffect(() => {
  //   getUserListing()
  // }, [])
  useEffect(() => {
    getUserListing()
  }, [userSearch, isUserfilter, sort, sortBy, page, minimum, maximum])
  return (
    <div style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className='client_user_page'>
        <div className='jobInnerSection'>
          <Label title='User Management'></Label>
          <div className='searchFilter'>
            <div className='searchSection'>
              <SearchBox placeholder='Client Name, Email address, Contact Number'
                onClear={() => {
                  setPage(1)
                  setUserSearch("")
                  TempuserListing = []
                }}
                onSearch={(value) => {
                  clearTimeout(timer);
                  let temp = setTimeout(function () {

                    setUserSearch(value)

                    setPage(1)
                  }, 500);
                  setTimer(temp)
                }}
              ></SearchBox>
              <div className='filterBtn'>
                <button className='filterIcon' onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                  <i className='icon-filter'></i>
                  {isUserfilter && <span className="dot_filter"></span>}
                </button>
                {showFilterDropdown &&
                  <>
                    <div className='overLay' onClick={() => setShowFilterDropdown(false)} ></div>
                    <FilterForm
                      max={maximum}
                      min={minimum}
                      setminimum={(min) => setMinimum(min)}
                      setmaximum={(max) => setMaximum(max)}
                      isFilter={(flag) => { setisUserfilter(flag) }}
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

            <div className='createJob'>
              <CustomButton type="button" title="User Invitation" onClick={() => setShowStaffModal(!showStaffModal)} />
            </div>
          </div>
          <div className="table_list_Main">
            <div className="Table-row Table-header">
              <div className="table-row-inline">
                <div className="Table-row-item">Client Details <button className="icon-sort" onClick={() => filterOperation("fullName")}></button></div>
                <div className="Table-row-item">Company Name <button className="icon-sort" onClick={() => filterOperation("contactNumber")}></button></div>
                <div className="Table-row-item">Ongoing Jobs <button className="icon-sort" onClick={() => filterOperation("ongoingJob")}></button></div>
                <div className="Table-row-item">Total Jobs <button className="icon-sort" onClick={() => filterOperation("totalJobs")}></button></div>
                <div className="Table-row-item">Completed Jobs <button className="icon-sort" onClick={() => filterOperation("CompltedJob")}></button></div>
                <div className="Table-row-item">Jobs in Dispute <button className="icon-sort" onClick={() => filterOperation("DisputeJob")}></button></div>
                <div className="Table-row-item">Total Income <button className="icon-sort" onClick={() => filterOperation("Amount")}></button></div>
                <div className="Table-row-item">% of commission
                  {/* <button className="icon-sort"></button> */}
                </div>
              </div>
            </div>
            <Scrollbars
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = scrollBar.current.getValues();

                if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                  setPage(page + 1);
                }

              }}
              ref={scrollBar}
              style={{ height: (dimensions.height - headerHeight - titleHeight - searchHeight - tableHeadingHeight - 35) + 'px' }}>

              {/* {
                listing.map((listing) => {
                  return (
                    <div className="Table-row">
                      <div className="table-row-inline cursurpointer">
                        <div class="Table-row-item" data-header="Header1">
                          <div className="imageCricle">
                            <img width="40" height="40" src={listing.profileImage} />
                          </div>
                          <div className="right_part">
                            <div className="title">{listing.fullName}</div>
                            <div className="company_name">{listing.companyName}</div>
                            <div className="email_id">{listing.emailId}</div>
                          </div>
                        </div>
                        <div class="Table-row-item" data-header="Header2">{listing.contactNumber}</div>
                        <div class="Table-row-item" data-header="Header4">{listing.ongoingJobs}</div>
                        <div class="Table-row-item" data-header="Header5">{listing.totalJobs}</div>
                        <div class="Table-row-item" data-header="Header6">{listing.completedJobs}</div>
                        <div class="Table-row-item" data-header="Header7">{listing.jobsDispute}</div>
                        <div class="Table-row-item" data-header="Header8">{listing.totalIncome}</div>
                        <div class="Table-row-item" data-header="Header9">
                          <div className="icon_row">
                            <button onClick={() => setShowUpateCommissionModal(!showUpateCommissionModal)} className="icon-Union"></button>
                            <ToggleButtonCustom />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                
              } */}
              {UserListingData === [] || UserListingData && UserListingData.length < 1 && <NoData title="No record found"></NoData>}

              {
                UserListingData && UserListingData.map((listing, i) => {
                  return (
                    <div className="Table-row" key={i}>
                      <div className="table-row-inline cursurpointer">
                        <div className="Table-row-item" data-header="Header1">
                          <div className="imageCricle">
                            <img width="40" height="40" src={`${listing.profilePicURL}/w_40,h_40,c_thumb,r_max/${listing.profilePic}`} />
                          </div>
                          <div className="right_part">
                            <div className="title">{get(listing, 'fullName', "-")}</div>
                            <div className="company_name">{get(listing, 'contactNumber', "-")}</div>
                            <div className="email_id">{get(listing, 'email', "-")}</div>
                          </div>
                        </div>
                        <div className="Table-row-item" data-header="Header2">{get(listing, 'companyName', "-")}</div>
                        <div className="Table-row-item" data-header="Header4">{get(listing, 'ongoingJob', "0")}</div>
                        <div className="Table-row-item" data-header="Header5">{get(listing, 'totalJobs', "0")}</div>
                        <div className="Table-row-item" data-header="Header6">{get(listing, 'CompltedJob', "0")}</div>
                        <div className="Table-row-item" data-header="Header7">{get(listing, 'DisputeJob', "0")}</div>
                        <div className="Table-row-item" data-header="Header8">{get(listing, 'Amount', "0")}</div>
                        <div className="Table-row-item" data-header="Header9">
                          <div className="icon_row">
                            <button onClick={() => setShowUpateCommissionModal(!showUpateCommissionModal)} className="icon-Union"></button>
                            <ToggleButtonCustom
                              checked={listing.isEnable}
                              userid={listing._id}
                              setUserID={(id) => setUserID(id)}
                              setStatus={(status) => setUserStatus(status)}
                              userStatus={userStatus}
                              userID={userID}
                              setShowDeleteModal={() => setShowDeleteModal(true)}
                              UpdateStatus={(id, status) => UpdateStatus(id, status)}
                              tabletype="user-management"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </Scrollbars>

          </div>
        </div>
      </div>
      <ModalPopup
        showModal={showUpateCommissionModal}
        onHide={() => setShowUpateCommissionModal(false)}
        className='update_commission_modal'
        closeIcon={false}
      >
        <UpateCommissionRate />
      </ModalPopup>
      <ModalPopup
        showModal={showDeleteModal}
        onHide={() => { setShowDeleteModal(false) }}
        className='deleteModal'
        closeIcon={true}
      >
        <AlertModal
          title='Alert !' innerTxt={`Are you sure, you want to ${userStatus ? "enable" : "disable"}`}
          titleConfirm={`Yes ${userStatus ? "enable" : "disable"}`}
          titleCancel='No, Cancel'
          onHide={() => setShowDeleteModal(false)}
          onConfirmClick={() => UpdateStatus(userID, !userStatus)}
        >
        </AlertModal>
      </ModalPopup>
      <ModalPopup
        showModal={showStaffModal}
        onHide={() => setShowStaffModal(false)}
        className='job_invitation'
        closeIcon={true}
      >
        <JobInvitationForm isRefresh={() => setShowStaffModal(false)} />
      </ModalPopup>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {
  showToast, getCustomer, UpdateCustomerStatus
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientUser));
