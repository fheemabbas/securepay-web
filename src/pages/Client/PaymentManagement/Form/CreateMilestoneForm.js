import React, { useEffect } from "react";
import { Controller } from 'react-hook-form';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { showToast } from "../../../../state/ducks/utils/operations";
import Calender from "../../../../components/UI/Calender/Calender";
import StorageService from "./../../../../services/localstorage.service";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";
import './CreateMilestoneForm.scss';
import { editMilestone, addMilestone, getOneuserDetails } from "../../../../state/ducks/Job/actions";
import moment from "moment";

const milestoneForm = {
    title: {
        name: 'title',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
            // pattern: {
            //     value: Constant.REGEX.Name,
            //     message: ((Message.ERRORMESSAGE.ALFAVALID))
            // }
        },
    },
    amount: {
        name: 'amount',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }
            , pattern: {
                value: Constant.REGEX.AMOUNT,
                message: ((Message.ERRORMESSAGE.INTERIMAMOUNTINVALID))
            }
        },
    },
    message: {
        name: 'description',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
        },
    },
    date: {
        name: 'completionDate',
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

    const onFormSubmit = (data) => {
        let JobId = StorageService.getItem("JobId")
        let param = { ...data, completionDate: moment(data.completionDate).format('yyyy-MM-DD') }
        setBusy(true)
        if (props.isEdit && props.milestone) {
            props.editMilestone(props.milestone._id, param).then((res) => {
                props.onHide()
                // props.setIsSave(true)
                StorageService.setItem('isSave', { id: JobId, save: true })

                props.getOneuserDetails(JobId)
                props.showToast({ message: res.message, type: 'success' })
            }).catch((err) => {
            })
        } else {
            props.addMilestone({ ...param, jobId: JobId }).then((res) => {
                props.onHide()
                // props.setIsSave(true)
                StorageService.setItem('isSave', { id: JobId, save: true })
                props.getOneuserDetails(JobId)
                props.showToast({ message: res.message, type: 'success' })
            }).catch((err) => {
            })
        }
        // setTimeout(() => {
        //     setBusy(false)
        //     props.onHide()
        //     props.showToast({ message: 'Milestone added successfully', type: 'success' })
        // },
        //     1000)

    }

    // useEffect(() => {
    //     props.milestone && props.milestone.completionDate && props.milestone.completionDate && form.setValue('completionDate', new Date(props.milestone.completionDate), { shouldValidate: true })
    // }, [props.milestone])

    return (
        <div className='createMile' >
            <HookForm
                defaultForm={{
                    // title: props.milestone && props.milestone.title,
                    // amount: props.milestone && props.milestone.amount
                }}
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
                                    errors={formMethod ?.errors}
                                    autoFocus={true}
                                    defaultValue={props.isEdit && props.milestone && props.milestone.title}
                                    type="text"
                                    placeholder="Interim transaction title"
                                />

                                <TextField
                                    formMethod={formMethod}
                                    rules={milestoneForm.amount.validate}
                                    name={milestoneForm.amount.name}
                                    errors={formMethod ?.errors}
                                    autoFocus={true}
                                    defaultValue={props.isEdit && props.milestone && props.milestone.amount.toFixed(2)}
                                    type="text"
                                    placeholder="Interim transaction amount"
                                    handleBlur={e => {
                                        if (!isNaN(e.target.value) && e.target.value !== '') {

                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                            formMethod.setValue(`amount`, e.target.value)
                                        } else {
                                            formMethod.setValue(`amount`, e.target.value)
                                        }
                                    }}
                                />

                                <TextField
                                    formMethod={formMethod}
                                    rules={milestoneForm.message.validate}
                                    name={milestoneForm.message.name}
                                    errors={formMethod ?.errors}
                                    defaultValue={props.isEdit && props.milestone && props.milestone.description}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Interim transaction description"
                                    textarea="textarea"
                                />
                                <div className="calenderMain">
                                    <Controller
                                        control={formMethod ?.control}
                                        rules={milestoneForm.date.validate}
                                        name={milestoneForm.date.name}
                                        defaultValue={props.isEdit && props.milestone && props.milestone.completionDate && new Date(props.milestone.completionDate)}

                                        render={(props) => (
                                            <Calender
                                                selected={props.value}
                                                onChange={(e) => props.onChange(e)}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Expected completion date"
                                            />
                                        )} />
                                </div>

                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Add" disabled={!formMethod ?.formState.isValid} loading={busy} />
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

    showToast, editMilestone, addMilestone, getOneuserDetails
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateMilestoneForm));


