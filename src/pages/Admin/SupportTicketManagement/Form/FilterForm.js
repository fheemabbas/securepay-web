import React, { useEffect, useState } from "react";
import { Controller } from 'react-hook-form';

import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import HookForm from '../../../../components/HookForm/HookForm';
// import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';

// import Message from '../../../../util/message';
// import Constant from "../../../../util/constant";

import './FilterForm.scss';
import CalenderCustom from "../../../../components/UI/CalenderCustom/CalenderCustom";
import { getStaffMember } from "../../../../state/ducks/Job/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const filterForm = {
    startdate: {
        name: 'startdate',
    },
    enddate: {
        name: 'enddate',
    },
    selectvaluecategory: {
        name: 'selectvaluecategory',
    },


    selectvalue: {
        name: 'selectvalue',
        // validate: {
        //     required: {
        //         value: true,
        //         message: ((Message.ERRORMESSAGE.MININVALID))
        //     },
        //     validate: value => value?._id !== '' || 'error message'  // <p>error message</p>

        // },
    },

}
const itemsStatus = [
    {
        id: "PENDING",
        value: 'Pending'
    },
    {
        id: "RESOLVED",
        value: 'Resolved'
    },
]
const itemsCategory = [
    {
        id: "1",
        value: 'Leslie Alexander'
    },
    {
        id: "2",
        value: 'John Doe'
    },
    {
        id: "3",
        value: 'Mark Smith'
    },
    {
        id: "4",
        value: 'Cody Fisher'
    },
    {
        id: "5",
        value: 'Alexa Smith'
    },
    {
        id: "6",
        value: 'Jane Doe'
    }

]
const FilterForm = (props) => {
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const { startDate, endDate, setStartDate, staffMembers, selectedStaffMember, setSelectedStaffMember, setEndDate, isfilter, setShowFilterDropdown, setTickitStatus, status, setpage } = props
    const [job, setSelectedJob] = useState()
    const [form, setFilterForm] = React.useState()

    const CustomStartDate = ({ value, onClick }) => (
        <button type="button" className="custom-input" onClick={onClick}>
            {value ? value : <span className='birth_Placeholder'  >Start Date</span>}
        </button>
    );
    const CustomEndDate = ({ value, onClick }) => (
        <button type="button" className="custom-input" onClick={onClick}>
            {value ? value : <span className='birth_Placeholder'  >End Date</span>}
        </button>
    );
    const onFormSubmit = (data) => {
        // *************filtering Support and Tickit Start*************
        setStartDate(data.startdate)
        setEndDate(data.enddate)
        setTickitStatus(data.selectvaluecategory.id)
        props.userRole === 1 && setSelectedStaffMember(data.selectvalue.id);
        setShowFilterDropdown(false)
        setpage(1)
        isfilter(true)
        props.setIsapiCall(!props.IsapiCall)
        // *************filtering Support and Tickit End*************
    }
    return (
        <FilterDropdown className='jobFilters_custom' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{
                        selectvaluecategory: status ? itemsStatus.filter((item) => item.id === status)[0] : '',
                        selectvalue: selectedStaffMember ? staffMembers.filter((item) => item.id === selectedStaffMember)[0] : ''
                    }}
                    init={form => setFilterForm(form)}
                    onSubmit={onFormSubmit}>
                    {(formMethod) => {
                        return (
                            <div className="form">
                                <div className='filterItem'>
                                    <div className='dropdownSection'>
                                        <Label title='Status'></Label>
                                        <Controller as={<CustomDropdown />}
                                            defaultValue={''}
                                            control={formMethod.control}
                                            rules={filterForm.selectvaluecategory.validate}
                                            errors={formMethod?.errors}
                                            dropDownItems={itemsStatus}
                                            placeholder="Choose Status"
                                            selectedValue={job}
                                            name={filterForm.selectvaluecategory.name}
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
                                                    <CalenderCustom
                                                        selected={props.value}
                                                        onChange={(e) => props.onChange(e)}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Start Date"
                                                        customInput={<CustomStartDate />}
                                                        currantYear={currentYear}
                                                        maxDate={
                                                            new Date(
                                                                currentYear +
                                                                "/" +
                                                                currentMonth +
                                                                "/" +
                                                                currentDate
                                                            )
                                                        }
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
                                                    <CalenderCustom
                                                        selected={props.value}
                                                        onChange={(e) => props.onChange(e)}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Date of Birth*"
                                                        customInput={<CustomEndDate />}
                                                        minDate={formMethod.watch("startdate")}
                                                        currantYear={currentYear}
                                                        maxDate={
                                                            new Date(
                                                                currentYear +
                                                                "/" +
                                                                currentMonth +
                                                                "/" +
                                                                currentDate
                                                            )
                                                        }

                                                    />
                                                )} />
                                        </div>
                                    </div>
                                    {props.userRole === 1 && <div className='dropdownSection'>
                                        <Label title='Assigned Securepay Staff Member'></Label>
                                        <Controller as={<CustomDropdown />}
                                            defaultValue={''}
                                            control={formMethod.control}
                                            rules={filterForm.selectvalue.validate}
                                            errors={formMethod?.errors}
                                            dropDownItems={staffMembers}
                                            placeholder="Choose Staff Member"
                                            selectedValue={job}
                                            name={filterForm.selectvalue.name}
                                        />
                                    </div>}
                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Apply"
                                        disabled={!(formMethod.watch("enddate") || formMethod.watch("startdate") || formMethod.watch("selectvaluecategory") || props.userRole === 1 && formMethod.watch("selectvalue"))}
                                    />
                                    <CustomButton type="button" className='clear' title="Clear" onClick={() => {
                                        formMethod.reset({ selectvalue: "", selectvaluecategory: "", enddate: "", startdate: "" })
                                        props.userRole === 1 && setSelectedStaffMember("");
                                        setTickitStatus("")
                                        setStartDate("")
                                        setEndDate("")
                                        isfilter("")
                                        setpage(1)
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


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    getStaffMember
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterForm));