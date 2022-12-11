import React, { useState } from "react";
import { Controller } from 'react-hook-form';
import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CalenderCustom from "../../../../components/UI/CalenderCustom/CalenderCustom";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";
import './FilterForm.scss';

const filterForm = {
    startdate: {
        name: 'startdate',
    },
    enddate: {
        name: 'enddate',
    },
    minCategory: {
        name: 'minCategory',
        validate: {
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.Invalidamount))
            }
        },
    },
    maxCategory: {
        name: 'maxCategory',
        validate: {
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.Invalidamount))
            }
        },
    },
    min: {
        name: 'min',
        validate: {
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.Invalidamount))
            }
        },
    },
    max: {
        name: 'max',
        validate: {
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.Invalidamount))
            }
        },
    },


}
const FilterForm = (props) => {
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const [form, setFilterForm] = React.useState()
    const { setPaymentPage, setStartDate, startDate, setEndDate, endDate, setIsapiCall, IsapiCall, setMinimumAmount, minimumAmount, setMaximumAmount, maximumAmount, setAdminfeesMaximum, adminfeesMaximum, setAdminfeesMinimum, adminfeesMinimum, setIsFilter, close } = props
    const onFormSubmit = () => { }
    const onJobFilter = (formMethod) => {
        setMinimumAmount(formMethod.watch("minCategory"))
        setMaximumAmount(formMethod.watch("maxCategory"))
        setAdminfeesMinimum(formMethod.watch("min"))
        setAdminfeesMaximum(formMethod.watch("max"))
        setStartDate(formMethod.watch('startdate'))
        setEndDate(formMethod.watch('enddate'))
        setPaymentPage(1)
        setIsFilter(true)
        setIsapiCall(!IsapiCall)
        close()
    }
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
    return (
        <FilterDropdown className='jobFilters_custom' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{}}
                    init={form => setFilterForm(form)}
                    onSubmit={onFormSubmit}>
                    {(formMethod) => {
                        let isZero = (formMethod.watch("min") !== '' && formMethod.watch("max") !== '' && Number(formMethod.watch("min")) === 0.00 && Number(formMethod.watch("max")) === 0.00) || (formMethod.watch("minCategory") !== '' && formMethod.watch("maxCategory") !== '' && Number(formMethod.watch("minCategory")) === 0.00 && Number(formMethod.watch("maxCategory")) === 0.00)
                        let isgreter = ((Boolean(formMethod.watch("min")) && Boolean(formMethod.watch("max")) && Number(formMethod.watch("min")) > Number(formMethod.watch("max")))) || ((Boolean(formMethod.watch("minCategory")) && Boolean(formMethod.watch("maxCategory")) && Number(formMethod.watch("minCategory")) > Number(formMethod.watch("maxCategory"))))
                        let isvalid = Boolean(formMethod.watch("startdate")) || Boolean(formMethod.watch("enddate")) || Boolean(formMethod.watch("min")) || Boolean(formMethod.watch("max")) || Boolean(formMethod.watch("minCategory")) || Boolean(formMethod.watch("maxCategory"))
                        let isnan = (isNaN(formMethod.watch("minCategory")) || isNaN(formMethod.watch("maxCategory"))) || (isNaN(formMethod.watch("min")) || isNaN(formMethod.watch("max")))
                        return (
                            <div className="form">
                                <div className='filterItem'>
                                    <Label title='Milestone Amount'></Label>
                                    <div className="input_row">
                                        <TextField
                                            formMethod={formMethod}
                                            rules={filterForm.minCategory.validate}
                                            name={filterForm.minCategory.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="From"
                                            defaultValue={minimumAmount ?? ''}
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
                                            placeholder="To"
                                            defaultValue={maximumAmount ?? ''}
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
                                    <Label title='Admin Commission'></Label>
                                    <div className="input_row">
                                        <TextField
                                            formMethod={formMethod}
                                            rules={filterForm.min.validate}
                                            name={filterForm.min.name}
                                            errors={formMethod?.errors}
                                            autoFocus={false}
                                            type="text"
                                            placeholder="From"
                                            defaultValue={adminfeesMinimum ?? ''}
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
                                            placeholder="To"
                                            defaultValue={adminfeesMaximum ?? ''}
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
                                    <Label title='Release Transaction Date'></Label>
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
                                                        // showYearDropdown={true}
                                                        // showMonthDropdown={true}
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

                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="button" title="Apply"
                                        disabled={isZero ? true : isgreter ? true : isnan ? true : !(isvalid)}
                                        onClick={() => onJobFilter(formMethod)}
                                    />
                                    <CustomButton type="reset" className='clear' title="Clear" onClick={() => {
                                        formMethod.reset({ min: "", max: "", maxCategory: "", minCategory: "", startdate: '', enddate: '' })
                                        setMinimumAmount(formMethod.watch("minCategory"))
                                        setMaximumAmount(formMethod.watch("maxCategory"))
                                        setAdminfeesMinimum(formMethod.watch("min"))
                                        setAdminfeesMaximum(formMethod.watch("max"))
                                        setStartDate(formMethod.watch('startdate'))
                                        setEndDate(formMethod.watch('enddate'))
                                        setPaymentPage(1)
                                        setIsapiCall(!IsapiCall)
                                        setIsFilter(false)
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