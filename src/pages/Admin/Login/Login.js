import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Controller } from "react-hook-form";
import Scrollbars from "react-custom-scrollbars";
import { withRouter, Link } from "react-router-dom";

import Message from "../../../util/message";
import Constant from "../../../util/constant";
import { showToast } from "../../../state/ducks/utils/operations";
import { get } from "lodash";
import logo from "../../../assets/images/trustpay1.png";
import HookForm from "../../../components/HookForm/HookForm";
import CheckBox from "../../../components/UI/CheckBox/CheckBox";
import TextField from "../../../components/UI/TextField/TextField";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import CustomDropdown from "../../../components/UI/CustomDropdown/CustomDropdown";
import useWindowDimension from "../../../hooks/useWindowDimension";
import {
  login,
  initializeSession,
} from "./../../../state/ducks/auth/operations";
import "./Login.scss";
import StorageService from "../../../services/localstorage.service";

const loginForm = {
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
  password: {
    name: "password",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.PASSWORDEMPTY,
      },
    },
  },
  selectvalue: {
    name: "selectvalue",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.MININVALID,
      },
      validate: (value) => value?._id !== "" || "error message", // <p>error message</p>
    },
  },
};
const itemsActivity = [
  {
    id: "1",
    value: "Super Admin",
  },
  {
    id: "2",
    value: "Securepay Staff",
  },
];

function AdminLogin(props) {
  const dimensions = useWindowDimension();
  const [job, setSelectedJob] = useState();
  const [form, setLoginForm] = React.useState();
  const [showPass, setShowPass] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  useEffect(() => {
    setRememberMe(StorageService.getSessionItem("admin_YataPay__remember_me"));
  }, []);
  const onFormSubmit = async (data) => {
    try {
      let param = {
        email: data.email,
        password: data.password,
        role: Number(get(data, "selectvalue.id", 1)),
      };
      setBusy(true);
      let response = await props.login(param);
      const { payload, message } = response;
      const { user, tokens } = payload;
      setBusy(true);
      props.initializeSession({ user, tokens });
      localStorage.setItem("loginRole", get(data, "selectvalue.id", 1));
      if (rememberMe) {
        StorageService.setSessionItem("admin_YataPay__email", data.email);
        StorageService.setSessionItem("admin_YataPay__password", data.password);
        StorageService.setSessionItem("admin_YataPay_Role", data.selectvalue);
        // localStorage.setSessionItem("loginRole", get(data, "selectvalue.id", 1));
        StorageService.setSessionItem("admin_YataPay__remember_me", rememberMe);

      } else {
        StorageService.removeSessionItem("admin_YataPay__email");
        StorageService.removeSessionItem("admin_YataPay__password");
        StorageService.removeSessionItem("admin_YataPay_Role");
      }
      // StorageService.setItem("admin_YataPay__remember_me", rememberMe);

      props.showToast({
        message: message,
        type: "success",
      });
      setTimeout(() => {
        // setBusy(false)
        props.history.push("/admin/verifyotp");
        // props.history.push("/admin/dashboard");
      }, 1000);
    } catch (err) {
      setBusy(false);
      props.showToast({
        message: get(err, "response.data.message", "somthing want wrong!!!"),
        type: "error",
      });
    }
  };
  return (
    <div className="admin_login_page">
      <Scrollbars
        className="loginScroll"
        style={{ height: dimensions.height + "px" }}
      >
        <div className="loginCenter">
          <div className="loginBox">
            <div className="logo">
              <img src={logo} alt="image" fluid="true" />
            </div>
            <h1>Login</h1>
            <p>Please provide below mentioned details to login.</p>
            <div className="tabMain">
              <div className="formSection">
                <HookForm
                  defaultForm={{
                    email: StorageService.getSessionItem("admin_YataPay__email"),
                    password: StorageService.getSessionItem("admin_YataPay__password"),
                    selectedValue: StorageService.getSessionItem("admin_YataPay_Role"),
                  }}
                  init={(form) => {
                    setLoginForm(form);
                    StorageService.getSessionItem("admin_YataPay__email") &&
                      form.trigger();
                  }}
                  onSubmit={(e) => onFormSubmit(e)}
                >
                  {(formMethod) => {
                    return (
                      <div className="form">
                        <TextField
                          formMethod={formMethod}
                          rules={loginForm.email.validate}
                          name={loginForm.email.name}
                          errors={formMethod?.errors}
                          autoFocus={true}
                          type="text"
                          placeholder="Email address"
                        />
                        <TextField
                          formMethod={formMethod}
                          rules={loginForm.password.validate}
                          name={loginForm.password.name}
                          errors={formMethod?.errors}
                          type={showPass ? "text" : "password"}
                          placeholder="Password"
                          iconClass={showPass ? "eye-hide" : "eye-show"}
                          // onKeyDown={onKeyDown}
                          onIconClick={() => setShowPass(!showPass)}
                        />
                        <Controller
                          as={<CustomDropdown />}
                          defaultValue={
                            StorageService.getSessionItem("admin_YataPay__remember_me")
                              ? StorageService.getSessionItem("admin_YataPay_Role")
                              : ""
                          }
                          control={formMethod.control}
                          rules={loginForm.selectvalue.validate}
                          errors={formMethod?.errors}
                          dropDownItems={itemsActivity}
                          placeholder="User Type"
                          selectedValue={job}
                          name={loginForm.selectvalue.name}
                        />
                        <div className="custombtnfield">
                          <CustomButton
                            type="submit"
                            title="Login"
                            disabled={!formMethod?.formState.isValid}
                            loading={busy}
                          />
                        </div>
                        <div className="checkboxRow">
                          <CheckBox
                            id="remember"
                            labelTitle="Remember me"
                            checked={rememberMe}
                            onCheckedChange={(checked) =>
                              setRememberMe(checked)
                            }
                          ></CheckBox>
                          <div className="forgotLink">
                            <Link to="/admin/forgot-password">
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </HookForm>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {
  showToast,
  login,
  initializeSession,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminLogin)
);
