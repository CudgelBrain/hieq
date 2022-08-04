import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <React.Fragment>
      <header className='header'>
        <div className='container-fluid'>
          <div className='top-bar'>
            <div id='bars_button' className='bars_button'>
              <Link to='#' title='Menu'>
                <i className='fa fa-bars'></i>
              </Link>
            </div>
            <div className='logo'>
              <h1 className='page-title d-flex align-items-center'>
                Hieq - Panel
                <span className='font18 ml-2'>
                  <Link className='text-white' to='#' target='_blank'>
                    <i className='fa fa-chevron-right'></i> Go to website
                  </Link>
                </span>
              </h1>
            </div>
            <div className='top-right'>
              <nav>
                <ul className='top-navigation'>
                  <li>
                    <Link to='#'>
                      <i className='far fa-user'></i> Admin
                    </Link>
                  </li>
                  <li>
                    <Link to='#'>
                      <i className='fas fa-sign-out-alt'></i> Logout
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
