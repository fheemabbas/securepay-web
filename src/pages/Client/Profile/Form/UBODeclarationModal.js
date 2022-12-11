import React, {useState} from "react";
import './UBODeclarationModal.scss';
import {connect} from "react-redux";
import {withRouter, } from 'react-router-dom';
import {Controller} from 'react-hook-form';
import countryListJSON from "../../../../util/countryname";
import Autocomplete from "react-autocomplete";
import {filter} from "lodash";
import Scrollbars from "react-custom-scrollbars";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import HookForm from '../../../../components/HookForm/HookForm';
import Calender from '../../../../components/UI/Calender/Calender';
import CalenderCustom from "../../../../components/UI/CalenderCustom/CalenderCustom";
import TextField from '../../../../components/UI/TextField/TextField';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import {showToast} from "../../../../state/ducks/utils/operations";
import {uboDeclaration, updateUbo} from "../../../../state/ducks/auth/actions";
import {setItem} from "../../../../services/localstorage.service";
import {setTimeout} from "core-js";
import {get} from "lodash";
import moment from "moment";

const profileForm = {

    firstName: {
        name: 'firstName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.FIRSTNAMEEMPTY))
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
                message: ((Message.ERRORMESSAGE.LASTNAMEEMPTY))
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
            },
            // pattern: {
            //     value: Constant.REGEX.ALPHANUMERIC,
            //     message: ((Message.ERRORMESSAGE.DATEFORMAT))
            // }
        },
    },
    email: {
        name: 'email',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMAILEMPTY))
            }, pattern: {
                value: Constant.REGEX.email,
                message: ((Message.ERRORMESSAGE.EMAILINVALID))
            }
        },
    },
    nationality: {
        name: 'nationality',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.NATIONALITYEMPTY))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            }
        },
    },
    organisation: {
        name: 'organisation',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.ORGANISATIONEMPTY))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
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
    addressOne: {
        name: 'addressOne',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMAILEMPTY))
            }
        },
    },
    addressTwo: {
        name: 'addressTwo'
    },
    cityCounty: {
        name: 'cityCounty',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMAILEMPTY))
            }
        },
    },
    country: {
        name: 'country',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMAILEMPTY))
            }
        },
    },
    postalCode: {
        name: 'postalCode',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMAILEMPTY))
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
    countryCode: {
        name: 'countryCode',
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.EMAILEMPTY
            }
        },
    },
    phoneNumber: {
        name: 'phoneNumber',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.CONTACTEMPTY))
            },
            maxLength: {value: 13, message: "Contact number must be between 10 to 13 digit"},
            minLength: {value: 10, message: "Contact number must be between 10 to 13 digit"}
        },
    },
}
const UBODeclarationModal = (props) => {
    const {uboInfo} = props
    const [form, setLoginForm] = React.useState()
    const [busy, setBusy] = React.useState(false)
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear() - 18;
    const [countryFlag, setCountryFlag] = React.useState("");
    const [countryName, setCountryName] = React.useState(filter(countryListJSON, (i) => {return i.id === uboInfo?.nationality})?.[0]?.name || '');
    const defaultvalue = {
        // companyName: userInfo?.company.name,
        // companyNumber: userInfo?.company.number,
        // email: userInfo?.email,
        firstName: uboInfo?.firstName,
        lastName: uboInfo?.lastName,
        houseNo: uboInfo?.address?.houseNo,
        birthDate: new Date(uboInfo?.dob),
        countryCode: `+${uboInfo?.dialCode}`,
        // phoneNumber: userInfo?.number,
        addressOne: uboInfo?.address?.addressLine,
        // addressTwo: userInfo?.address?.addressLine2 || "",
        cityCounty: uboInfo?.address?.city,
        region: uboInfo?.address?.region,
        postalCode: uboInfo?.address?.postalCode,
    }
    const onFormSubmit = async (e) => {
        setBusy(true)
        if (uboInfo?.uboId) {
            const param = {
                uboId: uboInfo?.uboId,
                firstName: e.firstName,
                lastName: e.lastName,
                dob: e.birthDate,
                nationality: countryListJSON.find(i => i.name === e.nationality)?.id || e.nationality,
                address: {
                    houseNo: e.houseNo,
                    addressLine: e.addressOne,
                    city: e.cityCounty,
                    region: e.region,
                    postalCode: e.postalCode
                },
            }
            try {
                let response = await props.updateUbo(param)
                setItem('user', response.payload)
                setTimeout(() => {
                    setBusy(false)
                    props.showToast({
                        message: response.message,
                        type: "success",
                    });
                }, 1000);
            } catch (err) {
                setBusy(false);
                props.showToast({
                    message: get(err, "response.data.message", "somthing went wrong!!!"),
                    type: "error",
                });
            }
            props.onHide()
        }
        else {
            const param = {
                firstName: e.firstName,
                lastName: e.lastName,
                dob: e.birthDate,
                nationality: countryListJSON.find(i => i.name === e.nationality)?.id || e.nationality,
                address: {
                    houseNo: e.houseNo,
                    addressLine: e.addressOne,
                    city: e.cityCounty,
                    region: e.region,
                    postalCode: e.postalCode
                },
            }
            try {
                let response = await props.uboDeclaration(param)
                setItem('user', response.payload)
                setTimeout(() => {
                    setBusy(false)
                    props.showToast({
                        message: response.message,
                        type: "success",
                    });
                }, 1000);
            } catch (err) {
                setBusy(false);
                props.showToast({
                    message: get(err, "response.data.message", "somthing went wrong!!!"),
                    type: "error",
                });
            }
            props.onHide()
        }
    }
    const CustomDatepicker = ({value, onClick}) => (
        <button type="button" className="custom-input" onClick={onClick}>
            {value ? value : <span className="birth_Placeholder">Date of birth</span>}
        </button>
    );
    return (
        <div className='UBODeclarationModal'>

            <div className="boxContain">
                <HookForm
                    defaultForm={uboInfo ? defaultvalue : {}}
                    init={form => setLoginForm(form)}
                    onSubmit={onFormSubmit}>
                    {(formMethod) => {
                        return (
                            <div className="form">
                                <div className="leftPart">
                                    <div className="informationDetailTitle">UBO Declaration</div>
                                    <Scrollbars className="popupScroll">
                                        <div className="innerPadding">

                                            <TextField
                                                formMethod={formMethod}
                                                rules={profileForm.firstName.validate}
                                                name={profileForm.firstName.name}
                                                errors={formMethod?.errors}
                                                autoFocus={true}
                                                type="text"
                                                placeholder="First Name"
                                            />
                                            <TextField
                                                formMethod={formMethod}
                                                rules={profileForm.lastName.validate}
                                                name={profileForm.lastName.name}
                                                errors={formMethod?.errors}
                                                autoFocus={true}
                                                type="text"
                                                placeholder="Last Name"
                                            />
                                            <div className="calenderMain">
                                                <Controller
                                                    control={formMethod?.control}
                                                    rules={profileForm.birthDate.validate}
                                                    name={profileForm.birthDate.name}
                                                    defaultValue={''}
                                                    render={(props) => (

                                                        < CalenderCustom
                                                            defaultValue=''
                                                            selected={props.value}
                                                            onChange={(e) => props.onChange(e)}
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="Date of Birth"
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
                                                        ></CalenderCustom>
                                                    )} />
                                            </div>
                                            {/* <TextField
                                                formMethod={formMethod}
                                                rules={profileForm.email.validate}
                                                name={profileForm.email.name}
                                                errors={formMethod?.errors}
                                                type="text"
                                                placeholder="johndoe@gmail.com"
                                            /> */}
                                            {/* <TextField
                                                type="text"
                                                placeholder="Nationality"
                                                formMethod={formMethod}
                                                rules={profileForm.nationality.validate}
                                                name={profileForm.nationality.name}
                                                errors={formMethod?.errors}
                                            /> */}
                                            <div className="dropdownSection firstDropDown">
                                                <div
                                                    className={
                                                        countryFlag
                                                            ? "country_Selection filled"
                                                            : "country_Selection"
                                                    }
                                                >
                                                    <Controller
                                                        defaultValue={uboInfo?.nationality ? uboInfo?.nationality : null}
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
                                                                        onChange(e)
                                                                    }}
                                                                    onSelect={(val, item) => {
                                                                        setCountryName(val);
                                                                        setCountryFlag(item.emoji);
                                                                        onChange(val)
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
                                            <TextField
                                                type="text"
                                                placeholder="House name"
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
                                                placeholder="Street name"

                                            />
                                            {/* <TextField
                                                formMethod={formMethod}
                                                rules={profileForm.addressTwo.validate}
                                                name={profileForm.addressTwo.name}
                                                errors={formMethod?.errors}
                                                autoFocus={true}
                                                type="text"
                                                placeholder="Address Line 2"
                                            /> */}
                                            <TextField
                                                formMethod={formMethod}
                                                rules={profileForm.cityCounty.validate}
                                                name={profileForm.cityCounty.name}
                                                errors={formMethod?.errors}
                                                autoFocus={true}
                                                type="text"
                                                placeholder="Town/city"
                                            />
                                            {/* <TextField
                                                type="text"
                                                placeholder="Country"
                                                formMethod={formMethod}
                                                rules={profileForm.country.validate}
                                                name={profileForm.country.name}
                                                errors={formMethod?.errors}
                                            /> */}
                                            <TextField
                                                formMethod={formMethod}
                                                rules={profileForm.region.validate}
                                                name={profileForm.region.name}
                                                errors={formMethod?.errors}
                                                autoFocus={true}
                                                type="text"
                                                placeholder="Region"
                                            />
                                            <TextField
                                                type="text"
                                                placeholder="Postcode"
                                                formMethod={formMethod}
                                                rules={profileForm.postalCode.validate}
                                                name={profileForm.postalCode.name}
                                                errors={formMethod?.errors}
                                            />
                                        </div>
                                    </Scrollbars>
                                    <div className="btnRow">
                                        <CustomButton type="submit" title="Submit"
                                            disabled={!formMethod?.formState.isValid}
                                            loading={busy}
                                        />
                                    </div>
                                </div>

                            </div>
                        )
                    }}
                </HookForm>
            </div>
        </div>


    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    showToast,
    uboDeclaration,
    updateUbo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UBODeclarationModal));