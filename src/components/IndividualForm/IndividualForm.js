import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { withRouter } from "react-router-dom";
import StorageService from "./../../services/localstorage.service";
import { showToast } from "../../state/ducks/utils/operations";
import HookForm from "./../HookForm/HookForm";
import TextField from "./../UI/TextField/TextField";
import CalenderCustom from "./../UI/CalenderCustom/CalenderCustom";
import CustomButton from "./../UI/CustomButton/CustomButton";
import FileUpload from "../../components/FileUpload/FileUpload";

import Autocomplete from "react-autocomplete";
import countryListJSON from "../../util/countryname.js";
import Message from "../../util/message";
import Constant from "../../util/constant";

import "./IndividualForm.scss";
import Label from "../UI/Label/Label";
import moment from "moment";
import { signupWithEmailProcess } from "../../state/ducks/auth/actions";
import { get, filter } from "lodash";
import 'react-phone-input-2/lib/style.css'
const multiErrorFields = [
  { length: "Your password must be at least 8 characters long and contain:" },
  { hasUppercase: "1 upper case character" },
  { hasLowercase: "1 lower case character " },
  { hasSpecialChar: "1 Special Character" },
  { hasNumbers: "1 Number" },
  { hasName: "Password should not contain your first and last name." },
];

const individual = {
  countryResidence: {
    name: "countryResidence",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.MININVALID,
      },
      validate: (value) => value?._id !== "" || "error message", // <p>error message</p>
    },
  },
  nationality: {
    name: "nationality",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.MININVALID,
      },
      validate: (value) => value?._id !== "" || "error message", // <p>error message</p>
    },
  },
  firstName: {
    name: "firstName",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.FIRSTNAMEEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHABETCOMMA,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  lastName: {
    name: "lastName",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.LASTNAMEEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHABETCOMMA,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  birthDate: {
    name: "birthDate",
    validate: {
      required: {
        value: true,
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
  password: {
    name: "password",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.NEWPASSOWRD,
      },
      validate: {
        // length: (value) => (value && value.length >= 8) || 'Password must be minimum of 8 characters',
        // hasUppercase: (value) => (value && value.match(Constant.REGEX.LOWERCASE_UPPERCASE)) || '1 Lower and Uppercase',
        // hasSpecialChar: (value) => (value && value.match(Constant.REGEX.SPECIAL_CHAR)) || '1 Special Character',
        // hasNumbers: (value) => (value && value.match(Constant.REGEX.NUMBER)) || '1 Number',
      },
    },
  },
  confirmPassword: {
    name: "confirmPassword",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.CONFIRMPASSWORD,
      },
    },
  },
  phoneNumber: {
    name: "phoneNumber",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.PHONEEMPTY,
      },
      maxLength: {
        value: 13,
        message: Message.ERRORMESSAGE.PHONEVALID,
      },
      minLength: {
        value: 10,
        message: Message.ERRORMESSAGE.PHONEVALID,
      },
    },
  },
  cunrtyCode: {
    name: "cunrtyCode",
    validate: {},
  },
  houseName: {
    name: "houseName",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.HOUSENAMEEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  address: {
    name: "address",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.ADDRESSEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  address2: {
    name: "address2",
    validate: {

      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  townCity: {
    name: "townCity",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.TOWNCITYEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  region: {
    name: "region",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.REGIONEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  postalCode: {
    name: "postalCode",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.POSTALCODEEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMER,
        message: Message.ERRORMESSAGE.SPECIALCHARNOTVALID,
      },
      maxLength: { value: 10, message: "Must be 10 digits " },
    },
  },
  accountNumber: {
    name: "accountNumber",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.ACCOUNTNUMBEREMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
      // maxLength: { value: 16, message: "Must be 8 digits long" },
      minLength: { value: 8, message: "Account number must be 8 digits long." },
    },
  },
  sortCode: {
    name: "sortCode",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.SORTCODEEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.SORTCODEVAILID,
      },
      maxLength: { value: 6, message: "Must be 6 digits " },
      minLength: { value: 6, message: "Must be 6 digits " },
    },
  },
  country: {
    name: "country",
    validate: {},
  },
};

