import React, { useState } from "react";
import './CompanyEditModal.scss';
import { connect } from "react-redux";
import { withRouter, Link, } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import countryListJSON from "../../../../util/countryname";
import Autocomplete from "react-autocomplete";
import { filter } from "lodash";
import Scrollbars from "react-custom-scrollbars";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import HookForm from '../../../../components/HookForm/HookForm';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import TextField from '../../../../components/UI/TextField/TextField';
import RadioButton from '../../../../components/UI/RadioButton/RadioButton';
import CheckBox from '../../../../components/UI/CheckBox/CheckBox';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import UBODeclarationModal from '../../../Client/Profile/Form/UBODeclarationModal'

import { showToast } from "../../../../state/ducks/utils/operations";
import { updateCompanyInformation } from "../../../../state/ducks/auth/actions";
import { setItem } from "../../../../services/localstorage.service";
import { get } from "lodash";
import StorageService from "./../../../../services/localstorage.service";

const profileForm = {
    companyName: {
        name: 'companyName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.COMPANYNAMEEMPTY))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            }
        },
    },
    companyNumber: {
        name: 'companyNumber',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.COMPANYNUMBEREMPTY))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            }
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
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
        },
    },
    addressTwo: {
        name: 'addressTwo',
        validate: {
            pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: Message.ERRORMESSAGE.ALFANUMINVALID,
            },
        }
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
    country: {
        name: 'country',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
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
    postalCode: {
        name: 'postalCode',
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
    region: {
        name: 'region',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
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
            maxLength: { value: 13, message: "Contact number must be between 10 to 13 digit" },
            minLength: { value: 10, message: "Contact number must be between 10 to 13 digit" }
        },
    },
}
const CompanyEditModal = (props) => {
    const { userInfo } = props;
    const [form, setLoginForm] = React.useState()
    const [clientType, setClientType] = useState('No');
    const [personalAddress, setPersonalAddress] = React.useState(false)
    const [uboInfo, setUboInfo] = useState()
    const [countryFlag, setCountryFlag] = useState("");
    const [countryName, setCountryName] = useState(filter(countryListJSON, (i) => { return i.id === userInfo?.country })[0].name1);
    let [showUBODeclarationModal, setShowUBODeclarationModal] = useState(false)
    const [busy, setBusy] = React.useState(false)
    const defaultvalue = {
        companyName: userInfo?.company.name,
        companyNumber: userInfo?.company.number,
        email: userInfo?.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        houseNo: userInfo?.companyAddress?.houseNo,
        birthDate: new Date(userInfo?.dob),
        countryCode: `+${userInfo?.dialCode}`,
        phoneNumber: userInfo?.number,
        addressOne: userInfo?.companyAddress?.addressLine1,
        addressTwo: userInfo?.companyAddress?.addressLine2 || "",
        city: userInfo?.companyAddress?.city,
        region: userInfo?.companyAddress?.region,
        postalCode: userInfo?.companyAddress?.postalCode,
    }

    const onClickSameAddress = async (checked) => {
        setPersonalAddress(checked)
        if (checked) {
            form.setValue('houseNo', userInfo?.address?.houseNo, { shouldValidate: true })
            form.setValue('addressOne', userInfo?.address?.addressLine1, { shouldValidate: true })
            form.setValue('addressTwo', userInfo?.address?.addressLine2, { shouldValidate: true })
            form.setValue('city', userInfo?.address?.city, { shouldValidate: true })
            form.setValue('region', userInfo?.address?.region, { shouldValidate: true })
            form.setValue('postalCode', userInfo?.address?.postalCode, { shouldValidate: true })

        } else {
            form.setValue('houseNo', userInfo?.companyAddress?.houseNo, { shouldValidate: false })
            form.setValue('addressOne', userInfo?.companyAddress?.addressLine1, { shouldValidate: false })
            form.setValue('addressTwo', userInfo?.address?.addressLine2, { shouldValidate: false })
            form.setValue('city', userInfo?.companyAddress?.city, { shouldValidate: false })
            form.setValue('region', userInfo?.companyAddress?.region, { shouldValidate: false })
            form.setValue('postalCode', userInfo?.companyAddress?.postalCode, { shouldValidate: false })
        }
    }
    const onFormSubmit = async (e) => {
        try {
            setBusy(true)
            let param = {
                name: e.companyName,
                number: e.companyNumber,
                houseNo: e.houseNo,
                addressLine1: e.addressOne,
                city: e.city,
                country: countryListJSON.find(i => i.name1 === countryName).id,
                region: e.region,
                postalCode: e.postalCode
            }

            param = e?.addressTwo ? { ...param, addressLine2: e?.addressTwo } : { ...param }

            let response = await props.updateCompanyInformation(param);
            setTimeout(() => {
                setBusy(false)
                props.onHide()
                StorageService.setItem("user", response.payload)
                props.showToast({
                    message: response.message,
                    type: "success",
                });
            }, 1000)

        } catch (err) {
            console.log(err);
            setBusy(false);
            props.showToast({
                message: get(err, "response.data.message", "somthing went wrong!!!"),
                type: "error",
            });
        }
    }
    const radioChangeHandler = (event) => {
        setClientType(event.target.value);
    }
    return (
        <div className='CompanyEditModal' >
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
                                        <div className="informationDetailTitle">Company Information</div>
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.companyName.validate}
                                            name={profileForm.companyName.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="Company Name"
                                        />
                                        {/* <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.email.validate}
                                            name={profileForm.email.name}
                                            errors={formMethod ?.errors}
                                            type="text"
                                            placeholder="company@gmail.com"
                                        /> */}
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.companyNumber.validate}
                                            name={profileForm.companyNumber.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="Company Number"
                                        />
                                        {/* <div className="text">Do you own 75% of this company?</div> */}
                                        {/* <div className="radioButtonRow">
                                            <RadioButton
                                                changed={radioChangeHandler}
                                                id="1"
                                                isSelected={clientType === "Yes"}
                                                label="Yes"
                                                value="Yes"
                                            />
                                            <RadioButton
                                                changed={radioChangeHandler}
                                                id="2"
                                                isSelected={clientType === "No"}
                                                label="No"
                                                value="No"
                                            />
                                        </div> */}
                                        <div className="UBO_list">
                                            <ul>
                                                {userInfo.uboInfo.length < 4 && <Link to="#" className="addBtn" onClick={() => {
                                                    setUboInfo()
                                                    setShowUBODeclarationModal(!showUBODeclarationModal)
                                                }}
                                                >
                                                    <i className="icon-add"></i>
                                                </Link>}

                                                <div className="noUboDeclaration">
                                                    UBO Declaration
                                                </div>

                                                {userInfo.uboInfo.map((item, index) => {
                                                    return <li>
                                                        <Link to="#" onClick={() => {
                                                            setUboInfo(item)
                                                            setShowUBODeclarationModal(!showUBODeclarationModal)
                                                        }
                                                        }
                                                        >UBO Declaration - {index + 1}</Link>
                                                        <Link to="#" onClick={() => {
                                                            setUboInfo(item)
                                                            setShowUBODeclarationModal(!showUBODeclarationModal)
                                                        }
                                                        }>Edit</Link>
                                                    </li>
                                                })
                                                }
                                            </ul>

                                        </div>
                                    </div>
                                    <div className="rightPart">
                                        <div className="informationDetailTitle">Address Information</div>
                                        <TextField
                                            type="text"
                                            placeholder="House No"
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
                                            placeholder="City"
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={profileForm.region.validate}
                                            name={profileForm.region.name}
                                            errors={formMethod?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="Region "
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
                                                    defaultValue={userInfo?.country ? userInfo?.country : null}
                                                    control={formMethod?.control}
                                                    rules={profileForm.nationality.validate}
                                                    name={profileForm.nationality.name}
                                                    render={({ onChange }) => (
                                                        <>
                                                            <p className="flaimg">{countryFlag}</p>
                                                            {/* <button className={countryName ? "close-icon iconEmpty" : "close-icon"} type="reset" onClick={() => setCountryName("")}></button> */}

                                                            <Autocomplete
                                                                inputProps={{ placeholder: "Country of Residence" }}
                                                                getItemValue={(item) => item.name1}
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
                                                                        {item.name1}
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
                                                                wrapperStyle={{ display: "block" }}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <TextField
                                            type="text"
                                            placeholder="Postal Code"
                                            formMethod={formMethod}
                                            rules={profileForm.postalCode.validate}
                                            name={profileForm.postalCode.name}
                                            errors={formMethod?.errors}
                                        />
                                        <div className="personalAddress">
                                            <CheckBox id="personalAddress" labelTitle="Same as personal address" checked={personalAddress} onCheckedChange={checked => onClickSameAddress(checked)}></CheckBox>
                                        </div>
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
            <ModalPopup
                showModal={showUBODeclarationModal}
                onHide={() => setShowUBODeclarationModal(false)}
                className='UBODeclarationModal'
                closeIcon={true}
            >
                <UBODeclarationModal uboInfo={uboInfo} onHide={() => setShowUBODeclarationModal(false)} />
            </ModalPopup>
        </div>


    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    showToast,
    updateCompanyInformation
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyEditModal));