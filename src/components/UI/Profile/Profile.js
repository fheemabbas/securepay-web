import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import "./Profile.scss";
import 'react-phone-input-2/lib/style.css';

import Message from "../../../util/message";
import Constant from "../../../util/constant";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { withRouter, Link } from "react-router-dom";
import HookForm from "../../../components/HookForm/HookForm";
import FileUpload from "../../../components/FileUpload/FileUpload";
import TextField from "../../../components/UI/TextField/TextField";
import useWindowDimension from "../../../hooks/useWindowDimension";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import { get } from "lodash";
import { logout } from "../../../state/ducks/auth/operations";
import { changePassword } from "../../../state/ducks/auth/actions";
import { showToast } from "../../../state/ducks/utils/actions";
import { getItem, setItem } from "../../../services/localstorage.service";
import { editStaffMember } from "../../../state/ducks/Job/actions";
const editProfile = {
  firstName: {
    name: "firstName",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.FULLNAMEEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  lastName: {
    name: "lastName",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.FULLNAMEEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  email: {
    name: "email",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.EMAILEMPTY,
      },
      pattern: {
        value: Constant.REGEX.email,
        message: Message.ERRORMESSAGE.EMAILINVALID,
      },
    },
  },

  phoneNumber: {
    name: "phoneNumber",
    validate: {
      maxLength: {
        value: 13,
        message: "Telephone number must be between 10-13 digits",
      },
      minLength: {
        value: 10,
        message: "Telephone number must be between 10-13 digits",
      },
    },
  },

  cunrtyCode: {
    name: "cunrtyCode",
    validate: {},
  },

  commission: {
    name: "commission",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.COMMISSIONEMPTY,
      },
      pattern: {
        value: Constant.REGEX.AMOUNT,
        message: Message.ERRORMESSAGE.MAXINVALID,
      },
    },
  },
};

const editCommission = {
  commission: {
    name: "commission",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.COMMISSIONEMPTY,
      },
      pattern: {
        value: Constant.REGEX.AMOUNT,
        message: Message.ERRORMESSAGE.MAXINVALID,
      },
    },
  },
  commissionone: {
    name: "commissionone",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.COMMISSIONEMPTY,
      },
      pattern: {
        value: Constant.REGEX.AMOUNT,
        message: Message.ERRORMESSAGE.MAXINVALID,
      },
    },
  },
  commissiontwo: {
    name: "commissiontwo",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.COMMISSIONEMPTY,
      },
      pattern: {
        value: Constant.REGEX.AMOUNT,
        message: Message.ERRORMESSAGE.MAXINVALID,
      },
    },
  },
};

const multiErrorFields = [
  { length: "Password must be minimum of 8 characters" },
  { hasUppercase: "1 Lower and Upper case" },
  { hasSpecialChar: "1 Special Character" },
  { hasNumbers: "1 Number" },
];

const changespassword = {
  newpassword: {
    name: "newpassword",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.NEWPASSOWRD,
      },
      validate: {
        hasUppercase: (value) =>
          (value && value.match(Constant.REGEX.LOWERCASEUPPERCASE)) || "",
        hasNumbers: (value) =>
          (value && value.match(Constant.REGEX.NUMBER)) || "",
        hasSpecialChar: (value) =>
          (value && value.match(Constant.REGEX.SPECIALCHARACTERS)) || "",
        length: (value) => (value && value.length >= 8) || "",
      },
    },
  },
  password: {
    name: "password",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.CONFIRMPASSWORD,
      },
    },
  },
  oldpassword: {
    name: "oldpassword",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.OLDEMPTY,
      },
    },
  },
};

