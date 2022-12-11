import React, { useEffect, useState } from "react";

import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';
import Constant from "../../../../util/constant";
import './FilterForm.scss';

const filterForm = {
    min: {
        name: 'min',
        validate: {
            required: {
                value: false
            },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: "Invalid amount"
            }
        },
    },
    max: {
        name: 'max',
        validate: {
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: "Invalid amount"
            }
        },
    },
    selectvalue: {
        name: 'selectvalue',
        validate: {
            // required: {
            //     value: true,
            //     message: ((Message.ERRORMESSAGE.MININVALID))
            // },
            validate: value => value?._id !== '' || 'error message'  // <p>error message</p>

        },
    },
}

const FilterForm = (props) => {

    const { minimum, maximum, status, isCreated, min, max, jobstatus, isCreatedapicall, setisCreatedapicall } = props // eslint-disable-next-line
    const [job, setSelectedJob] = useState() // eslint-disable-next-line
    const [form, setFilterForm] = React.useState()
    const [isClear, seIsClear] = React.useState(false)
    const onFormSubmitFilter = (data) => {
        props.setpage(1)
        minimum((data.watch("min")) || "")
        maximum((data.watch("max")) || "")
        status(data.watch("selectvalue").id || "")
        props.close()
        isCreated(true)
        setisCreatedapicall(!isCreatedapicall)
    }
    useEffect(() => {
        // jobstatus && seIsClear(true)
    }, [])
    return (
        <FilterDropdown className='ticketFilter' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{
                        min: min === " " ? '' : min, max: max === " " ? '' : max,
                        selectvalue: Constant.FILTERSTATUS.filter((i) => i.id === jobstatus)[0] || ""
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
                                            defaultValue={formMethod.getValues("max")}
                                            formMethod={formMethod}
                                            name={filterForm.min.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            rules={filterForm.max.validate}
                                            placeholder="Minimum"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("min", e.target.value)
                                                    seIsClear(false)

                                                } else {
                                                    seIsClear(true)

                                                    formMethod.setValue("min", e.target.value)
                                                }
                                            }}
                                        />
                                        <TextField
                                            defaultValue={formMethod.getValues("max")}
                                            formMethod={formMethod}
                                            name={filterForm.max.name}
                                            rules={filterForm.max.validate}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="Maximum"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {
                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("max", e.target.value)
                                                    seIsClear(false)
                                                } else {
                                                    seIsClear(true)
                                                    formMethod.setValue("max", e.target.value)
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className='dropdownSection'>
                                        <Label title='Status'></Label>
                                        <Controller as={<CustomDropdown />}
                                            defaultValue={jobstatus}
                                            control={formMethod.control}
                                            rules={filterForm.selectvalue.validate}
                                            errors={formMethod?.errors}
                                            dropDownItems={Constant.FILTERSTATUS}
                                            placeholder="Choose Status"
                                            selectedValue={job}
                                            name={filterForm.selectvalue.name}
                                        />
                                    </div>
                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Apply"
                                        // disabled={!isZero && !isgreter && !Boolean(formMethod.watch("selectvalue"))}
                                        // disabled={isClear ? isgreter ? true : isnan ? true : !(isvalid) : isZero ? true : isgreter ? true : isnan ? true : !(isvalid)}
                                        disabled={isZero ? true : isgreter ? true : isClear ? isnan ? true : !(isvalid) : !(isvalid)}
                                        onClick={() => onFormSubmitFilter(formMethod)}
                                    />
                                    <CustomButton type="button" title="Clear" onClick={(e) => {
                                        formMethod.reset({ min: "", max: "", selectvalue: '' })
                                        minimum(formMethod.watch("min"))
                                        maximum(formMethod.watch("max"))
                                        status("")
                                        isCreated(false)
                                        seIsClear(true)
                                        props.setpage(1)

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