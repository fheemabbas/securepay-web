import React, { useState } from "react";

import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';
import Calender from '../../../../components/UI/Calender/Calender';

// import Message from '../../../../util/message';

import './FilterForm.scss';

const filterForm = {
    startdate: {
        name: 'startdate',

    },
    enddate: {
        name: 'enddate',

    },
    selectvalue: {
        name: 'selectvalue',

    },

}
const itemsActivity = [
    {
        id: "PENDING",
        value: 'Pending'
    },
    {
        id: "RESOLVED",
        value: 'Solved'
    },

]
const FilterForm = (props) => {
    const { startDate, endDate, setStartDate, setEndDate, isfilter, setShowFilterDropdown, setTickitStatus, status, setpage, setIsapiCall, IsapiCall } = props
    const [job, setSelectedJob] = useState()
    const [form, setFilterForm] = React.useState()
    const onFormSubmit = (data) => {
        // *************filtering Support and Tickit Start*************
        setStartDate(data.startdate)
        setEndDate(data.enddate)
        isfilter(true)
        setTickitStatus(data.selectvalue.id)
        setpage(1)
        setIsapiCall(!IsapiCall)
        setShowFilterDropdown(false)
        // *************filtering Support and Tickit end*************
    }

    return (
        <FilterDropdown className='ticketFilter' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{
                        selectvalue: status ? itemsActivity.filter((item) => item.id === status)[0] : '',
                    }}
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
                                    <Label title='Created On'></Label>
                                    <div className="calenderMain">
                                        <div className='dateSection'>
                                            <Controller
                                                control={formMethod.control}
                                                name={filterForm.startdate.name}
                                                rules={filterForm.startdate.validate}
                                                defaultValue={startDate ? new Date(startDate) : ''}
                                                render={(props) => (
                                                    <Calender
                                                        selected={props.value}
                                                        onChange={(e) => props.onChange(e)}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Date"
                                                        maxDate={new Date()}
                                                    />
                                                )} />
                                        </div>
                                        <div className='dateSection'>
                                            <Controller
                                                control={formMethod.control}
                                                name={filterForm.enddate.name}
                                                rules={filterForm.startdate.validate}
                                                defaultValue={endDate ? new Date(endDate) : ''}
                                                render={(props) => (
                                                    <Calender
                                                        selected={props.value}
                                                        onChange={(e) => props.onChange(e)}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Date"
                                                        minDate={formMethod.watch("startdate")}
                                                        maxDate={new Date()}
                                                    />
                                                )} />
                                        </div>
                                    </div>

                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Apply"
                                        disabled={!(formMethod.watch("enddate") || formMethod.watch("startdate") || formMethod.watch("selectvalue"))}
                                    />
                                    <CustomButton type="button" title="Clear" onClick={() => {
                                        // *************clier filter Support and Tickit Start*************
                                        formMethod.reset({ selectvalue: "", enddate: "", startdate: "" })
                                        setTickitStatus("")
                                        setStartDate("")
                                        setEndDate("")
                                        isfilter("")
                                        setpage(1)
                                        // *************clier filter Support and Tickit end*************
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