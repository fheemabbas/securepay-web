import React, { useState } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';

import Label from '../../../../components/UI/Label/Label';
import HookForm from '../../../../components/HookForm/HookForm';

import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import TextField from '../../../../components/UI/TextField/TextField';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import AddCustomerForm from './Form/AddCustomerForm';
import AddMilestoneForm from './Form/AddMilestoneForm';
import ConfirmModal from '../../../../components/ConfirmMessage/ConfirmModal';


import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import './CreateJob.scss';




const itemsStatus = [
  {
    id: "1",
    value: 'Colin'
  },
  {
    id: "2",
    value: 'Cody'
  },
  {
    id: "3",
    value: 'Cody Fisher'
  },
  {
    id: "4",
    value: 'Ab Fisher'
  },
  {
    id: "5",
    value: 'Boy Fisher'
  },
  {
    id: "6",
    value: 'Zebra Fisher'
  },

]

const createJobForm = {
  jobtitle: {
    name: 'jobtitle',
    validate: {
      required: {
        value: true,
        message: ((Message.ERRORMESSAGE.JOBTITLEEEMPTY))
      }, pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
      }
    },
  },
  jobdesp: {
    name: 'jobdesp',
    validate: {
      required: {
        value: true,
        message: ((Message.ERRORMESSAGE.JOBDESPEEMPTY))
      }, pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
      }
    },
  },
  jobfor: {
    name: 'jobfor',
    validate: {
      required: {
        value: true,
        message: ((Message.ERRORMESSAGE.JOBFOREMPTY))
      }, pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
      }
    },
  },
  milestone: {
    name: 'milestone',
    validate: {
      required: {
        value: true,
        message: ((Message.ERRORMESSAGE.MILESTONEEMPTY))
      }, pattern: {
        value: Constant.REGEX.ALPHANUMERIC,
        message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
      }
    },
  },
}

