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
const itemsStatus = [
    {
        id: "1",
        value: 'Ongoing'
    },
    {
        id: "2",
        value: 'Pending'
    },
    {
        id: "3",
        value: 'Disputed'
    },
    {
        id: "4",
        value: 'Cancelled'
    },
    {
        id: "5",
        value: 'Completed'
    },
    {
        id: "",
        value: 'Cancellation in Process'
    },
]
const FilterForm = (props) => {
    const [job, setSelectedJob] = useState()
    const [form, setFilterForm] = React.useState()
    const onFormSubmit = () => { }

    return (
        <FilterDropdown className='jobFilters' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{}}
                    init={form => setFilterForm(form)}
                    onSubmit={onFormSubmit}>
                    {(formMethod) => {
                        return (
                            <div className="form">
                                <div className='filterItem'>
                                    <Label title='Job Amount'></Label>
                                    <TextField
                                        formMethod={formMethod}
                                        rules={filterForm.min.validate}
                                        name={filterForm.min.name}
                                        errors={formMethod?.errors}
                                        autoFocus={false}
                                        type="text"
                                        placeholder="Minimum"
                                    />
                                    <TextField
                                        formMethod={formMethod}
                                        rules={filterForm.max.validate}
                                        name={filterForm.max.name}
                                        errors={formMethod?.errors}
                                        autoFocus={false}
                                        type="text"
                                        placeholder="Maximum"
                                    />
                                    <div className='dropdownSection'>
                                        <Label title='Status'></Label>
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
                                    </div>
                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Apply" disabled={!formMethod?.formState.isValid} />
                                    <CustomButton type="submit" className='clear' title="Clear" />
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