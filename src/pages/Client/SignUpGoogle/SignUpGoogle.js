import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import Autocomplete from "react-autocomplete";
import Scrollbars from "react-custom-scrollbars";
import 'react-phone-input-2/lib/style.css'
import { showToast } from "../../../state/ducks/utils/operations";

import StorageService from "./../../../services/localstorage.service";

import HookForm from "../../../components/HookForm/HookForm";
import useWindowDimension from "../../../hooks/useWindowDimension";

import TextField from "../../../components/UI/TextField/TextField";
import RadioButton from "./../../../components/UI/RadioButton/RadioButton";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import CalenderCustom from "./../../../components/UI/CalenderCustom/CalenderCustom";
import FileUpload from "../../../components/FileUpload/FileUpload";
import Label from "../../../components/UI/Label/Label";
import { get, filter } from "lodash";
import Message from "../../../util/message";
import Constant from "../../../util/constant";
import countryListJSON from "../../../util/countryname.js";
import moment from "moment";
import CheckBox from '../../../components/UI/CheckBox/CheckBox';
import "./SignUpGoogle.scss";
import logo from '../../../assets/images/trustpay1.png';

import {
  signupWithEmail,
  signupWithEmailProcess,
} from "../../../state/ducks/auth/actions";

const multiErrorFields = [
  { length: "Password must be minimum of 8 characters" },
  { hasUppercase: "1 Lower and Upper case" },
  { hasSpecialChar: "1 Special Character" },
  { hasNumbers: "1 Number" },
  { hasName: "Password should not contain first and last name" },
];

