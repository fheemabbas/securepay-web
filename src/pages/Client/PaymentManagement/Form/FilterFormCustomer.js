import React, { useState } from "react";

import FilterDropdown from '../../../../components/UI/FilterDropdown/FilterDropdown';
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import CustomDropdown from '../../../../components/UI/CustomDropdown/CustomDropdown';

import Message from '../../../../util/message';

import './FilterFormCustomer.scss';
import Constant from "../../../../util/constant";

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
const FilterFormCustomer = (props) => {
    const { setInvitedStatus, close, setisInvitedfilter, InvitedStatus } = props// eslint-disable-next-line
    const [job, setSelectedJob] = useState()// eslint-disable-next-line
    const [form, setFilterForm] = React.useState()
    const onFormSubmit = (data) => {
        setInvitedStatus(data.selectvalue.id)
        setisInvitedfilter(true)
        close()
    }

    return (
        <FilterDropdown className='ticketFilterCustomer' >
            <div className='filterDetails'>
                <HookForm
                    defaultForm={{
                        selectvalue: Constant.FILTERSTATUS.filter((i) => i.id === InvitedStatus)[0]
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
                                    <CustomButton type="submit" title="Apply" disabled={!formMethod.watch("selectvalue")} />
                                    <CustomButton type="button" title="Clear" onClick={() => {
                                        setInvitedStatus("")
                                        setisInvitedfilter(false)
                                        formMethod.setValue("selectvalue", "")
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




export default FilterFormCustomer;