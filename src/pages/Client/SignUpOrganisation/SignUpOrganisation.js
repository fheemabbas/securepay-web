import React from 'react';
import { withRouter } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';

import logo from '../../../assets/images/trustpay1.png';
import OrganisationForm from '../../../components/OrganisationForm';

import './SignUpOrganisation.scss';

function SignUpOrganisation(props) {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })

  // const onKeyDown = (e) => {
  //   e.keyCode === 13 && this.onFormSubmit()
  // }

  return (
    <div className="SignUpOrganisation" style={{ height: dimensions.height + 'px' }}>
      <Scrollbars className="signupemailScroll">
        <div className="signupemailCenter">
          <div className="signupemailBox">
            <div className='logo'>
              <img width="66" height="93" src={logo} alt="logo" fluid="true" />
              {/* <span className="icon-yatapay-brand"></span> */}
            </div>
            <div className="formSection">
              <OrganisationForm />
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}

export default withRouter(SignUpOrganisation);
