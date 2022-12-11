import React, { useEffect, useState } from "react";
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

const filterForm = {
    minCategory: {
        name: 'minCategory',
        validate: {
            // required: {
            //     value: true,
            //     message: ((Message.ERRORMESSAGE.MAXEMPTY))
            // },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.Invalidamount))
            }
        },
    },
    maxCategory: {
        name: 'maxCategory',
        validate: {
            // required: {
            //     value: true,
            //     message: ((Message.ERRORMESSAGE.MINEMPTY))
            // },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.Invalidamount))
            }
        },
    },
    selectvaluecategory: {
        name: 'selectvaluecategory',
        // validate: {
        //     required: {
        //         value: true,
        //         message: ((Message.ERRORMESSAGE.MININVALID))
        //     },
        //     validate: value => value?._id !== '' || 'error message'  // <p>error message</p>

        // },
    },

    min: {
        name: 'min',
        validate: {
            // required: {
            //     value: true,
            //     message: ((Message.ERRORMESSAGE.MAXEMPTY))
            // },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.Invalidamount))
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
                message: ((Message.ERRORMESSAGE.Invalidamount))
            }
        },
    },
    selectvalue: {
        name: 'selectvalue',
    },

}
// const itemsStatus = [
//     {
//         id: "1",
//         value: 'Ongoing'
//     },
//     {
//         id: "2",
//         value: 'Pending'
//     },
//     {
//         id: "3",
//         value: 'Disputed'
//     },
//     {
//         id: "4",
//         value: 'Cancelled'
//     },
//     {
//         id: "5",
//         value: 'Completed'
//     },
//     {
//         id: "",
//         value: 'Cancellation in Process'
//     },
// ]
// const itemsCategory = [
//     {
//         id: "1",
//         value: 'Architect'
//     },
//     {
//         id: "2",
//         value: 'Mechanic'
//     },
//     {
//         id: "3",
//         value: 'Contractor'
//     },
//     {
//         id: "4",
//         value: 'Accountant'
//     },
//     {
//         id: "5",
//         value: 'Digital Media'
//     }
// ]
const FilterForm = (props) => {
    const [job, setSelectedJob] = useState()
    const [form, setFilterForm] = React.useState()
    const { min, max, feesmin, feesmax, jobstatus, setminimum, setmaximum, setfeesminimum, setfeesmaximum, setstatus, setisjobFilter, close, setpage } = props
    const onFormSubmit = () => { }
    const onJobFilter = (formMethod) => {
        setminimum(formMethod.watch("minCategory"))
        setmaximum(formMethod.watch("maxCategory"))
        setfeesminimum(formMethod.watch("min"))
        setfeesmaximum(formMethod.watch("max"))
        setstatus(formMethod.watch('selectvalue').id)
        setisjobFilter(true)
        setpage(1)
        close()
    }
    return (
        <FilterDropdown className='jobFilters_custom' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{
                        minCategory: min === " " ? '' : min, maxCategory: max === " " ? '' : max,
                        min: feesmin === " " ? '' : feesmin, max: feesmax === " " ? '' : feesmax,
                        selectvalue: Constant.FILTERSTATUS.filter((i) => i.id === jobstatus)[0] || ""
                    }}
                    init={form => setFilterForm(form)}
                    onSubmit={onFormSubmit}>
                    {(formMethod) => {
                        let isZero = (formMethod.watch("min") !== '' && formMethod.watch("max") !== '' && Number(formMethod.watch("min")) === 0.00 && Number(formMethod.watch("max")) === 0.00) || (formMethod.watch("minCategory") !== '' && formMethod.watch("maxCategory") !== '' && Number(formMethod.watch("minCategory")) === 0.00 && Number(formMethod.watch("maxCategory")) === 0.00)
                        let isgreter = ((Boolean(formMethod.watch("min")) && Boolean(formMethod.watch("max")) && Number(formMethod.watch("min")) > Number(formMethod.watch("max")))) || ((Boolean(formMethod.watch("minCategory")) && Boolean(formMethod.watch("maxCategory")) && Number(formMethod.watch("minCategory")) > Number(formMethod.watch("maxCategory"))))
                        let isvalid = Boolean(formMethod.watch("selectvalue")) || Boolean(formMethod.watch("min")) || Boolean(formMethod.watch("max")) || Boolean(formMethod.watch("minCategory")) || Boolean(formMethod.watch("maxCategory"))
                        let isnan = (isNaN(formMethod.watch("minCategory")) || isNaN(formMethod.watch("maxCategory"))) || (isNaN(formMethod.watch("min")) || isNaN(formMethod.watch("max")))
                        // || isNaN(formMethod.watch("minCategory")) || isNaN(formMethod.watch("maxCategory"))

                        return (

                            <div className="form">
                                <div className='filterItem'>
                                    {/* <div className='dropdownSection'>
                                        <Label title='Business Category'></Label>
                                        <Controller as={<CustomDropdown />}
                                            defaultValue={''}
                                            control={formMethod.control}
                                            rules={filterForm.selectvaluecategory.validate}
                                            errors={formMethod?.errors}
                                            dropDownItems={itemsCategory}
                                            placeholder="Choose Category"
                                            selectedValue={job}
                                            name={filterForm.selectvaluecategory.name}
                                        />
                                    </div> */}
                                    <Label title='Job Amount'></Label>
                                    <div className="input_row">
                                        <TextField
                                            formMethod={formMethod}
                                            rules={filterForm.minCategory.validate}
                                            name={filterForm.minCategory.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="Minimum"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("minCategory", e.target.value)
                                                } else {
                                                    formMethod.setValue("minCategory", e.target.value)
                                                }
                                            }}
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={filterForm.maxCategory.validate}
                                            name={filterForm.maxCategory.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="Maximum"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("maxCategory", e.target.value)
                                                } else {
                                                    formMethod.setValue("maxCategory", e.target.value)
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className='dropdownSection'>
                                        <Label title='Status'></Label>
                                        <Controller as={<CustomDropdown />}
                                            defaultValue={''}
                                            control={formMethod.control}
                                            rules={filterForm.selectvalue.validate}
                                            errors={formMethod?.errors}
                                            dropDownItems={Constant.FILTERSTATUS}
                                            placeholder="Choose Status"
                                            selectedValue={job}
                                            name={filterForm.selectvalue.name}
                                        />
                                    </div>
                                    <Label title='Admin Fees'></Label>
                                    <div className="input_row">
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

                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="button" title="Apply"
                                        // disabled={isZero ? true : isgreter ? true : !(isvalid)}
                                        disabled={isZero ? true : isgreter ? true : isnan ? true : !(isvalid)}

                                        onClick={() => onJobFilter(formMethod)}
                                    />
                                    <CustomButton type="reset" className='clear' title="Clear" onClick={() => {
                                        formMethod.reset({ min: "", max: "", maxCategory: "", minCategory: "", selectvalue: '' })
                                        setminimum(formMethod.watch("minCategory"))
                                        setmaximum(formMethod.watch("maxCategory"))
                                        setfeesminimum(formMethod.watch("min"))
                                        setfeesmaximum(formMethod.watch("max"))
                                        setstatus(formMethod.watch('selectvalue'))
                                        setpage(1)
                                        setisjobFilter(false)

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