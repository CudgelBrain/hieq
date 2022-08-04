import React from 'react';
import Papa from 'papaparse';
import { snakeCase } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  data: Array<Record<string, any>>;
  fileName: string;
}

const CSVDownloader: React.FC<Props> = ({ data, fileName }) => {
  const prepareCSV = () => {
    const CSVData = Papa.unparse(data);
    const blob = new Blob([CSVData], {
      type: 'text/csv;charset=utf-8;',
    });
    const tempLink = document.createElement('a');
    tempLink.href = window.URL.createObjectURL(blob);
    tempLink.download = `${snakeCase(fileName)}.csv`;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <span className='flex-grow-1 text-right'>
      <button
        type='button'
        name='expsubmit'
        className='btn btn-primary custom-btn mb-0'
        onClick={prepareCSV}
      >
        Export <FontAwesomeIcon icon={faDownload as IconProp} />
      </button>
    </span>
  );
};

export default CSVDownloader;
