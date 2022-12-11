import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import {withRouter, useHistory} from 'react-router-dom';
import FilterForm from '../Form/FilterForm';
import {showToast} from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import Status from '../../../../components/Status/Status';
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import Constant from '../../../../util/constant';
import Label from '../../../../components/UI/Label/Label';
import './DisputeListing.scss';
// import ToggleButtonCustom from '../../../../components/UI/ToggleButton/ToggleButton';
import {capitalizeFirstLetter, dateFormat, isCheckValueAndSetParams} from '../../../../services/helper.service';
import {GetdisputeRaised} from '../../../../state/ducks/Job/actions';
import NoData from '../../../../components/NoData/NoData';

function DisputeListing(props) {
  const scrollBarFor_Dispute_Listing = React.useRef();
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)
  const [tableHeadingHeight, setTableHeadingHeight] = useState(0)
  let [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const role = localStorage.getItem('loginRole')
  const [disputeSearch, setDisputeSearch] = useState("")
  const [sortBy, setSortBy] = useState()
  const [page, setPage] = useState(1)
  const [isDisputeFilter, setisDisputeFilter] = useState(false)
  const [timer, setTimer] = useState()
  const [disputeData, setDisputeData] = useState([])
  const [disputeStatus, setDisputeStatus] = useState("")
  const [sort, setSort] = useState(false)
  const [IsapiCall, setIsapiCall] = useState(false)
  const [minimum, setMinimum] = useState()
  const [maximum, setMaximum] = useState()
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setTitleHeight(document.getElementsByClassName('titleText')[0].offsetHeight);
    setSearchHeight(document.getElementsByClassName('searchFilter')[0].offsetHeight);
    setTableHeadingHeight(document.getElementsByClassName('Table-header')[0].offsetHeight);
  })
  const getTickitListing = () => {
    let link
    if (sortBy && sortBy.by === "asc") {
      link = `dispute/?page=${page}&limit=${10}${isCheckValueAndSetParams('&status=', disputeStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', disputeSearch)}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}`
    } else if (sortBy && sortBy.by === "desc") {
      link = `dispute/?page=${page}&limit=${10}${isCheckValueAndSetParams('&status=', disputeStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', disputeSearch)}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}`
    } else {
      link = `dispute/?page=${page}&limit=${10}${isCheckValueAndSetParams('&status=', disputeStatus)}${isCheckValueAndSetParams('&search=', disputeSearch)}${isCheckValueAndSetParams('&minAmount=', minimum)}${isCheckValueAndSetParams('&maxAmount=', maximum)}`
    }
    props.GetdisputeRaised(link).then((response) => {
      let res = response.data || response
      if (page === 1 && disputeSearch !== "") {
        setDisputeData(res.payload.disputeData)
      } else if (page === 1 && isDisputeFilter) {
        setDisputeData(res.payload.disputeData)
      } else if (page === 1 && sortBy) {
        setDisputeData(res.payload.disputeData)
      } else {
        if (page === 1) {
          setDisputeData(res.payload.disputeData)
        } else {
          setDisputeData(disputeData.concat(res.payload.disputeData))
        }
      }
    })
  }
  const filterOperation = (filterby) => {
    if (sort && filterby === sortBy.filter) {
      setPage(1)
      setSortBy({filter: filterby, by: "asc"});
      setSort(false);
      setIsapiCall(!IsapiCall)
    } else {
      setPage(1)
      setSortBy({filter: filterby, by: "desc"});
      setSort(true);
      setIsapiCall(!IsapiCall)
    }
  }
  useEffect(() => {
    getTickitListing()
  }, [IsapiCall])
  const history = useHistory();
  const routeChange = () => {
    let path = `jobs/create`;
    history.push(path);
  }
  return (
    <div style={{height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px')}}>
      <div className='disputeListingMain'>
        <div className='jobInnerSection'>
          <Label title='Query Management'></Label>
          <div className='searchFilter'>
            <div className='searchSection'>
              <SearchBox
                placeholder=' Job Title, Customer Details, Client Details'
                onClear={() => {
                  setPage(1)
                  setDisputeSearch("")
                  setIsapiCall(!IsapiCall)
                }}
                onSearch={(value) => {
                  clearTimeout(timer);
                  let temp = setTimeout(function () {
                    setDisputeSearch(value)
                    setPage(1)
                    setIsapiCall(!IsapiCall)
                  }, 500);
                  setTimer(temp)
                }}
              />
              <div className='filterBtn'>
                <button className='filterIcon' onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                  <i className='icon-filter'></i>
                  {isDisputeFilter && <span className="dot_filter"></span>}
                </button>
                {showFilterDropdown &&
                  <>
                    <div className='overLay' onClick={() => setShowFilterDropdown(false)} ></div>
                    <FilterForm
                      max={maximum}
                      min={minimum}
                      disputeStatus={disputeStatus}
                      minimum={(min) => setMinimum(min)}
                      maximum={(max) => setMaximum(max)}
                      status={(status) => setDisputeStatus(status)}
                      isfilter={(flag) => {setisDisputeFilter(flag)}}
                      close={() => setShowFilterDropdown(false)}
                      setpage={(num) => setPage(num)}
                      IsapiCall={IsapiCall}
                      setIsapiCall={(flag) => setIsapiCall(flag)}
                    />
                  </>
                }
              </div>
            </div>
          </div>
          <div className="table_list_Main">
            <div className="Table-row Table-header">
              <div className="table-row-inline">
                <div className="Table-row-item">Job Title <button className="icon-sort" onClick={() => filterOperation("jobName")}></button></div>
                <div className="Table-row-item">Disputed by <button className="icon-sort" onClick={() => filterOperation("disputedBy")}></button></div>
                <div className="Table-row-item">Created by <button className="icon-sort" onClick={() => filterOperation("createdBy")}></button></div>
                <div className="Table-row-item">Job For <button className="icon-sort" onClick={() => filterOperation("jobFor")}></button></div>
                {Number(role) === Constant.ROLE.ADMIN &&
                  <div className="Table-row-item">Staff Member <button className="icon-sort" onClick={() => filterOperation("staffMember")}></button></div>
                }
                <div className="Table-row-item">Business Category <button className="icon-sort" onClick={() => filterOperation("businessCategory")}></button></div>
                <div className="Table-row-item">Job Amount <button className="icon-sort" onClick={() => filterOperation("jobAmount")}></button></div>
                <div className="Table-row-item">Admin Fees <button className="icon-sort" onClick={() => filterOperation("jobAdminFess")}></button></div>
                <div className="Table-row-item">Dispute Status </div>
              </div>
            </div>
            <Scrollbars
              style={{height: (dimensions.height - headerHeight - titleHeight - searchHeight - tableHeadingHeight - 15) + 'px'}}
              onScroll={(e) => {
                const {scrollTop, scrollHeight, clientHeight} = scrollBarFor_Dispute_Listing.current.getValues();
                if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                  setPage(page + 1);
                  setIsapiCall(!IsapiCall)
                }
              }}
              ref={scrollBarFor_Dispute_Listing}
            >

              {disputeData.length < 1 &&
                <NoData title='No record found'></NoData>
              }

              {disputeData.map((listing, index) => {
                return (
                  <div className="Table-row" key={index}>
                    <div className="table-row-inline cursurpointer"
                      onClick={(e) => {
                        props.history.push('/admin/disputes/details')
                        localStorage.setItem("disputeID", listing._id)
                      }}>
                      <div className="Table-row-item" data-header="Header1">{listing.jobName ?? "-"}</div>
                      <div className="Table-row-item" data-header="Header2">{listing.disputedBy ?? "-"}</div>
                      <div className="Table-row-item" data-header="Header3">{listing.createdBy ?? "-"}</div>
                      <div className="Table-row-item" data-header="Header4">{listing.jobFor ?? "-"}</div>
                      {Number(role) === Constant.ROLE.ADMIN &&
                        <div className="Table-row-item" data-header="Header5">{listing.staffMember ?? "-"}</div>
                      }
                      <div className="Table-row-item" data-header="Header6">{listing.businessCategory ?? "-"}</div>
                      <div className="Table-row-item" data-header="Header7">{listing.jobAmount.toFixed(2) ?? "-"}</div>
                      <div className="Table-row-item" data-header="Header8">{listing.jobAdminFess.toFixed(2) ?? "-"}</div>
                      <div className="Table-row-item" data-header="Header9">{listing.status ? <Status className={Constant.DISPUTE_RAISED_CLASSNAME.status} title={capitalizeFirstLetter(listing.status)}></Status> : listing.status}</div>
                    </div>
                  </div>
                )
              })
              }
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {
  showToast, GetdisputeRaised
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisputeListing));
