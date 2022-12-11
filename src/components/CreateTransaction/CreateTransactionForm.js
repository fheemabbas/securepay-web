import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Controller } from 'react-hook-form';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import HookForm from '../HookForm/HookForm';
import TextField from '../UI/TextField/TextField';
import Label from '../UI/Label/Label';
import CustomButton from '../UI/CustomButton/CustomButton';
import CustomDropdownAutoSearch from '../UI/CustomDropdownAutoSearch/CustomDropdownAutoSearch';
import { hideLoader, showLoader, showToast } from "../../state/ducks/utils/operations";
import { useFieldArray, useForm } from "react-hook-form";
import Message from '../../util/message';
import Constant from "../../util/constant";

import './CreateTransactionForm.scss';
import { get } from "lodash";
import { createJob, createMilestone, getInvitedUserlist, getOneuserDetails, sendMilestoneEmail, getCommission } from "../../state/ducks/Job/actions";
// import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css'
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const individual = {

    customerName: {
        name: 'customerName',
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

    email: {
        name: 'email',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
            , pattern: {
                value: Constant.REGEX.email,
                message: ((Message.ERRORMESSAGE.EMAILINVALID))
            }
        },
    },
    transactionName: {
        name: 'transactionName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
        },
    },
    amount: {
        name: 'amount',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.TRANSACTIONAMOUNTINVALID))
            }
        },
    },
    desp: {
        name: 'desp',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
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
    customerSelect: {
        name: 'customerSelect',
        validate: {
            required: {
                value: true
            }
        },
    },
    interimPaymentTitle: {
        name: 'interimPaymentTitle',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
        },
    },
    interimPaymentAmount: {
        name: 'interimPaymentAmount',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.INTERIMAMOUNTINVALID))
            }
        },
    },
    interimPaymentDescription: {
        name: 'interimPaymentDescription',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.DESPEEMPTY))
            },
            //  pattern: {
            //     value: Constant.REGEX.ALPHANUMERIC,
            //     message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            // }
        },
    },
}
export const ConvertUPTOTwoDecimal = (num) => {
    // return parseFloat(val).toFixed(3)
    return (Math.round(num * 100) / 100).toFixed(2);
}
const CreateTransactionForm = (props) => {

    const { jobDetail } = props
    const { control } = useForm({
        defaultValues: {
            milestone: [{ title: "", amount: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "milestone",
        }
    );
    const options = [
        { name: '+ Add new customer', value: 'addnew' },
    ];
    // eslint-disable-next-line
    const [form, setLoginForm] = React.useState()// eslint-disable-next-line
    const [busy, setBusy] = React.useState(false)
    const [step, setStep] = useState(1);
    const [dropdownSelected, setdropdownSelected] = useState()
    const [InvitedUser, setInvitedUser] = useState(options)
    const [createdCustomer, setcreatedCustomer] = useState()
    const [selectedUserdetails, setSelectedUser] = useState()
    const [jobDetails, setjobDetails] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [isMilestone, setisMilestone] = useState(false)
    const [isFullpayment, setisFullpayment] = useState(false)
    const [serviseChargesRate, setserviseChargesRate] = useState(0)
    const [commissionData, setCommissionData] = useState()
    const onCreateJobForm = async (data) => {
        let milestonedata = []
        data.watch("milestone").map((i) => {
            if (i.title !== "" && i.amount !== "") {
                milestonedata.push(i)
            }
        })
        let param = {
            email: data.watch("email"),

            firstname: data.watch("customerName"),
            lastname: data.watch("lastName"),
            jobName: data.watch("transactionName"),
            description: data.watch("desp"),
            totalAmount: data.watch("amount"),
            serviceFee: (data.watch("amount") * serviseChargesRate) / 100,
            servicePercentage: serviseChargesRate,
            amount: data.watch("amount") - (data.watch("amount") * serviseChargesRate) / 100,
            isFullPayment: !isFullpayment,
            milestoneData: !isFullpayment ? [
                {
                    title: "Full Transaction",
                    amount: data.watch("amount")
                }
            ] : milestonedata
        }
        param = data.watch("businessName") ? { ...param, businessname: data.watch("businessName") } : { ...param }
        try {
            props.showLoader()
            const response = await props.createJob(param).then((res) => {
                props.hideLoader()
                setTimeout(() => {
                    props.showToast({ message: res.message, type: 'success', time: 45000 })
                    props.onHide()
                })
            })
        } catch (error) {
        }
        // setBusy(true)
        // setTimeout(() => {
        //     setBusy(false)
        //     props.onHide()
        //     props.showToast({ message: 'Transaction Created successfully', type: 'success' })
        // },
        //     1000)

    }

    function onClickFirstStep(value) {
        setStep(value)
    }

    const invitedUser = async () => {
        let res = await props.getInvitedUserlist();
        let commissionData = await props.getCommission();
        setCommissionData(commissionData.payload)
        setserviseChargesRate(commissionData.payload.commission)
        console.log(commissionData, '------------')
    }
    useEffect(() => {
        invitedUser()
    }, [])
    useEffect(() => {
        props.invitedUserList && props.invitedUserList.map((obj) => {
            let fullName = capitalizeFirstLetter(obj.firstName) + " " + capitalizeFirstLetter(obj.lastName) + " " + "(" + obj.email + ")";
            options.push({ name: fullName, value: obj._id })
        })
        setInvitedUser(options)
    }, [props])
    useEffect(() => {
        jobDetails && props.getOneuserDetails(jobDetails.id)
    }, [jobDetails, isMilestone])

    const onCreateCustomer = (formMethod) => {
        if (dropdownSelected === "addnew") {

            let param = { email: formMethod.watch('email'), name: formMethod.watch('customerName') }
            setcreatedCustomer(param)
        } else {
            let param = props.invitedUserList && props.invitedUserList.filter((obj) => {
                return obj._id === dropdownSelected
            })
            setcreatedCustomer({ email: param[0].email, name: param[0].firstName + " " + param[0].lastName })
        }
    }
    const onConfirmJob = async () => {
        try {
            const response = await props.sendMilestoneEmail(jobDetails.id);
            setTimeout(() => {
                props.showToast({ message: response.message, type: 'success' })
            })
        } catch (error) {
            props.showToast({
                message: get(error, "response.data.message", "somthing want wrong!!!"),
                type: "error",
            });
        }
    }
    useEffect(() => {
        if (dropdownSelected !== "addnew" && selectedUserdetails) {
            form && selectedUserdetails.firstName !== "" && form.setValue("customerName", capitalizeFirstLetter(selectedUserdetails.firstName), { shouldValidate: true })
            form && selectedUserdetails.lastName !== "" && form.setValue("lastName", capitalizeFirstLetter(selectedUserdetails.lastName) || undefined, { shouldValidate: true })
            form && selectedUserdetails.email !== "" && form.setValue("email", selectedUserdetails.email, { shouldValidate: true })
            form && selectedUserdetails?.company?.name !== "" && form.setValue("businessName", selectedUserdetails?.company?.name)
        }
        else {
            form && form.setValue("customerName", "")
            form && form.setValue("lastName", "")
            form && form.setValue("email", "")
            form && form.setValue("businessName", "")
        }
    }, [selectedUserdetails, dropdownSelected])

    return (

        < div className='createForm' >
            <HookForm
                defaultForm={{}}
                init={form => setLoginForm(form)}
            // onSubmit={onFormSubmit}
            >
                {(formMethod) => {
                    let selelectedUser = dropdownSelected && dropdownSelected !== "addnew" && props.invitedUserList && props.invitedUserList.filter((obj) => {

                        return obj._id === dropdownSelected
                    })[0]
                    if (selelectedUser) {
                        setSelectedUser(selelectedUser)
                    }

                    if (Number(formMethod.watch('amount')) <= 1100) {
                        setserviseChargesRate("5")
                    } else if (Number(formMethod.watch('amount')) > 1100 && Number(formMethod.watch('amount')) <= 5100) {
                        setserviseChargesRate(10)
                    } else if (Number(formMethod.watch('amount')) > 5100) {
                        setserviseChargesRate(15)
                    }
                    let latremainingAmount;
                    let amount;
                    let remainingAmount = isNaN(formMethod.watch('amount')) ? 0 : ConvertUPTOTwoDecimal(Number(formMethod.watch('amount')))
                    let transactionName = formMethod.watch("transactionName")
                    let transactionDescription = formMethod.watch("desp")
                    let customerName = formMethod.watch("email")
                    let transactionAmount = formMethod.watch("amount")
                    let milestone = formMethod.watch("milestone")
                    let mileStonelength = 0
                    milestone && milestone.map((i) => {
                        if (i.title !== "" && i.amount !== "") {
                            mileStonelength += 1
                        }
                    })
                    return (
                        <>
                            <div className="formleft">
                                <section className={step === 1 ? 'showStep2 active1' : 'showStep2'}>
                                    <div className="innerPadding">
                                        <div className="headermodal">
                                            <Label title='Create Transaction'></Label>
                                            <button type="button" onClick={() => { props.onHide() }} className="closeright"><i className="icon-close-sq"></i></button>
                                        </div>
                                        <Controller
                                            rules={individual.customerSelect.validate}
                                            name={individual.customerSelect.name}
                                            control={formMethod?.control}

                                            render={(props) => (
                                                <CustomDropdownAutoSearch
                                                    labelTitle="Select customer"
                                                    options={InvitedUser}
                                                    isSearchable={true}
                                                    onChange={(e) => {
                                                        props.onChange(e)
                                                        setdropdownSelected(e)
                                                    }}
                                                    placeholder="Select customer"
                                                />
                                            )} />

                                        {dropdownSelected && <>
                                            <Label className="inputLabel" title="Customer’s first name"></Label>
                                            <TextField
                                                type="text"
                                                placeholder="Customer first name"
                                                formMethod={formMethod}
                                                disabled={selelectedUser}
                                                rules={individual.customerName.validate}
                                                name={individual.customerName.name}
                                                errors={formMethod?.errors}
                                            />
                                            <Label className="inputLabel" title="Customer’s last name"></Label>
                                            <TextField
                                                type="text"
                                                placeholder="Customer last name"
                                                formMethod={formMethod}
                                                rules={individual.lastName.validate}
                                                name={individual.lastName.name}
                                                disabled={selelectedUser}
                                                // defaultValue={selelectedUser.lastName}
                                                errors={formMethod?.errors}
                                            />
                                            <Label className="inputLabel" title="Customer’s email address"></Label>
                                            <TextField
                                                formMethod={formMethod}
                                                rules={individual.email.validate}
                                                name={individual.email.name}
                                                errors={formMethod?.errors}
                                                disabled={selelectedUser}
                                                type="text"
                                                placeholder="Email address"
                                                onKeyDown={(e) => {
                                                    if (e.keyCode === 13 && !(formMethod.watch('customerName') === '' || formMethod.watch('email') === '' || !Constant.REGEX.email.test(formMethod.watch('email')))) {
                                                        onCreateCustomer(formMethod); onClickFirstStep(2);
                                                    }
                                                }}
                                                defaultValue={''}
                                            />
                                            <Label className="inputLabel" title="Customer’s business name"></Label>
                                            <TextField
                                                type="text"
                                                placeholder="business name"
                                                formMethod={formMethod}
                                                disabled={selelectedUser?.company?.name}
                                                // rules={individual.customerName.validate}
                                                name={"businessName"}
                                                errors={formMethod?.errors}
                                                onKeyDown={(e) => {
                                                    if (e.keyCode === 13 && !(formMethod.watch('customerName') === '' || formMethod.watch('email') === '' || !Constant.REGEX.email.test(formMethod.watch('email')))) {
                                                        onCreateCustomer(formMethod); onClickFirstStep(2);
                                                    }
                                                }}
                                            />
                                            { /* <Label className="inputLabel" title="Enter business address"></Label>
                                            <TextField
                                                type="text"
                                                placeholder="business address"
                                                formMethod={formMethod}
                                                // rules={individual.customerName.validate}
                                                name={"business address"}
                                                errors={formMethod?.errors}
                                            />
                                            <Label className="inputLabel" title="Enter Phone number"></Label>
                                            <div className="countryPhoneGroup">
                                                <Controller
                                                    defaultValue="44"
                                                    control={formMethod?.control}
                                                    name={"Dial Code"}
                                                    // rules={individual.cunrtyCode.validate}
                                                    render={(props) => (
                                                        <PhoneInput
                                                            placeholder="+44"
                                                            enableSearch="true"
                                                            disableSearchIcon="false"
                                                            country={"gb"}
                                                            // value={formMethod.watch(individual.cunrtyCode.name)}
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
                                                    // rules={individual.phoneNumber.validate}
                                                    name={"number"}
                                                    errors={formMethod?.errors}
                                                    placeholder="Phone number"

                                                />
                                            </div> */}

                                        </>
                                        }
                                        <div className="btnfield">
                                            <CustomButton type="button" title="Next"
                                                disabled={dropdownSelected === "addnew" ? (formMethod.watch('customerName') === '' || formMethod.watch('lastName') === '' || formMethod.watch('email') === '' || !Constant.REGEX.email.test(formMethod.watch('email'))) : !dropdownSelected}
                                                // disabled={((!dropdownSelected) && (formMethod.watch('customerName') === '' || formMethod.watch('email') === '' || !Constant.REGEX.email.test(formMethod.watch('email'))))}
                                                onClick={() => { onCreateCustomer(formMethod); onClickFirstStep(2); }} />
                                        </div>
                                    </div>
                                </section>
                                <section className={step === 2 ? 'showStep2 active2' : 'showStep2'}>
                                    <div className="leftsideModal">
                                        <div className="headermodal">
                                            <Label title='Create Transaction'></Label>
                                            <button type="button" onClick={() => { props.onHide() }} className="closeright"><i className="icon-close-sq"></i></button>
                                        </div>
                                        <Label className="inputLabel" title="Transaction details"></Label>
                                        <TextField
                                            type="text"
                                            placeholder="Enter invoice number, reference/ transaction title"
                                            formMethod={formMethod}
                                            rules={individual.transactionName.validate}
                                            name={individual.transactionName.name}
                                            errors={formMethod?.errors}
                                        />
                                        <Label className="inputLabel" title="Enter total amount of transaction"></Label>
                                        <div className="amountCustomRow">
                                            <TextField
                                                formMethod={formMethod}
                                                rules={individual.amount.validate}
                                                name={individual.amount.name}
                                                errors={formMethod?.errors}
                                                autoFocus={false}
                                                type="text"
                                                placeholder="Enter amount"
                                            // handleBlur={e => {
                                            //     if (!isNaN(e.target.value) && e.target.value !== '') {

                                            //         e.target.value = parseFloat(e.target.value).toFixed(2);
                                            //         formMethod.setValue("amount", e.target.value)
                                            //     } else {
                                            //         formMethod.setValue("amount", e.target.value)
                                            //     }
                                            // }}
                                            />
                                        </div>
                                        <div className="row-view">
                                            <div className="title">Charge to Customer</div>
                                            <div className="txt">£ {Number(formMethod.watch('amount')) > 0 ? Number(formMethod.watch('amount')).toFixed(2) : 0.00}</div>
                                        </div>
                                        <div className="row-view">
                                            <div className="title">Service Fee ({`${serviseChargesRate}%`})
                                                <div className="tooltipMain">
                                                    {["right"].map((placement) => (
                                                        <OverlayTrigger
                                                            key={placement}
                                                            placement={placement}
                                                            // show={true}
                                                            overlay={
                                                                <Tooltip id={`custom_tooltip-right`} style={{ width: '400px' }}>
                                                                    <span className='title'> What’s included in the fee?</span>

                                                                    <span>We verify the identity of all our customers, giving you
                                                                        piece of mind to carry out your financial transaction.</span>

                                                                    <span>Your money is always protected in the electronic escrow managed by our banking
                                                                        partner MangoPay, until you’re happy to release it.</span>

                                                                    <span>Your money is always protected in the electronic escrow managed
                                                                        by our banking partner MangoPay, until you’re happy to release it.</span>

                                                                    <span>In the rare event that something doesn’t go to plan,
                                                                        we act as a neutral third party to resolve any issues.</span>

                                                                    <span>With no monthly costs or set up fees, you pay a small fee for peace of mind</span>
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button className="tooltipBtn">
                                                                <i className="icon-info"></i>
                                                            </Button>
                                                        </OverlayTrigger>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="txt">£ {Number(formMethod.watch('amount')) > 0 ? ((Number(formMethod.watch('amount')) * serviseChargesRate) / 100).toFixed(2) : 0.00}</div>
                                        </div>
                                        <div className="row-view">
                                            <div className="title">Amount you’ll receive</div>
                                            <div className="txt">£ {Number(formMethod.watch('amount')) > 0 ? (Number(formMethod.watch('amount')) - Number(formMethod.watch('amount')) * serviseChargesRate / 100).toFixed(2) : 0.00}</div>
                                        </div>
                                        <div className="textareaInput">
                                            <Label className="inputLabel" title="Transaction description"></Label>
                                            <TextField
                                                type="text"
                                                placeholder="Enter description"
                                                formMethod={formMethod}
                                                rules={individual.desp.validate}
                                                name={individual.desp.name}
                                                errors={formMethod?.errors}
                                                textarea="textarea"
                                            />
                                        </div>
                                        <Label className="inputLabel" title="Do you want to split this into interim payments ?"></Label>
                                        <div className="btnfield-row">

                                            <CustomButton type="button"
                                                disabled={!(formMethod.watch("transactionName") &&
                                                    formMethod?.errors.transactionName === undefined &&
                                                    formMethod.watch("amount") &&
                                                    formMethod?.errors.amount === undefined && formMethod.watch("desp") &&
                                                    formMethod?.errors.desp === undefined)}
                                                title="Divided into Interim Transaction" onClick={() => {
                                                    // onCreateJob(formMethod, false);
                                                    props.classCall(true)
                                                }} />

                                            <CustomButton type="button"
                                                disabled={!(formMethod.watch("transactionName") &&
                                                    formMethod?.errors.transactionName === undefined &&
                                                    formMethod.watch("amount") &&
                                                    formMethod?.errors.amount === undefined && formMethod.watch("desp") &&
                                                    formMethod?.errors.desp === undefined)}
                                                title="Full Transaction" onClick={() => {
                                                    // onCreateJob(formMethod, true); 
                                                    onClickFirstStep(4); props.classCall(false)
                                                }} />
                                        </div>
                                        {!isEdit && <div className="backBtn">
                                            <CustomButton type="button" title="Back" onClick={() => { onClickFirstStep(1); props.classCall(false) }} />
                                        </div>}
                                    </div>
                                    <div className="rightSideModal">
                                        <div className="headermodal">
                                            <Label title='Add Interim Transaction'></Label>
                                            <button type="button" onClick={() => { props.classCall(false) }} className="desktopview closeright"><i className="icon-close-sq"></i></button>
                                            <div className="btnMobileView">
                                                <button type="button" onClick={() => { props.onHide(); props.classCall(false) }} className="closeright"><i className="icon-close-sq"></i></button>
                                            </div>
                                        </div>
                                        {
                                            fields.map((value, index) => {
                                                latremainingAmount = remainingAmount
                                                amount = formMethod.watch(`milestone[${index}].amount`) !== undefined && ConvertUPTOTwoDecimal(Number(formMethod.watch(`milestone[${index}].amount`)))
                                                remainingAmount = ConvertUPTOTwoDecimal(remainingAmount - amount)

                                                return <div className="box_row" key={value.id}>

                                                    <TextField
                                                        type="text"
                                                        placeholder="Interim transaction title"
                                                        formMethod={formMethod}
                                                        control={control}
                                                        fieldtype="milestone"
                                                        index={index}
                                                        fieldName="title"
                                                        defaultValue={value.title}
                                                        register={formMethod?.register(
                                                            individual.interimPaymentTitle.validate
                                                        )}
                                                        name={`milestone[${index}].title`}
                                                        rules={individual.interimPaymentTitle.validate}
                                                        errors={formMethod?.errors}
                                                    />
                                                    <div className="amountCustomRow">
                                                        <TextField
                                                            formMethod={formMethod}
                                                            register={formMethod?.register(
                                                                individual.interimPaymentAmount.validate
                                                            )}
                                                            rules={individual.interimPaymentAmount.validate}
                                                            name={`milestone[${index}].amount`}
                                                            fieldtype="milestone"
                                                            index={index}
                                                            fieldName="amount"
                                                            defaultValue={value.amount}
                                                            handleBlur={e => {
                                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                                    formMethod.setValue(`milestone[${index}].amount`, e.target.value)
                                                                } else {
                                                                    formMethod.setValue(`milestone[${index}].amount`, e.target.value)
                                                                }
                                                            }}
                                                            errors={formMethod?.errors}
                                                            autoFocus={false}
                                                            type="text"
                                                            // onKeyDown={(e) => {
                                                            //     !formMethod?.formState.isValid && e.keyCode === 13 && remainingAmount !== 0 && remainingAmount > 0 && append({ title: "", amount: "" })
                                                            // }}
                                                            placeholder="Amount"
                                                        />
                                                    </div>
                                                    {fields.length > 1 &&
                                                        < div className="delete_btn"><span className="icon-delete" onClick={() => {
                                                            remove(index)
                                                        }}></span></div>
                                                    }
                                                </div>
                                            })
                                        }
                                        {remainingAmount < 0 && < div className={fields.length > 1 ? "moreamount withdeletemoreamount" : "moreamount"}>More than remaining amount.</div>}

                                        <div className="twobtn_row">
                                            <div className="amount_remaining">Amount remaining: + £ {Number(remainingAmount) < 0 ? ConvertUPTOTwoDecimal(Number(remainingAmount) + Number(amount)) : Math.abs(remainingAmount) === 0 ? ConvertUPTOTwoDecimal(remainingAmount) : Math.abs(remainingAmount) ? ConvertUPTOTwoDecimal(remainingAmount) : ConvertUPTOTwoDecimal(latremainingAmount)}</div>
                                            {/* <CustomButton type="button" disabled={!formMethod?.formState.isValid} title="Done" /> */}
                                            {Math.abs(remainingAmount) === 0 ?
                                                <CustomButton type="button" title="Done" className={fields.length > 1 && "deleteicon"}
                                                    disabled={!formMethod?.formState.isValid}

                                                    onClick={() => {

                                                        // onCreateMilestone(formMethod) 
                                                        setisFullpayment(true);
                                                        onClickFirstStep(4); props.classCall(false)
                                                    }
                                                    }
                                                />
                                                : remainingAmount > 0 && < CustomButton type="button" className={fields.length > 1 ? "deleteicon customaddbtn" : "customaddbtn"}
                                                    disabled={!formMethod?.formState.isValid}
                                                    onClick={() => {
                                                        append({ title: "", amount: "" })
                                                    }}
                                                    title="Add+" />}
                                        </div>
                                        <div className="backBtn btnMobileView">
                                            <CustomButton type="button" title="Back" onClick={() => { props.classCall(false) }} />
                                        </div>
                                    </div>
                                </section>

                                <section className={step === 4 ? 'showStep2 active4' : 'showStep2'}>
                                    <div className="headermodal">
                                        <Label title='Preview Transaction'></Label>
                                        <button type="button" onClick={() => { props.onHide() }} className="closeright"><i className="icon-close-sq"></i></button>
                                    </div>
                                    <div className="preview_payment_row">
                                        <div className="preview_title">Transaction Title</div>
                                        <div className="preview_txt">
                                            {/* {get(jobDetail, 'name',)} */}
                                            {transactionName || ""}
                                        </div>
                                    </div>
                                    <div className="preview_payment_row">
                                        <div className="preview_title">Transaction Description</div>
                                        <div className="preview_txt">
                                            {transactionDescription}</div>
                                    </div>
                                    <div className="preview_payment_row">
                                        <div className="preview_title">Transaction For</div>
                                        <div className="preview_txt">
                                            {customerName || ""}
                                            {/* {get(jobDetail, 'customerName',)} */}
                                        </div>
                                    </div>
                                    {isFullpayment && milestone && milestone.length >= 1 &&
                                        <div className="three_row">


                                            <div className="preview_payment_row">
                                                <div className="preview_title">Transaction Amount</div>
                                                <div className="preview_txt">
                                                    £ {transactionAmount || 0}
                                                    {/* {get(jobDetail, 'totalAmount',)} */}
                                                </div>
                                            </div>
                                            <div className="preview_payment_row">
                                                <div className="preview_title">Total Interim Transaction</div>
                                                <div className="preview_txt">
                                                    {mileStonelength}
                                                    {/* {jobDetail && jobDetail.mileStoneData.length} */}

                                                </div>
                                            </div>
                                        </div>}
                                    {isFullpayment && milestone && milestone.map((details, index) => {
                                        return <>
                                            {details.title !== "" && details.amount !== "" && < div className="preview_payment_row interim_payment">
                                                <div className="preview_title">Interim Transaction-{index + 1}</div>
                                                <div className="preview_inner-row">
                                                    <div className="preview_txt">{details.title}</div>
                                                    <div className="preview_txt"> {`£ ${details.amount}`}</div>
                                                </div>
                                            </div>
                                            }
                                        </>
                                    })}
                                    <div className={isFullpayment ? "border-box box_border" : "box_border"}>
                                        <div className="row-view">
                                            <div className="txt">Charge to Client</div>
                                            <div className="title">
                                                £ {transactionAmount}
                                                {/* £ {get(jobDetail, 'totalAmount', 0)} */}
                                            </div>
                                        </div>
                                        <div className="row-view">
                                            <div className="txt">Service Fee ({`${serviseChargesRate}%`})
                                                <div className="tooltipMain">
                                                    {["right"].map((placement) => (
                                                        <OverlayTrigger
                                                            key={placement}
                                                            placement={placement}
                                                            // show={true}
                                                            overlay={
                                                                <Tooltip id={`custom_tooltip-right`} style={{ width: '400px' }}>
                                                                    <span className='title'> What’s included in the fee?</span>

                                                                    <span>We verify the identity of all our customers, giving you
                                                                        piece of mind to carry out your financial transaction.</span>

                                                                    <span>Your money is always protected in the electronic escrow managed by our banking
                                                                        partner MangoPay, until you’re happy to release it.</span>

                                                                    <span>Your money is always protected in the electronic escrow managed
                                                                        by our banking partner MangoPay, until you’re happy to release it.</span>

                                                                    <span>In the rare event that something doesn’t go to plan,
                                                                        we act as a neutral third party to resolve any issues.</span>

                                                                    <span>With no monthly costs or set up fees, you pay a small fee for peace of mind</span>
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button className="tooltipBtn">
                                                                <i className="icon-info"></i>
                                                            </Button>
                                                        </OverlayTrigger>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="title">
                                                £ {((transactionAmount * serviseChargesRate) / 100).toFixed(2)}
                                                {/* {get(jobDetail, 'serviceFee', 0)} */}

                                            </div>
                                        </div>
                                        <div className="row-view">
                                            <div className="txt">Amount you’ll receive</div>
                                            <div className="title">
                                                £ {(transactionAmount - (transactionAmount * serviseChargesRate) / 100).toFixed(2)}
                                                {/* {get(jobDetail, 'amount', 0)} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stepthree-row">
                                        <CustomButton type="button" title="Edit" onClick={() => { setIsEdit(true); onClickFirstStep(2) }} />
                                        <CustomButton type="button"

                                            onClick={() => { onCreateJobForm(formMethod) }}
                                            title="Create Transaction" />
                                    </div>
                                </section>
                                <section className={step === 6 ? 'showStep2 active6' : 'showStep2'}>
                                    <div className="headermodal">
                                        <Label title='Add Interim Transaction'></Label>
                                        <button type="button" onClick={() => { props.onHide() }} className="closeright"><i className="icon-close-sq"></i></button>
                                    </div>
                                </section>
                            </div>


                        </>
                    )
                }}
            </HookForm>
        </div >


    )
}



const mapStateToProps = (state) => {
    return {
        invitedUserList: state.job.invitedUser && state.job.invitedUser.invitedUser.payload,
        jobDetail: state.job.userDetails
    }
};

const mapDispatchToProps = {

    showToast, getInvitedUserlist, createJob, createMilestone, getOneuserDetails, sendMilestoneEmail, showLoader, hideLoader, getCommission
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTransactionForm));

