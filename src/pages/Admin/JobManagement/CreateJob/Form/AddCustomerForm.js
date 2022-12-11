import React from "react";

import { Controller } from 'react-hook-form';
import HookForm from '../../../../../components/HookForm/HookForm';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextField from '../../../../../components/UI/TextField/TextField';
import Label from '../../../../../components/UI/Label/Label';
import CustomButton from '../../../../../components/UI/CustomButton/CustomButton';

import Message from '../../../../../util/message';
import Constant from "../../../../../util/constant";

import './AddCustomerForm.scss';

const addCustomer = {
    firstname: {
        name: 'firstname',
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
    lastname: {
        name: 'lastname',
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
            maxLength: { value: 13, message: "Contact number must be between 10 to 13 digit" },
            minLength: { value: 10, message: "Contact number must be between 10 to 13 digit" }
        },
    },


}

const AddCustomerForm = (props) => {
    const [form, setFilterForm] = React.useState()
    const onFormSubmit = () => { }



    return (
        <div className='createMile' >
            <HookForm
                defaultForm={{}}
                init={form => setFilterForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Add Customer'></Label>
                            <div className='filterItem'>
                                <TextField
                                    formMethod={formMethod}
                                    rules={addCustomer.firstname.validate}
                                    name={addCustomer.firstname.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="First Name*"
                                />
                                <TextField
                                    formMethod={formMethod}
                                    rules={addCustomer.lastname.validate}
                                    name={addCustomer.lastname.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Last Name*"
                                />
                                <TextField
                                    formMethod={formMethod}
                                    rules={addCustomer.email.validate}
                                    name={addCustomer.email.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Email Id*"
                                />

                                <div className="countryPhoneGroup">
                                    <Controller
                                        render={({ onChange }) =>
                                            <PhoneInput
                                                value={formMethod.watch(addCustomer.countryCode.name)}
                                                onChange={onChange}
                                                countryCodeEditable={false}
                                                disableCountryCode={true}
                                                placeholder='44'
                                            />
                                        }
                                        name={addCustomer.countryCode.name}
                                        control={formMethod.control}
                                        rules={addCustomer.countryCode.validate}
                                        defaultValue=""
                                    />
                                    <TextField
                                        redStar={true}
                                        noTextfield={true}
                                        onChange={(e) => this.onPhoneChange(formMethod, e)}
                                        maskType="9999999999999"
                                        formMethod={formMethod}
                                        rules={addCustomer.phoneNumber.validate}
                                        name={addCustomer.phoneNumber.name}
                                        errors={formMethod?.errors}
                                        placeholder="Contact Number"
                                    />
                                </div>


                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Add" disabled={!formMethod?.formState.isValid} />
                                    <CustomButton type="button" title="Cancel" onClick={() => props.onHide()} />
                                </div>
                            </div>

                        </div>
                    )
                }}
            </HookForm>
        </div>


    )
}




export default AddCustomerForm;