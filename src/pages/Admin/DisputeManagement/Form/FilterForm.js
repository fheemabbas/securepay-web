import React, { useState } from "react";

import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';
// import Calender from '../../../../components/UI/Calender/Calender';


import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import './FilterForm.scss';

const filterForm = {
    min: {
        name: 'min',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.MAXEMPTY))
            },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.MAXINVALID))
            }
        },
    },
    max: {
        name: 'max',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.MINEMPTY))
            },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.MININVALID))
            }
        },
    },
    selectvalue: {
        name: 'selectvalue',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.MININVALID))
            },
            validate: value => value?._id !== '' || 'error message'  // <p>error message</p>

        },
    },

}
const itemsActivity = [
    {
        id: "RAISED",
        value: 'Raised'
    },
    {
        id: "ONGOING",
        value: 'Ongoing'
    },
    {
        id: "RESOLVED",
        value: 'Resolved'
    },
    {
        id: "ARBITRATION",
        value: 'Arbitration'
    },
]
const FilterForm = (props) => {
    const { max, min, disputeStatus, minimum, maximum, status, isfilter, close, setpage, IsapiCall, setIsapiCall } = props
    const [job, setSelectedJob] = useState()
    const [form, setFilterForm] = React.useState()
    const onFormSubmitFilter = (data) => {
        props.setpage(1)
        minimum((data.watch("min")) || "")
        maximum((data.watch("max")) || "")
        status(data.watch("selectvalue").id || "")
        props.close()
        isfilter(true)
        setIsapiCall(!IsapiCall)
    }

    return (
        <FilterDropdown className='ticketFilter' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{
                        min: min === " " ? '' : min, max: max === " " ? '' : max,
                        selectvalue: itemsActivity.filter((i) => i.id === disputeStatus)[0] || ""
                    }}
                    init={form => setFilterForm(form)}
                // onSubmit={onFormSubmit}
                >
                    {(formMethod) => {
                        let isZero = (formMethod.watch("min") !== '' && formMethod.watch("max") !== '' && Number(formMethod.watch("min")) === 0.00 && Number(formMethod.watch("max")) === 0.00)
                        let isgreter = ((Boolean(formMethod.watch("min")) && Boolean(formMethod.watch("max")) && Number(formMethod.watch("min")) > Number(formMethod.watch("max"))))
                        // let isvalid = (((formMethod.watch("min") !== undefined && formMethod.watch("min") !== "" && !isNaN(formMethod.watch("min"))) || (formMethod.watch("max") !== undefined && formMethod.watch("max") !== "" && formMethod.errors.max === undefined)) || (Boolean(formMethod.watch("selectvalue"))))
                        let isvalid = Boolean(formMethod.watch("selectvalue")) || Boolean(formMethod.watch("min")) || Boolean(formMethod.watch("max"))
                        let isnan = isNaN(formMethod.watch("min")) || isNaN(formMethod.watch("max"))

                        return (
                            <div className="form">
                                <div className='filterItem'>
                                    <Label title='Transaction Amount'></Label>
                                    <div className="payment_row">
                                        <TextField
                                            formMethod={formMethod}
                                            rules={filterForm.min.validate}
                                            name={filterForm.min.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="Minimum"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("min", e.target.value)
                                                } else {
                                                    formMethod.setValue("min", e.target.value)
                                                }
                                            }}
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={filterForm.max.validate}
                                            name={filterForm.max.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="Maximum"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("max", e.target.value)
                                                } else {
                                                    formMethod.setValue("max", e.target.value)
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className='dropdownSection'>
                                        <Label title='Status'></Label>
                                        {/* <CustomDropdown
                                            dropDownItems={itemsActivity}
                                            placeholder="Choose Status"
                                            selectedValue={job}
                                            onSelect={selected => setSelectedJob(selected)} >
                                        </CustomDropdown> */}
                                        <Controller as={<CustomDropdown />}
                                            defaultValue={''}
                                            control={formMethod.control}
                                            rules={filterForm.selectvalue.validate}
                                            errors={formMethod?.errors}
                                            dropDownItems={itemsActivity}
                                            placeholder="Choose Status"
                                            selectedValue={job}
                                            name={filterForm.selectvalue.name}
                                        />
                                    </div>


                                </div>
                                <div className="custombtnfield">
                                    {/* <CustomButton type="submit" title="Apply" disabled={!formMethod?.formState.isValid} />
                                    <CustomButton type="submit" title="Clear" /> */}
                                    <CustomButton type="submit" title="Apply"
                                        // disabled={!isZero && !isgreter && !Boolean(formMethod.watch("selectvalue"))}
                                        // disabled={isClear ? isgreter ? true : isnan ? true : !(isvalid) : isZero ? true : isgreter ? true : isnan ? true : !(isvalid)}
                                        disabled={isZero ? true : isgreter ? true : isnan ? true : !(isvalid)}
                                        onClick={() => onFormSubmitFilter(formMethod)}
                                    />
                                    <CustomButton type="button" title="Clear" onClick={(e) => {
                                        formMethod.reset({ min: "", max: "", selectvalue: '' })
                                        minimum(formMethod.watch("min"))
                                        maximum(formMethod.watch("max"))
                                        status("")
                                        isfilter(false)

                                        props.setpage(1)
                                        setIsapiCall(!IsapiCall)

                                    }} />
                                </div>

                            </div>
                        )
                    }}
                </HookForm>
            </div>
        </FilterDropdown>

    )
}




export default FilterForm;