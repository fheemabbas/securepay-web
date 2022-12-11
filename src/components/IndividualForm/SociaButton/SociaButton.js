import React from 'react';
// import { Button } from 'react-bootstrap';
// import './SociaButton.scss';
import { OldSocialLogin as SocialLogin } from 'react-social-login'
const SocialButton = (props) => {
  return (
    <SocialLogin
      provider={props.provider}
      appId={props.appId}
      callback={(user, err) => props.handleSocialLogin(user, err)}
    >
      <span className={props.className ? props.className : "loginwith"}><span className={props.icon}></span>{props.lable}</span>
    </SocialLogin>
  )
}
export default SocialButton;

