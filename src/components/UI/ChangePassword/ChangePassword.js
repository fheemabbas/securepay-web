import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

import HookForm from '../../HookForm/HookForm';
import TextField from '../TextField/TextField';
import CustomButton from '../CustomButton/CustomButton';
import { showToast } from "../../../state/ducks/utils/operations";

import Message from '../../../util/message';
import Constant from "../../../util/constant";
import { get } from "lodash";
import './ChangePassword.scss';
import { changePassword } from '../../../state/ducks/auth/actions';

const changepassword = {

  oldpassword: {
    name: 'oldpassword',
    validate: {
      required: {
        value: true,
        message: ((Message.ERRORMESSAGE.OLDEMPTY))
      },

    },
  },
  password: {
    name: 'password',
    validate: {
      required: {
        value: true,
        message: ((Message.ERRORMESSAGE.NEWPASSOWRD))
      },

    },
  },
  confirmPassword: {
    name: 'confirmPassword',
    validate: {
      required: {
        value: true,
        message: ((Message.ERRORMESSAGE.CONFIRMPASSWORD))
      }
    }
  },

}
const multiErrorFields = [
  { length: "Your password must be at least 8 characters long and contain:" },
  { hasUppercase: "1 upper case character" },
  { hasLowercase: "1 lower case character " },
  { hasSpecialChar: "1 Special Character" },
  { hasNumbers: "1 Number" },
  { hasName: "Password should not contain your first and last name." },
];
const ChangePassword = (props) => {
  const [form, setLoginForm] = React.useState()
  const [showPass, setShowPass] = React.useState(false)
  const [showConfirmPass, setShowConfirmPass] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  const onFormSubmit = async (data) => {
    const userID = JSON.parse(window.localStorage.getItem("user"))._id
    let param = {
      oldPassword: data.oldpassword,
      newPassword: data.password
    }
    setBusy(true)
    props.changePassword(userID, param).then((res) => {
      setBusy(false)
      setTimeout(() => {
        setBusy(false)
        props.onHide()
        props.showToast({ message: res.message, type: 'success' })
      }, 1000)
    }).catch((err) => {
      setTimeout(() => {
        setBusy(false)
        props.showToast({ message: get(err, "response.data.message", "somthing want wrong!!!"), type: 'error' })
      }, 1000)
    })

  }


  return (
    <div className="changePasswordMain">
      <div className="changePasswordInner">
        <Scrollbars className="descriptionContent">
          <HookForm
            defaultForm={{}}
            init={form => setLoginForm(form)}
            onSubmit={onFormSubmit}>
            {(formMethod) => {
              return (
                <>
                  <div className="formmMain">
                    <TextField
                      formMethod={formMethod}
                      rules={changepassword.oldpassword.validate}
                      name={changepassword.oldpassword.name}
                      errors={formMethod?.errors}
                      type="text"
                      placeholder="Old Password*"
                      defaultValue={''}
                      type={"password"}
                    />
                    <TextField
                      defaultValue={''}
                      formMethod={formMethod}
                      type={showPass ? "text" : "password"}
                      rules={{
                        validate: {
                          length: (value) =>
                            (value && value.length >= 8) ||
                            "Password must be minimum of 8 characters",
                          hasUppercase: (value) =>
                            (value &&
                              value.match(
                                Constant.REGEX.UPPERCASE
                              )) ||
                            "1 upper case character",
                          hasLowercase: (value) =>
                            (value &&
                              value.match(
                                Constant.REGEX.LOWERCASE
                              )) ||
                            "1 lower case character",
                          hasSpecialChar: (value) =>
                            (value &&
                              value.match(Constant.REGEX.SPECIAL_CHAR)) ||
                            "1 Special Character",
                          hasNumbers: (value) =>
                            (value && value.match(Constant.REGEX.NUMBER)) ||
                            "1 Number",
                          hasName: (value) =>
                            (value &&
                              value.indexOf(formMethod.watch("lastName")) ===
                              -1 &&
                              value.indexOf(formMethod.watch("firstName")) ===
                              -1) ||
                            "Password should not contain your first and last name.",
                        },
                      }}
                      multiErrorFields={multiErrorFields}
                      name={changepassword.password.name}
                      errors={formMethod?.errors}
                      showHidePasswordNew={() => this.showHidePasswordNew()}
                      placeholder="Password*"
                      iconClass={showPass ? "eye-hide" : "eye-show"}
                      onChange={() => formMethod.watch("confirmPassword") && formMethod.trigger("confirmPassword")}
                      onIconClick={() => setShowPass(!showPass)}
                    />
                    <TextField
                      defaultValue={''}
                      formMethod={formMethod}
                      rules={{
                        required: {
                          value: true,
                          message: Message.ERRORMESSAGE.CONFIRMPASSWORD
                        },
                        validate: {
                          matchPassword: (value) => (value && value === formMethod.watch("password")) || Message.ERRORMESSAGE.CONFIRMINVALID,
                        },
                      }}
                      name={changepassword.confirmPassword.name}
                      errors={formMethod?.errors}
                      type={showConfirmPass ? "text" : "password"}
                      showHidePasswordConf={() => this.showHidePasswordConf()}
                      placeholder="Confirm Password*"
                      iconClass={showConfirmPass ? "eye-hide" : "eye-show"}
                      onChange={() => formMethod.watch("password") && formMethod.trigger("password")}
                      onIconClick={() => setShowConfirmPass(!showConfirmPass)}
                    />

                    <div className="updateBtn">
                      <CustomButton type="submit" title="Update" disabled={!formMethod?.formState.isValid} loading={busy} />
                    </div>
                  </div>
                </>

              )
            }}
          </HookForm>
        </Scrollbars>
      </div>
    </div >
  )
}



const mapStateToProps = (state) => {
  return {}
};
const mapDispatchToProps = {
  showToast, changePassword
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));

