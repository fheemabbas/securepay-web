import React, { useState } from "react";
import { connect } from "react-redux";
import { Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { showToast } from "../../state/ducks/utils/operations";
import Label from "../UI/Label/Label";
import HookForm from "../HookForm/HookForm";
import TextField from "../UI/TextField/TextField";
import CustomButton from "../UI/CustomButton/CustomButton";
import FileUpload from "../../components/FileUpload/FileUpload";
import RadioButton from "../UI/RadioButton/RadioButton";
import PhoneInput from "react-phone-input-2";
import Autocomplete from "react-autocomplete";
import countryListJSON from "../../util/countryname.js";
import Message from "../../util/message";
import Constant from "../../util/constant";
import "./OrganisationForm.scss";
import CalenderCustom from "../UI/CalenderCustom/CalenderCustom";
import Scrollbars from "react-custom-scrollbars";
import moment from "moment";
import { signupWithEmailProcess } from "../../state/ducks/auth/actions";
import StorageService from "./../../services/localstorage.service";
import { get, filter } from "lodash";
import 'react-phone-input-2/lib/style.css';
const multiErrorFields = [
  { length: "Your password must be at least 8 characters long and contain:" },
  { hasUppercase: "1 upper case character" },
  { hasLowercase: "1 lower case character " },
  { hasSpecialChar: "1 Special Character" },
  { hasNumbers: "1 Number" },
  { hasName: "Password should not contain your first and last name." },
];

const organisation = {
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
  nationality: {
    name: "nationality",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.NATIONALITYEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
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
  businessName: {
    name: "businessName",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.BUSINESSNAMEEMPTY,
      },
    },
  },
  companyNumber: {
    name: "companyNumber",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.COMPANYNUMBEREMPTY,
      },
    },
  },
};
const organisationUBO = {
  firstName: {
    name: "firstName_UBO",
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
    name: "lastName_UBO",
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
    name: "birthDate_UBO",
    validate: {
      required: {
        value: true,
      },
    },
  },
  nationality: {
    name: "nationality_UBO",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.NATIONALITYEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  country: {
    name: "country",
    validate: {},
  },
  houseName: {
    name: "houseName_UBO",
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
    name: "address_UBO",
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

  townCity: {
    name: "townCity_UBO",
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
    name: "region_UBO",
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
    name: "postalCode_UBO",
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
};
const organisationUBO1 = {
  firstName: {
    name: "firstName_UBO1",
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
    name: "lastName_UBO1",
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
    name: "birthDate_UBO1",
    validate: {
      required: {
        value: true,
      },
    },
  },
  nationality: {
    name: "nationality_UBO1",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.NATIONALITYEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  country: {
    name: "country",
    validate: {},
  },
  houseName: {
    name: "houseName_UBO1",
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
    name: "address_UBO1",
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
  townCity: {
    name: "townCity_UBO1",
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
    name: "region_UBO1",
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
    name: "postalCode_UBO1",
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
};
const organisationUBO2 = {
  firstName: {
    name: "firstName_UBO2",
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
    name: "lastName_UBO2",
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
    name: "birthDate_UBO2",
    validate: {
      required: {
        value: true,
      },
    },
  },
  nationality: {
    name: "nationality_UBO2",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.NATIONALITYEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  country: {
    name: "country",
    validate: {},
  },
  houseName: {
    name: "houseName_UBO2",
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
    name: "address_UBO2",
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
  townCity: {
    name: "townCity_UBO2",
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
    name: "region_UBO2",
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
    name: "postalCode_UBO2",
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
};
const organisationUBO3 = {
  firstName: {
    name: "firstName_UBO3",
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
    name: "lastName_UBO3",
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
    name: "birthDate_UBO3",
    validate: {
      required: {
        value: true,
      },
    },
  },
  nationality: {
    name: "nationality_UBO3",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.NATIONALITYEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
      },
    },
  },
  country: {
    name: "country",
    validate: {},
  },
  houseName: {
    name: "houseName_UBO3",
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
    name: "address_UBO3",
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
  townCity: {
    name: "townCity_UBO3",
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
    name: "region_UBO3",
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
    name: "postalCode_UBO3",
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
};
const OrganisationForm = (props) => {
  // eslint-disable-next-line
  let user = StorageService.getItem("user")
  const [form, setLoginForm] = React.useState();
  const { state } = props.location
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const [clientType, setClientType] = useState(user && user.uboInfo && user.uboInfo.length >= 1 ? "ORG" : "Individual"); // eslint-disable-next-line
  const [busy, setBusy] = React.useState(false);
  const [saveBusy, setIsBusy] = React.useState(false);
  const [step, setStep] = useState(props.location.state && props.location.state.step || 1);
  let [image, setImage] = useState();
  const [countryName, setCountryName] = useState(state && state.user && state.user.country && filter(countryListJSON, (i) => { return i.id === state.user.country })[0].name || "");
  const [countryNameUBO1, setCountryNameUBO1] = useState(state && state.user && state.user.uboInfo.length > 0 && state.user.uboInfo[0].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[0].nationality })[0].name || "");
  const [countryNameUBO2, setCountryNameUBO2] = useState(state && state.user && state.user.uboInfo.length > 1 && state.user.uboInfo[1].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[1].nationality })[0].name || "");
  const [countryNameUBO3, setCountryNameUBO3] = useState(state && state.user && state.user.uboInfo.length >= 3 && state.user.uboInfo[2].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[2].nationality })[0].name || "");
  const [countryNameUBO4, setCountryNameUBO4] = useState(state && state.user && state.user.uboInfo.length >= 4 && state.user.uboInfo[3].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[3].nationality })[0].name || "");

  const [countryFlag, setCountryFlag] = useState(""); // eslint-disable-next-line
  const [countryList, setCountryList] = useState(countryListJSON);
  let [showImageName, setShowImageName] = useState();
  const [data, setdata] = useState();
  const [isError, setisError] = useState(false)
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear() - 18;
  const onImageChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      var ext = (acceptedFiles[0].name).split('.').pop();
      if (acceptedFiles[0].size >= 32 * 1024 && acceptedFiles[0].size < 10485760) {
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
    }

  };
  const onKeyDown = (e, formMethod, value, skip = true) => {
    e.keyCode === 13 && onClickFirstStep(formMethod, value, skip)
  };

  const radioChangeHandler = (event) => {
    setClientType(event.target.value);
  };

  const onFormSubmit = () => {

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
            name: formMethod.watch("businessName"),
            number: formMethod.watch("companyNumber"),
            registerStep: 9,
          };
          break;
        case 9:
          param = {
            accountNumber: formMethod.watch("accountNumber"),
            sortCode: formMethod.watch("sortCode"),
            registerStep: 10,
          };
          break;
        case 10:
          param = new FormData();
          param.append("identityProof", showImageName);
          // param.append("imageBase64", image);
          param.append("registerStep", 11);
          break;
        case 12:
          param = {
            registerStep: 13,
          };
          break;
        case 13:
          let uboinfo = data && data.uboInfo && data.uboInfo ? data.uboInfo : state.user.uboInfo;
          if (uboinfo.length > 0) {
            uboinfo[0].firstName = formMethod.watch("firstName_UBO")
            uboinfo[0].lastName = formMethod.watch("lastName_UBO")
            uboinfo[0].dob = moment(formMethod.watch("birthDate_UBO")).format("yyyy-MM-DD")
            uboinfo[0].nationality = countryListJSON.filter((countryname) => countryname.name === countryNameUBO1)[0].id
            uboinfo[0].address.houseNo = formMethod.watch("houseName_UBO")
            uboinfo[0].address.addressLine = formMethod.watch("address_UBO")
            uboinfo[0].address.city = formMethod.watch("townCity_UBO")
            uboinfo[0].address.region = formMethod.watch("region_UBO")
            uboinfo[0].address.postalCode = formMethod.watch("region_UBO")
            uboinfo[0].uboId = get(state, 'user.uboInfo[0].uboId') || get(data, 'uboInfo[0].uboId')
          } else {
            uboinfo = [
              {
                firstName: formMethod.watch("firstName_UBO"),
                lastName: formMethod.watch("lastName_UBO"),
                nationality: countryListJSON.filter((countryname) => countryname.name === countryNameUBO1)[0].id,
                dob: moment(formMethod.watch("birthDate_UBO")).format("yyyy-MM-DD"),

                address: {
                  houseNo: formMethod.watch("houseName_UBO"),
                  addressLine: formMethod.watch("address_UBO"),
                  city: formMethod.watch("townCity_UBO"),
                  region: formMethod.watch("region_UBO"),
                  postalCode: formMethod.watch("postalCode_UBO"),
                },
              },
            ]

          }
          param = {
            registerStep: 12, uboInfo: uboinfo
          }
          break;
        case 14:
          let uboinfo1 = data && data.uboInfo && data.uboInfo ? data.uboInfo : state.user.uboInfo;
          if (uboinfo1.length >= 2) {
            uboinfo1[1].firstName = formMethod.watch("firstName_UBO1")
            uboinfo1[1].lastName = formMethod.watch("lastName_UBO1")
            uboinfo1[1].dob = moment(formMethod.watch("birthDate_UBO1")).format("yyyy-MM-DD")
            uboinfo1[1].nationality = countryListJSON.filter((countryname) => countryname.name === countryNameUBO2)[0].id
            uboinfo1[1].address.houseNo = formMethod.watch("houseName_UBO1")
            uboinfo1[1].address.addressLine = formMethod.watch("address_UBO1")
            uboinfo1[1].address.city = formMethod.watch("townCity_UBO1")
            uboinfo1[1].address.region = formMethod.watch("region_UBO1")
            uboinfo1[1].address.postalCode = formMethod.watch("region_UBO1")
            uboinfo1[1].uboId = get(state, 'user.uboInfo[1].uboId') || get(data, 'uboInfo[1].uboId')
          } else {
            uboinfo1.push({
              firstName: formMethod.watch("firstName_UBO1"),
              lastName: formMethod.watch("lastName_UBO1"),
              dob: moment(formMethod.watch("birthDate_UBO1")).format("yyyy-MM-DD"),
              nationality: countryListJSON.filter((countryname) => countryname.name === countryNameUBO2)[0].id,
              address: {
                houseNo: formMethod.watch("houseName_UBO1"),
                addressLine: formMethod.watch("address_UBO1"),
                city: formMethod.watch("townCity_UBO1"),
                region: formMethod.watch("region_UBO1"),
                postalCode: formMethod.watch("region_UBO1"),
              },
            });
          }
          param = {
            registerStep: 12, uboInfo: uboinfo1
          }

          break;
        case 15:
          let uboinfo2 = data && data.uboInfo && data.uboInfo ? data.uboInfo : state.user.uboInfo;
          if (uboinfo2.length >= 3) {
            uboinfo2[2].firstName = formMethod.watch("firstName_UBO2")
            uboinfo2[2].lastName = formMethod.watch("lastName_UBO2")
            uboinfo2[2].dob = moment(formMethod.watch("birthDate_UBO2")).format("yyyy-MM-DD")
            uboinfo2[2].nationality = countryListJSON.filter((countryname) => countryname.name === countryNameUBO3)[0].id
            uboinfo2[2].address.houseNo = formMethod.watch("houseName_UBO2")
            uboinfo2[2].address.addressLine = formMethod.watch("address_UBO2")
            uboinfo2[2].address.city = formMethod.watch("townCity_UBO2")
            uboinfo2[2].address.region = formMethod.watch("region_UBO2")
            uboinfo2[2].address.postalCode = formMethod.watch("region_UBO2")
            uboinfo2[2].uboId = get(state, 'user.uboInfo[2].uboId') || get(data, 'uboInfo[2].uboId')
          } else {
            uboinfo2.push({
              firstName: formMethod.watch("firstName_UBO2"),
              lastName: formMethod.watch("lastName_UBO2"),
              dob: moment(formMethod.watch("birthDate_UBO2")).format("yyyy-MM-DD"),
              nationality: countryListJSON.filter((countryname) => countryname.name === countryNameUBO3)[0].id,
              address: {
                houseNo: formMethod.watch("houseName_UBO2"),
                addressLine: formMethod.watch("address_UBO2"),
                city: formMethod.watch("townCity_UBO2"),
                region: formMethod.watch("region_UBO2"),
                postalCode: formMethod.watch("region_UBO2"),
              },
            });
          }
          param = {
            registerStep: 12, uboInfo: uboinfo2
          }

          break;
        case 16:
          let uboinfo3 = data && data.uboInfo && data.uboInfo ? data.uboInfo : state.user.uboInfo;
          if (uboinfo3.length >= 4) {
            uboinfo3[3].firstName = formMethod.watch("firstName_UBO3")
            uboinfo3[3].lastName = formMethod.watch("lastName_UBO3")
            uboinfo3[3].dob = moment(formMethod.watch("birthDate_UBO3")).format("yyyy-MM-DD")
            uboinfo3[3].nationality = countryListJSON.filter((countryname) => countryname.name === countryNameUBO4)[0].id
            uboinfo3[3].address.houseNo = formMethod.watch("houseName_UBO3")
            uboinfo3[3].address.addressLine = formMethod.watch("address_UBO3")
            uboinfo3[3].address.city = formMethod.watch("townCity_UBO3")
            uboinfo3[3].address.region = formMethod.watch("region_UBO3")
            uboinfo3[3].address.postalCode = formMethod.watch("region_UBO3")
            uboinfo3[3].uboId = get(state, 'user.uboInfo[3].uboId') || get(data, 'uboInfo[3].uboId')
          } else {
            uboinfo3.push({
              firstName: formMethod.watch("firstName_UBO3"),
              lastName: formMethod.watch("lastName_UBO3"),
              dob: moment(formMethod.watch("birthDate_UBO3")).format("yyyy-MM-DD"),
              nationality: countryListJSON.filter((countryname) => countryname.name === countryNameUBO4)[0].id,
              address: {
                houseNo: formMethod.watch("houseName_UBO3"),
                addressLine: formMethod.watch("address_UBO3"),
                city: formMethod.watch("townCity_UBO3"),
                region: formMethod.watch("region_UBO3"),
                postalCode: formMethod.watch("region_UBO3"),
              },
            });
          }
          param = {
            registerStep: 12, uboInfo: uboinfo3
          }

          break;

        default:
          setStep(value);
      }
    }
    if (skip && step !== 11) {

      try {
        if (value === 12) {
          setIsBusy(true)
        } else {
          setBusy(true);
        }
        const signupID = StorageService.getItem("sign-up_ID")
        const response = await props.signupWithEmailProcess(
          param,
          signupID
        );
        setdata(response.payload);
        if (!final) {
          if (props.location.state && props.location.state.isLogin) {
            props.history.push("/dashboard")
            window.localStorage.removeItem("sign-up_ID")
          } else {
            setBusy(false)
            setIsBusy(false)
            setTimeout(() => {
              props.history.push("/login")
              window.localStorage.removeItem("sign-up_ID")
              props.showToast({ message: response.message, type: "success", time: 60000 });
            }, 1000);
          }
        } else {
          setStep(value)
          setBusy(false)
          setIsBusy(false)
        }
      } catch (error) {
        setBusy(true);
        setIsBusy(true)
        setTimeout(() => {
          setBusy(false);
          setIsBusy(false)
          props.showToast({
            message: error?.response?.data?.message,
            type: "error",
          });
        }, 1000);
      }

    } else {
      setStep(value);
    }
    // setStep(value);
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

          const step7 = formMethod.watch("houseName") &&
            formMethod?.errors.houseName === undefined &&
            formMethod.watch("address") &&
            formMethod?.errors.address === undefined && formMethod?.errors.address2 === undefined &&
            formMethod.watch("townCity") &&
            formMethod?.errors.townCity === undefined &&
            formMethod.watch("region") &&
            formMethod?.errors.region === undefined &&
            formMethod.watch("postalCode") &&
            formMethod?.errors.postalCode === undefined


          const step8 = formMethod.watch("businessName") &&
            formMethod?.errors.businessName === undefined &&
            formMethod.watch("companyNumber") &&
            formMethod?.errors.companyNumber === undefined;

          const step9 = formMethod.watch("accountNumber") &&
            formMethod?.errors.accountNumber === undefined &&
            formMethod.watch("sortCode") &&
            formMethod?.errors.sortCode === undefined

          const step13 = (formMethod.watch("firstName_UBO") &&
            formMethod?.errors.firstName_UBO ===
            undefined &&
            formMethod.watch("lastName_UBO") &&
            formMethod?.errors.lastName_UBO === undefined &&
            formMethod.watch("birthDate_UBO") &&
            formMethod?.errors.birthDate_UBO ===
            undefined &&
            formMethod.watch("houseName_UBO") &&
            formMethod?.errors.houseName_UBO ===
            undefined &&
            formMethod.watch("address_UBO") &&
            formMethod?.errors.address_UBO === undefined &&
            formMethod.watch("townCity_UBO") &&
            formMethod?.errors.townCity_UBO === undefined &&
            formMethod.watch("region_UBO") &&
            formMethod?.errors.region_UBO === undefined &&
            formMethod.watch("postalCode_UBO") &&
            formMethod?.errors.postalCode_UBO === undefined)

          const step14 = (
            formMethod.watch("firstName_UBO1") &&
            formMethod?.errors.firstName_UBO1 ===
            undefined &&
            formMethod.watch("lastName_UBO1") &&
            formMethod?.errors.lastName_UBO1 === undefined &&
            formMethod.watch("birthDate_UBO1") &&
            formMethod?.errors.birthDate_UBO1 ===
            undefined &&
            formMethod.watch("houseName_UBO1") &&
            formMethod?.errors.houseName_UBO1 ===
            undefined &&
            formMethod.watch("address_UBO1") &&
            formMethod?.errors.address_UBO1 === undefined &&
            formMethod.watch("townCity_UBO1") &&
            formMethod?.errors.townCity_UBO1 === undefined &&
            formMethod.watch("region_UBO1") &&
            formMethod?.errors.region_UBO1 === undefined &&
            formMethod.watch("postalCode_UBO1") &&
            formMethod?.errors.postalCode_UBO1 === undefined
          )
          const step15 = (
            formMethod.watch("firstName_UBO2") &&
            formMethod?.errors.firstName_UBO2 ===
            undefined &&
            formMethod.watch("lastName_UBO2") &&
            formMethod?.errors.lastName_UBO2 === undefined &&
            formMethod.watch("birthDate_UBO2") &&
            formMethod?.errors.birthDate_UBO2 ===
            undefined &&
            formMethod.watch("houseName_UBO2") &&
            formMethod?.errors.houseName_UBO2 ===
            undefined &&
            formMethod.watch("address_UBO2") &&
            formMethod?.errors.address_UBO2 === undefined &&
            formMethod.watch("townCity_UBO2") &&
            formMethod?.errors.townCity_UBO2 === undefined &&
            formMethod.watch("region_UBO2") &&
            formMethod?.errors.region_UBO2 === undefined &&
            formMethod.watch("postalCode_UBO2") &&
            formMethod?.errors.postalCode_UBO2 === undefined
          )
          const step16 = (
            formMethod.watch("firstName_UBO3") &&
            formMethod?.errors.firstName_UBO3 ===
            undefined &&
            formMethod.watch("lastName_UBO3") &&
            formMethod?.errors.lastName_UBO3 === undefined &&
            formMethod.watch("birthDate_UBO3") &&
            formMethod?.errors.birthDate_UBO3 ===
            undefined &&
            formMethod.watch("houseName_UBO3") &&
            formMethod?.errors.houseName_UBO3 ===
            undefined &&
            formMethod.watch("address_UBO3") &&
            formMethod?.errors.address_UBO3 === undefined &&
            formMethod.watch("townCity_UBO3") &&
            formMethod?.errors.townCity_UBO3 === undefined &&
            formMethod.watch("region_UBO3") &&
            formMethod?.errors.region_UBO3 === undefined &&
            formMethod.watch("postalCode_UBO3") &&
            formMethod?.errors.postalCode_UBO3 === undefined
          )

          return (
            <>
              <div className="formmain">
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
                      rules={organisation.firstName.validate}
                      defaultValue={state && state.user && state.user.firstName || ""}
                      name={organisation.firstName.name}
                      errors={formMethod?.errors}
                    // onChange={() => formMethod.watch("password") && formMethod.watch("password") && formMethod.trigger('password')}
                    />
                    <TextField
                      type="text"
                      placeholder="Last name"
                      formMethod={formMethod}
                      rules={organisation.lastName.validate}
                      defaultValue={state && state.user && state.user.lastName || ""}
                      name={organisation.lastName.name}
                      errors={formMethod?.errors}
                      onKeyDown={(e) => step1 && onKeyDown(e, formMethod, 2)}
                    // onChange={() => formMethod.watch("password") && formMethod.trigger('password')}
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
                        rules={organisation.birthDate.validate}
                        name={organisation.birthDate.name}
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
                            onKeyDown={(e) => onKeyDown(e, formMethod, 3)}

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
                          loading={busy}
                          title="Next"
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
                      rules={organisation.email.validate}
                      name={organisation.email.name}
                      errors={formMethod?.errors}
                      type="text"
                      placeholder="Email address"
                      defaultValue={state && state.user && state.user.email || ""}
                      disabled={state && state.user && state.user.email}
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
                          loading={busy}
                          type="button"
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
                      name={organisation.password.name}
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
                      name={organisation.confirmPassword.name}
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
                        name={organisation.cunrtyCode.name}
                        rules={organisation.cunrtyCode.validate}
                        render={(props) => (
                          <PhoneInput
                            country={"gb"}
                            disableSearchIcon="false"
                            placeholder="+44"
                            enableSearch="true"
                            value={formMethod.watch(
                              organisation.cunrtyCode.name
                            )}
                            onChange={props.onChange}
                          />
                        )}
                      />
                      <TextField
                        redStar={true}
                        noTextfield={true}
                        defaultValue={get(state, 'user.number', '')}
                        onChange={(e) => this.onPhoneChange(formMethod, e)}
                        maskType="9999999999999"
                        formMethod={formMethod}
                        rules={organisation.phoneNumber.validate}
                        name={organisation.phoneNumber.name}
                        errors={formMethod?.errors}
                        placeholder="Phone number"
                        onKeyDown={(e) => step5 && onKeyDown(e, formMethod, 6)}
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
                          // defaultValue={state && state.user && state.user.country && filter(countryListJSON, (i) => { return i.id === state.user.country })[0].name || "United Kingdom"}
                          control={formMethod?.control}
                          name={organisation.country.name}
                          rules={organisation.country.validate}
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
                      rules={organisation.houseName.validate}
                      name={organisation.houseName.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="House name"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.addressLine1', '')}
                      formMethod={formMethod}
                      rules={organisation.address.validate}
                      name={organisation.address.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Address line 1"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.addressLine2', '')}
                      formMethod={formMethod}
                      rules={organisation.address2.validate}
                      name={organisation.address2.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Address line 2"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.city', '')}
                      formMethod={formMethod}
                      rules={organisation.townCity.validate}
                      name={organisation.townCity.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Town/city"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.region', '')}
                      formMethod={formMethod}
                      rules={organisation.region.validate}
                      name={organisation.region.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Region"
                    />
                    <TextField
                      defaultValue={state && state.user && get(state, 'user.address.postalCode', '')}
                      formMethod={formMethod}
                      rules={organisation.postalCode.validate}
                      name={organisation.postalCode.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Postcode"
                      onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 8)}
                    />
                    <div className="fieldText">
                      Next we'll need to confirm your business name
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
                    className={step === 8 ? "showStep2 active8" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="What's the name of your business?"
                    ></Label>
                    <TextField
                      formMethod={formMethod}
                      defaultValue={get(state, 'user.company.name', '')}
                      rules={organisation.businessName.validate}
                      name={organisation.businessName.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Business name"
                    />
                    <TextField
                      formMethod={formMethod}
                      defaultValue={get(state, 'user.company.number', '')}
                      rules={organisation.companyNumber.validate}
                      name={organisation.companyNumber.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Company number"
                      onKeyDown={(e) => step8 && onKeyDown(e, formMethod, 9)}
                    />
                    <div className="fieldText">
                      Next we'll need your bank details
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(7)}
                      />
                      {step8 && (
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
                    className={step === 9 ? "showStep2 active9" : "showStep2"}
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
                      title="What are your bank details?"
                    ></Label>
                    <TextField
                      formMethod={formMethod}
                      defaultValue={get(state, 'user.bankInfo.accountNumber', '')}
                      rules={organisation.accountNumber.validate}
                      name={organisation.accountNumber.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      noTextfield={true}
                      maskType="9999999999999999999999999"
                      type="text"
                      placeholder="Account number"
                    />
                    <TextField
                      formMethod={formMethod}
                      defaultValue={get(state, 'user.bankInfo.sortCode', '')}
                      rules={organisation.sortCode.validate}
                      name={organisation.sortCode.name}
                      errors={formMethod?.errors}
                      autoFocus={true}
                      type="text"
                      placeholder="Sort code"
                      onKeyDown={(e) => step9 && onKeyDown(e, formMethod, 10)}
                    />
                    <div className="fieldText">
                      Next we'll need a photo of your ID
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(8)}
                      />
                      {step9 && (
                        <CustomButton
                          loading={busy}
                          type="button"
                          title="Next"
                          onClick={() => onClickFirstStep(formMethod, 10)}
                        />
                      )}
                    </div>
                  </section>
                  <section
                    className={step === 10 ? "showStep2 active10" : "showStep2"}
                  >
                    <button
                      type="button"
                      onClick={() => onClickFirstStep(formMethod, 11, false)}
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
                        render={({ onChange }) => (
                          <>
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
                        onKeyDown={(e) => image && onKeyDown(e, formMethod, 11)}
                      />
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(9)}
                      />{
                        <CustomButton
                          loading={busy}
                          disabled={!(!isError && image)}
                          type="button"
                          title="Next"
                          onClick={() => onClickFirstStep(formMethod, 11)}
                        />}
                    </div>
                  </section>
                  <section
                    className={step === 11 ? "showStep2 active11" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title=" Are you the sole business owner or legal representative?"
                    ></Label>
                    <div className="clienttyperight">
                      <RadioButton
                        changed={radioChangeHandler}
                        id="1"
                        isSelected={clientType === "Individual"}
                        label="Yes"
                        value="Individual"
                      />
                      <RadioButton
                        changed={radioChangeHandler}
                        id="2"
                        isSelected={clientType === "ORG"}
                        label="No"
                        value="ORG"
                      />
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => setStep(10)}
                      />
                      <CustomButton
                        loading={busy}
                        type="button"
                        title="Next"
                        onClick={() =>
                          clientType === "Individual"
                            ? onClickFirstStep(formMethod, 12)
                            : onClickFirstStep(formMethod, 13)
                        }
                      />
                    </div>
                  </section>
                  <section
                    className={step === 12 ? "showStep2 active12" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="Congratulations!"
                    ></Label>
                    <div className="txt">
                      You have successfully signed up to TrustPay Secure.
                      Now you can transact in confidence.
                    </div>
                    <div className="signbtnfield">
                      <CustomButton
                        type="button"
                        title="Back"
                        className="back"
                        onClick={() => {
                          let backStep = clientType === "ORG" ? 16 : 12
                          switch (data?.uboInfo?.length || user?.uboInfo?.length) {
                            case 1:
                              backStep = 13
                              break;
                            case 2:
                              backStep = 14
                              break;
                            case 3:
                              backStep = 15
                              break;
                            case 4:
                              backStep = 16
                              break;
                            default:
                              backStep = 13
                          }
                          clientType === "ORG" ? setStep(backStep) : setStep(11)
                        }}
                      />

                      <CustomButton type="button"
                        loading={busy}
                        title="Submit" onClick={(e) => {

                          onClickFirstStep(formMethod, 12, true, false)
                        }} />
                    </div>
                  </section>
                  <section
                    className={step === 13 ? "showStep2 active13 detailsheading" : "showStep2"}
                  >
                    <Label
                      className="inputLabel"
                      title="UBO Details (1)"
                    ></Label>
                    <div className="sub_txt">
                      Please fill in the UBO (Ultimate Beneficial Owner) details below. This is the person who owns more than 25% of the company or acts as the legal representative. Should there be multiple UBO partners, please fill in one form for each partner (maximum of 4 forms to be submitted).
                    </div>
                    <Scrollbars className="customUBOSCroll">
                      <div className="paddingScroll">
                        <Label
                          className="inputLabel"
                          title="First name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="First name"
                          formMethod={formMethod}
                          rules={organisationUBO.firstName.validate}
                          name={organisationUBO.firstName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[0].firstName', '')}
                        />
                        <Label
                          className="inputLabel"
                          title="Last name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="Last name"
                          formMethod={formMethod}
                          rules={organisationUBO.lastName.validate}
                          name={organisationUBO.lastName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[0].lastName', '')}

                        />
                        <Label
                          className="inputLabel"
                          title="Date of birth"
                        ></Label>
                        <div className="calenderMain">
                          <Controller
                            defaultValue={get(state, 'user.uboInfo[0].dob') && new Date(state.user.uboInfo[0].dob)}
                            control={formMethod?.control}
                            rules={organisationUBO.birthDate.validate}
                            name={organisationUBO.birthDate.name}
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

                        <Label
                          className="inputLabel"
                          title="Nationality"
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
                              name={organisationUBO.country.name}
                              rules={organisationUBO.country.validate}
                              render={({ onChange }) => (
                                <>
                                  <p className="flaimg">{countryFlag}</p>
                                  <button className={countryNameUBO1 ? "close-icon iconEmpty" : "close-icon"} type="reset" onClick={() => setCountryNameUBO1("")}></button>

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
                                    value={countryNameUBO1}
                                    onChange={(e) => {
                                      if (e.target.value === "") {
                                        setCountryFlag("");
                                      }
                                      setCountryNameUBO1(e.target.value);
                                    }}
                                    onSelect={(val, item) => {
                                      setCountryNameUBO1(val);
                                      setCountryFlag(item.emoji);
                                    }}
                                    menuStyle={{
                                      maxHeight: 210,
                                      overflowY: "auto",
                                      backgroundColor: "#ffffff",
                                      boxShadow:
                                        "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                      borderRadius: 4,
                                    }}
                                    wrapperStyle={{ display: "block" }}
                                  />
                                </>
                              )}
                            />
                            <Label
                              className="inputLabel"
                              title="House name/number"
                            ></Label>
                            <TextField
                              defaultValue={get(state, 'user.uboInfo[0].address.houseNo', '')}
                              formMethod={formMethod}
                              rules={organisationUBO.houseName.validate}
                              name={organisationUBO.houseName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="House name"
                            />
                            <Label
                              className="inputLabel"
                              title="Street name"
                            ></Label>
                            <TextField
                              defaultValue={get(state, 'user.uboInfo[0].address.addressLine', '')}
                              formMethod={formMethod}
                              rules={organisationUBO.address.validate}
                              name={organisationUBO.address.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Street name"
                            />
                            <Label
                              className="inputLabel"
                              title="Town/city"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[0].address.city', '')}
                              rules={organisationUBO.townCity.validate}
                              name={organisationUBO.townCity.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Town/city"
                            />
                            <Label
                              className="inputLabel"
                              title="Region"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[0].address.region', '')}
                              rules={organisationUBO.region.validate}
                              name={organisationUBO.region.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Region"
                            />
                            <Label
                              className="inputLabel"
                              title="Postcode"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[0].address.postalCode', '')}
                              rules={organisationUBO.postalCode.validate}
                              name={organisationUBO.postalCode.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Postcode"
                              onKeyDown={(e) => (
                                step13
                              ) && onKeyDown(e, formMethod, 14)}
                            />
                          </div>
                        </div>
                        <div className="signbtnfield">
                          <CustomButton
                            type="button"
                            title="Back"
                            className="back"
                            onClick={() => setStep(11)}
                          />
                          <CustomButton
                            type="button"
                            loading={busy}
                            title="Save & Add Another UBO"
                            disabled={
                              !(step13
                              )
                            }
                            onClick={() => onClickFirstStep(formMethod, 14)}
                          />
                          <CustomButton
                            type="button"
                            loading={saveBusy}
                            title="Submit"
                            disabled={
                              !(step13
                              )
                            }
                            onClick={() => onClickFirstStep(formMethod, 12)}
                          />
                        </div>
                      </div>
                    </Scrollbars>
                  </section>
                  <section
                    className={step === 14 ? "showStep2 active14" : "showStep2"}
                  >
                    <button
                      type="button"
                      className="skip_txt"
                      onClick={() => onClickFirstStep(formMethod, 12, false)}
                    >
                      skip
                    </button>
                    <Label
                      className="inputLabel"
                      title={`UBO Details (${step - 12})`}
                    ></Label>
                    <Scrollbars className="customUBOSCroll">
                      <div className="paddingScroll">
                        <Label
                          className="inputLabel"
                          title="First name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="First name"
                          formMethod={formMethod}
                          rules={organisationUBO1.firstName.validate}
                          name={organisationUBO1.firstName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[1].firstName', '')}
                        // defaultValue={get(state, 'user.uboInfo[1].firstName', '')}
                        />
                        <Label
                          className="inputLabel"
                          title="Last name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="Last name"
                          formMethod={formMethod}
                          rules={organisationUBO1.lastName.validate}
                          name={organisationUBO1.lastName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[1].lastName', '')}
                        />
                        <Label
                          className="inputLabel"
                          title="Date of birth"
                        ></Label>
                        <div className="calenderMain">
                          <Controller
                            defaultValue={step === 16 ? get(state, 'user.uboInfo[3].dob') && new Date(state.user.uboInfo[3].dob) || "" :
                              step === 15 ? get(state, 'user.uboInfo[2].dob') && new Date(state.user.uboInfo[2].dob) || "" :
                                get(state, 'user.uboInfo[1].dob') && new Date(state.user.uboInfo[1].dob) || ""}
                            // defaultValue={get(state, 'user.uboInfo[1].dob') && new Date(state.user.uboInfo[1].dob) || ""}
                            control={formMethod?.control}
                            rules={organisationUBO1.birthDate.validate}
                            name={step === 16 ? organisationUBO3.birthDate.name :
                              step === 15 ? organisationUBO2.birthDate.name : organisationUBO1.birthDate.name}
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

                        <Label
                          className="inputLabel"
                          title="Nationality"
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
                              name={organisationUBO1.country.name}
                              rules={organisationUBO1.country.validate}
                              render={({ onChange }) => (
                                <>
                                  <p className="flaimg">{countryFlag}</p>
                                  <button className={countryNameUBO2 ? "close-icon iconEmpty" : "close-icon"} type="reset"
                                    onClick={() => {
                                      setCountryNameUBO2("")
                                    }}>

                                  </button>

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
                                    value={countryNameUBO2}
                                    onChange={(e) => {
                                      if (e.target.value === "") {
                                        setCountryFlag("");
                                      }
                                      step === 16 ? setCountryNameUBO4(e.target.value) :
                                        step === 15 ? setCountryNameUBO3(e.target.value) :
                                          setCountryNameUBO2(e.target.value)
                                      // setCountryNameUBO2(e.target.value);
                                    }}
                                    onSelect={(val, item) => {
                                      setCountryNameUBO2(val)
                                      setCountryFlag(item.emoji);
                                    }}
                                    menuStyle={{
                                      maxHeight: 210,
                                      overflowY: "auto",
                                      backgroundColor: "#ffffff",
                                      boxShadow:
                                        "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                      borderRadius: 4,
                                    }}
                                    wrapperStyle={{ display: "block" }}
                                  />
                                </>
                              )}
                            />
                            <Label
                              className="inputLabel"
                              title="House name/number"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={
                                get(state, 'user.uboInfo[1].address.houseNo', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.houseNo', '')}
                              rules={organisationUBO1.houseName.validate}
                              name={organisationUBO1.houseName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="House name/number"
                            />
                            <Label
                              className="inputLabel"
                              title="Street name "
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={
                                get(state, 'user.uboInfo[1].address.addressLine', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.addressLine', '')}
                              rules={organisationUBO1.address.validate}
                              name={organisationUBO1.address.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Street name"
                            />
                            <Label
                              className="inputLabel"
                              title="Town/city"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={
                                get(state, 'user.uboInfo[1].address.city', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.city', '')}
                              rules={organisationUBO1.townCity.validate}
                              name={organisationUBO1.townCity.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Town/city"
                            />
                            <Label
                              className="inputLabel"
                              title="Region"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={
                                get(state, 'user.uboInfo[1].address.region', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.region', '')}
                              rules={organisationUBO1.region.validate}
                              name={organisationUBO1.region.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Region"
                            />
                            <Label
                              className="inputLabel"
                              title="Postcode"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={
                                get(state, 'user.uboInfo[1].address.postalCode', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.postalCode', '')}
                              rules={organisationUBO1.postalCode.validate}
                              name={organisationUBO1.postalCode.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Postcode"
                              onKeyDown={(e) => {
                                step14 && onKeyDown(e, formMethod, 15)
                              }}
                            />
                          </div>
                        </div>
                        <div className="signbtnfield">
                          <CustomButton
                            type="button"
                            title="Back"
                            className="back"
                            onClick={() => {
                              setStep(13)
                            }}
                          />
                          {
                            <CustomButton
                              type="button"
                              title={"Save & Add Another UBO"}
                              loading={busy}

                              disabled={
                                !step14
                              }
                              onClick={() => {
                                onClickFirstStep(formMethod, 15)
                              }}
                            />
                          }<CustomButton
                            type="button"
                            loading={saveBusy}
                            title="Submit"
                            disabled={
                              !(step14
                              )
                            }
                            onClick={() => onClickFirstStep(formMethod, 12)}
                          />
                        </div>
                      </div>
                    </Scrollbars>
                  </section>
                  <section
                    className={step === 15 ? "showStep2 active14" : "showStep2"}
                  >
                    <button
                      type="button"
                      className="skip_txt"
                      onClick={() => onClickFirstStep(formMethod, 12, false)}
                    >
                      skip
                    </button>
                    <Label
                      className="inputLabel"
                      title={`UBO Details (${step - 12})`}
                    ></Label>
                    <Scrollbars className="customUBOSCroll">
                      <div className="paddingScroll">
                        <Label
                          className="inputLabel"
                          title="First name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="First name"
                          formMethod={formMethod}
                          rules={organisationUBO1.firstName.validate}
                          name={organisationUBO2.firstName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[2].firstName', '')}
                        // defaultValue={get(state, 'user.uboInfo[1].firstName', '')}
                        />
                        <Label
                          className="inputLabel"
                          title="Last name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="Last name"
                          formMethod={formMethod}
                          rules={organisationUBO1.lastName.validate}
                          name={step === 16 ? organisationUBO3.lastName.name :
                            step === 15 ? organisationUBO2.lastName.name : organisationUBO1.lastName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[2].lastName', '')}
                        />
                        <Label
                          className="inputLabel"
                          title="Date of birth"
                        ></Label>
                        <div className="calenderMain">
                          <Controller
                            defaultValue={get(state, 'user.uboInfo[2].dob') && new Date(state.user.uboInfo[2].dob) || ""}
                            // defaultValue={get(state, 'user.uboInfo[1].dob') && new Date(state.user.uboInfo[1].dob) || ""}
                            control={formMethod?.control}
                            rules={organisationUBO1.birthDate.validate}
                            name={organisationUBO2.birthDate.name}
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

                        <Label
                          className="inputLabel"
                          title="Nationality"
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
                              name={organisationUBO2.country.name}
                              rules={organisationUBO1.country.validate}
                              render={({ onChange }) => (
                                <>
                                  <p className="flaimg">{countryFlag}</p>
                                  <button className={countryNameUBO3 ? "close-icon iconEmpty" : "close-icon"} type="reset"
                                    onClick={() => {
                                      setCountryNameUBO3("")
                                    }}>

                                  </button>

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
                                    value={countryNameUBO3}
                                    onChange={(e) => {
                                      if (e.target.value === "") {
                                        setCountryFlag("");
                                      } setCountryNameUBO3(e.target.value)
                                      // setCountryNameUBO2(e.target.value);
                                    }}
                                    onSelect={(val, item) => {
                                      setCountryNameUBO3(val)
                                      setCountryFlag(item.emoji);
                                    }}
                                    menuStyle={{
                                      maxHeight: 210,
                                      overflowY: "auto",
                                      backgroundColor: "#ffffff",
                                      boxShadow:
                                        "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                      borderRadius: 4,
                                    }}
                                    wrapperStyle={{ display: "block" }}
                                  />
                                </>
                              )}
                            />
                            <Label
                              className="inputLabel"
                              title="House name/number"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[2].address.houseNo', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.houseNo', '')}
                              rules={organisationUBO1.houseName.validate}
                              name={organisationUBO2.houseName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="House name/number"
                            />
                            <Label
                              className="inputLabel"
                              title="Street name "
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[2].address.addressLine', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.addressLine', '')}
                              rules={organisationUBO1.address.validate}
                              name={organisationUBO2.address.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Street name"
                            />
                            <Label
                              className="inputLabel"
                              title="Town/city"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[2].address.city', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.city', '')}
                              rules={organisationUBO1.townCity.validate}
                              name={organisationUBO2.townCity.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Town/city"
                            />
                            <Label
                              className="inputLabel"
                              title="Region"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[2].address.region', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.region', '')}
                              rules={organisationUBO1.region.validate}
                              name={organisationUBO2.region.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Region"
                            />
                            <Label
                              className="inputLabel"
                              title="Postcode"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[2].address.postalCode', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.postalCode', '')}
                              rules={organisationUBO1.postalCode.validate}
                              name={organisationUBO2.postalCode.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Postcode"
                              onKeyDown={(e) => {
                                step15 && onKeyDown(e, formMethod, 16)
                                // step14 && onKeyDown(e, formMethod, 12)
                              }}
                            />
                          </div>
                        </div>
                        <div className="signbtnfield">
                          <CustomButton
                            type="button"
                            title="Back"
                            className="back"
                            onClick={() => {
                              setStep(14)
                            }}
                          />
                          {
                            <CustomButton
                              type="button"
                              title={step === 16 ? "Next" : "Save & Add Another UBO"}
                              loading={busy}

                              disabled={
                                !step15
                              }
                              onClick={() => {
                                onClickFirstStep(formMethod, 16)
                              }}
                            />
                          }
                          <CustomButton
                            type="button"
                            loading={saveBusy}
                            title="Submit"
                            disabled={
                              !(step15
                              )
                            }
                            onClick={() => onClickFirstStep(formMethod, 12)}
                          />
                        </div>
                      </div>
                    </Scrollbars>
                  </section>
                  <section
                    className={step === 16 ? "showStep2 active14" : "showStep2"}
                  >
                    <button
                      type="button"
                      className="skip_txt"
                      onClick={() => onClickFirstStep(formMethod, 12, false)}
                    >
                      skip
                    </button>
                    <Label
                      className="inputLabel"
                      title={`UBO Details (${step - 12})`}
                    ></Label>
                    <Scrollbars className="customUBOSCroll">
                      <div className="paddingScroll">
                        <Label
                          className="inputLabel"
                          title="First name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="First name"
                          formMethod={formMethod}
                          rules={organisationUBO1.firstName.validate}
                          name={organisationUBO3.firstName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[3].firstName', '')}
                        // defaultValue={get(state, 'user.uboInfo[1].firstName', '')}
                        />
                        <Label
                          className="inputLabel"
                          title="Last name"
                        ></Label>
                        <TextField
                          type="text"
                          placeholder="Last name"
                          formMethod={formMethod}
                          rules={organisationUBO1.lastName.validate}
                          name={organisationUBO3.lastName.name}
                          errors={formMethod?.errors}
                          defaultValue={get(state, 'user.uboInfo[3].lastName', '')}
                        />
                        <Label
                          className="inputLabel"
                          title="Date of birth"
                        ></Label>
                        <div className="calenderMain">
                          <Controller
                            defaultValue={get(state, 'user.uboInfo[3].dob') && new Date(state.user.uboInfo[3].dob) || ""}
                            // defaultValue={get(state, 'user.uboInfo[1].dob') && new Date(state.user.uboInfo[1].dob) || ""}
                            control={formMethod?.control}
                            rules={organisationUBO1.birthDate.validate}
                            name={organisationUBO3.birthDate.name}
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

                        <Label
                          className="inputLabel"
                          title="Nationality"
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
                              name={organisationUBO2.country.name}
                              rules={organisationUBO3.country.validate}
                              render={({ onChange }) => (
                                <>
                                  <p className="flaimg">{countryFlag}</p>
                                  <button className={countryNameUBO4 ? "close-icon iconEmpty" : "close-icon"} type="reset"
                                    onClick={() => {
                                      setCountryNameUBO4("")
                                    }}>

                                  </button>

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
                                    value={countryNameUBO4}
                                    onChange={(e) => {
                                      if (e.target.value === "") {
                                        setCountryFlag("");
                                      } setCountryNameUBO4(e.target.value)
                                      // setCountryNameUBO2(e.target.value);
                                    }}
                                    onSelect={(val, item) => {
                                      setCountryNameUBO4(val)
                                      setCountryFlag(item.emoji);
                                    }}
                                    menuStyle={{
                                      maxHeight: 210,
                                      overflowY: "auto",
                                      backgroundColor: "#ffffff",
                                      boxShadow:
                                        "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                      borderRadius: 4,
                                    }}
                                    wrapperStyle={{ display: "block" }}
                                  />
                                </>
                              )}
                            />
                            <Label
                              className="inputLabel"
                              title="House name/number"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[3].address.houseNo', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.houseNo', '')}
                              rules={organisationUBO1.houseName.validate}
                              name={organisationUBO3.houseName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="House name/number"
                            />
                            <Label
                              className="inputLabel"
                              title="Street name "
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[3].address.addressLine', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.addressLine', '')}
                              rules={organisationUBO1.address.validate}
                              name={organisationUBO3.address.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Street name"
                            />
                            <Label
                              className="inputLabel"
                              title="Town/city"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[3].address.city', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.city', '')}
                              rules={organisationUBO1.townCity.validate}
                              name={organisationUBO3.townCity.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Town/city"
                            />
                            <Label
                              className="inputLabel"
                              title="Region"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[3].address.region', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.region', '')}
                              rules={organisationUBO1.region.validate}
                              name={organisationUBO3.region.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Region"
                            />
                            <Label
                              className="inputLabel"
                              title="Postcode"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              defaultValue={get(state, 'user.uboInfo[3].address.postalCode', '')}
                              // defaultValue={get(state, 'user.uboInfo[1].address.postalCode', '')}
                              rules={organisationUBO1.postalCode.validate}
                              name={organisationUBO3.postalCode.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Postcode"
                              onKeyDown={(e) => {
                                step15 && onKeyDown(e, formMethod, 12)
                                // step14 && onKeyDown(e, formMethod, 12)
                              }}
                            />
                          </div>
                        </div>
                        <div className="signbtnfield">
                          <CustomButton
                            type="button"
                            title="Back"
                            className="back"
                            onClick={() => {
                              setStep(15)
                            }}
                          />
                          {
                            <CustomButton
                              type="button"
                              title={step === 16 ? "Submit" : "Save & Add Another UBO"}
                              loading={step === 16 ? saveBusy : busy}

                              disabled={
                                !step16
                              }
                              onClick={() => {
                                onClickFirstStep(formMethod, 12)
                              }}
                            />
                          }
                        </div>
                      </div>
                    </Scrollbars>
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
  connect(mapStateToProps, mapDispatchToProps)(OrganisationForm)
);
