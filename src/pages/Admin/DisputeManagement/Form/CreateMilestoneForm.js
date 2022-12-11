import React from "react";
import { Controller } from 'react-hook-form';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { showToast } from "../../../../state/ducks/utils/operations";
import Calender from "../../../../components/UI/Calender/Calender";

import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import './CreateMilestoneForm.scss';

const milestoneForm = {
    title: {
        name: 'title',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.TITLEEMPTY))
            },
            pattern: {
                value: Constant.REGEX.Name,
                message: ((Message.ERRORMESSAGE.ALFAVALID))
            }
        },
    },
    amount: {
        name: 'amount',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.AMOUNTEMPTY))
            }, pattern: {
                value: Constant.REGEX.NUMERIC,
                message: ((Message.ERRORMESSAGE.AMOUNTVALID))
            }
        },
    },
    message: {
        name: 'message',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.DESPEMPTY))
            },
        },
    },
    date: {
        name: 'date',
        validate: {
            required: {
                value: true
            }
        },
    },

}

const CreateMilestoneForm = (props) => {
    const [form, setFilterForm] = React.useState()
    const [busy, setBusy] = React.useState(false)

    const onFormSubmit = () => {
        setBusy(true)
        setTimeout(() => {
            setBusy(false)
            props.onHide()
            props.showToast({ message: 'Milestone added successfully', type: 'success' })
        },
            1000)

    }



    return (
        <div className='createMile' >
            <HookForm
                defaultForm={{}}
                init={form => setFilterForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Add Interim transaction'></Label>
                            <div className='filterItem'>
                                <TextField
                                    formMethod={formMethod}
                                    rules={milestoneForm.title.validate}
                                    name={milestoneForm.title.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Interim transaction Title*"
                                />
                                <TextField
                                    formMethod={formMethod}
                                    rules={milestoneForm.amount.validate}
                                    name={milestoneForm.amount.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Interim transaction Amount*"
                                />
                                <TextField
                                    formMethod={formMethod}
                                    rules={milestoneForm.message.validate}
                                    name={milestoneForm.message.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Interim transaction description*"
                                    textarea="textarea"
                                />
                                <div className="calenderMain">
                                    <Controller
                                        defaultValue={''}
                                        control={formMethod?.control}
                                        rules={milestoneForm.date.validate}
                                        name={milestoneForm.date.name}
                                        render={(props) => (
                                            <Calender
                                                selected={props.value}
                                                onChange={(e) => props.onChange(e)}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Expected Completion Date*"
                                            />
                                        )} />
                                </div>

                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Add" disabled={!formMethod?.formState.isValid} loading={busy} />
                                    <CustomButton type="button" title="Cancel" onClick={() => props.onHide()} />
                                </div>
                            </div>

                        </div>
                    )
                }}
            </HookForm>
        </div>


    )
}


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {

    showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateMilestoneForm));