const signupgoogle = {
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
  organisation: {
    name: "Business",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.ORGANISATIONEMPTY,
      },
      pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: Message.ERRORMESSAGE.ALFANUMINVALID,
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
      minLength: { value: 8, message: Message.ERRORMESSAGE.MINACCOUNT },
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
function SignUpGoogle(props) {
  const { state } = props.location;
  const { user, provider } = props.location.state;
  const dimensions = useWindowDimension();// eslint-disable-next-line
  const [form, setLoginForm] = useState();
  const [clientType, setClientType] = useState(user.accountType ? user.accountType === 1 ? "Individual" : "ORG" : "Individual");
  const [Uboinfo, setUboInfo] = useState(user && user.uboInfo && user.uboInfo.length >= 1 ? "ORG" : "Individual");
  const [busy, setBusy] = React.useState(false);
  const [savebusy, setIsBusy] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const [step, setStep] = useState(props.location.state.step || 1);
  let [image, setImage] = useState();
  const [countryName, setCountryName] = useState(state && state.user && state.user.country && filter(countryListJSON, (i) => { return i.id === state.user.country })[0].name || "");
  const [countryNameUBO1, setCountryNameUBO1] = useState(state && state.user && state.user.uboInfo && state.user.uboInfo.length > 0 && state.user.uboInfo[0].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[0].nationality })[0].name || "");
  const [countryNameUBO2, setCountryNameUBO2] = useState(state && state.user && state.user.uboInfo && state.user.uboInfo.length > 1 && state.user.uboInfo[1].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[1].nationality })[0].name || "");
  const [countryNameUBO3, setCountryNameUBO3] = useState(state && state.user && state.user.uboInfo && state.user.uboInfo.length >= 3 && state.user.uboInfo[2].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[2].nationality })[0].name || "");
  const [countryNameUBO4, setCountryNameUBO4] = useState(state && state.user && state.user.uboInfo && state.user.uboInfo.length >= 4 && state.user.uboInfo[3].nationality && filter(countryListJSON, (i) => { return i.id === state.user.uboInfo[3].nationality })[0].name || "");

  const [countryFlag, setCountryFlag] = useState("");// eslint-disable-next-line
  const [countryList, setCountryList] = useState(countryListJSON);
  let [showImageName, setShowImageName] = useState();
  const [data, setdata] = useState();
  const [checked, setChecked] = useState(false);
  const [isError, setisError] = useState(false)
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear() - 18;
  const onFormSubmit = () => { };

  const onKeyDown = (e, formMethod, value, skip = true) => {
    e.keyCode === 13 && onClickFirstStep(formMethod, value, skip);
  };

  const ClientTypeHandler = (event) => {
    setClientType(event.target.value);
  };
  const UboInformation = (event) => {
    setUboInfo(event.target.value);
  };

  const onClickFirstStep = async (formMethod, value, skip = true, final = true) => {
    let param;
    if (skip) {
      switch (step) {
        case 1:
          param = {
            accountType: clientType === "ORG" ? 2 : 1,
            firstName: formMethod.watch("firstName"),
            lastName: formMethod.watch("lastName"),
            email: formMethod.watch("email"),
            [provider]: user.id,
            registerStep: 1,
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
            password: formMethod.watch("password"),
            registerStep: 5,
          };
          break;
        case 4:
          param = {
            dialCode: formMethod.watch("cunrtyCode"),
            number: formMethod.watch("phoneNumber"),
            registerStep: 6,
          };
          break;
        case 5:
          param = {
            country: countryListJSON.filter((countryname) => countryname.name === countryName)[0].id,
            registerStep: 7,
          };
          break;
        case 6:
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
        case 7:
          param = {
            name: formMethod.watch("businessName"),
            number: formMethod.watch("companyNumber"),
            registerStep: 9,
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
        const response =
          step === 1
            ? await props.signupWithEmail(param)
            : await props.signupWithEmailProcess(param, signupID);
        setdata(response.payload);
        setTimeout(() => {
          setBusy(false);
          setIsBusy(false)
          if (!final) {
            props.showToast({ message: "Your account is created successfully.", type: "success", time: 60000 });
            props.location.state && props.location.state.isLogin ? props.history.push("/dashboard") : props.history.push('/login')
            window.localStorage.removeItem("sign-up_ID")
          } else {
            setStep(value);
          }
        }, 1000);
      } catch (error) {
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
  const onImageChange = (acceptedFiles) => {
    var ext = (acceptedFiles[0].name).split('.').pop();
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

  const CustomDatepicker = ({ value, onClick }) => (
    <button type="button" className="custom-input" onClick={onClick}>
      {value ? value : <span className="birth_Placeholder">Date of birth</span>}
    </button>
  );
  return (
    <div className="signGooglePage">
      <Scrollbars
        className="signGoogleScroll"
        style={{ height: dimensions.height + "px" }}
      >
        <div className="signGoogleCenter">
          <div className="signGoogleBox">
            <div className="logo">
              {/* <span className="icon-yatapay-brand"></span> */}
              <img src={logo} alt="logo" width='100' />

            </div>
            {/* <h1>Signedup Using Google</h1>  */}
            <div className="formSection">
              <HookForm
                defaultForm={{
                  email: user.email,
                  firstName: user.firstName || user.name,
                  lastName: user.lastName,
                  // birthDate: "20/02/1996",
                  // phoneNumber: user.number,
                  // cunrtyCode: "+44",
                  // nationality: user.country,
                  // houseName: user.address.houseNo,
                  // address1: user.address.addressLine1,
                  // address2: user.address.addressLine2,
                  // townCity: user.address.city,
                  // region: user.address.region,
                  // postalCode: user.address.postalCode,
                  // businessName: user.name,
                  // companyNumber: user.number,
                  // accountNumber: user.accountNumber,
                  // sortCode: user.sortCode,
                  // firstName_UBO: user.uboInfo[0].firstName,
                  // lastName_UBO: user.uboInfo[0].lastName,
                  // birthDate_UBO: user.uboInfo[0].dob,
                  // houseName_UBO: user.uboInfo[0].houseNo,
                  // address_UBO: user.uboInfo[0].address1,
                  // townCity_UBO: user.uboInfo[0].city,
                  // region_UBO: user.uboInfo[0].region,
                  // postalCode_UBO: user.uboInfo[0].postalCode,
                }}
                init={(signupGoogleform) => setLoginForm(signupGoogleform)}
                onSubmit={onFormSubmit}
              >
                {(formMethod) => {
                  const step1 = formMethod.watch("firstName") &&
                    formMethod.watch("lastName") &&
                    formMethod.watch("email") &&
                    formMethod?.errors.firstName === undefined &&
                    formMethod?.errors.lastName === undefined &&
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
                      <div className="signup_google">
                        <div className="form_inner">
                          <section
                            className={
                              step === 1 ? "showStep2 active1" : "showStep2"
                            }
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
                              formMethod={formMethod}
                              rules={signupgoogle.firstName.validate}
                              name={signupgoogle.firstName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="First name"
                            // defaultValue="John"
                            // disabled
                            />
                            <TextField
                              formMethod={formMethod}
                              rules={signupgoogle.lastName.validate}
                              name={signupgoogle.lastName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              onKeyDown={(e) => step1 && onKeyDown(e, formMethod, 2)}
                              placeholder="Last name"
                            />
                            <Label
                              className="inputLabel"
                              title="What's your email address?"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              rules={signupgoogle.email.validate}
                              name={signupgoogle.email.name}
                              errors={formMethod?.errors}
                              type="text"
                              placeholder="Email"
                              disabled={user.email ? true : false}
                            />
                            <div className="clienttype">
                              <div className="clienttypeleft">
                                <p>Client Type</p>
                              </div>
                              <div className="clienttyperight">
                                <RadioButton
                                  changed={ClientTypeHandler}
                                  id="1"
                                  isSelected={clientType === "Individual"}
                                  label="Individual"
                                  value="Individual"
                                />
                                {/* <RadioButton
                                  changed={ClientTypeHandler}
                                  id="2"
                                  isSelected={clientType === "ORG"}
                                  label="Business"
                                  value="ORG"
                                /> */}
                              </div>
                            </div>
                            <div className="fieldText">
                              Next we'll need your date of birth
                            </div>

                            <div className='terms-condition'>
                              <CheckBox
                                id="remember"
                                labelTitle='by continuing you agree to our '
                                checked={checked}
                                onCheckedChange={(checked) =>
                                  setChecked(checked)
                                }
                              />
                              <a href="https://dev.zudu.co.uk/yatapay/privacy-policy/" target="_blank">Terms and Privacy</a>
                            </div>


                            <div className="signbtnfield">
                              <CustomButton
                                type="button"
                                title="Back"
                                className="back"
                                onClick={() => props.history.push('/sign-up')}
                              />
                              {step1 && (
                                <CustomButton
                                  type="button"
                                  title="Next"
                                  disabled={!checked}
                                  loading={busy}
                                  className={!checked ? 'back' : "custombtn"}
                                  onClick={() =>
                                    onClickFirstStep(formMethod, 2)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 2 ? "showStep2 active2" : "showStep2"
                            }
                          >
                            <Label
                              className="inputLabel"
                              title="What's your date of birth?"
                            ></Label>
                            <div className="calenderMain">
                              <Controller
                                defaultValue={state && state.user && state.user.dob && new Date(state.user.dob) || ""}
                                control={formMethod?.control}
                                rules={signupgoogle.birthDate.validate}
                                name={signupgoogle.birthDate.name}
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
                              Next we'll need your phone number
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
                                  onClick={() =>
                                    onClickFirstStep(formMethod, 4)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 3 ? "showStep2 active3" : "showStep2"
                            }
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
                                        Constant.REGEX.LOWERCASE_UPPERCASE
                                      )) ||
                                    "1 Lower and Uppercase",
                                  hasSpecialChar: (value) =>
                                    (value &&
                                      value.match(
                                        Constant.REGEX.SPECIAL_CHAR
                                      )) ||
                                    "1 Special Character",
                                  hasNumbers: (value) =>
                                    (value &&
                                      value.match(Constant.REGEX.NUMBER)) ||
                                    "1 Number",
                                  hasName: (value) =>
                                    (value &&
                                      value.indexOf(
                                        formMethod.watch("lastName")
                                      ) === -1 &&
                                      value.indexOf(
                                        formMethod.watch("firstName")
                                      ) === -1) ||
                                    "Password should not contain first and last name",
                                },
                              }}
                              multiErrorFields={multiErrorFields}
                              name={signupgoogle.password.name}
                              errors={formMethod?.errors}
                              showHidePasswordNew={() =>
                                this.showHidePasswordNew()
                              }
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
                                    (value &&
                                      value === formMethod.watch("password")) ||
                                    Message.ERRORMESSAGE.CONFIRMINVALID,
                                },
                              }}
                              name={signupgoogle.confirmPassword.name}
                              errors={formMethod?.errors}
                              type={showConfirmPass ? "text" : "password"}
                              showHidePasswordConf={() =>
                                this.showHidePasswordConf()
                              }
                              placeholder="Confirm password"
                              iconClass={
                                showConfirmPass ? "eye-hide" : "eye-show"
                              }
                              onChange={() =>
                                formMethod.watch("password") &&
                                formMethod.trigger("password")
                              }
                              onIconClick={() =>
                                setShowConfirmPass(!showConfirmPass)
                              }
                              onKeyDown={(e) => step4 && onKeyDown(e, formMethod, 4)}

                            />
                            <div className="fieldText">
                              Next we'll need your phone number
                            </div>
                            <div className="signbtnfield">
                              <CustomButton
                                type="button"
                                title="Back"
                                className="back"
                                onClick={() => setStep(2)}
                              />
                              {step4 && (
                                <CustomButton
                                  type="button"
                                  title="Next"
                                  loading={busy}
                                  onClick={() =>
                                    onClickFirstStep(formMethod, 4)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 4 ? "showStep2 active4" : "showStep2"
                            }
                          >
                            <Label
                              className="inputLabel"
                              title="What's your phone number?"
                            ></Label>
                            <div className="countryPhoneGroup">
                              <Controller
                                defaultValue={get(state, 'user.dialCode', '44')}
                                control={formMethod?.control}
                                name={signupgoogle.cunrtyCode.name}
                                rules={signupgoogle.cunrtyCode.validate}
                                render={(props) => (
                                  <PhoneInput
                                    country={"gb"}
                                    disableSearchIcon="false"
                                    placeholder="+44"
                                    enableSearch="true"
                                    value={formMethod.watch(
                                      signupgoogle.cunrtyCode.name
                                    )}
                                    onChange={props.onChange}
                                  />
                                )}
                              />
                              <TextField
                                redStar={true}
                                noTextfield={true}
                                onChange={(e) =>
                                  this.onPhoneChange(formMethod, e)
                                }
                                defaultValue={get(state, 'user.number', '')}
                                maskType="9999999999999"
                                formMethod={formMethod}
                                rules={signupgoogle.phoneNumber.validate}
                                name={signupgoogle.phoneNumber.name}
                                errors={formMethod?.errors}
                                placeholder="Phone number"
                                onKeyDown={(e) => step5 && onKeyDown(e, formMethod, 5)}

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
                                onClick={() => setStep(2)}
                              />
                              {step5 && (
                                <CustomButton
                                  type="button"
                                  title="Next"
                                  loading={busy}
                                  onClick={() =>
                                    onClickFirstStep(formMethod, 5)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 5 ? "showStep2 active5" : "showStep2"
                            }
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
                                  name={signupgoogle.country.name}
                                  rules={signupgoogle.country.validate}
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
                                          boxShadow:
                                            "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
                                onClick={() => setStep(4)}
                              />
                              {countryName && (
                                <CustomButton
                                  type="button"
                                  title="Next"
                                  loading={busy}
                                  onClick={() => onClickFirstStep(formMethod, 6)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 6 ? "showStep2 active6" : "showStep2"
                            }
                          >
                            <Label
                              className="inputLabel"
                              title="What's your address?"
                            ></Label>
                            <TextField
                              defaultValue={state && state.user && get(state, 'user.address.houseNo', '')}
                              formMethod={formMethod}
                              rules={signupgoogle.houseName.validate}
                              name={signupgoogle.houseName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="House name"
                            />
                            <TextField
                              defaultValue={state && state.user && get(state, 'user.address.addressLine1', '')}
                              formMethod={formMethod}
                              rules={signupgoogle.address.validate}
                              name={signupgoogle.address.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Address line 1"
                            />
                            <TextField
                              defaultValue={state && state.user && get(state, 'user.address.addressLine2', '')}
                              formMethod={formMethod}
                              rules={signupgoogle.address2.validate}
                              name={signupgoogle.address2.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Address line 2"
                            />
                            <TextField
                              defaultValue={state && state.user && get(state, 'user.address.city', '')}
                              formMethod={formMethod}
                              rules={signupgoogle.townCity.validate}
                              name={signupgoogle.townCity.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Town/city"
                            />
                            <TextField
                              defaultValue={state && state.user && get(state, 'user.address.region', '')}
                              formMethod={formMethod}
                              rules={signupgoogle.region.validate}
                              name={signupgoogle.region.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Region"
                            />
                            <TextField
                              defaultValue={state && state.user && get(state, 'user.address.postalCode', '')}
                              formMethod={formMethod}
                              rules={signupgoogle.postalCode.validate}
                              name={signupgoogle.postalCode.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Postcode"
                              onKeyDown={(e) => step7 && onKeyDown(e, formMethod, 7)}

                            />
                            <div className="fieldText">
                              {clientType === "ORG" ? "Next we'll need to confirm your business name" : "Next we'll need your bank details"}
                            </div>
                            <div className="signbtnfield">
                              <CustomButton
                                type="button"
                                title="Back"
                                className="back"
                                onClick={() => setStep(5)}
                              />
                              {step7 && (
                                <CustomButton
                                  type="button"
                                  title="Next"
                                  loading={busy}
                                  onClick={() =>
                                    clientType === "ORG" ?
                                      onClickFirstStep(formMethod, 7) : onClickFirstStep(formMethod, 8)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 7 ? "showStep2 active8" : "showStep2"
                            }
                          >
                            <Label
                              className="inputLabel"
                              title="What's the name of your business?"
                            ></Label>
                            <TextField
                              formMethod={formMethod}
                              rules={signupgoogle.businessName.validate}
                              name={signupgoogle.businessName.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              defaultValue={get(state, 'user.company.name', '')}
                              type="text"
                              placeholder="Business name"
                            />
                            <TextField
                              formMethod={formMethod}
                              rules={signupgoogle.companyNumber.validate}
                              name={signupgoogle.companyNumber.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Company number"
                              onKeyDown={(e) => step8 && onKeyDown(e, formMethod, 8)}
                              defaultValue={get(state, 'user.company.number', '')}

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
                              {step8 && (
                                <CustomButton
                                  type="button"
                                  title="Next"
                                  loading={busy}
                                  onClick={() =>
                                    onClickFirstStep(formMethod, 8)
                                  }
                                />
                              )}
                            </div>
                          </section>

                          <section
                            className={
                              step === 8 ? "showStep2 active6" : "showStep2"
                            }
                          >
                            <button
                              type="button"
                              onClick={() =>
                                onClickFirstStep(formMethod, 9, false)
                              }
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
                              rules={signupgoogle.accountNumber.validate}
                              name={signupgoogle.accountNumber.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              noTextfield={true}
                              maskType="9999999999999999999999999"
                              type="number"
                              defaultValue={get(state, 'user.bankInfo.accountNumber', '')}
                              placeholder="Account number"
                            />
                            <TextField
                              formMethod={formMethod}
                              rules={signupgoogle.sortCode.validate}
                              name={signupgoogle.sortCode.name}
                              errors={formMethod?.errors}
                              autoFocus={true}
                              type="text"
                              placeholder="Sort code"
                              onKeyDown={(e) => step9 && onKeyDown(e, formMethod, 9)}
                              defaultValue={get(state, 'user.bankInfo.sortCode', '')}

                            />
                            <div className="fieldText">
                              Next we'll need a photo of your ID
                            </div>
                            <div className="signbtnfield">
                              <CustomButton
                                type="button"
                                title="Back"
                                className="back"
                                onClick={() => clientType === "ORG" ?
                                  setStep(7) : setStep(6)}
                              />
                              {step9 && (
                                <CustomButton
                                  type="button"
                                  title="Next"
                                  loading={busy}
                                  onClick={() =>
                                    onClickFirstStep(formMethod, 9)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 9 ? "showStep2 active7" : "showStep2"
                            }
                          >
                            <button
                              type="button"
                              onClick={() =>
                                clientType === "ORG"
                                  ? onClickFirstStep(formMethod, 11, false)
                                  : onClickFirstStep(formMethod, 12, false)
                              }
                              className="skip_txt"
                            >
                              skip
                            </button>
                            <Label
                              className="inputLabel"
                              title="Document upload"
                            ></Label>
                            <div className="sub_txt">
                              To confirm your identity, please upload a photo of
                              your driver's licence or passport
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
                                      accept='image/jpeg,image/jpg, image/png,.pdf'
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
                                                Drop files here or click to
                                                upload.
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
                                title="Next"
                                disabled={!(!isError && image)}
                                loading={busy}
                                onClick={() =>
                                  clientType === "ORG" ? onClickFirstStep(formMethod, 11) :
                                    onClickFirstStep(formMethod, 12)
                                }
                              />
                            </div>
                          </section>
                          <section
                            className={
                              step === 12 ? "showStep2 active8" : "showStep2"
                            }
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
                                onClick={() => {
                                  let backStep = clientType === "ORG" ? Uboinfo === "ORG" ? setStep(16) : setStep(11) : setStep(9)
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
                                      backStep = 11
                                  }
                                  clientType === "ORG" ? Uboinfo === "ORG" ? setStep(backStep) : setStep(11) : setStep(9)
                                }}
                              />
                              {(
                                <CustomButton
                                  type="button"
                                  title="Submit"
                                  loading={busy}
                                  onClick={() =>
                                    onClickFirstStep(formMethod, 12, true, false)
                                  }
                                />
                              )}
                            </div>
                          </section>
                          <section
                            className={
                              step === 11 ? "showStep2 active11" : "showStep2"
                            }
                          >
                            <Label
                              className="inputLabel"
                              title=" Are you the sole business owner or legal representative?"
                            ></Label>
                            <div className="clienttyperight">
                              <RadioButton
                                changed={UboInformation}
                                id="yes"
                                isSelected={Uboinfo === "Individual"}
                                label="Yes"
                                value="Individual"
                              />
                              <RadioButton
                                changed={UboInformation}
                                id="no"
                                isSelected={Uboinfo === "ORG"}
                                label="No"
                                value="ORG"
                              />
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
                                title="Next"
                                loading={busy}
                                onClick={() =>
                                  Uboinfo === "Individual"
                                    ? onClickFirstStep(formMethod, 12, false)
                                    : onClickFirstStep(formMethod, 13, false)
                                }
                              />
                            </div>
                          </section>

                          <section
                            className={
                              step === 13 ? "showStep2 active13 detailsheading" : "showStep2"
                            }
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
                                  title="First name"
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
                                  title="Whats your nationality?"
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
                                          <p className="flaimg">
                                            {countryFlag}
                                          </p>
                                          <button className={countryNameUBO1 ? "close-icon iconEmpty" : "close-icon"} type="reset" onClick={() => setCountryNameUBO1("")}></button>

                                          <Autocomplete
                                            inputProps={{
                                              placeholder: "Nationality",
                                            }}
                                            getItemValue={(item) => item.name}
                                            shouldItemRender={(item, value) =>
                                              item?.name
                                                ?.toLowerCase()
                                                .indexOf(value.toLowerCase()) >
                                              -1
                                            }
                                            items={countryList}
                                            renderItem={(
                                              item,
                                              isHighlighted
                                            ) => (
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
                                      formMethod={formMethod}
                                      rules={organisationUBO.houseName.validate}
                                      name={organisationUBO.houseName.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      type="text"
                                      defaultValue={get(state, 'user.uboInfo[0].address.houseNo', '')}
                                      placeholder="House name"
                                    />
                                    <Label
                                      className="inputLabel"
                                      title="Street name "
                                    ></Label>
                                    <TextField
                                      formMethod={formMethod}
                                      rules={organisationUBO.address.validate}
                                      name={organisationUBO.address.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      type="text"
                                      defaultValue={get(state, 'user.uboInfo[0].address.addressLine', '')}
                                      placeholder="Street name"
                                    />
                                    <Label
                                      className="inputLabel"
                                      title="Town/city"
                                    ></Label>
                                    <TextField
                                      formMethod={formMethod}
                                      rules={organisationUBO.townCity.validate}
                                      name={organisationUBO.townCity.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      type="text"
                                      defaultValue={get(state, 'user.uboInfo[0].address.city', '')}
                                      placeholder="Town/city"
                                    />
                                    <Label
                                      className="inputLabel"
                                      title="Region"
                                    ></Label>
                                    <TextField
                                      formMethod={formMethod}
                                      rules={organisationUBO.region.validate}
                                      name={organisationUBO.region.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      type="text"
                                      defaultValue={get(state, 'user.uboInfo[0].address.region', '')}
                                      placeholder="Region"
                                    />
                                    <Label
                                      className="inputLabel"
                                      title="Postcode"
                                    ></Label>
                                    <TextField
                                      formMethod={formMethod}
                                      rules={
                                        organisationUBO.postalCode.validate
                                      }
                                      name={organisationUBO.postalCode.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      type="text"
                                      placeholder="Postcode"
                                      onKeyDown={(e) => step13 && onKeyDown(e, formMethod, 14)}
                                      defaultValue={get(state, 'user.uboInfo[0].address.postalCode', '')}

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
                                    title="Save & Add Another UBO"
                                    disabled={
                                      !step13
                                    }
                                    loading={busy}
                                    onClick={() =>
                                      onClickFirstStep(formMethod, 14)
                                    }
                                  />
                                  <CustomButton
                                    type="button"
                                    loading={savebusy}
                                    title="Save"
                                    disabled={
                                      !step13
                                    }
                                    onClick={() => onClickFirstStep(formMethod, 12)}
                                  />
                                </div>
                              </div>
                            </Scrollbars>
                          </section>
                          <section
                            className={
                              step === 14 ? "showStep2 active14" : "showStep2"
                            }
                          >
                            <button
                              type="button"
                              className="skip_txt"
                              onClick={() =>
                                onClickFirstStep(formMethod, 12, false)
                              }
                            >
                              skip
                            </button>
                            <Label className="inputLabel" title="UBO Details (2)"></Label>
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

                                />
                                <Label
                                  className="inputLabel"
                                  title="First name"
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
                                    defaultValue={get(state, 'user.uboInfo[1].dob') && new Date(state.user.uboInfo[1].dob) || ""}

                                    control={formMethod?.control}
                                    rules={organisationUBO1.birthDate.validate}
                                    name={organisationUBO1.birthDate.name}
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
                                  title="Whats your nationality?"
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
                                          <p className="flaimg">
                                            {countryFlag}
                                          </p>
                                          <button className={countryNameUBO2 ? "close-icon iconEmpty" : "close-icon"} type="reset" onClick={() => setCountryNameUBO2("")}></button>

                                          <Autocomplete
                                            inputProps={{
                                              placeholder: "Nationality",
                                            }}
                                            getItemValue={(item) => item.name}
                                            shouldItemRender={(item, value) =>
                                              item?.name
                                                ?.toLowerCase()
                                                .indexOf(value.toLowerCase()) >
                                              -1
                                            }
                                            items={countryList}
                                            renderItem={(
                                              item,
                                              isHighlighted
                                            ) => (
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
                                              setCountryNameUBO2(e.target.value);
                                            }}
                                            onSelect={(val, item) => {
                                              setCountryNameUBO2(val);
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
                                      rules={
                                        organisationUBO1.houseName.validate
                                      }
                                      name={organisationUBO1.houseName.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      defaultValue={get(state, 'user.uboInfo[1].address.houseNo', '')}
                                      type="text"
                                      placeholder="House name/number"
                                    />
                                    <Label
                                      className="inputLabel"
                                      title="Street name "
                                    ></Label>
                                    <TextField
                                      formMethod={formMethod}
                                      rules={organisationUBO1.address.validate}
                                      name={organisationUBO1.address.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      defaultValue={get(state, 'user.uboInfo[1].address.addressLine', '')}
                                      type="text"
                                      placeholder="Street name"
                                    />
                                    <Label
                                      className="inputLabel"
                                      title="Town/city"
                                    ></Label>
                                    <TextField
                                      defaultValue={get(state, 'user.uboInfo[1].address.city', '')}
                                      formMethod={formMethod}
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
                                      rules={organisationUBO1.region.validate}
                                      name={organisationUBO1.region.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      defaultValue={get(state, 'user.uboInfo[1].address.region', '')}
                                      type="text"
                                      placeholder="Region"
                                    />
                                    <Label
                                      className="inputLabel"
                                      title="Postcode"
                                    ></Label>
                                    <TextField
                                      formMethod={formMethod}
                                      rules={
                                        organisationUBO1.postalCode.validate
                                      }
                                      name={organisationUBO1.postalCode.name}
                                      errors={formMethod?.errors}
                                      autoFocus={true}
                                      type="text"
                                      defaultValue={get(state, 'user.uboInfo[1].address.postalCode', '')}
                                      placeholder="Postcode"
                                      onKeyDown={(e) => step14 && onKeyDown(e, formMethod, 12)}
                                    />
                                  </div>
                                </div>
                                <div className="signbtnfield">
                                  <CustomButton
                                    type="button"
                                    title="Back"
                                    className="back"
                                    onClick={() => setStep(13)}
                                  />
                                  {
                                    <CustomButton
                                      type="button"
                                      title="Save & Add Another UBO"
                                      loading={busy}
                                      disabled={
                                        !step14
                                      }
                                      onClick={() =>
                                        onClickFirstStep(formMethod, 15)
                                      }
                                    />
                                  }
                                  <CustomButton
                                    type="button"
                                    loading={savebusy}
                                    title="Save"
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
                                  title="last name"
                                ></Label>
                                <TextField
                                  type="text"
                                  placeholder="Last name"
                                  formMethod={formMethod}
                                  rules={organisationUBO1.lastName.validate}
                                  name={organisationUBO2.lastName.name}
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
                                      title={"Save & Add Another UBO"}
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
                                    loading={savebusy}
                                    title="Save"
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
                                  title="last name"
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
                                      title={step === 16 ? "Save" : "Save & Add Another UBO"}
                                      loading={step === 16 ? savebusy : busy}

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
            </div>
          </div>
        </div>
      </Scrollbars>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    userID: state.auth.signup.user,
  };
};

const mapDispatchToProps = {
  showToast,
  signupWithEmail,
  signupWithEmailProcess,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUpGoogle)
);
