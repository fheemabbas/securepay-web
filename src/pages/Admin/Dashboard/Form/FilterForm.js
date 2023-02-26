import React, { useState } from "react";
import { Controller } from 'react-hook-form';

import Label from '../../../../components/UI/Label/Label';
import HookForm from '../../../../components/HookForm/HookForm';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';

import Message from '../../../../util/message';
// import Constant from "../../../../util/constant";

import './FilterForm.scss';

const filterForm = {

    dispute: {
        name: 'dispute',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.MININVALID))
            },
            validate: value => value?._id !== '' || 'error message'  // <p>error message</p>

        },
    },
    staff: {
        name: 'staff',
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
        value: 'Ongoing Dispute'
    },
    {
        id: "2",
        value: 'Dispute Started'
    },
    {
        id: "3",
        value: 'Disputed Resolved'
    },
    {
        id: "4",
        value: 'Arbitration Suggested'
    },
]


const itemsStaffMember = [
    {
        id: "1",
        value: 'Leslie Alexander'
    },
    {
        id: "2",
        value: 'Mark Smith'
    },
    {
        id: "3",
        value: 'Cody Fisher'
    },
    {
        id: "4",
        value: 'Alexa Smith'
    },
    {
        id: "5",
        value: 'Jane Doe'
    },
]
const FilterForm = (props) => {
    const [form, setFilterForm] = React.useState()
    const onFormSubmit = () => { }
    const [job, setSelectedJob] = useState()

    return (
        <>

            <FilterDropdown >
                <div className='filterDispute'>
                    <HookForm
                        defaultForm={{}}
                        init={form => setFilterForm(form)}
                        onSubmit={onFormSubmit}>
                        {(formMethod) => {
                            return (
                                <div className="form">
                                    <div className='filterItem'>
                                        <div className='dropdownSection'>
                                            <Label title='Dispute Status'></Label>
                                            {/* <CustomDropdown
                                                dropDownItems={itemsStatus}
                                                placeholder="Choose Status"
                                                selectedValue={Status}
                                                onSelect={selected => setSelectedStatus(selected)} >
                                            </CustomDropdown> */}
                                            <Controller as={<CustomDropdown />}
                                                defaultValue={''}
                                                control={formMethod.control}
                                                rules={filterForm.dispute.validate}
                                                // errors={formMethod?.errors}
                                                dropDownItems={itemsStatus}
                                                placeholder="Choose Status"
                                                selectedValue={job}
                                                name={filterForm.dispute.name}
                                            />
                                        </div>

                                        <div className='dropdownSection'>
                                            <Label className="staffTitle" title='Assigned Securepay Staff Member'></Label>
                                            {/* <CustomDropdown
                                                dropDownItems={itemsStaffMember}
                                                placeholder="Choose Status"
                                                selectedValue={staff}
                                                onSelect={selected => setSelectedStaff(selected)} >
                                            </CustomDropdown> */}
                                            <Controller as={<CustomDropdown />}
                                                defaultValue={''}
                                                control={formMethod.control}
                                                rules={filterForm.staff.validate}
                                                // errors={formMethod?.errors}
                                                dropDownItems={itemsStaffMember}
                                                p placeholder="Choose Status"
                                                selectedValue={job}
                                                name={filterForm.staff.name}
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
        </>
    )
}




export default FilterForm;