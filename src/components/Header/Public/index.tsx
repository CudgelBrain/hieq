import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <header className='position-sticky'>
        <div className='bs-30 bg-white'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-4'>
                <div className='menu_icon pt-4 pb-4'>
                  <div className='stripes'>
                    <div className='stripe stripe1'></div>
                    <div className='stripe stripe2'></div>
                    <div className='stripe stripe3'></div>
                  </div>
                </div>
                <div className='mob-navigation'>
                  <ul className='top-navigation pt-3 pb-3'>
                    <li>
                      <Link to='#'>
                        MBAtrek <span>Career Mentorship</span>
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        Competitions <span>Corporate Challenges</span>
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        Employer <span>Looking to Hire?</span>
                      </Link>
                    </li>
                  </ul>
                  <div className='overlay'>
                    <div className='close-overlay'></div>
                  </div>
                </div>
              </div>
              <div className='col-md-4 col-8 text-right'>
                <div className='d-inline-flex align-items-center h-100'>
                  <Link to='/login/password' className='linkBtn'>
                    LOGIN
                  </Link>
                  <button
                    className='btn btn-blue ml-3'
                    onClick={() => {
                      history.push('/register');
                    }}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
