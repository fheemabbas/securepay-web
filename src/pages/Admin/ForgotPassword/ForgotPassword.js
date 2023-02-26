import React from "react";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import { withRouter, Link } from "react-router-dom";
import { showToast } from "../../../state/ducks/utils/operations";

import logo from "../../../assets/images/trustpay1.png";
import HookForm from "../../../components/HookForm/HookForm";
import TextField from "../../../components/UI/TextField/TextField";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import Message from "../../../util/message";
import Constant from "../../../util/constant";
import useWindowDimension from "../../../hooks/useWindowDimension";

import "./ForgotPassword.scss";
import { forgotPassword } from "../../../state/ducks/auth/operations";

const forgotForm = {
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
};

function AdminForgotPassword(props) {
  const dimensions = useWindowDimension();
  const [form, setLoginForm] = React.useState();
  const [busy, setBusy] = React.useState(false);

  const onFormSubmit = async (data) => {
    try {
      const param = { email: data.email, role: 1 };
      setBusy(true);
      const response = await props.forgotPassword(param);
      setTimeout(() => {
        setBusy(false);
        props.showToast({ message: response.message, type: "success" });
        props.history.push("/login");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setBusy(false);
        props.showToast({
          message: error?.response?.data?.message,
          type: "error",
        });
        props.history.push("/login");
      }, 1000);
    }
  };

  return (
    <div className="admin_forgot_page">
      <Scrollbars
        className="forgotScroll"
        style={{ height: dimensions.height + "px" }}
      >
        <div className="forgotCenter">
          <div className="forgotBox">
            <div className="logo">
              <img src={logo} alt="logo" fluid="true" />
            </div>
            <h1>Forgot Password</h1>
            <p>
              Please enter your email address
            </p>
            <div className="formSection">
              <HookForm
                defaultForm={{}}
                init={(form) => setLoginForm(form)}
                onSubmit={onFormSubmit}
              >
                {(formMethod) => {
                  return (
                    <div className="form">
                      <TextField
                        formMethod={formMethod}
                        rules={forgotForm.email.validate}
                        name={forgotForm.email.name}
                        errors={formMethod?.errors}
                        autoFocus={true}
                        type="text"
                        placeholder="Email address"
                      />
                      <div className="custombtnfield">
                        <CustomButton
                          type="submit"
                          title="Submit"
                          disabled={!formMethod?.formState.isValid}
                          loading={busy}
                        />
                      </div>
                      <div className="back">
                        <Link className="newuser" to="/admin/login">
                          Back
                        </Link>
                      </div>
                    </div>
                  );
                }}
              </HookForm>
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
  forgotPassword,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminForgotPassword)
);