const Profile = (props) => {
  const userInfo = getItem('user')
  // let [filters, setFilters] = useState(initFilters)
  const dimensions = useWindowDimension();
  const [headerHeight, setHeaderHeight] = useState(0);
  let { notifications, filterParams } = props;
  const [form, setLoginForm] = React.useState();
  const [EditCommissionform, setEditCommissionForm] = React.useState();
  const [busy, setBusy] = React.useState(false);
  let [image, setImage] = useState(userInfo ?.profilePic && process.env.REACT_APP_CLOUDINARY_URL + '/w_100,h_100,c_thumb,g_face,r_max/' + userInfo ?.profilePic);
  let [showImageName, setShowImageName] = useState();
  const [changeform, setResetForm] = useState();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [commissionEdit, setCommissionEdit] = useState(false);
  const [changePasswordPage, setChangePasswordPage] = useState(false);

  const onFormSubmit = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      props.showToast({ message: "good", type: "success" });
    }, 1000);
  };
  const onEditFormSubmit = async (data) => {
    let param = new FormData();
    showImageName && param.append('profilePic', showImageName);
    param.append('email', data.email);
    param.append('firstName', data.firstName);
    param.append('lastName', data.lastName);
    param.append('dialCode', data.cunrtyCode.includes('+') ? data.cunrtyCode : `+${data.cunrtyCode}`);
    param.append('number', data.phoneNumber);

    setBusy(true)
    try {
      const res = await props.editStaffMember(userInfo ?._id, param)
      setBusy(false)
      setItem('user', res.payload)
      setProfileEdit(false)
      props.showToast({ message: res.message, type: 'success' })
    } catch (error) {
      setBusy(false)
      props.showToast({ message: error ?.response ?.data ?.message, type: 'success' })
    }
  };
  const onCommissionFormSubmit = async (data) => {
    setBusy(true)
    try {
      let param = {
        commission: {
          commission: data.commission,
          commission1: data.commissionone,
          commission2: data.commissiontwo,
        }
      }
      const res = await props.editStaffMember(userInfo ?._id, param)
      setBusy(false)
      setItem('user', res.payload)
      setCommissionEdit(false)
      props.showToast({ message: "Commission updated successfully.", type: 'success' })
    } catch (error) {
      setBusy(false)
      props.showToast({ message: error ?.response ?.data ?.message, type: 'success' })
    }
  }
  const onChangePasswordFormSubmit = async (data) => {
    const userID = JSON.parse(window.localStorage.getItem("user"))._id
    let param = {
      oldPassword: data && data.oldpassword,
      newPassword: data && data.password
    }
    setBusy(true)

    props.changePassword(userID, param).then((res) => {
      setBusy(false)
      setBusy(false)
      setChangePasswordPage(false)
      props.showToast({ message: res.message, type: 'success' })

    }).catch((err) => {
      setTimeout(() => {
        setBusy(false)
        props.showToast({ message: get(err, "response.data.message", "somthing want wrong!!!"), type: 'error' })
      },
        1000)
    })

  }
  const onKeyDown = (e) => {

    e.keyCode === 13 && onChangePasswordFormSubmit();
  };

  const onImageChange = (acceptedFiles) => {
    setShowImageName(acceptedFiles[0]);
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setImage(event.target.result);
    });
    reader.readAsDataURL(acceptedFiles[0]);
  };
  useEffect(() => {
    setHeaderHeight(
      document.getElementsByClassName("headerAdmin")[0].offsetHeight
    );
  });
  return (
    <div className="ProfilePageMain">
      <div className="profile_inner">
        {!profileEdit && !commissionEdit && !changePasswordPage && (
          <div className="page_title">Profile</div>
        )}
        {profileEdit && <div className="page_title">Edit Profile</div>}
        {commissionEdit && <div className="page_title">Edit Commission</div>}
        {changePasswordPage && (
          <div className="page_title">Change Password</div>
        )}
        <Scrollbars
          className="descriptionContent"
          style={{ height: dimensions.height - headerHeight - 98 + "px" }}
        >
          {!profileEdit && !commissionEdit && !changePasswordPage && (
            <div className="inner_box">
              <div className="user_img">
                <img src={process.env.REACT_APP_CLOUDINARY_URL + '/w_100,h_100,c_thumb,r_max/' + userInfo ?.profilePic} />
              </div>
              <div className="profile_txt">{userInfo ?.firstName + " " + userInfo ?.lastName}</div>
              <div className="profile_txt">{userInfo ?.email}</div>
              <div className="profile_txt">{userInfo ?.dialCode + " " + userInfo ?.number}</div>
              <button className="editbtn" onClick={() => setProfileEdit(true)}>
                Edit
              </button>
              {
                userInfo ?.role === 1 &&
                  <div className="card_box">
                    <div className="payment_txt">
                      % of Payments under £1,100 - {userInfo ?.commission ?.commission}%
                </div>
                    <div className="payment_txt">
                      % of Payments under £5100 - {userInfo ?.commission ?.commission1}%
                </div>
                    <div className="payment_txt">
                      % of Payments under £50,000 - {userInfo ?.commission ?.commission2}%
                </div>
                    <button
                      className="paymenteditbtn"
                      onClick={() => setCommissionEdit(true)}
                    >
                      Edit
                </button>
                  </div>
              }
              <div className="btnCustomRow">
                <button
                  className="btn_link"
                  onClick={() => setChangePasswordPage(true)}
                >
                  Change Password
                </button>
                <Link
                  className="btn_link logout"
                  to="/admin/login"
                  onClick={() => props.logout()}
                >
                  Log out
                </Link>
              </div>
            </div>
          )}
          {profileEdit && (
            <div className="formSection edit_profile">
              <HookForm
                defaultForm={{
                  firstName: userInfo ?.firstName,
                  lastName: userInfo ?.lastName,
                  email: userInfo ?.email,
                  cunrtyCode: userInfo ?.dialCode,
                  phoneNumber: userInfo ?.number
                }}
                init={(form) => setLoginForm(form)}
                onSubmit={onEditFormSubmit}
              >
                {(formMethod) => {
                  return (
                    <div className="form">
                      <div className="fileInput">
                        <Controller
                          defaultValue=""
                          render={({ onChange }) => (
                            <FileUpload
                              onDrop={(acceptedFiles) => {
                                onChange(acceptedFiles);
                                onImageChange(acceptedFiles);
                              }}
                              accept='image/jpg,image/png'
                            >
                              <div className="imgBoxEmpty">
                                {image ? (
                                  <>
                                    <div className="uploadedImg">
                                      <img src={image} alt="viewImg" />
                                    </div>
                                  </>
                                ) : (
                                    <>
                                      <div className="uploadedImg">
                                        <div className="icon-user"></div>
                                      </div>
                                    </>
                                  )}
                              </div>
                              <div className="change_txt">Change</div>
                            </FileUpload>
                          )}
                          name="image"
                          control={formMethod.control}
                        />
                      </div>
                      <TextField
                        formMethod={formMethod}
                        rules={editProfile.firstName.validate}
                        name={editProfile.firstName.name}
                        errors={formMethod ?.errors}
                        autoFocus={true}
                        type="text"
                        placeholder="Firstname"
                      />
                      <TextField
                        formMethod={formMethod}
                        rules={editProfile.lastName.validate}
                        name={editProfile.lastName.name}
                        errors={formMethod ?.errors}
                        autoFocus={true}
                        type="text"
                        placeholder="lastname"
                      />
                      <TextField
                        formMethod={formMethod}
                        rules={editProfile.email.validate}
                        name={editProfile.email.name}
                        errors={formMethod ?.errors}
                        type="text"
                        placeholder="Email"
                        disabled
                      />
                      <div className="countryPhoneGroup">
                        <Controller

                          control={formMethod ?.control}
                          name={editProfile.cunrtyCode.name}
                          rules={editProfile.cunrtyCode.validate}
                          render={(props) => (
                            <PhoneInput
                              country={"gb"}
                              disableSearchIcon="false"
                              placeholder="+44"
                              enableSearch="true"
                              value={formMethod.watch(
                                editProfile.cunrtyCode.name
                              )}
                              onChange={props.onChange}
                            />
                          )} />
                        <TextField
                          redStar={true}
                          noTextfield={true}
                          onChange={(e) => this.onPhoneChange(formMethod, e)}
                          maskType="9999999999999"
                          formMethod={formMethod}
                          rules={editProfile.phoneNumber.validate}
                          name={editProfile.phoneNumber.name}
                          errors={formMethod ?.errors}
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className="signfield">
                        <CustomButton
                          type="submit"
                          title="Update"
                          disabled={!formMethod ?.formState.isValid}
                          loading={busy}
                        />
                        <Link
                          to="#"
                          className="cancelfield"
                          onClick={() => setProfileEdit(false)}
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  );
                }}
              </HookForm>
            </div>
          )}
          {commissionEdit && (
            <div className="formSection edit_commission">
              <HookForm
                defaultForm={{
                  commission: userInfo ?.commission ?.commission,
                  commissionone: userInfo ?.commission ?.commission1,
                  commissiontwo: userInfo ?.commission ?.commission2
                  
                }}
                init={(EditCommissionform) =>
                  setEditCommissionForm(EditCommissionform)
                }
                onSubmit={onCommissionFormSubmit}
              >
                {(formMethod) => {
                  return (
                    <div className="form">
                      <TextField
                        formMethod={formMethod}
                        rules={editCommission.commission.validate}
                        name={editCommission.commission.name}
                        errors={formMethod ?.errors}
                        autoFocus={false}
                        type="text"
                        placeholder="% of Payments under  £1,100 - 15%"
                      />
                      <TextField
                        formMethod={formMethod}
                        rules={editCommission.commissionone.validate}
                        name={editCommission.commissionone.name}
                        errors={formMethod ?.errors}
                        autoFocus={false}
                        type="text"
                        placeholder="% of Payments under  £5100 - 10%"
                      />
                      <TextField
                        formMethod={formMethod}
                        rules={editCommission.commissiontwo.validate}
                        name={editCommission.commissiontwo.name}
                        errors={formMethod ?.errors}
                        autoFocus={false}
                        type="text"
                        placeholder="% of Payments under  £50,000 - 5%"
                      />

                      <div className="signfield">
                        <CustomButton
                          type="submit"
                          title="Update"
                          disabled={!formMethod ?.formState.isValid}
                          loading={busy}
                        />
                        <Link
                          to="#"
                          className="cancelfield"
                          onClick={() => setCommissionEdit(false)}
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  );
                }}
              </HookForm>
            </div>
          )}
          {changePasswordPage && (
            <div className="formSection change_password">
              <HookForm
                defaultForm={{}}
                init={(changeform) => setResetForm(changeform)}
                onSubmit={onChangePasswordFormSubmit}
              >
                {(formMethod) => {
                  return (
                    <div className="form">
                      <TextField
                        formMethod={formMethod}
                        rules={changespassword.oldpassword.validate}
                        multiErrorFields={multiErrorFields}
                        errors={formMethod ?.errors}
                        name={changespassword.oldpassword.name}
                        iconError={formMethod ?.errors}
                        type={"password"}
                        placeholder="Old Password"
                        // iconClass={showOldPass ? "eye-hide" : "eye-show"}

                        onChange={() =>
                          formMethod.watch("password") &&
                          formMethod.trigger("password")
                        }
                        onIconClick={() => setShowOldPass(!showOldPass)}
                        autoFocus={true}
                        defaultValue={""}
                      />
                      <TextField
                        formMethod={formMethod}
                        rules={changespassword.newpassword.validate}
                        multiErrorFields={multiErrorFields}
                        errors={formMethod ?.errors}
                        name={changespassword.newpassword.name}
                        iconError={formMethod ?.errors}
                        type={showPass ? "text" : "password"}
                        placeholder="New Password"
                        iconClass={showPass ? "eye-hide" : "eye-show"}

                        onChange={() =>
                          formMethod.watch("password") &&
                          formMethod.trigger("password")
                        }
                        onIconClick={() => setShowPass(!showPass)}
                        defaultValue={""}
                      />
                      <TextField
                        formMethod={formMethod}
                        rules={{
                          required: {
                            value: true,
                            message: "CONFIRM_PASSWORD_REQUIRED",
                          },
                          validate: {
                            matchPassword: (value) =>
                              (value &&
                                value === formMethod.watch("newpassword")) ||
                              "PASS_NOT_MATCH",
                          },
                        }}
                        name={changespassword.password.name}
                        errors={formMethod ?.errors}
                        iconError={formMethod ?.errors}
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Confirm Password"
                        iconClass={
                          showConfirmPass ? "eye-hide" : "eye-show"
                        }
                        onChange={() =>
                          formMethod.watch("newpassword") &&
                          formMethod.trigger("newpassword")
                        }
                        onIconClick={() => setshowConfirmPass(!showConfirmPass)}
                      />

                      <div className="signfield">
                        <CustomButton
                          type="submit"
                          title="Update"
                          disabled={!formMethod ?.formState.isValid}
                          loading={busy}
                        />
                        <Link
                          to="#"
                          className="cancelfield"
                          onClick={() => setChangePasswordPage(false)}
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>

                  );
                }}
              </HookForm>
            </div>
          )}
        </Scrollbars>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  logout, changePassword, showToast, editStaffMember
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
