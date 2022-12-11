import React, { useState } from "react";

import Label from '../../../../components/UI/Label/Label';
import HookForm from '../../../../components/HookForm/HookForm';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';

import './FilterForm.scss';

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
    const [Status, setSelectedStatus] = useState()
    const [staff, setSelectedStaff] = useState()
    const [form, setFilterForm] = React.useState()
    const onFormSubmit = () => { }

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
                                            <CustomDropdown
                                                dropDownItems={itemsStatus}
                                                placeholder="Choose Status"
                                                selectedValue={Status}
                                                onSelect={selected => setSelectedStatus(selected)} >
                                            </CustomDropdown>
                                        </div>

                                        <div className='dropdownSection'>
                                            <Label className="staffTitle" title='Assigned Yatapay Staff Member'></Label>
                                            <CustomDropdown
                                                dropDownItems={itemsStaffMember}
                                                placeholder="Choose Status"
                                                selectedValue={staff}
                                                onSelect={selected => setSelectedStaff(selected)} >
                                            </CustomDropdown>
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