function CreateaJob(props) {
  const history = useHistory();
  const [total, setTotal] = useState(0)
  const [inputArray, setInputArray] = useState([])
  // const [form, setCreateJobForm] = React.useState()
  const [setCreateJobForm] = React.useState()
  const [jobfor, setJobFor] = useState('');
  let [showAddMilestone, setShowAddMilestone] = useState(false)
  // let [EditBtn, setShowEditBtn] = useState(false)
  let [EditBtn] = useState(false)
  let [showCreateMilestone, setShowCreateMilestone] = useState(false)
  let [showConfirmModal, setShowConfirmModal] = useState(false)

  const onFormSubmit = () => { }

  const increase = () => {
    setTotal(total + 1)
    setInputArray(oldArray => [...oldArray, total + 1])
  }

  const decrease = () => {
    if (total !== 0) {
      setInputArray(inputArray.filter(item => item !== total));
      setTotal(total - 1)
    }
  }

  // page redirect //
  const routeDetails = () => {
    let path = `/jobs`;
    history.push(path);
  }

  return (
    <div className="createJobPage" >
      <div className="createJobForm">
        <div className="innerSection">
          <Label title='Create Job'></Label>
          <p className='innerTxt'>Please provide below mentioned details to create job.</p>
          <div className="formSection">
            <HookForm
              defaultForm={{}}
              init={form => setCreateJobForm(form)}
              onSubmit={onFormSubmit}>
              {(formMethod) => {
                return (
                  <>
                    <div className="formmain">
                      <div className="formLeft">
                        <p className='innerTitle'>Job Details</p>
                        <TextField
                          type="text"
                          placeholder="Job Title*"
                          formMethod={formMethod}
                          rules={createJobForm.jobtitle.validate}
                          name={createJobForm.jobtitle.name}
                          errors={formMethod?.errors}
                        />
                        <TextField
                          type="text"
                          placeholder="Job Description*"
                          formMethod={formMethod}
                          rules={createJobForm.jobdesp.validate}
                          name={createJobForm.jobdesp.name}
                          errors={formMethod?.errors}
                          textarea="textarea"
                        />
                        <div className='autoComplete'>
                          {jobfor &&
                            <CustomButton type='button' title='Add' onClick={() => setShowAddMilestone(!showCreateMilestone)}></CustomButton>}
                          <Autocomplete
                            inputProps={{ placeholder: 'Job For*' }}
                            shouldItemRender={(item, value) => item.value.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            items={itemsStatus}
                            menuStyle={{
                              borderRadius: '8px',
                              boxShadow: ' 0px 2px 8px rgba(40, 41, 61, 0.08), 0px 20px 32px rgba(96, 97, 112, 0.24)',
                              // position: 'fixed',
                              overflow: 'scroll',
                              position: 'absolute',
                              top: '49px',
                              left: '0',
                              maxHeight: ' 123px',
                              borderTop: '0px',
                              width: '100',
                              zIndex: '99999',
                              backgroundColor: 'white',
                              minHeight: '30px',
                              fontSize: '16px',
                              background: 'white',
                              color: ' $colorGreyBlack',
                              textAlign: 'left',
                            }}
                            getItemValue={(item) => item.value}
                            renderItem={(item, isHighlighted) =>
                              <div className='dropdownItem'>
                                {item.value}
                              </div>
                            }
                            value={jobfor}
                            onChange={(e) => {
                              setJobFor(e.target.value)
                            }}
                            onSelect={(item) => {
                              setJobFor(item)
                            }}
                          />
                        </div>

                      </div>
                      <div className="formRight">
                        <div className='addMore'>
                          <div className='addMinuSection'>
                            <p className='innerTitle'>List of Milestone</p>
                            <div className='addMinus'>
                              <CustomButton onClick={decrease} ><i className='icon-minus'></i></CustomButton>
                              <span className='inputTxt'>{total}</span>
                              <CustomButton onClick={increase} ><i className='icon-add'></i></CustomButton>
                            </div>
                          </div>
                          <div className="listingScroll">
                            {
                              inputArray.map((value, i) => {
                                return <div className='addMilestone'>
                                  {/* <TextField
                                    type="text"
                                    placeholder={"Milestone " + value + '*'}
                                    formMethod={formMethod}
                                    rules={createJobForm.milestone.validate}
                                    name={createJobForm.milestone.name}
                                    errors={formMethod?.errors}
                                  /> */}

                                  <p className='options' data-placeholder={"Milestone " + value + '*'}></p>
                                  <div className='addBtn'>
                                    <CustomButton type='button' title='Add' onClick={() => setShowCreateMilestone(!showCreateMilestone)}></CustomButton>
                                  </div>
                                  {EditBtn &&
                                    <div className='edit_Delete'>
                                      <CustomButton type='button' title='Edit' onClick={() => setShowCreateMilestone(!showCreateMilestone)}></CustomButton>
                                      <CustomButton type='button' title='Delet' onClick={() => setShowConfirmModal(!showConfirmModal)}></CustomButton>
                                    </div>
                                  }
                                </div>
                              })
                            }
                          </div>
                          <div className='milestoneDetails'>
                            <div className='result'>
                              <p className='title bold'>Job Amount </p>
                              <p className='amount bold'> £2000</p>
                            </div>
                            <div className='result'>
                              <p className='title'>Admin Commission 10% for job under £5100 </p>
                              <p className='amount'> £200</p>
                            </div>
                            <div className='messageSection highlight'>
                              <p className='message'>For job above £50000, please contact us on <span className='bold'> contacts@yatapay.com</span></p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="custombtnfield">
                      <CustomButton type="submit" title="Submit" disabled={!formMethod?.formState.isValid} />
                      <Link to="#" className='cancelBtn' onClick={() => routeDetails()}>Cancel </Link>
                    </div>
                  </>
                )
              }}
            </HookForm>
          </div>
        </div>
      </div>
      <ModalPopup
        showModal={showAddMilestone}
        onHide={() => setShowAddMilestone(false)}
        className='addCustomer'
        closeIcon={true}
      >
        <AddCustomerForm onHide={() => setShowAddMilestone(false)}></AddCustomerForm>
      </ModalPopup>
      <ModalPopup
        showModal={showCreateMilestone}
        onHide={() => setShowCreateMilestone(false)}
        className='addMilestone'
        closeIcon={true}
      >
        <AddMilestoneForm onHide={() => setShowCreateMilestone(false)}></AddMilestoneForm>
      </ModalPopup>
      <ModalPopup
        showModal={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        className='confirmModal'
        closeIcon={true}
      >
        <ConfirmModal title='Alert !' innerTxt='Are you sure, you want to delete the milestone?'
          titleConfirm='Yes, Delete'
          titleCancel='No, Cancel'
          onHide={() => setShowConfirmModal(false)}>
        </ConfirmModal>
      </ModalPopup>
    </div >
  );
}

export default withRouter(CreateaJob);
