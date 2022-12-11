import React, {useEffect, useState} from "react";
import './PersonalEditModal.scss';
import {connect} from "react-redux";
import {withRouter, Link, } from 'react-router-dom';
import {Controller} from 'react-hook-form';
import Scrollbars from "react-custom-scrollbars";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import HookForm from '../../../../components/HookForm/HookForm';
import Calender from '../../../../components/UI/Calender/Calender';
import TextField from '../../../../components/UI/TextField/TextField';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import {showToast} from "../../../../state/ducks/utils/operations";
import countryListJSON from "../../../../util/countryname";
import {filter} from "lodash";
import Autocomplete from "react-autocomplete";
import {dateFormat} from "../../../../services/helper.service";
import {editPersonalDetails} from "../../../../state/ducks/Job/actions";
import StorageService from "./../../../../services/localstorage.service";

const profileForm = {

    firstName: {
        name: 'firstName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            }
        },
    },
    lastName: {
        name: 'lastName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            }
        },
    },
    birthDate: {
        name: 'birthDate',
        validate: {
            required: {
                value: true
            }
        },
    },
    email: {
        name: 'email',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }, pattern: {
                value: Constant.REGEX.email,
                message: ((Message.ERRORMESSAGE.EMAILINVALID))
            }
        },
    },
    nationality: {
        name: 'nationality',

    },
    addressOne: {
        name: 'addressOne',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: Message.ERRORMESSAGE.ALFANUMINVALID,
            },
        },
    },
    addressTwo: {
        name: 'addressTwo',
        validate: {
            pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: Message.ERRORMESSAGE.ALFANUMINVALID,
            },
        },
    },
    city: {
        name: 'city',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
        },
    },
    region: {
        name: 'region',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
        },
    },
    houseNo: {
        name: 'houseNo',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
            pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: Message.ERRORMESSAGE.ALFANUMINVALID,
            },
        },
    },
    postalCode: {
        name: 'postalCode',
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.POSTALCODEEMPTY,
            },
            pattern: {
                value: Constant.REGEX.ALPHANUMER,
                message: Message.ERRORMESSAGE.SPECIALCHARNOTVALID,
            },
            maxLength: {value: 10, message: "Must be 10 digits "},
        },
    },
    countryCode: {
        name: 'countryCode',
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.EMPTYFIELD
            }
        },
    },
    phoneNumber: {
        name: 'phoneNumber',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
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
}
const PersonalEditModal = (props) => {
    const {userInfo} = props
    const [form, setLoginForm] = React.useState()
    const [countryName, setCountryName] = useState(filter(countryListJSON, (i) => {return i.id === userInfo?.country})[0].name);
    const [countryFlag, setCountryFlag] = useState("");
    const [busy, setBusy] = React.useState(false)
    const onFormSubmit = (data) => {
        setBusy(true)
        let param = {
            firstName: data?.firstName,
            lastName: data?.lastName,
            country: countryListJSON.filter((countryname) => countryname.name === countryName)[0].id,
            dob: dateFormat(data?.birthDate, 'yyyy-MM-DD'),
            number: data?.phoneNumber,
            dialCode: data?.countryCode.split('+')[data?.countryCode.split('+').length - 1],
            houseNo: data?.houseNo,
            addressLine1: data?.addressOne,
            city: data?.city,
            region: data?.region,
            postalCode: data?.postalCode
        }
        param = data?.addressTwo ? {...param, addressLine2: data?.addressTwo} : {...param}

        props.editPersonalDetails(param).then((res) => {
            setBusy(false)
            StorageService.setItem("user", res.payload)
            props.onHide()
            props.showToast({message: res.message, type: 'success'})
        }).catch((error) => {
            setBusy(false)

            props.onHide()
            props.showToast({message: error?.response?.data?.message, type: 'error'})
        })
    }
    const defaultvalue = {
        email: userInfo?.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        houseNo: userInfo?.address?.houseNo,
        birthDate: new Date(userInfo?.dob),
        countryCode: `+${userInfo?.dialCode}`,
        phoneNumber: userInfo?.number,
        addressOne: userInfo?.address?.addressLine1,
        addressTwo: userInfo?.address?.addressLine2 || "",
        city: userInfo?.address?.city,
        region: userInfo?.address?.region,
        postalCode: userInfo?.address?.postalCode,
    }

    return (
        <div className='personalEditModal' >
            <Scrollbars className="popupScroll">
                <div className="boxContain">
                    <HookForm
                        defaultForm={defaultvalue}
                        init={form => setLoginForm(form)}
                        onSubmit={onFormSubmit}>
                        {(formMethod) => {
                            return (
                                <div className="form">
                                    <div className="leftPart">
                                        <div className="informationDetailTitle">Personal Information</div>
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.email.validate}
                                            name={profileForm.email.name}
                                            errors={formMethod?.errors}
                                            type="text"
                                            placeholder="johndoe@gmail.com"
                                            disabled
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.firstName.validate}
                                            name={profileForm.firstName.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="John"
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.lastName.validate}
                                            name={profileForm.lastName.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="Doe"
                                        />
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
                                                    rules={profileForm.nationality.validate}
                                                    name={profileForm.nationality.name}
                                                    render={({onChange}) => (
                                                        <>
                                                            <p className="flaimg">{countryFlag}</p>
                                                            {/* <button className={countryName ? "close-icon iconEmpty" : "close-icon"} type="reset" onClick={() => setCountryName("")}></button> */}

                                                            <Autocomplete
                                                                inputProps={{placeholder: "Nationality"}}
                                                                getItemValue={(item) => item.name}
                                                                shouldItemRender={(item, value) =>
                                                                    item?.name
                                                                        ?.toLowerCase()
                                                                        .indexOf(value.toLowerCase()) > -1
                                                                }
                                                                items={countryListJSON}

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
                                                                wrapperStyle={{display: "block"}}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* <TextField
                                            type="text"
                                            placeholder="United Kingdom"
                                            formMethod={formMethod}
                                            rules={profileForm.nationality.validate}
                                            name={profileForm.nationality.name}
                                            errors={formMethod?.errors}
                                        /> */}
                                        <div className="calenderMain">
                                            <Controller
                                                control={formMethod?.control}
                                                rules={profileForm.birthDate.validate}
                                                name={profileForm.birthDate.name}
                                                defaultValue={''}
                                                render={(props) => (
                                                    <Calender
                                                        selected={props.value}
                                                        onChange={(e) => props.onChange(e)}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="20 Nov 1989"
                                                    // readOnly
                                                    ></Calender>
                                                )} />
                                        </div>


                                        <div className="countryPhoneGroup">
                                            <Controller
                                                defaultValue={userInfo?.dialCode || 44}
                                                control={formMethod?.control}
                                                name={profileForm.countryCode.name}
                                                rules={profileForm.countryCode.validate}
                                                render={({onChange}) =>
                                                    <PhoneInput
                                                        placeholder="+44"
                                                        enableSearch="true"
                                                        disableSearchIcon="false"
                                                        country={"gb"}
                                                        value={formMethod.watch(profileForm.countryCode.name)}
                                                        onChange={onChange}
                                                    />
                                                }
                                                name={profileForm.countryCode.name}
                                                control={formMethod.control}
                                                rules={profileForm.countryCode.validate}
                                                defaultValue=""
                                            />
                                            <TextField
                                                redStar={true}
                                                noTextfield={true}
                                                onChange={(e) => this.onPhoneChange(formMethod, e)}
                                                maskType="9999999999999"
                                                formMethod={formMethod}
                                                rules={profileForm.phoneNumber.validate}
                                                name={profileForm.phoneNumber.name}
                                                errors={formMethod?.errors}
                                                placeholder="Contact Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="rightPart">
                                        <div className="informationDetailTitle">Address Information</div>
                                        <TextField
                                            type="text"
                                            placeholder="house no"
                                            formMethod={formMethod}
                                            rules={profileForm.houseNo.validate}
                                            name={profileForm.houseNo.name}
                                            errors={formMethod?.errors}
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.addressOne.validate}
                                            name={profileForm.addressOne.name}
                                            errors={formMethod?.errors}
                                            type="text"
                                            placeholder="Address Line 1"
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.addressTwo.validate}
                                            name={profileForm.addressTwo.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="Address Line 2"
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.city.validate}
                                            name={profileForm.city.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="City "
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.region.validate}
                                            name={profileForm.region.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="region "
                                        />

                                        <TextField
                                            type="text"
                                            placeholder="Postal Code"
                                            formMethod={formMethod}
                                            rules={profileForm.postalCode.validate}
                                            name={profileForm.postalCode.name}
                                            errors={formMethod?.errors}
                                        />
                                    </div>
                                    <div className="btnRow">
                                        <CustomButton type="submit" title="Update" disabled={!formMethod?.formState.isValid} loading={busy} />
                                        <Link to="#" className="cancelBtn" onClick={() => props.onHide()}>Cancel</Link>
                                    </div>
                                </div>
                            )
                        }}
                    </HookForm>
                </div>
            </Scrollbars>
        </div>


    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    showToast, editPersonalDetails
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonalEditModal));