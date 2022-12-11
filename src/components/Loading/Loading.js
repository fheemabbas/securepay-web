import React from 'react';
import './Loading.scss';
import trustpayloader from "../../assets/images/trustpay_loader.gif";
import ReactLoading from "react-loading";

const Loading = ({
  show,
}) => {
  return (
    show ? <div className={'full'}>
      <img src={trustpayloader} alt="loader" color={'#033732'} height={100} width={100} />
      {/* <ReactLoading type="bubbles" color={'#033732'} height={100} width={100} /> */}
    </div> : null)
}

Loading.defaultProps = {
  height: 30,
  width: 30,
  color: 'black'
};

export default Loading;
