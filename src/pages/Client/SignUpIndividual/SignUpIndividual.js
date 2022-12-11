import React from 'react';
import { withRouter } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';

import logo from '../../../assets/images/trustpay1.png';
import IndividualForm from '../../../components/IndividualForm';
import useWindowDimension from "../../../hooks/useWindowDimension";

import './SignUpIndividual.scss';

function SignUpIndividual(props) {
  const dimensions = useWindowDimension()


  // const onKeyDown = (e) => {
  //   e.keyCode === 13 && this.onFormSubmit()
  // }

  return (
    <div className="SignUpIndividual">
      <Scrollbars className="signupemailScroll" style={{ height: dimensions.height + 'px' }}>
        <div className="signupemailCenter">
          <div className="signupemailBox">
            <div className='logo'>
              {/* <span className="icon-yatapay-brand"></span> */}
              <img src={logo} alt="logo" width='100' />
            </div>
            <div className="formSection">
              <IndividualForm />
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}

export default withRouter(SignUpIndividual);
