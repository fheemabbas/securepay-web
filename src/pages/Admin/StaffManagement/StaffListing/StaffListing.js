import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import Label from '../../../../components/UI/Label/Label';
import { showToast } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import AlertModal from '../../../../components/AlertModal/AlertModal';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import './StaffListing.scss';
import ToggleButtonCustom from '../../../../components/UI/ToggleButton/ToggleButton';
import StaffMemberForm from '../Form/StaffMemberForm';
import { deleteStaffMember, editStaffMember, getStaffMember } from '../../../../state/ducks/Job/actions';
import { isCheckValueAndSetParams } from '../../../../services/helper.service';
import { get } from "lodash";
import NoData from '../../../../components/NoData/NoData';

function StaffListing(props) {
  const scrollBar = useRef();
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)
  const [tableHeadingHeight, setTableHeadingHeight] = useState(0)
  let [showStaffModal, setShowStaffModal] = useState(false)
  let [showDeleteModal, setShowDeleteModal] = useState(false)
  const [searchStaffMember, setSearchStaffMember] = useState()
  const [staffPage, setStaffPage] = useState(1)
  const [sortBy, setSortBy] = useState()
  const [sort, setSort] = useState(false)
  const [staffMembers, setStaffMember] = useState([])
  const [timer, setTimer] = useState()
  const [isAPIcall, setisAPIcall] = useState(false)
  const [userID, setUserID] = useState()
  const [userStatus, setUserStatus] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setisDelete] = useState(false)
  const [EditStaffMember, setEditStaffMember] = useState()
  const [deleteUser, setDeleteUser] = useState()

  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setTitleHeight(document.getElementsByClassName('titleText')[0].offsetHeight);
    setSearchHeight(document.getElementsByClassName('searchFilter')[0].offsetHeight);
    setTableHeadingHeight(document.getElementsByClassName('Table-header')[0].offsetHeight);

  }, [])
  const GetStaffMember = () => {
    let url
    if (sortBy && sortBy.by === "asc") {
      url = `admin/getList?page=${staffPage}&limit=${10}${isCheckValueAndSetParams('&search=', searchStaffMember)}&sortBy=${sortBy.filter}:${sortBy.by}`
    } else if (sortBy && sortBy.by === "desc") {
      url = `admin/getList?page=${staffPage}&limit=${10}${isCheckValueAndSetParams('&search=', searchStaffMember)}&sortBy=${sortBy.filter}:${sortBy.by}`

    } else {
      url = `admin/getList?page=${staffPage}&limit=${10}${isCheckValueAndSetParams('&search=', searchStaffMember)}`
    }
    props.getStaffMember(url).then((response) => {
      let res = response.data || response
      if (staffPage === 1) {
        setStaffMember(res.payload)
      } else {
        setStaffMember(staffMembers.concat(res.payload))
      }
    })
  }

  useEffect(() => {
    GetStaffMember()
  }, [isAPIcall])
  const UpdateStatus = (id, status) => {
    let params = {
      isEnable: status
    }

    props.editStaffMember(id, params).then((res) => {
      setUserStatus(status)
      setShowDeleteModal(false)
      setTimeout(() => {
        props.showToast({ message: res.message, type: 'success' })
      }, 1000)
      return true
    }).catch(() => {
      return false
    })
  }
  const filterOperation = (filterby) => {
    if (sort && filterby === sortBy.filter) {
      setStaffPage(1)
      setSortBy({ filter: filterby, by: "asc" });
      setSort(false);
      setisAPIcall(!isAPIcall)
    } else {
      setStaffPage(1)
      setSortBy({ filter: filterby, by: "desc" });
      setSort(true);
      setisAPIcall(!isAPIcall)
    }
  };
  return (
    <div style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className='staff_page_Main'>
        <div className='jobInnerSection'>
          <Label title='Staff Management'></Label>
          <div className='searchFilter'>
            <div className='searchSection'>
              <SearchBox placeholder='Name, Email Id, Contact Number'
                onClear={() => {
                  setSearchStaffMember("")
                  setStaffPage(1)
                  setisAPIcall(!isAPIcall)
                }}
                onSearch={(value) => {
                  clearTimeout(timer);
                  let temp = setTimeout(function () {
                    setSearchStaffMember(value)
                    setStaffPage(1)
                    setisAPIcall(!isAPIcall)
                  }, 500);
                  setTimer(temp)
                }}
              ></SearchBox>
            </div>
            <div className='createJob'>
              <CustomButton type="submit" title="Add New Staff Memeber"
                onClick={() => {
                  // setEditStaffMember({})
                  setIsEdit(false)
                  setShowStaffModal(!showStaffModal)
                }} />
            </div>
          </div>
          <div className="table_list_Main">
            <div className="Table-row Table-header">
              <div className="table-row-inline">
                <div className="Table-row-item"></div>
                <div className="Table-row-item">Full name <button className="icon-sort" onClick={() => filterOperation("fullName")}></button></div>
                <div className="Table-row-item">Email Id <button className="icon-sort" onClick={() => filterOperation("email")}></button></div>
                <div className="Table-row-item">Contact Number <button className="icon-sort" onClick={() => filterOperation("number")}></button></div>
              </div>
            </div>
            <Scrollbars
              style={{ height: (dimensions.height - headerHeight - titleHeight - searchHeight - tableHeadingHeight - 15) + 'px' }}
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = scrollBar.current.getValues();
                if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                  setStaffPage(staffPage + 1)
                  setisAPIcall(!isAPIcall)
                }
              }}
              ref={scrollBar}
            >
              {staffMembers.length >= 1 ? staffMembers.map((listing, index) => {
                const number = listing?.contactNumber?.split(')')[1]
                return (
                  <div className="Table-row" key={index}>
                    <div className="table-row-inline cursurpointer">
                      <div className="Table-row-item" data-header="Header1">
                        <div className="imageCricle"><img src={`${listing.profilePicURL}/w_40,h_40,c_thumb,r_max/${listing.profilePic}`} /></div>
                      </div>
                      <div className="Table-row-item" data-header="Header2">{`${get(listing, 'firstName', "-")} ${get(listing, 'lastName', "-")}`}</div>
                      <div className="Table-row-item" data-header="Header3">{get(listing, 'email', "-")}</div>
                      <div className="Table-row-item" data-header="Header4">{`${listing?.contactNumber?.split(number)[0]} ${number}`}</div>
                    </div>
                    <div className="table-row-inline-action">
                      <div className="Table-row-item">
                        {/* <ActionDropDown options={['Ebable', 'Delete']} onChange={(item, index) => { setOption(index); setshowuserModal(!showuserModal) }} /> */}
                        <button
                          onClick={() => {
                            setIsEdit(true)
                            setEditStaffMember(listing)
                            setShowStaffModal(!showStaffModal)
                          }} className="edit">edit</button>
                        <button onClick={() => {
                          setDeleteUser(listing._id)
                          setisDelete(true)
                          setShowDeleteModal(!showDeleteModal)
                        }}
                          className="delete">delete</button>
                        <div onClick={() => setisDelete(false)}>
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
              }) : <NoData title="No record found" />
              }
            </Scrollbars>

          </div>
        </div>
      </div>
      <ModalPopup
        showModal={showStaffModal}
        onHide={() => setShowStaffModal(false)}
        className='staff_member'
        closeIcon={true}
      >
        <StaffMemberForm
          onHide={() => setShowStaffModal(false)}
          isAPIcall={() => setisAPIcall(!isAPIcall)}
          isEdit={isEdit}
          EditStaffMember={EditStaffMember}
        />
      </ModalPopup>
      <ModalPopup
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className='deleteModal'
        closeIcon={true}
      >
        <AlertModal
          title='Alert !' innerTxt={`Are you sure, you want to ${isDelete ? "delete" : !userStatus ? "disable" : "enable"}`}
          titleConfirm={`Yes ${isDelete ? "delete" : !userStatus ? "disable" : "enable"}`}
          titleCancel='No, Cancel'
          onHide={() => {
            setShowDeleteModal(false)
            setisDelete(false)
          }}
          onConfirmClick={() => {
            if (isDelete) {
              props.deleteStaffMember(deleteUser).then((res) => {
                setDeleteUser()
                setShowDeleteModal(false)
                setisAPIcall(!isAPIcall)
                setisDelete(false)
                setTimeout(() => {
                  props.showToast({ message: res.message, type: 'success' })
                }, 1000)
                return true
              }).catch((error) => {
                setTimeout(() => {
                  setisDelete(false)

                  props.showToast({ message: error?.response?.data?.message, type: 'success' })
                }, 1000)
                return false
              })
            } else {
              UpdateStatus(userID, !userStatus)
            }
          }}
        >
        </AlertModal>
      </ModalPopup>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {}
};
const mapDispatchToProps = {
  showToast, getStaffMember, editStaffMember, deleteStaffMember
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaffListing));