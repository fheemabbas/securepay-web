import React, { useState } from "react";
import { Controller } from 'react-hook-form';

import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';

import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import './FilterForm.scss';
import { ConvertUPTOTwoDecimal } from "../../../../components/CreateTransaction/CreateTransactionForm";

const filterForm = {
    min: {
        name: 'min',
        validate: {
            // required: {
            //     value: true,
            //     message: ((Message.ERRORMESSAGE.MAXEMPTY))
            // },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: "Invalid amount"
            }
        },
    },
    max: {
        name: 'max',
        validate: {
            // required: {
            //     value: true,
            //     message: ((Message.ERRORMESSAGE.MINEMPTY))
            // },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: "Invalid amount"
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
const itemsStatus = [
    {
        id: "1",
        value: 'Architect'
    },
    {
        id: "2",
        value: 'Architect'
    },
    {
        id: "3",
        value: 'Contractor'
    },
    {
        id: "4",
        value: 'Accountant'
    },
    {
        id: "5",
        value: 'Digital Media'
    },
]
const FilterForm = (props) => {
    const [form, setFilterForm] = React.useState()// eslint-disable-next-line
    const [job, setSelectedJob] = useState()
    const { setminimum, setmaximum, isFilter, min, max } = props // eslint-disable-next-line

    const onFormSubmitFilter = (data) => {

        props.setpage(1)
        setminimum(data.watch("min") || "")
        setmaximum(data.watch("max") || "")
        props.close()
        isFilter(true)
    }

    return (
        <FilterDropdown className='userFilters' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{
                        min: min === " " ? '' : min, max: max === " " ? '' : max,
                    }}
                    init={form => setFilterForm(form)}
                // onSubmit={onFormSubmit}
                >
                    {(formMethod) => {
                        // let isZero = (Number(formMethod.watch("min")) === 0 && Number(formMethod.watch("max")) === 0)
                        // let isgreter = ((Boolean(formMethod.watch("min")) && Boolean(formMethod.watch("max")) && Number(formMethod.watch("min")) > Number(formMethod.watch("max"))))
                        // let isvalid = Boolean(formMethod.watch("min")) || Boolean(formMethod.watch("max"))
                        let isZero = (formMethod.watch("min") !== '' && formMethod.watch("max") !== '' && Number(formMethod.watch("min")) === 0.00 && Number(formMethod.watch("max")) === 0.00)
                        let isgreter = ((Boolean(formMethod.watch("min")) && Boolean(formMethod.watch("max")) && Number(formMethod.watch("min")) > Number(formMethod.watch("max"))))
                        // let isvalid = (((formMethod.watch("min") !== undefined && formMethod.watch("min") !== "" && !isNaN(formMethod.watch("min"))) || (formMethod.watch("max") !== undefined && formMethod.watch("max") !== "" && formMethod.errors.max === undefined)) || (Boolean(formMethod.watch("selectvalue"))))
                        let isvalid = (Boolean(formMethod.watch("min")) && formMethod.errors.min === undefined) || (Boolean(formMethod.watch("max")) && formMethod.errors.max === undefined)
                        let isnan = isNaN(formMethod.watch("min")) || isNaN(formMethod.watch("max"))

                        return (
                            <div className="form">
                                <div className='filterItem'>
                                    {/* <div className='dropdownSection'>
                                        <Label title='Business Category'></Label>
                                        <Controller as={<CustomDropdown />}
                                            defaultValue={''}
                                            control={formMethod.control}
                                            rules={filterForm.selectvalue.validate}
                                            errors={formMethod?.errors}
                                            dropDownItems={itemsStatus}
                                            placeholder="Choose Status"
                                            selectedValue={job}
                                            name={filterForm.selectvalue.name}
                                        />
                                    </div> */}
                                    <Label title='Total Income'></Label>
                                    <div className="input_row">
                                        <TextField
                                            formMethod={formMethod}
                                            rules={filterForm.min.validate}
                                            name={filterForm.min.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="Minimum"
                                            onChange={() =>
                                                formMethod.watch("max") &&
                                                formMethod.trigger("max")
                                            }
                                            // handleBlur={e => {
                                            //     e.target.value = parseFloat(e.target.value).toFixed(2);
                                            //     formMethod.setValue("min", e.target.value)
                                            // }}
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
                                        // handleBlur={e => {
                                        //     e.target.value = parseFloat(e.target.value).toFixed(2);
                                        //     formMethod.setValue("max", e.target.value)
                                        // }}
                                        />
                                    </div>

                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="button" title="Apply"
                                        // disabled={isZero ? true : isgreter ? true : !(isvalid)}
                                        disabled={isZero ? true : isgreter ? true : !(isvalid)}
                                        onClick={() => onFormSubmitFilter(formMethod)}
                                    />
                                    <CustomButton type="reset" className='clear' title="Clear" onClick={() => {
                                        formMethod.reset({ min: "", max: "" })
                                        setminimum(formMethod.watch("min"))
                                        setmaximum(formMethod.watch("max"))
                                        isFilter(false)
                                        // formMethod.setValue("min", )
                                        // formMethod.setValue("max", "")
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