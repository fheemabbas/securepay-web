import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { showToast } from "../../../../state/ducks/utils/operations";
import Message from '../../../../util/message';
import './AnnounceForm.scss';
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";
import Constant from "../../../../util/constant";
import { announce_details, getOneDisputeDetails } from "../../../../state/ducks/Job/actions";

const announceForm = {
    conclusion: {
        name: 'conclusion',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
        },
    },
    clientamount: {
        name: 'clientamount',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: "Invalid amount"
            }
        },
    },
    refundamount: {
        name: 'refundamount',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
            pattern: {
                value: Constant.REGEX.AMOUNT,
                message: "Invalid amount"
            }
        },
    },

}

const AnnounceForm = (props) => {
    const [form, setFilterForm] = React.useState()
    const [busy, setBusy] = React.useState(false)
    const [disputeFevor, setDisputeFevor] = useState("customer");
    const ClientTypeHandler = (event) => {
        setDisputeFevor(event.target.value);
    };
    const onFormSubmit = (data) => {
        let param = {
            conclusion: disputeFevor.toUpperCase(),
            conclusionStatement: data.conclusion,
            amountPayClient: data.clientamount,
            amountRefundCustomer: data.refundamount
        }
        setBusy(true)
        props.announce_details(props.disputeID, param).then((res) => {
            props.getOneDisputeDetails(props.disputeID)
            props.onHide()
            setTimeout(() => {
                setBusy(false)
                props.showToast({ message: res.message, type: 'success' })
            }, 1000)
        })
        // setTimeout(() => {
        //     setBusy(false)
        //     props.onHide()
        //     props.showToast({ message: 'Dispute has been raised successfully', type: 'success' })
        // },
        //     1000)
    }
    return (
        <div className='AnnounceFormSection' >
            <HookForm
                defaultForm={{}}
                init={form => setFilterForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Announce'></Label>
                            <div className="announce_txt">Please provide below mentioned details to announce.</div>
                            <div className="announce_amount">Total Escrowed Amount:<span>£{` ${props.EscrowedAmount}`}</span></div>
                            <div className="clienttype">
                                <div className="clienttypeleft">
                                    <p>Dispute in Favour of*</p>
                                </div>
                                <div className="clienttyperight">
                                    <RadioButton
                                        changed={ClientTypeHandler}
                                        id="1"
                                        isSelected={disputeFevor === "CLIENT"}
                                        label="Client"
                                        value="CLIENT"
                                    />
                                    <RadioButton
                                        changed={ClientTypeHandler}
                                        id="2"
                                        isSelected={disputeFevor === "CUSTOMER"}
                                        label="Customer"
                                        value="CUSTOMER"
                                    />
                                    <RadioButton
                                        changed={ClientTypeHandler}
                                        id="3"
                                        isSelected={disputeFevor === "ARBITRATION"}
                                        label="Suggest Arbitration"
                                        value="ARBITRATION"
                                    />
                                </div>
                            </div>
                            <div className='filterItem'>
                                <div className='messageAttched'>
                                    <TextField
                                        formMethod={formMethod}
                                        rules={announceForm.conclusion.validate}
                                        name={announceForm.conclusion.name}
                                        errors={formMethod ?.errors}
                                        type="text"
                                        placeholder="Conclusion Statement*"
                                        textarea="textarea"
                                    />
                                    {disputeFevor !== "ARBITRATION" && <>
                                        <TextField
                                            formMethod={formMethod}
                                            rules={disputeFevor !== "ARBITRATION" && announceForm.clientamount.validate}
                                            name={announceForm.clientamount.name}
                                            errors={formMethod ?.errors}
                                            autoFocus={true}
                                            type="text"
                                            placeholder="Amount Pay to Client"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("clientamount", e.target.value)
                                                } else {
                                                    formMethod.setValue("clientamount", e.target.value)
                                                }
                                            }}
                                        />
                                        <TextField
                                            formMethod={formMethod}
                                            rules={disputeFevor !== "ARBITRATION" && announceForm.refundamount.validate}
                                            name={announceForm.refundamount.name}
                                            errors={formMethod ?.errors}
                                            type="text"
                                            placeholder="Amount Refund to Customer"
                                            handleBlur={e => {
                                                if (!isNaN(e.target.value) && e.target.value !== '') {

                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    formMethod.setValue("refundamount", e.target.value)
                                                } else {
                                                    formMethod.setValue("refundamount", e.target.value)
                                                }
                                            }}
                                        />
                                    </>}
                                </div>
                                <div className="custombtnfield">
                                    <CustomButton type="submit" title="Submit" disabled={!formMethod ?.formState.isValid} loading={busy} />
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
    announce_details, showToast, getOneDisputeDetails
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnounceForm));


