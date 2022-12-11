import React from 'react';
import './NotFound.scss';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="notFoundScreen">
        <p>Page not found</p>
        {/* <div className="container">
          <div className="row">
            <div className='innerPage'>
              <div className="wrapperBox">
                <div className='logo'>
                  <img src={logo} alt="logo" />
                </div>
                <div className="cardBox">
                  <div className="title">404</div>
                  <div className="sub-title">Whoops!!</div>
                  <div className="txt">We couldn’t find the site you were looking for</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }

}

export default (NotFound);
