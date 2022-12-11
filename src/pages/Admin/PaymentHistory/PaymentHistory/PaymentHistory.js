import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import Label from '../../../../components/UI/Label/Label';
import { showToast } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import './PaymentHistory.scss';
import FilterForm from '../Form/FilterForm';
import { getPaymentHistory } from '../../../../state/ducks/Job/actions';
import { isCheckValueAndSetParams } from '../../../Client/PaymentManagement/PaymentListing/PaymentListing';
import { dateFormat } from '../../../../services/helper.service';
import NoData from '../../../../components/NoData/NoData';

function PaymentHistory(props) {
  const scrollBar = useRef();
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)
  const [tableHeadingHeight, setTableHeadingHeight] = useState(0)
  let [showSortDropdown, setShowSortDropdown] = useState(false)
  let [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [minimumAmount, setMinimumAmount] = useState("")
  const [maximumAmount, setMaximumAmount] = useState("")
  const [adminfeesMinimum, setAdminfeesMinimum] = useState("")
  const [adminfeesMaximum, setAdminfeesMaximum] = useState("")
  const [paymentSearch, setPaymentSearch] = useState("")
  const [sortBy, setSortBy] = useState()
  const [sort, setSort] = useState(false)
  const [paymentPage, setPaymentPage] = useState(1)
  const [IsapiCall, setIsapiCall] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [isPaymentFilter, setisPaymentFilter] = useState(false)
  const [timer, setTimer] = useState()
  const [paymentHistory, setpaymentHistory] = useState([])

  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setTitleHeight(document.getElementsByClassName('titleText')[0].offsetHeight);
    setSearchHeight(document.getElementsByClassName('searchFilter')[0].offsetHeight);
    setTableHeadingHeight(document.getElementsByClassName('Table-header')[0].offsetHeight);
  })
  const getPaymentHistoryListing = () => {
    let link
    if (sortBy && sortBy.by === "asc") {
      link = `payment/history?skip=${paymentPage}&limit=${10}${isCheckValueAndSetParams('&minFees=', adminfeesMinimum)}${isCheckValueAndSetParams('&maxFees=', adminfeesMaximum)}${isCheckValueAndSetParams('&minAmount=', minimumAmount)}${isCheckValueAndSetParams('&maxAmount=', maximumAmount)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', paymentSearch)}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}`
    } else if (sortBy && sortBy.by === "desc") {
      link = `payment/history?limit=${10}&skip=${paymentPage}${isCheckValueAndSetParams('&minFees=', adminfeesMinimum)}${isCheckValueAndSetParams('&maxFees=', adminfeesMaximum)}${isCheckValueAndSetParams('&minAmount=', minimumAmount)}${isCheckValueAndSetParams('&maxAmount=', maximumAmount)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', paymentSearch)}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}`
    } else {
      link = `payment/history?skip=${paymentPage}&limit=${10}${isCheckValueAndSetParams('&minFees=', adminfeesMinimum)}${isCheckValueAndSetParams('&maxFees=', adminfeesMaximum)}${isCheckValueAndSetParams('&minAmount=', minimumAmount)}${isCheckValueAndSetParams('&maxAmount=', maximumAmount)}${isCheckValueAndSetParams('&search=', paymentSearch)}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}`
    }
    props.getPaymentHistory(link).then((response) => {
      let res = response.data?.paymentHistoryData || response.payload?.paymentHistoryData;
      if (paymentPage === 1) {
        setpaymentHistory(res)
      } else {
        setpaymentHistory(paymentHistory.concat(res))
      }
    })
  }
  useEffect(() => {
    getPaymentHistoryListing()
  }, [IsapiCall])
  const filterOperation = (filterby) => {
    if (sort && filterby === sortBy.filter) {
      setPaymentPage(1)
      setSortBy({ filter: filterby, by: "asc" });
      setSort(false);
      setIsapiCall(!IsapiCall)
    } else {
      setPaymentPage(1)
      setSortBy({ filter: filterby, by: "desc" });
      setSort(true);
      setIsapiCall(!IsapiCall)
    }
  };
  return (
    <div style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className='admin_payments_Main'>
        <div className='jobInnerSection'>
          <Label title='Transaction History'></Label>
          <div className='searchFilter'>
            <div className='searchSection'>
              <SearchBox
                onClear={() => {
                  setPaymentSearch("")
                  setPaymentPage(1)
                  setIsapiCall(!IsapiCall)
                }}
                onSearch={(value) => {
                  clearTimeout(timer);
                  let temp = setTimeout(function () {
                    setPaymentSearch(value)
                    setPaymentPage(1)
                    setIsapiCall(!IsapiCall)
                  }, 500);
                  setTimer(temp)
                }}
                placeholder='Transaction Id, Paid By, Paid To, Job Title, Milestone Title'></SearchBox>
              <div className='filterBtn'>
                <button className='filterIcon' onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                  <i className='icon-filter'></i>
                  {isPaymentFilter && <span className="dot_filter"></span>}
                </button>
                {showFilterDropdown &&
                  <>
                    <div className='overLay' onClick={() => setShowFilterDropdown(false)} ></div>
                    <FilterForm
                      setPaymentPage={(page) => setPaymentPage(page)}
                      setStartDate={(date) => setStartDate(date)}
                      startDate={startDate}
                      setEndDate={(date) => setEndDate(date)}
                      endDate={endDate}
                      setIsapiCall={(flag) => setIsapiCall(flag)}
                      IsapiCall={IsapiCall}
                      setMinimumAmount={(amount) => setMinimumAmount(amount)}
                      minimumAmount={minimumAmount}
                      setMaximumAmount={(amount) => setMaximumAmount(amount)}
                      maximumAmount={maximumAmount}
                      setAdminfeesMaximum={(amount) => setAdminfeesMaximum(amount)}
                      adminfeesMaximum={adminfeesMaximum}
                      setAdminfeesMinimum={(amount) => setAdminfeesMinimum(amount)}
                      adminfeesMinimum={adminfeesMinimum}
                      setIsFilter={flag => setisPaymentFilter(flag)}
                      close={() => setShowFilterDropdown(!showFilterDropdown)}
                    />
                  </>
                }
              </div>
              <div className='sortingIcon'>
                <i className='icon-sort' onClick={() => setShowSortDropdown(!showSortDropdown)}></i>
              </div>
            </div>
          </div>
          <div className="table_list_Main">
            <div className="Table-row Table-header">
              <div className="table-row-inline">
                <div className="Table-row-item">Transaction Id <button className="icon-sort" onClick={() => filterOperation("paymentReleaseId")}></button></div>
                <div className="Table-row-item">Escrow Transaction Date <button className="icon-sort" onClick={() => filterOperation("escrowDate")}></button></div>
                <div className="Table-row-item">Releas Transaction Date <button className="icon-sort" onClick={() => filterOperation("paymentReleaseDate")}></button></div>
                <div className="Table-row-item">Paid By <button className="icon-sort" onClick={() => filterOperation("jobFor")}></button></div>
                <div className="Table-row-item">Paid To <button className="icon-sort" onClick={() => filterOperation("createdBy")}></button></div>
                <div className="Table-row-item">Job Title <button className="icon-sort" onClick={() => filterOperation("jobName")}></button></div>
                <div className="Table-row-item">Milestone Title <button className="icon-sort" onClick={() => filterOperation("mileStoneTitle")}></button></div>
                <div className="Table-row-item">Milestone Amount <button className="icon-sort" onClick={() => filterOperation("totalAmount")}></button></div>
                <div className="Table-row-item">Admin Commission <button className="icon-sort" onClick={() => filterOperation("adminFees")}></button></div>
              </div>
            </div>
            <Scrollbars
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = scrollBar.current.getValues();
                if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                  setPaymentPage(paymentPage + 1)
                  setIsapiCall(!IsapiCall)
                }
              }}
              ref={scrollBar}
              style={{ height: (dimensions.height - headerHeight - titleHeight - searchHeight - tableHeadingHeight - 15) + 'px' }}>
              {
                paymentHistory?.length >= 1 ? paymentHistory.map((listing, i) => {
                  return (
                    <div className="Table-row" key={i}>
                      <div className="table-row-inline cursurpointer">
                        <div className="Table-row-item" data-header="Header1">{listing.paymentReleaseId}</div>
                        <div className="Table-row-item" data-header="Header2">{dateFormat(listing.escrowDate, 'DD MMM yyy')}</div>
                        <div className="Table-row-item" data-header="Header3">{dateFormat(listing.paymentReleaseDate, 'DD MMM yyy')}</div>
                        <div className="Table-row-item" data-header="Header4">{listing.jobFor}</div>
                        <div className="Table-row-item" data-header="Header5">{listing.createdBy}</div>
                        <div className="Table-row-item" data-header="Header6">{listing.jobName}</div>
                        <div className="Table-row-item" data-header="Header7">{listing.mileStoneTitle}</div>
                        <div className="Table-row-item" data-header="Header8">{listing.totalAmount}</div>
                        <div className="Table-row-item" data-header="Header9">{listing.adminFees}</div>
                      </div>
                    </div>
                  )
                }) : <NoData title="No record found" />
              }
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = () => {
  return {}
};
const mapDispatchToProps = {
  showToast, getPaymentHistory
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentHistory));
