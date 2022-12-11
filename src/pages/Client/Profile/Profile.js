import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Controller } from "react-hook-form";
import Scrollbars from "react-custom-scrollbars";
import profile from "../../../assets/images/profile.png";
import Label from "../../../components/UI/Label/Label";
import PersonalEditModal from "../Profile/Form/PersonalEditModal";
import FinancialEditModal from "../Profile/Form/FinancialEditModal";
import CompanyEditModal from "../Profile/Form/CompanyEditModal";
import UBODeclarationModal from "../Profile/Form/UBODeclarationModal";
import StorageService from "./../../../services/localstorage.service";
import FileUpload from "../../../components/FileUpload/FileUpload";
import { showToast } from "../../../state/ducks/utils/operations";
import { logout } from "../../../state/ducks/auth/operations";
import { updateProfilePic, getKycStatus } from "../../../state/ducks/Job/actions";
import HookForm from "../../../components/HookForm/HookForm";
import ModalPopup from "../../../components/ModalPopup/ModalPopup";
import CustomSideBar from "../../../components/CustomSideBar/CustomSideBar";
import ChangePassword from "../../../components/UI/ChangePassword/ChangePassword";
import AddDocumentForm from "./Form/AddDocumentForm";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import useWindowDimension from "../../../hooks/useWindowDimension";
import "./Profile.scss";
import { get } from "lodash";
import moment from "moment";
import countryListJSON from "../../../util/countryname";
import { dateFormat } from "../../../services/helper.service";
const Profile = (props) => {
  let [showImageName, setShowImageName] = useState();

  const [form, setFilterForm] = React.useState();
  let [showCompanyEditModal, setShowCompanyEditModal] = useState(false);
  let [showFinancialEditModal, setShowFinancialEditModal] = useState(props ?.location ?.state ?.showFinancialModal || false);
  let [showPersonalEditModal, setShowPersonalEditModal] = useState(false);
  let [showUBODeclarationDetail, setShowUBODeclarationDetail] = useState(false);
  let [showUBODeclarationModal, setShowUBODeclarationModal] = useState(false);
  let [showAddDocument, setShowAddDocument] = useState(false);
  let [showPasswordModal, setShowPasswordModal] = useState(false);
  const [uboInfo, setUboInfo] = useState()
  const dimensions = useWindowDimension();
  const [headerHeight, setHeaderHeight] = useState(0);
  const user = StorageService.getItem("user")
  let [image, setImage] = useState(`${get(user, 'profilePicURL', '')}/w_100,h_102,c_thumb,r_max/${get(user, 'profilePic', '')}`);
  const onFormSubmit = () => { };
  useEffect(() => {
    setHeaderHeight(
      document.getElementsByClassName("headerClient")[0].offsetHeight
    );

  }, []);

  useEffect(() => {
    if (user.kycDocsId) {
      props.getKycStatus();
    }
  }, [showFinancialEditModal])
  const onImageChange = (acceptedFiles) => {
    setShowImageName(acceptedFiles[0].name);
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setImage(event.target.result);
      onImageUpload(acceptedFiles[0]);
    });
    reader.readAsDataURL(acceptedFiles[0]);
  };
  const onImageUpload = (data) => {
    let param = new FormData();
    param.append("profilePic", data);

    props.updateProfilePic(param).then((res) => {
      StorageService.setItem("user", res.payload)
      props.showToast({ message: res.message, type: 'success' })
    }).catch((error) => {
      props.showToast({ message: error ?.response ?.data ?.message, type: 'error' })
    })
  }
  return (
    <Scrollbars className="profileScroll" style={{
      height: dimensions.height - headerHeight + "px",
    }}>
      <div className="profileMain OrganisationProfile">
        <div className="boxContain">
          <div className="borderBox">
            <Label title="My Profile"></Label>
            <div className="topBox">
              <div className="leftProfile">
                <HookForm
                  defaultForm={{}}
                  init={(form) => setFilterForm(form)}
                  onSubmit={onFormSubmit}
                >
                  {(formMethod) => {
                    return (
                      <Controller
                        defaultValue=""
                        render={({ onChange }) => (
                          <FileUpload
                            onDrop={(acceptedFiles) => {
                              onChange(acceptedFiles);
                              onImageChange(acceptedFiles);
                            }}
                          >
                            <div className="imgBoxEmpty">
                              <img
                                width="100"
                                height="102"
                                src={image}
                                alt="viewImg"
                              />
                            </div>
                            <div className="uploadtxt">Change</div>
                          </FileUpload>
                        )}
                        name="image"
                        control={formMethod.control}
                      />
                    );
                  }}
                </HookForm>
              </div>
              <div className="rightPart">
                <button
                  className="btnCustom"
                  onClick={() => {
                    setShowPasswordModal(true);
                  }}
                >
                  Change Password
                </button>
                <Link
                  className="btnCustom logout"
                  to="/login"
                  onClick={() => props.logout()}
                >
                  Log out
                </Link>
              </div>
            </div>
            <div className="secondRow">
              <div className="column">
                <div className="columnTitle">Personal Information</div>
                <div className="detailsTxt">{`${get(user, 'firstName', '')} ${get(user, 'lastName', '')}`}</div>
                <div className="detailsTxt">{get(user, 'email')}</div>
                <div className="detailsTxt">Dob:{dateFormat(get(user, 'dob', 'Not yet submitted'), 'DD-MM-YYYY')}</div>
                <div className="detailsTxt">{`+${get(user, 'dialCode')} ${get(user, 'number')}`}</div>
                <div className="detailsTxt">{`${get(user, 'address.houseNo', '')} ${get(user, 'address.addressLine1', '')} ${get(user, 'address.addressLine2', '') ? get(user, 'address.addressLine2', '') : ''}`}</div>
                <div className="detailsTxt">{get(user, 'address.city', '')}</div>
                <div className="detailsTxt">{get(user, 'address.postalCode', '')}</div>
                <div className="detailsTxt">{get(user, 'address.region', '')}</div>
                {/* <div className="detailsTxt">British UK</div> */}
                <div className="btnEdit">
                  <Link
                    to="#"
                    onClick={() =>
                      setShowPersonalEditModal(!showPersonalEditModal)
                    }
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div className="column">
                <div className="columnTitle">Financial Information</div>
                <div className="DetailsRow">
                  <div className="title">Bank Account Number</div>
                  <div className="txt">{get(user, 'bankInfo.accountNumber', 'Not yet submitted')}</div>
                </div>
                <div className="DetailsRow">
                  <div className="title">Sort Code</div>
                  <div className="txt">{get(user, 'bankInfo.sortCode', 'Not yet submitted')}</div>
                </div>
                <div className="DetailsRow">
                  <div className="title">KYC Documents</div>
                  {/* <div className="txt">{user?.identityProof ? get(user, 'identityProof', 'Not yet submitted').split('/')[get(user, 'identityProof').split('/').length - 1] : 'Not yet submitted'}</div> */}
                  {console.log(props)}
                  <div className="txt"
                    style={{ color: user ?.identityProof && props.kycStatus ? props.kycStatus === "VALIDATION_ASKED" ? '#ffab00' : props.kycStatus === "VALIDATED" ? 'green' : 'red' : '' }}>
                    {user ?.identityProof && props.kycStatus ? props.kycStatus === "VALIDATION_ASKED" ? 'Approval Pending' : props.kycStatus === "VALIDATED" ? 'Approved' : 'Rejected' : 'Not yet submitted'}
                  </div>
                </div>
                {/* <div className="DetailsRow">
                  <div className="title">Business Category</div>
                  <div className="txt">Architect </div>
                </div> */}
                <div className="btnEdit">
                  <Link
                    to="#"
                    onClick={() =>
                      setShowFinancialEditModal(!showFinancialEditModal)
                    }
                  >
                    Edit
                  </Link>
                </div>
              </div>
              {
                user.accountType === 2 &&
                <div className="column">
                  <div className="columnTitle">Company Information</div>
                  <div className="detailsTxt">{user ?.company.name}</div>
                  <div className="detailsTxt">{user ?.company.number}</div>
                  <div className="detailsTxt">{get(user, 'companyAddress.houseNo', '-')}</div>
                  <div className="detailsTxt">{get(user, 'companyAddress.addressLine1', '-')} {get(user, 'companyAddress.addressLine2', '-')}</div>
                  <div className="detailsTxt">{get(user, 'companyAddress.city', '-')}</div>
                  <div className="detailsTxt">{get(user, 'companyAddress.region', '-')}</div>
                  <div className="detailsTxt">{get(user, 'companyAddress.postalCode', '-')}</div>
                  <div className="detailsTxt">{countryListJSON.find(i => i.id === user ?.country) ?.name1}</div>
                  <div className="uboInfoColumns">
                    <div className="detailsTxt linkBtn">
                      <div className="noUboDeclaration">
                        UBO Declaration
                      </div>
                      {user.uboInfo.map((item, index) => {
                        return <Link
                          to="#"
                          onClick={() => {
                            setUboInfo(item)
                            setShowUBODeclarationDetail(!showUBODeclarationDetail)
                          }}
                        >
                          UBO Declaration - {index + 1}
                        </Link>
                      })}
                    </div>
                    <div className="tooltipMain">
                      {["top"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`custom_tooltip-top`}>
                              The UBO (Ultimate Beneficial Owner).
                              This is the person who owns more than 25% of the company or acts as the legal representative. If there are more than one UBO please fill in one form for each partner (maximum of 4 forms can be added).
                            </Tooltip>
                          }
                        >
                          <Button className="tooltipBtn">
                            <i className="icon-info"></i>
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </div>
                  </div>
                  <div className="btnEdit">
                    <Link
                      to="#"
                      onClick={() =>
                        setShowCompanyEditModal(!showCompanyEditModal)
                      }
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <ModalPopup
          showModal={showPersonalEditModal}
          onHide={() => setShowPersonalEditModal(false)}
          className="PersonalEditModal"
          closeIcon={true}
        >
          <PersonalEditModal
            onHide={() => setShowPersonalEditModal(false)}
            userInfo={user}
          ></PersonalEditModal>
        </ModalPopup>
        <ModalPopup
          showModal={showFinancialEditModal}
          onHide={() => {
            if (props ?.location ?.state ?.showFinancialModal) {
              props.history.push('/payments/details')
            }
          }}
          className="FinancialEditModal"
          closeIcon={true}
        >
          <FinancialEditModal
            isPaymentMode={props ?.location ?.state ?.showFinancialModal}
            userBankInfo={user ?.bankInfo}
            identityProof={user ?.identityProof}
            onHide={() => {
              if (props ?.location ?.state ?.showFinancialModal) {
                props.history.push('/payments/details')
              }
              setShowFinancialEditModal(false)
            }}
          ></FinancialEditModal>
        </ModalPopup>
        <ModalPopup
          showModal={showCompanyEditModal}
          onHide={() => setShowCompanyEditModal(false)}
          className="CompanyEditModal"
          closeIcon={true}
        >
          <CompanyEditModal
            onHide={() => setShowCompanyEditModal(false)}
            userInfo={user}
          ></CompanyEditModal>
        </ModalPopup>
        <ModalPopup
          showModal={showAddDocument}
          onHide={() => setShowAddDocument(false)}
          className="addDocument"
          closeIcon={false}
        >
          <AddDocumentForm
            title="Passport"
            closeIcon={false}
            onHide={() => setShowAddDocument(false)}
          ></AddDocumentForm>
        </ModalPopup>
        <ModalPopup
          showModal={showUBODeclarationDetail}
          onHide={() => {
            setUboInfo()
            setShowUBODeclarationDetail(false)
          }}
          className="UBODeclarationDetail"
          closeIcon={false}
        >
          <div className="boxInner">
            <div className="columnTitle">UBO Declaration</div>
            <div className="detailsTxt">{uboInfo ?.firstName} {uboInfo ?.lastName}</div>
            <div className="detailsTxt">{moment(uboInfo ?.dob).format('DD/MM/YYYY')}</div>
            <div className="detailsTxt">{uboInfo ?.address.houseNo}</div>
            <div className="detailsTxt">{uboInfo ?.address.addressLine}</div>
            <div className="detailsTxt">{uboInfo ?.address.city}</div>
            <div className="detailsTxt">{uboInfo ?.address.region}</div>
            <div className="detailsTxt">{uboInfo ?.address.postalCode}</div>
            <div className="detailsTxt">{countryListJSON.find(i => i.id === uboInfo ?.nationality) ?.name}</div>
            {/* <div className="detailsTxt">British UK</div> */}
            <div className="btnEdit">
              <Link
                to="#"
                onClick={() => {
                  setShowUBODeclarationModal(!showUBODeclarationModal)
                }}
              >
                Edit
              </Link>
            </div>
          </div>
        </ModalPopup>
        <ModalPopup
          showModal={showUBODeclarationModal}
          className="UBODeclarationModal"
          onHide={() => {
            setShowUBODeclarationModal(false)
          }}
          closeIcon={true}
        >
          <UBODeclarationModal
            style={{ height: dimensions.height }}
            onHide={() => {
              setShowUBODeclarationDetail(false)
              setShowUBODeclarationModal(false)
            }}
            uboInfo={uboInfo} />
        </ModalPopup>
        <CustomSideBar
          title="Change Password"
          showSidebar={showPasswordModal}
          onHide={() => setShowPasswordModal(false)}
          outerdivClassname="notificationMain"
        >
          <ChangePassword onHide={() => setShowPasswordModal(false)} />
        </CustomSideBar>
      </div>
    </Scrollbars>
  );
};

const mapStateToProps = (state) => {
  return {
    kycStatus: state.job ?.kycStatus ?.Status

  };
};

const mapDispatchToProps = {
  logout,
  showToast,
  updateProfilePic,
  getKycStatus
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
