import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  desc?: string;
  classes?: string;
  subTitle?: string;
  showLink?: boolean;
}

const Tittle: React.FC<Props> = ({
  title,
  subTitle,
  showLink = true,
  classes,
  desc = 'Need assistance? Please visit ',
}) => {
  return (
    <div className='text-left mb-4'>
      <div className='pg-title'>
        {title} {subTitle && <span className={`pg-title-inner ${classes}`}>{subTitle}</span>}
      </div>
      {desc !=="" && <div className='lead'>
        {desc}
        {showLink && (
          <Link className='link' to={'/'}>
            Help Center
          </Link>
        )}
      </div>}
    </div>
  );
};

export default Tittle;