const IndividualForm = (props) => {
  // eslint-disable-next-line
  const { state } = props.location
  const [form, setLoginForm] = React.useState();
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [step, setStep] = useState(props.location.state && props.location.state.step || 1);
  let [image, setImage] = useState();
  const [countryName, setCountryName] = useState(state && state.user && state.user.country && filter(countryListJSON, (i) => { return i.id === state.user.country })[0].name || "");
  const [countryFlag, setCountryFlag] = useState("");
  // eslint-disable-next-line
  const [countryList, setCountryList] = useState(countryListJSON);
  let [showImageName, setShowImageName] = useState();
  const [isError, setisError] = useState(false)
  var file_size
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear() - 18;
  const onImageChange = (acceptedFiles) => {
    file_size = (acceptedFiles[0].name).size;
    if (acceptedFiles[0].size >= 32 * 1024 && acceptedFiles[0].size < 7340032) {
      setisError(false)
      setShowImageName(acceptedFiles[0]);
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        setImage(event.target.result);
      });
      reader.readAsDataURL(acceptedFiles[0]);
    } else {
      setisError(true)
    }

  };
  const onKeyDown = (e, formMethod, value, skip = true) => {
    e.keyCode === 13 && onClickFirstStep(formMethod, value, skip);
  };

  const onFormSubmit = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      props.showToast({ message: "good", type: "success" });
    }, 1000);
  };
  const onClickFirstStep = async (formMethod, value, skip = true, final = true) => {
    let param;
    if (skip) {
      switch (step) {
        case 1:
          param = {
            firstName: formMethod.watch("firstName"),
            lastName: formMethod.watch("lastName"),
            registerStep: 2,
          };
          break;
        case 2:
          param = {
            dob: moment(formMethod.watch("birthDate")).format("yyyy-MM-DD"),
            registerStep: 3,
          };
          break;
        case 3:
          param = {
            email: formMethod.watch("email"),
            registerStep: 4,
          };
          break;
        case 4:
          param = {
            password: formMethod.watch("password"),
            registerStep: 5,
          };
          break;
        case 5:
          param = {
            dialCode: formMethod.watch("cunrtyCode"),
            number: formMethod.watch("phoneNumber"),
            registerStep: 6,
          };
          break;
        case 6:
          param = {
            country: countryListJSON.filter((countryname) => countryname.name === countryName)[0].id,
            registerStep: 7,
          };
          break;
        case 7:
          param = {
            houseNo: formMethod.watch("houseName"),
            addressLine1: formMethod.watch("address"),
            addressLine2: formMethod.watch("address2"),
            city: formMethod.watch("townCity"),
            region: formMethod.watch("region"),
            postalCode: formMethod.watch("postalCode"),
            registerStep: 8,
          };
          break;
        case 8:
          param = {
            accountNumber: formMethod.watch("accountNumber"),
            sortCode: formMethod.watch("sortCode"),
            registerStep: 10,
          };
          break;
        case 9:
          param = new FormData();
          param.append("identityProof", showImageName);
          // param.append("imageBase64", image);
          param.append("registerStep", 11);
          break;
        case 10:
          param = {
            registerStep: 13,
          };
          break;

        default:
          setStep(value);
      }
    }
    if (skip) {

      try {
        setBusy(true);

        const signupID = StorageService.getItem("sign-up_ID")
        const response = await props.signupWithEmailProcess(
          param,
          signupID
        );

        if (!final) {
          if (props.location.state && props.location.state.isLogin) {
            props.history.push("/dashboard")
            window.localStorage.removeItem("sign-up_ID")
          } else {
            setBusy(false)
            setTimeout(() => {
              props.history.push("/login")
              window.localStorage.removeItem("sign-up_ID")

              props.showToast({ message: response.message, type: "success", time: 60000 });
            }, 1000);
          }
        } else {
          setStep(value)
          setBusy(false)
        }
      } catch (error) {
        setBusy(true);
        setTimeout(() => {
          setBusy(false);
          props.showToast({
            message: error?.response?.data?.message,
            type: "error",
          });
        }, 1000);
      }
    } else {
      setStep(value);
    }
  };
  const CustomDatepicker = ({ value, onClick }) => (
    <button type="button" className="custom-input" onClick={onClick}>
      {value ? value : <span className="birth_Placeholder">Date of birth</span>}
    </button>
  );
  return (
    <>
      <HookForm
        defaultForm={{}}
        autocomplete="off"
        init={(form) => setLoginForm(form)}
        onSubmit={onFormSubmit}
      >
        {(formMethod) => {
          const step1 = formMethod.watch("firstName") &&
            formMethod?.errors.firstName === undefined &&
            formMethod.watch("lastName") &&
            formMethod?.errors.lastName === undefined;
          const step2 = formMethod.watch("email") &&
            formMethod?.errors.email === undefined;

          const step4 = formMethod.watch("password") &&
            formMethod?.errors.password === undefined &&
            formMethod.watch("confirmPassword") &&
            formMethod?.errors.confirmPassword === undefined;

          const step5 = formMethod.watch("phoneNumber") &&
            formMethod?.errors.phoneNumber === undefined &&
            formMethod.watch("cunrtyCode") &&
            formMethod?.errors.cunrtyCode === undefined;

          const step9 = formMethod.watch("accountNumber") &&
            formMethod?.errors.accountNumber === undefined &&
            formMethod.watch("sortCode") &&
            formMethod?.errors.sortCode === undefined;
          const step7 = formMethod.watch("houseName") &&
            formMethod?.errors.houseName === undefined &&
            formMethod.watch("address") &&
            formMethod?.errors.address === undefined &&
            formMethod?.errors.address2 === undefined &&
            formMethod.watch("townCity") &&
            formMethod?.errors.townCity === undefined &&
            formMethod.watch("region") &&
            formMethod?.errors.region === undefined &&
            formMethod.watch("postalCode") &&
            formMethod?.errors.postalCode === undefined
          return (
            <>
              <div className="formIndividual">
                <div className="formleft">
                  <section
                    className={step === 1 ? "showStep2 active1" : "showStep2"}
                  >
                    <Label className='form-title' title='We just need to ask a few questions to verify your identity so everyone can transact in confidence.' />
                    {/* <Label
                      className='form-title'
                      title='We just need to ask a few questions to verify your identity to meet our anti-money laundering requirements.'
                    /> */}
                    <Label
                      className="inputLabel"
                      title="What's your name?"
                    ></Label>
                    <TextField
                      type="text"
                      placeholder="First name"
                      formMethod={formMethod}
                      autoComplete="FirstName"
                      defaultValue={state && state.user && state.user.firstName}
                      rules={individual.firstName.validate}
                      name={individual.firstName.name}
                      errors={formMethod?.errors} />
                    <TextField
                      type="text"
                      placeholder="Last name"
                      // autoComplete="LastName"
                      id="LastName"
                      formMethod={formMethod}
                      defaultValue={state && state.user && state.user.lastName}
                      rules={individual.lastName.validate}
                      name={individual.lastName.name}
                      errors={formMethod?.errors}
                      onKeyDown={(e) => step1 && onKeyDown(e, formMethod, 2)}
                    />
                    <div className="fieldText">
                      Next we'll need your date of birth
                    </div>

                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => props.history.push("/signup-email")}
                      />
                      {step1 && (
                        <CustomButton
                          type="button"
                          title="Next"
                          loading={busy}
                          onClick={() => onClickFirstStep(formMethod, 2)}
                        />
                      )}
                    </div>
                  </section>
                  <section
                    className={step === 2 ? "showStep2 active2" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="What's your date of birth?"
                    ></Label>
                    <div className="calenderMain">
                      <Controller
                        defaultValue={state && state.user && state.user.dob && new Date(state.user.dob) || ""}
                        control={formMethod?.control}
                        rules={individual.birthDate.validate}
                        name={individual.birthDate.name}
                        render={(props) => (
                          <CalenderCustom
                            selected={props.value}
                            onChange={(e) => props.onChange(e)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Date of birth"
                            customInput={<CustomDatepicker />}
                            showYearDropdown={true}
                            showMonthDropdown={true}
                            maxDate={
                              new Date(
                                currentYear +
                                "/" +
                                currentMonth +
                                "/" +
                                currentDate
                              )
                            }
                            currantYear={currentYear}
                          />
                        )}
                      />
                    </div>
                    <div className="fieldText">
                      Next we'll need your email address
                      <span>(Don't worry, we wont send you any spam)</span>
                    </div>

                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(1)}
                      />
                      {formMethod.watch("birthDate") && (
                        <CustomButton
                          type="button"
                          title="Next"
                          loading={busy}
                          onClick={() => onClickFirstStep(formMethod, 3)}
                        />
                      )}
                    </div>
                  </section>
                  <section
                    className={step === 3 ? "showStep2 active3" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="What's your email address?"
                    ></Label>
                    <TextField
                      formMethod={formMethod}
                      rules={individual.email.validate}
                      name={individual.email.name}
                      errors={formMethod?.errors}
                      defaultValue={state && state.user && state.user.email}
                      disabled={state && state.user && state.user.email}
                      type="text"
                      autoComplete="Email"
                      placeholder="Email address "
                      onKeyDown={(e) => step2 && onKeyDown(e, formMethod, 4)}
                    />
                    <div className="fieldText">
                      Next we'll set up your password
                    </div>

                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(2)}
                      />
                      {step2 && (
                        <CustomButton
                          type="button"
                          loading={busy}
                          title="Next"
                          onClick={() => onClickFirstStep(formMethod, 4)}
                        />
                      )}
                    </div>
                  </section>
                  <section
                    className={step === 4 ? "showStep2 active4" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="Create a password"
                    ></Label>
                    <TextField
                      defaultValue={""}
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
                      name={individual.password.name}
                      errors={formMethod?.errors}
                      showHidePasswordNew={() => this.showHidePasswordNew()}
                      placeholder="Password"
                      iconClass={showPass ? "eye-hide" : "eye-show"}
                      onChange={() =>
                        formMethod.watch("confirmPassword") &&
                        formMethod.trigger("confirmPassword")
                      }
                      onKeyDown={onKeyDown}
                      onIconClick={() => setShowPass(!showPass)}
                    />
                    <TextField
                      defaultValue={""}
                      formMethod={formMethod}
                      rules={{
                        required: {
                          value: true,
                          message: Message.ERRORMESSAGE.CONFIRMPASSWORD,
                        },
                        validate: {
                          matchPassword: (value) =>
                            (value && value === formMethod.watch("password")) ||
                            Message.ERRORMESSAGE.CONFIRMINVALID,
                        },
                      }}
                      name={individual.confirmPassword.name}
                      errors={formMethod?.errors}
                      type={showConfirmPass ? "text" : "password"}
                      showHidePasswordConf={() => this.showHidePasswordConf()}
                      placeholder="Confirm password"
                      iconClass={showConfirmPass ? "eye-hide" : "eye-show"}
                      onKeyDown={(e) => step4 && onKeyDown(e, formMethod, 5)}

                      onChange={() =>
                        formMethod.watch("password") &&
                        formMethod.trigger("password")
                      }
                      onIconClick={() => setShowConfirmPass(!showConfirmPass)}
                    />
                    <div className="fieldText">
                      Next we'll need your phone number
                    </div>

                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(3)}
                      />
                      {step4 && (
                        <CustomButton
                          loading={busy}
                          type="button"
                          title="Next"
                          onClick={() => onClickFirstStep(formMethod, 5)}
                        />
                      )}
                    </div>
                  </section>
                  <section
                    className={step === 5 ? "showStep2 active5" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="What's your phone number?"
                    ></Label>
                    <div className="countryPhoneGroup">
                      <Controller
                        defaultValue={get(state, 'user.dialCode', '44')}
                        control={formMethod?.control}
                        name={individual.cunrtyCode.name}
                        rules={individual.cunrtyCode.validate}
                        render={(props) => (
                          <PhoneInput
                            placeholder="+44"
                            enableSearch="true"
                            disableSearchIcon="false"
                            country={"gb"}
                            value={formMethod.watch(individual.cunrtyCode.name)}
                            onChange={props.onChange}
                          />
                        )}
                      />
                      <TextField
                        redStar={true}
                        noTextfield={true}
                        onChange={(e) => this.onPhoneChange(formMethod, e)}
                        maskType="9999999999999"
                        formMethod={formMethod}
                        rules={individual.phoneNumber.validate}
                        name={individual.phoneNumber.name}
                        errors={formMethod?.errors}
                        placeholder="Phone number"
                        onKeyDown={(e) => step5 && onKeyDown(e, formMethod, 6)}
                        defaultValue={get(state, 'user.number', '')}
                      />
                    </div>
                    <div className="fieldText">
                      Next we'll need your nationality
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(4)}
                      />
                      {step5 && (
                        <CustomButton
                          loading={busy}
                          type="button"
                          title="Next"
                          onClick={() => onClickFirstStep(formMethod, 6)}
                        />
                      )}
                    </div>
                  </section>
                  <section
                    className={step === 6 ? "showStep2 active6" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="What's your nationality?"
                    ></Label>
                    <div className="dropdownSection firstDropDown">
                      <div
                        className={
                          countryFlag
                            ? "country_Selection filled"
                            : "country_Selection"
                        }
                      >
                        <Controller
                          defaultValue=""
                          control={formMethod?.control}
                          name={individual.country.name}
                          rules={individual.country.validate}
                          render={({ onChange }) => (
                            <>
                              <p className="flaimg">{countryFlag}</p>
                              <button className={countryName ? "close-icon iconEmpty" : "close-icon"} type="reset" onClick={() => setCountryName("")}></button>

                              <Autocomplete
                                inputProps={{ placeholder: "Nationality" }}
                                getItemValue={(item) => item.name}
                                shouldItemRender={(item, value) =>
                                  item?.name
                                    ?.toLowerCase()
                                    .indexOf(value.toLowerCase()) > -1
                                }
                                items={countryList}

                                renderItem={(item, isHighlighted) => (
                                  <div
                                    className={
                                      isHighlighted
                                        ? "country-list active"
                                        : "country-list"
                                    }
                                  >

                                    <span>{item.emoji}</span>
                                    {item.name}
                                  </div>
                                )}
                                value={countryName}
                                onChange={(e) => {
                                  if (e.target.value === "") {
                                    setCountryFlag("");
                                  }
                                  setCountryName(e.target.value);
                                }}
                                onSelect={(val, item) => {
                                  setCountryName(val);
                                  setCountryFlag(item.emoji);
                                }}
                                menuStyle={{
                                  maxHeight: 210,
                                  overflowY: "auto",
                                  backgroundColor: "#ffffff",
                                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                  borderRadius: 4,
                                }}
                                wrapperStyle={{ display: "block" }}
                              />
                            </>
                          )}
                        />
                      </div>
                    </div>
                    <div className="fieldText">
                      Next we'll need your home address
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(5)}
                      />
                      {countryName && <CustomButton
                        loading={busy}
                        type="button"
                        title="Next"
                        onClick={() => onClickFirstStep(formMethod, 7)}
                      />}
                    </div>
                  </section>
                  <section
                    className={step === 7 ? "showStep2 active7" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="What's your address?"
                    ></Label>
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.houseNo', '')}
                      formMethod={formMethod}
                      rules={individual.houseName.validate}
                      name={individual.houseName.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 8)}
                      placeholder="House name"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.addressLine1', '')}
                      formMethod={formMethod}
                      rules={individual.address.validate}
                      name={individual.address.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 8)}
                      placeholder="Address line 1"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.addressLine2', '')}
                      formMethod={formMethod}
                      rules={individual.address2.validate}
                      name={individual.address2.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 8)}
                      placeholder="Address line 2"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.city', '')}
                      formMethod={formMethod}
                      rules={individual.townCity.validate}
                      name={individual.townCity.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 8)}
                      placeholder="Town/city"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.region', '')}
                      formMethod={formMethod}
                      rules={individual.region.validate}
                      name={individual.region.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 8)}
                      type="text"
                      placeholder="Region"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.postalCode', '')}
                      formMethod={formMethod}
                      rules={individual.postalCode.validate}
                      name={individual.postalCode.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Postcode"
                      onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 8)}
                    />
                    <div className="fieldText">
                      Next we'll need your bank details
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(6)}
                      />
                      {step7 && (
                        <CustomButton
                          loading={busy}
                          type="button"
                          title="Next"
                          onClick={() => onClickFirstStep(formMethod, 8)}
                        />
                      )}
                    </div>
                  </section>

                  <section
                    className={step === 8 ? "showStep2 active7" : "showStep2"}
                  >
                    <button
                      type="button"
                      onClick={() => onClickFirstStep(formMethod, 9, false)}
                      className="skip_txt"
                    >
                      skip
                    </button>
                    <Label
                      className="inputLabel"
                      title="What are your bank details?"
                    ></Label>
                    <TextField
                      formMethod={formMethod}
                      rules={individual.accountNumber.validate}
                      name={individual.accountNumber.name}
                      errors={formMethod?.errors}
                      noTextfield={true}
                      maskType="9999999999999999999999999"
                      autoFocus={true}
                      type="text"
                      defaultValue={get(state, 'user.bankInfo.accountNumber', '')}
                      placeholder="Account number"
                    />
                    <TextField
                      formMethod={formMethod}
                      rules={individual.sortCode.validate}
                      name={individual.sortCode.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      defaultValue={get(state, 'user.bankInfo.sortCode', '')}
                      placeholder="Sort code"
                      onKeyDown={(e) => step9 && onKeyDown(e, formMethod, 9)}
                    />
                    <div className="fieldText">
                      Next we'll need a photo of your ID
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(7)}
                      />
                      {step9 && (
                        <CustomButton
                          loading={busy}
                          type="button"
                          title="Next"
                          onClick={() => onClickFirstStep(formMethod, 9)}
                        />
                      )}
                    </div>
                  </section>
                  <section
                    className={step === 9 ? "showStep2 active8" : "showStep2"}
                  >
                    <button
                      type="button"
                      onClick={() => onClickFirstStep(formMethod, 10, false)}
                      className="skip_txt"
                    >
                      skip
                    </button>
                    <Label
                      className="inputLabel"
                      title="Document upload"
                    ></Label>
                    <div className="sub_txt">
                      To confirm your identity, please upload a photo of your
                      driver's licence or passport
                    </div>
                    <div className="fileInput">
                      <Controller
                        defaultValue=""
                        render={({ onChange }) => (<>
                          <FileUpload
                            onDrop={(acceptedFiles) => {
                              onChange(acceptedFiles);
                              onImageChange(acceptedFiles);
                            }}
                            accept='image/jpeg,image/jpg, image/png'
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
                                    <div className="uploadtxt">
                                      Drop files here or click to upload.
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </FileUpload>
                          {isError && <div className="errormessage">{Message.ERRORMESSAGE.SUPPORTEDFILESIZE}</div>}

                        </>
                        )}
                        name="image"
                        control={formMethod.control}
                      />
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(8)}
                      />
                      <CustomButton
                        type="button"
                        loading={busy}
                        disabled={!(!isError && image)}
                        title="Next"
                        onClick={() => onClickFirstStep(formMethod, 10)}
                      />
                    </div>
                  </section>
                  <section
                    className={step === 10 ? "showStep2 active9" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="Congratulations!"
                    ></Label>
                    <div className="txt">
                      You have successfully signed up to Securepay Secure.
                      Now you can transact in confidence.
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(9)}
                      />

                      <CustomButton
                        type="button"
                        loading={busy}
                        title="Submit"
                        onClick={(e) => {
                          onClickFirstStep(formMethod, 10, true, false)
                        }}
                      />
                    </div>
                  </section>
                </div>
              </div>
            </>
          );
        }}
      </HookForm>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.auth.signup.user,
  };
};

const mapDispatchToProps = {
  showToast,
  signupWithEmailProcess,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndividualForm)
);
