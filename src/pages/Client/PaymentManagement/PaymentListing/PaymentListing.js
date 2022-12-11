import React, { useState, useEffect, useRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import Label from "../../../../components/UI/Label/Label";
import SearchBox from "../../../../components/UI/SearchBox/SearchBox";
import CustomButton from "../../../../components/UI/CustomButton/CustomButton";
import TableHeader from "../../../../components/TableHeader/TableHeader";
import TableListing from "../../../../components/TableListing/TableListing";
import Scrollbars from "react-custom-scrollbars";
import Status from "../../../../components/Status/Status";
import NoData from "../../../../components/NoData/NoData";
import FilterForm from "../Form/FilterForm";
import ModalPopup from "../../../../components/ModalPopup/ModalPopup";
// import RaiseTicketForm from '../Form/RaiseTicketForm';
import FilterSorting from "../../DisputeManagement/Form/FilterSorting";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import "./PaymentListing.scss";
import CreateTransactionForm from "../../../../components/CreateTransaction/CreateTransactionForm";
import FilterFormCustomer from "../Form/FilterFormCustomer";
import Constant from "../../../../util/constant";
import { getInvitedJob, getJob, getOneuserDetails, acceptJob } from "../../../../state/ducks/Job/actions";
import { connect } from "react-redux";
import { showToast, hideLoader, showLoader } from "../../../../state/ducks/utils/actions";
import { get } from "lodash";
import PaymentRejectionNote from '../Form/PaymentRejectionNote'
import PaymentHistory from '../Form/PaymentHistory'
import { getItem, setItem } from "../../../../services/localstorage.service";
const sortingData = [
  {
    id: "1",
    jobDetail: "Job details",
  },
  {
    id: "2",
    jobDetail: "Milestone details",
  },
  {
    id: "3",
    jobDetail: "Completion date",
  },
];
const headerData = [
  {
    title: "Transaction Title",
    key: "payment-title",
    sortKey: "name"
  },
  {
    title: "Transaction For",
    key: "payment-for",
    sortKey: "customerName"
  },
  {
    title: "Transaction Amount",
    key: "payment-amount",
    sortKey: "amount"
  },
  {
    title: "Admin Fees",
    key: "admin-fees",
    sortKey: "serviceFee"

  },
  {
    title: "Total Interim Transaction",
    key: "total-interim-payment",
    sortKey: "numberOfpayment"

  },
  {
    title: "Transaction Status",
    key: "",
    sortKey: "status"

  },
  {
    title: "Activity",
    key: "",
    sortKey: "name"
  },
];


const headingCustomerData = [
  {
    title: "Transaction Title",
    key: "payment-title",
    sortKey: "name"
  },
  {
    title: "Created By",
    key: "created-by",
    sortKey: "customerName"
  },
  {
    title: "Business Name",
    key: "business-name",
    sortKey: "business-name"
  },
  {
    title: "Transaction Amount",
    key: "payment-amount",
    sortKey: "amount"
  },
  {
    title: "Total Interim Transaction",
    key: "total-interim-payment",
    sortKey: "serviceFee"
  },
  {
    title: "Transaction Status",
    key: "",
    ssortKey: "status"
  },
  {
    title: "Activity",
    key: "",
    sortKey: "name"
  },
];


var createdJobListing = []
var InvitedJobListing = []

export function isCheckValueAndSetParams(params, value) {
  if (typeof (value) === "undefined" || value === null || value === "" || value === "NaN") {
    return ''
  }
  return params + value
}
const PaymentListing = (props) => {
  const history = useHistory();
  const scrollBarForInvitedOnly = useRef();
  const scrollBarForCreatedOnly = useRef();
  const scrollBarForCreated = useRef();
  const scrollBarForInvited = useRef();

  let [showTicketModal, setShowTicketModal] = useState(false);
  let [showFilterDropdown, setShowFilterDropdown] = useState(false);
  let [showPaymentRejectionNote, setShowPaymentRejectionNote] = useState(false)

  // let [showIsNoData, setShowIsNoData] = useState(false);
  let [showSortDropdown, setShowSortDropdown] = useState(false);
  const dimensions = useWindowDimension();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const [formtitleHeight, setFormTitleHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [headingListHeight, setHeadingListHeight] = useState(0);
  const [tabTitleHeight, setTabTitleHeight] = useState(0);
  const [addInterimPayments, setAddInterimPayments] = useState(false);
  const [minimum, setMinimum] = useState()
  const [maximum, setMaximum] = useState()
  const [createdStatus, setCreatedStatus] = useState("")
  const [InvitedStatus, setInvitedStatus] = useState("")
  const [CreatedSearch, setCreatedSearch] = useState("")
  const [InvitedSearch, setInvitedSearch] = useState("")
  const [sortBy, setSortBy] = useState()
  const [sort, setSort] = useState(false)
  const [page, setPage] = useState(1)
  const [isCreatedfilter, setisCreatedfilter] = useState(false)
  const [isInvitedfilter, setisInvitedfilter] = useState(false)
  const [timer, setTimer] = useState()
  const [Invitedpage, setInvitedpage] = useState(1)
  const [joblistingData, setjoblistingData] = useState([])
  const [InvitedjoblistingData, setInvitedjoblistingData] = useState([])
  const [isInvitedapicall, setisInvitedapicall] = useState(false)
  const [isCreatedapicall, setisCreatedapicall] = useState(false)
  const [secondTabSearchHeight, setSecondTabSearchHeight] = useState(0);
  const [secondTabHeaderHeight, setSecondTabHeader] = useState(0);
  const [activetabs, setActiveTabs] = useState("Client")
  const [jobId, setJobId] = useState('')
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)

  useEffect(() => {
    setHeaderHeight(
      document.getElementsByClassName("headerClient")[0].offsetHeight
    );
    setTitleHeight(
      document.getElementsByClassName("titleClass")[0].offsetHeight
    );
    setFormTitleHeight(document.getElementsByClassName("form-title")[0].offsetHeight);
    setSearchHeight(
      document.getElementsByClassName("searchFilter")[0].offsetHeight
    );
    // setSecondTabSearchHeight(
    //   document.getElementsByClassName("secondTabSearch")[0].offsetHeight
    // );
    if (props.totalJob >= 1 && props.invitedTotalJob >= 1) {
      setTabTitleHeight(
        document.getElementsByClassName("nav-tabs")[0].offsetHeight
      );
    }
    setHeadingListHeight(document.getElementsByClassName('header')[0].offsetHeight);
    if (props.invitedTotalJob >= 1) {
      setSecondTabSearchHeight(
        document.getElementsByClassName("secondTabSearch")[0].offsetHeight
      );
      setSecondTabHeader(document.getElementsByClassName('secondTabHeader')[0].offsetHeight);
    }
    // if (role === Constant.ROLE.CUSTOMER) {
    //   setSearchHeight(
    //     document.getElementsByClassName("searchFilter")[0].offsetHeight
    //   );
    //   setTabTitleHeight(
    //     document.getElementsByClassName("nav-tabs")[0].offsetHeight
    //   );
    // }
  });

  console.log('Height : ', headerHeight, titleHeight, formtitleHeight, searchHeight, headingListHeight, tabTitleHeight)

  const getJobListing = async () => {
    let link
    if (sortBy && sortBy.by === "asc") {
      link = `job/get?page=${page}&limit=${10}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}${isCheckValueAndSetParams('&status=', createdStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', CreatedSearch)}`
    } else if (sortBy && sortBy.by === "desc") {
      link = `job/get?page=${page}&limit=${10}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}${isCheckValueAndSetParams('&status=', createdStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', CreatedSearch)}`
    } else {
      link = `job/get?page=${page}&limit=${10}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}${isCheckValueAndSetParams('&status=', createdStatus)}${isCheckValueAndSetParams('&search=', CreatedSearch)}`
    }
    props.getJob(link).then((response) => {
      let res = response.data || response
      if (page === 1 && CreatedSearch !== "") {
        createdJobListing = [...res.payload.jobDetail]
        setjoblistingData(createdJobListing)
      } else if (page === 1 && isCreatedfilter) {
        createdJobListing = [...res.payload.jobDetail]
        setjoblistingData(createdJobListing)
      } else if (page === 1 && sortBy) {
        createdJobListing = [...res.payload.jobDetail]
        setjoblistingData(createdJobListing)
      } else {
        if (page === 1) {
          createdJobListing = res.payload.jobDetail
          setjoblistingData(createdJobListing)
        } else {
          setjoblistingData(joblistingData.concat(res.payload.jobDetail))
        }
      }
    })
  }
  const getInvitedJobListing = async () => {
    let link
    if (sortBy && sortBy.by === "asc") {
      link = `job/getInvited?page=${Invitedpage}&limit=${10}${isCheckValueAndSetParams('&status=', InvitedStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', InvitedSearch)}`
    } else if (sortBy && sortBy.by === "desc") {
      link = `job/getInvited?page=${Invitedpage}&limit=${10}${isCheckValueAndSetParams('&status=', InvitedStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', InvitedSearch)}`
    } else {
      link = `job/getInvited?page=${Invitedpage}&limit=${10}${isCheckValueAndSetParams('&status=', InvitedStatus)}${isCheckValueAndSetParams('&search=', InvitedSearch)}`
    }

    props.getInvitedJob(link).then((response) => {
      let res = response.data || response
      if (Invitedpage === 1 && CreatedSearch !== "") {
        setInvitedjoblistingData(res.payload.jobDetail)
      } else if (Invitedpage === 1 && isCreatedfilter) {
        setInvitedjoblistingData(res.payload.jobDetail)
      } else if (Invitedpage === 1 && sortBy) {
        setInvitedjoblistingData(res.payload.jobDetail)
      } else if (Invitedpage === 1) {
        setInvitedjoblistingData(res.payload.jobDetail)
      } else {
        setInvitedjoblistingData(InvitedjoblistingData.concat(res.payload.jobDetail))
      }
    })
  }
  useEffect(() => {
    setActiveTabs(getItem("activeTab"))
  }, [])
  useEffect(() => {
    { getJobListing() }
  }, [page, isCreatedfilter, CreatedSearch, isCreatedapicall])
  useEffect(() => {
    { getInvitedJobListing() }
  }, [Invitedpage, isInvitedfilter, InvitedSearch, isInvitedapicall, InvitedStatus])
  useEffect(() => {
    props.totalJob >= 1 && props.invitedTotalJob >= 1 ? setActiveTabs(getItem("activeTab") || "Client") : props.invitedTotalJob >= 1 ? setActiveTabs(getItem("activeTab") || "Customer") : setActiveTabs(getItem("activeTab") || "Client")
  }, [props.invitedTotalJob, props.totalJob])
  const filterOperation = (filterby, to = "created") => {
    if (sort && filterby === sortBy.filter) {
      setSortBy({ filter: filterby, by: "asc" });
      setSort(false);
      if (to === "invited") {
        setInvitedpage(1)
        setisInvitedapicall(!isInvitedapicall)
      } else {
        setPage(1)
        setisCreatedapicall(!isCreatedapicall)
      }
    } else {
      setSortBy({ filter: filterby, by: "desc" });
      setSort(true);
      if (to === "invited") {
        setInvitedpage(1)
        setisInvitedapicall(!isInvitedapicall)
      } else {
        setPage(1)
        setisCreatedapicall(!isCreatedapicall)
      }
    }
  };
  const routeDetails = (id, type) => {
    let path = `payments/details`;
    window.localStorage.setItem("JobId", id)
    window.localStorage.setItem("roletype", type)
    history.push(path);
    setActiveTabs(activetabs)
    props.showLoader()
    props.getOneuserDetails(id).then(() => props.hideLoader())
  };
  const acceptJob = async (jobId, e) => {
    e.stopPropagation();
    e.preventDefault()
    try {
      props.showLoader()
      props.acceptJob(jobId).then((res) => {
        props.hideLoader()
        props.showToast({
          message: res.message,
          type: "success",
        });
        getInvitedJobListing()
      });
    } catch (error) {
      props.hideLoader()
      props.showToast({
        message: get(error, "response.data.message", "somthing want wrong!!!"),
        type: "error",
      });
    }
  }
  const rejectJob = (e, jobId) => {
    e.stopPropagation();
    e.preventDefault();
    setJobId(jobId)
    setShowPaymentRejectionNote(true)
  }
  return (
    <div
      className="paymentListingMain"
      style={{
        height: dimensions.height - headerHeight + "px",
        marginTop: headerHeight + "px",
      }}
    >
      <div className="paymentInner">
        <div className={props.totalJob >= 1 && props.invitedTotalJob >= 1 ? "titleClass" : "titleClass paddingtab_remove"}>
          <Label title="Transaction Management"></Label>
          <div className="ticketRaise">
            <CustomButton
              type="button"
              title="Create Transaction"
              onClick={() => setShowTicketModal(!showTicketModal)}
            />
          </div>
        </div>
        <Label
          className='form-title'
          title="This is where you can keep track of your transaction in real time. Click on the transaction title to get an update and more details. "
        />
        {props.totalJob >= 1 && props.invitedTotalJob >= 1 ? <div className="tableSection">
          {/* <div className={activetabs === "Client" ? "tabMain tabborder" : "tabMain"}> */}
          <div className="tabMain">
            <Tabs activeKey={activetabs} defaultActiveKey={activetabs} onSelect={(e) => { setActiveTabs(e); setItem('activeTab', e) }} id="login-tab">
              {
                // **************************** Client Invite Job Listing with tab Started  **********************************
                <Tab eventKey="Client" title="Transactions I have created">
                  <div className="searchFilter ">
                    <div className="searchSection">
                      <SearchBox placeholder="Transaction Title , Customer Details"
                        onClear={() => {
                          setPage(1)
                          setCreatedSearch("")
                          createdJobListing = []
                        }}
                        onSearch={(value) => {
                          clearTimeout(timer);
                          let temp = setTimeout(function () {

                            setCreatedSearch(value)

                            setPage(1)
                            // getJobListing()
                          }, 500);
                          setTimer(temp)
                        }}></SearchBox>
                      <div className="filterBtn">
                        <button
                          className="filterIcon"
                          onClick={() =>
                            setShowFilterDropdown(!showFilterDropdown)
                          }
                        >
                          <i className="icon-filter"></i>
                          {isCreatedfilter && <span className="dot_filter"></span>}
                        </button>
                        {showFilterDropdown && (
                          <>
                            <div
                              className="overLay"
                              onClick={() => setShowFilterDropdown(false)}
                            ></div>
                            <FilterForm
                              max={maximum}
                              min={minimum}
                              jobstatus={createdStatus}
                              minimum={(min) => setMinimum(min)}
                              maximum={(max) => setMaximum(max)}
                              status={(status) => setCreatedStatus(status)}
                              isCreated={(flag) => { setisCreatedfilter(flag) }}
                              close={() => setShowFilterDropdown(false)}
                              setpage={(num) => setPage(num)}
                              isCreatedapicall={isCreatedapicall}
                              setisCreatedapicall={(flag) => setisCreatedapicall(flag)}
                            ></FilterForm>
                          </>
                        )}
                      </div>
                      <div className="sortingIcon">
                        <i
                          className="icon-sort"
                          onClick={() => setShowSortDropdown(!showSortDropdown)}
                        ></i>
                        {showSortDropdown && (
                          <>
                            <div
                              className="overLay"
                              onClick={() => setShowSortDropdown(false)}
                            ></div>
                            <FilterSorting>
                              {sortingData.map((sortingData, i) => {
                                return (
                                  <li className="headingItem" key={i}>
                                    {sortingData.jobDetail}
                                  </li>
                                );
                              })}
                            </FilterSorting>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="header">
                    <TableHeader>
                      {headerData.map((header, i) => {
                        return (
                          <li
                            data-content="Payment Details"
                            className="headingItem"
                            key={i}
                          >
                            <div className="headerTitle" onClick={() => {
                              filterOperation(header.sortKey);
                            }}>
                              {header.title}{" "}
                              {header.key && <i className="icon-sort"></i>}
                            </div>
                          </li>
                        );
                      })}
                    </TableHeader>
                  </div>
                  <div className="listing">
                    <Scrollbars
                      className="listingScroll"
                      onScroll={(e) => {
                        const { scrollTop, scrollHeight, clientHeight } = scrollBarForCreated.current.getValues();

                        if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                          setPage(page + 1);
                        }

                      }}
                      ref={scrollBarForCreated}
                      style={{
                        height:
                          dimensions.height -
                          headerHeight -
                          titleHeight -
                          searchHeight -
                          headingListHeight -
                          formtitleHeight -
                          tabTitleHeight
                          - 15 + "px",
                      }}
                    >
                      {joblistingData.length == 0 && <NoData title="No record found"></NoData>}

                      {joblistingData && joblistingData.map((listing, index) => {

                        return (
                          <TableListing key={index} onClick={() => routeDetails(listing._id, 3)}>
                            <li className="headingItem">{listing.name}</li>
                            <li className="headingItem">{listing.jobFor}</li>
                            <li className="headingItem">
                              £ {listing.totalAmount && listing.totalAmount.toFixed(2)}
                            </li>
                            <li
                              data-content="Assigned to"
                              className="headingItem"
                            >
                              £ {listing.serviceFee && listing.serviceFee.toFixed(2)}
                            </li>
                            <li
                              data-content="Assigned to"
                              className="headingItem"
                            >
                              {listing.numberOfpayment}
                            </li>
                            <li data-content="Status" className="headingItem">
                              {/* {listing.status ? (
                                <Status
                                  className={listing.statusFlag}
                                  title={Constant.JOBSTATUS[`${listing.status}`]}
                                ></Status>
                              ) : ( */}
                              <Status
                                className={Constant.JOBSTATUSCLASS[`${listing.status}`]}
                                title={Constant.JOBSTATUSCLIENT[`${listing.status}`]}
                              ></Status>
                              {/* )} */}
                            </li>
                            <li data-content="Activity" className="headingItem">

                              {listing.status === Constant.JOBSTATUS.REJECTED && <i onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setJobId(listing.rejectHistory)
                                setShowPaymentHistory(true)
                              }} className="icon-info cancel"></i>}
                              {(listing.status === Constant.JOBSTATUS.WAITING_FUND_DEPOSITE || listing.status === Constant.JOBSTATUS.WAITING_ACCEPT) && <i className="icon-check"></i>}
                            </li>
                          </TableListing>);
                      })}
                    </Scrollbars>
                  </div>
                </Tab>
                // **************************** Cleint Invite Job Listing with tab Ended  **********************************
              }
              {
                // **************************** Customer Invite Job Listing with tab Started  **********************************
                <Tab eventKey="Customer" title="Transactions shared with me">
                  <div className="searchFilter secondTabSearch">
                    <div className="searchSection">
                      <SearchBox placeholder="Transaction Title , Customer Details, Business Name"
                        onClear={() => {
                          setInvitedpage(1)
                          setInvitedSearch("")
                          InvitedJobListing = []
                        }}
                        onSearch={(value) => {
                          clearTimeout(timer);
                          let temp = setTimeout(function () {
                            setInvitedSearch(value)
                            setInvitedpage(1)
                          }, 500);
                          setTimer(temp)
                        }}></SearchBox>
                      {/* <SearchBox placeholder="Payment Title, Client Details"></SearchBox> */}
                      <div className="filterBtn">
                        <button
                          className="filterIcon"
                          onClick={() =>
                            setShowFilterDropdown(!showFilterDropdown)
                          }
                        >
                          <i className="icon-filter"></i>
                          {isInvitedfilter && <span className="dot_filter"></span>}
                        </button>
                        {showFilterDropdown && (
                          <>
                            <div
                              className="overLay"
                              onClick={() => setShowFilterDropdown(false)}
                            ></div>
                            <FilterFormCustomer
                              setInvitedStatus={(status) => setInvitedStatus(status)}
                              close={() => setShowFilterDropdown(false)}
                              setisInvitedfilter={(flag) => setisInvitedfilter(flag)}
                              InvitedStatus={InvitedStatus}
                            ></FilterFormCustomer>
                          </>
                        )}
                      </div>
                      <div className="sortingIcon">
                        <i
                          className="icon-sort"
                          onClick={() => setShowSortDropdown(!showSortDropdown)}
                        ></i>
                        {showSortDropdown && (
                          <>
                            <div
                              className="overLay"
                              onClick={() => setShowSortDropdown(false)}
                            ></div>
                            <FilterSorting>
                              {sortingData.map((sortingData, i) => {
                                return (
                                  <li className="headingItem" key={i}>
                                    {sortingData.jobDetail}
                                  </li>
                                );
                              })}
                            </FilterSorting>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="header secondTabHeader">
                    <TableHeader>
                      {headingCustomerData.map((header, i) => {
                        return (
                          <li
                            data-content="Payment Details"
                            className="headingItem"
                            key={i}
                          >
                            <div className="headerTitle" onClick={() => {
                              filterOperation(header.sortKey, "invited");
                            }}>
                              {header.title}{" "}
                              {header.key && <i className="icon-sort"></i>}
                            </div>
                          </li>
                        );
                      })}
                    </TableHeader>
                  </div>
                  <div className="listing secondtablisting">
                    <Scrollbars
                      className="listingScroll"
                      onScroll={(e) => {
                        const { scrollTop, scrollHeight, clientHeight } = scrollBarForInvited.current.getValues();
                        if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                          setInvitedpage(Invitedpage + 1);
                        }

                      }}
                      ref={scrollBarForInvited}
                      style={{
                        height: dimensions.height - headerHeight - titleHeight - secondTabSearchHeight - secondTabHeaderHeight - tabTitleHeight - 55 + "px",
                      }}
                    >
                      {InvitedjoblistingData && InvitedjoblistingData.length < 1 && <NoData title="No record found"></NoData>}
                      {InvitedjoblistingData && InvitedjoblistingData.map((listingCustomer, i) => {
                        return (
                          <TableListing key={i} onClick={() => routeDetails(listingCustomer._id, 4)}>
                            <li className="headingItem">
                              {listingCustomer.name}
                            </li>
                            <li className="headingItem">
                              {listingCustomer.customerName}
                            </li>
                            <li className="headingItem">
                              {/* {listingCustomer.businessName} */}
                              {get(listingCustomer, 'companyName.name', '-')}
                            </li>
                            <li
                              data-content="Assigned to"
                              className="headingItem"
                            >
                              £ {listingCustomer.totalAmount && listingCustomer.totalAmount.toFixed(2)}
                            </li>
                            <li
                              data-content="Assigned to"
                              className="headingItem"
                            >
                              {listingCustomer.numberOfpayment}
                            </li>
                            <li data-content="Status" className="headingItem">
                              {listingCustomer.statusFlag ? (
                                <Status
                                  className={"complete"}
                                  title={listingCustomer.status}
                                ></Status>
                              ) : (
                                  <Status
                                    className={Constant.JOBSTATUSCLASS[`${listingCustomer.status}`]}
                                    title={Constant.JOBSTATUSCUSTOMER[`${listingCustomer.status}`]}

                                  ></Status>
                                )}
                            </li>
                            <li data-content="Activity" className="headingItem">
                              {listingCustomer.status === Constant.JOBSTATUS.REJECTED && <i onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setJobId(listingCustomer.rejectHistory)
                                setShowPaymentHistory(true)
                              }} className="icon-info cancel"></i>}
                              {listingCustomer.status == Constant.JOBSTATUS.WAITING_FUND_DEPOSITE && <i className="icon-check"></i>}
                              {listingCustomer.status == Constant.JOBSTATUS.WAITING_ACCEPT && <button className="acceptbtn" onClick={(e) => acceptJob(listingCustomer._id, e)}>Accept</button>}
                              {listingCustomer.status == Constant.JOBSTATUS.WAITING_ACCEPT && <button className="rejecttbtn" onClick={(e) => rejectJob(e, listingCustomer._id)}>Reject</button>}

                            </li>
                          </TableListing>
                        );
                      })}
                    </Scrollbars>
                  </div>
                </Tab>
                // **************************** Customer Invite Job Listing with tab Ended  **********************************
              }
            </Tabs>
          </div>
        </div> :
          props.invitedTotalJob >= 1 ?

            // **************************** Customer Invite Job Seprate Listing Started  **********************************
            <div className="tableSection">
              <div className="searchFilter secondTabSearch">
                <div className="searchSection">
                  <SearchBox placeholder="Transaction Title , Customer Details, Business Name"
                    onClear={() => {
                      setInvitedpage(1)
                      setInvitedSearch("")
                      InvitedJobListing = []
                    }}
                    onSearch={(value) => {
                      clearTimeout(timer);
                      let temp = setTimeout(function () {
                        setInvitedSearch(value)
                        setInvitedpage(1)
                      }, 500);
                      setTimer(temp)
                    }}></SearchBox>
                  {/* <SearchBox placeholder="Payment Title, Client Details"></SearchBox> */}
                  <div className="filterBtn">
                    <button
                      className="filterIcon"
                      onClick={() =>
                        setShowFilterDropdown(!showFilterDropdown)
                      }
                    >
                      <i className="icon-filter"></i>
                      {isInvitedfilter && <span className="dot_filter"></span>}
                    </button>
                    {showFilterDropdown && (
                      <>
                        <div
                          className="overLay"
                          onClick={() => setShowFilterDropdown(false)}
                        ></div>
                        <FilterFormCustomer
                          setInvitedStatus={(status) => setInvitedStatus(status)}
                          close={() => setShowFilterDropdown(false)}
                          setisInvitedfilter={(flag) => setisInvitedfilter(flag)}
                          InvitedStatus={InvitedStatus}
                        ></FilterFormCustomer>
                      </>
                    )}
                  </div>
                  <div className="sortingIcon">
                    <i
                      className="icon-sort"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    ></i>
                    {showSortDropdown && (
                      <>
                        <div
                          className="overLay"
                          onClick={() => setShowSortDropdown(false)}
                        ></div>
                        <FilterSorting>
                          {sortingData.map((sortingData, i) => {
                            return (
                              <li className="headingItem" key={i}>
                                {sortingData.jobDetail}
                              </li>
                            );
                          })}
                        </FilterSorting>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="header secondTabHeader">
                <TableHeader>
                  {headingCustomerData.map((header, i) => {
                    return (
                      <li
                        data-content="Payment Details"
                        className="headingItem"
                        key={i}
                      >
                        <div className="headerTitle" onClick={() => {
                          filterOperation(header.sortKey, "invited");
                        }}>
                          {header.title}{" "}
                          {header.key && <i className="icon-sort"></i>}
                        </div>
                      </li>
                    );
                  })}
                </TableHeader>
              </div>
              <div className="listing secondtablisting">
                <Scrollbars
                  className="listingScroll"
                  onScroll={(e) => {
                    const { scrollTop, scrollHeight, clientHeight } = scrollBarForInvitedOnly.current.getValues();
                    if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                      setInvitedpage(Invitedpage + 1);
                    }

                  }}
                  ref={scrollBarForInvitedOnly}
                  style={{
                    height: dimensions.height - headerHeight - titleHeight - secondTabSearchHeight - secondTabHeaderHeight - tabTitleHeight - 15 + "px",
                  }}
                >
                  {InvitedjoblistingData && InvitedjoblistingData.length < 1 && <NoData title="No record found"></NoData>}
                  {InvitedjoblistingData && InvitedjoblistingData.map((listingCustomer, i) => {
                    return (
                      <TableListing key={i} onClick={() => routeDetails(listingCustomer._id, 4)}>
                        <li className="headingItem">
                          {listingCustomer.name}
                        </li>
                        <li className="headingItem">
                          {listingCustomer.customerName}
                        </li>
                        <li className="headingItem">
                          {/* {listingCustomer.businessName} */}
                          {get(listingCustomer, 'companyName.name', '-')}

                        </li>
                        <li
                          data-content="Assigned to"
                          className="headingItem"
                        >
                          £ {listingCustomer.totalAmount && listingCustomer.totalAmount.toFixed(2)}
                        </li>
                        <li
                          data-content="Assigned to"
                          className="headingItem"
                        >
                          {listingCustomer.numberOfpayment}
                        </li>
                        <li data-content="Status" className="headingItem">
                          {listingCustomer.statusFlag ? (
                            <Status
                              className={"complete"}
                              title={listingCustomer.status}
                            ></Status>
                          ) : (
                              <Status
                                className={Constant.JOBSTATUSCLASS[`${listingCustomer.status}`]}
                                title={Constant.JOBSTATUSCUSTOMER[`${listingCustomer.status}`]}

                              ></Status>
                            )}
                        </li>
                        <li data-content="Activity" className="headingItem">
                          {listingCustomer.status == Constant.JOBSTATUS.REJECTED && <i onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setJobId(listingCustomer.rejectHistory)
                            setShowPaymentHistory(true)
                          }} className="icon-info cancel"></i>}
                          {listingCustomer.status === Constant.JOBSTATUS.WAITING_FUND_DEPOSITE && <i className="icon-check"></i>}
                          {listingCustomer.status === Constant.JOBSTATUS.WAITING_ACCEPT && <button className="acceptbtn" onClick={(e) => acceptJob(listingCustomer._id, e)}>Accept</button>}
                          {listingCustomer.status === Constant.JOBSTATUS.WAITING_ACCEPT && <button className="rejecttbtn" onClick={(e) => rejectJob(e, listingCustomer._id)}>Reject</button>}
                        </li>
                      </TableListing>
                    );
                  })}
                </Scrollbars>
              </div>

            </div>
            // **************************** Customer Invite Job Seprate Listing Ended  **********************************  
            :
            // **************************** Client Created Job Seprate Listing Started  **********************************
            <div className="tableSection">
              <div className="searchFilter ">
                <div className="searchSection">
                  <SearchBox placeholder="Transaction Title , Customer Details"
                    onClear={() => {
                      setPage(1)
                      setCreatedSearch("")
                      createdJobListing = []
                    }}
                    onSearch={(value) => {
                      clearTimeout(timer);
                      let temp = setTimeout(function () {

                        setCreatedSearch(value)

                        setPage(1)
                        // getJobListing()
                      }, 500);
                      setTimer(temp)
                    }}></SearchBox>
                  <div className="filterBtn">
                    <button
                      className="filterIcon"
                      onClick={() =>
                        setShowFilterDropdown(!showFilterDropdown)
                      }
                    >
                      <i className="icon-filter"></i>
                      {isCreatedfilter && <span className="dot_filter"></span>}
                    </button>
                    {showFilterDropdown && (
                      <>
                        <div
                          className="overLay"
                          onClick={() => setShowFilterDropdown(false)}
                        ></div>
                        <FilterForm
                          max={maximum}
                          min={minimum}
                          jobstatus={createdStatus}
                          minimum={(min) => setMinimum(min)}
                          maximum={(max) => setMaximum(max)}
                          status={(status) => setCreatedStatus(status)}
                          isCreated={(flag) => { setisCreatedfilter(flag) }}
                          close={() => setShowFilterDropdown(false)}
                          setpage={(num) => setPage(num)}
                          isCreatedapicall={isCreatedapicall}
                          setisCreatedapicall={(flag) => setisCreatedapicall(flag)}
                        ></FilterForm>
                      </>
                    )}
                  </div>
                  <div className="sortingIcon">
                    <i
                      className="icon-sort"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    ></i>
                    {showSortDropdown && (
                      <>
                        <div
                          className="overLay"
                          onClick={() => setShowSortDropdown(false)}
                        ></div>
                        <FilterSorting>
                          {sortingData.map((sortingData, i) => {
                            return (
                              <li className="headingItem" key={i}>
                                {sortingData.jobDetail}
                              </li>
                            );
                          })}
                        </FilterSorting>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="header">
                <TableHeader>
                  {headerData.map((header, i) => {
                    return (
                      <li
                        data-content="Payment Details"
                        className="headingItem"
                        key={i}
                      >
                        <div className="headerTitle" onClick={() => {
                          filterOperation(header.sortKey);
                        }}>
                          {header.title}{" "}
                          {header.key && <i className="icon-sort"></i>}
                        </div>
                      </li>
                    );
                  })}
                </TableHeader>
              </div>
              <div className="listing">
                <Scrollbars
                  className="listingScroll"
                  onScroll={(e) => {
                    const { scrollTop, scrollHeight, clientHeight } = scrollBarForCreatedOnly.current.getValues();
                    if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                      setPage(page + 1);
                    }

                  }}
                  ref={scrollBarForCreatedOnly}
                  style={{
                    height:
                      dimensions.height -
                      headerHeight -
                      titleHeight -
                      searchHeight -
                      headingListHeight -
                      formtitleHeight -
                      10 +
                      "px",
                  }}
                >
                  {joblistingData.length === 0 && <NoData title="No record found"></NoData>}

                  {joblistingData && joblistingData.map((listing, index) => {

                    return (
                      <TableListing key={index} onClick={() => routeDetails(listing._id, 3)}>
                        <li className="headingItem">{listing.name}</li>
                        <li className="headingItem">{listing.jobFor}</li>
                        <li className="headingItem">
                          £ {listing.totalAmount && listing.totalAmount.toFixed(2)}
                        </li>
                        <li
                          data-content="Assigned to"
                          className="headingItem"
                        >
                          £ {listing.serviceFee && listing.serviceFee.toFixed(2)}
                        </li>
                        <li
                          data-content="Assigned to"
                          className="headingItem"
                        >
                          {listing.numberOfpayment}
                        </li>
                        <li data-content="Status" className="headingItem">
                          {/* {listing.status ? (
                                <Status
                                  className={listing.statusFlag}
                                  title={Constant.JOBSTATUS[`${listing.status}`]}
                                ></Status>
                              ) : ( */}
                          <Status
                            className={Constant.JOBSTATUSCLASS[`${listing.status}`]}
                            title={Constant.JOBSTATUSCLIENT[`${listing.status}`]}
                          ></Status>
                          {/* )} */}
                        </li>
                        <li data-content="Activity" className="headingItem">

                          {listing.status === Constant.JOBSTATUS.REJECTED && <i onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setJobId(listing.rejectHistory)
                            setShowPaymentHistory(true)
                          }} className="icon-info cancel"></i>}
                          {(listing.status === Constant.JOBSTATUS.WAITING_FUND_DEPOSITE || listing.status === Constant.JOBSTATUS.WAITING_ACCEPT) && <i className="icon-check"></i>}

                        </li>
                      </TableListing>);
                  })}
                </Scrollbars>
              </div>

            </div>
          // **************************** Client Created Job Seprate Listing Ended  **********************************
        }
      </div>

      {/* ************************ Create transaction Model Started  ************************** */}
      <ModalPopup
        showModal={showTicketModal}
        onHide={() => setShowTicketModal(false)}
        className={
          addInterimPayments
            ? "CreateTransaction addInterimPayments"
            : "CreateTransaction and"
        }
        closeIcon={false}
      >
        <CreateTransactionForm
          classCall={(value) => setAddInterimPayments(value)}
          onHide={() => { setShowTicketModal(false); getJobListing() }}
        />
      </ModalPopup>
      {/* ************************ Create transaction Model Ended  ************************** */}


      {/* ************************ Reject transaction Reason Model Started  ************************** */}
      <ModalPopup
        showModal={showPaymentRejectionNote}
        onHide={() => setShowPaymentRejectionNote(false)}
        className='paymentRejectionNote'
        closeIcon={true}
      >
        <PaymentRejectionNote jobId={jobId} onHide={() => { getInvitedJobListing(); setShowPaymentRejectionNote(false) }} ></PaymentRejectionNote>
      </ModalPopup>
      {/* ************************ Reject transaction Reason Model Ended  ************************** */}



      {/* ************************ View Rejection Comment Note Model Started  ************************** */}
      <ModalPopup
        showModal={showPaymentHistory}
        onHide={() => setShowPaymentHistory(false)}
        className='paymentHistory'
        closeIcon={true}
      >
        <PaymentHistory jobId={jobId}></PaymentHistory>
      </ModalPopup>
      {/* ************************ View Rejection Comment Note Model Ended  ************************** */}
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    jobListing: state.job.jobListing && state.job.jobListing.jobDetail,
    totalJob: state.job.jobListing && state.job.jobListing.totalRecord || 0,
    invitedJobListing: state.job.jobInvitedJobListing && state.job.jobInvitedJobListing.jobDetail,
    invitedTotalJob: state.job.jobInvitedJobListing && state.job.jobInvitedJobListing.totalRecord || 0,
  }
};
const mapDispatchToProps = {
  getJob, getOneuserDetails, showLoader, hideLoader, getInvitedJob, acceptJob, showToast
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentListing));

