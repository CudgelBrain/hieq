import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface Props {
  parent: string;
  page: string;
}

const Breadcrumb: React.FC<Props> = ({ parent, page }) => {
  return (
    <div className='breadcrumbs-title-container'>
      <div className='container-fluid'>
        <h5 className='page-title'>{parent} -</h5>
        <div className='breadcrumbs'>
          <ul>
            <li>
              <Link to='/controlGear'>
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li>{page}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
