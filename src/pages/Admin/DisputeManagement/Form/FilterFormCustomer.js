import React, { useState } from "react";

import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';
import Calender from '../../../../components/UI/Calender/Calender';

import Message from '../../../../util/message';

import './FilterFormCustomer.scss';

const filterForm = {

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
        id: "6",
        value: 'Cancellation in Process'
    },
]
const FilterFormCustomer = (props) => {
    const [job, setSelectedJob] = useState()
    const [form, setFilterForm] = React.useState()
    const onFormSubmit = () => { }

    return (
        <FilterDropdown className='ticketFilterCustomer' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{}}
                    init={form => setFilterForm(form)}
                    onSubmit={onFormSubmit}>
                    {(formMethod) => {
                        return (
                            <div className="form">
                                <div className='filterItem'>
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
                                    <CustomButton type="submit" title="Apply" disabled={!formMethod?.formState.isValid} />
                                    <CustomButton type="submit" title="Clear" />
                                </div>

                            </div>
                        )
                    }}
                </HookForm>
            </div>
        </FilterDropdown>

    )
}




export default FilterFormCustomer;