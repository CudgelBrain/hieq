import React, { useState } from 'react';
import * as yup from 'yup';
import { drop } from 'lodash';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface Props {
  message: string;
  className: string;
  sampleLink: string;
  status: string | number;
  onParse: (file: unknown, onComplete: () => void) => void;
}

export interface CSVReaderForm {
  file: Record<string, unknown>;
}

const CSVReaderSchema = yup
  .object({
    file: yup
      .mixed()
      .test('name', 'You need to provide a CSV file', (value) => {
        return value[0] && value[0].name !== '';
      })
      .test('fileSize', 'The uploaded file is too large', (value) => {
        return value[0] && value[0].size <= 2000000;
      })
      .test('type', 'We only support CSV', (value) => {
        return value[0] && ['text/csv', 'application/vnd.ms-excel'].includes(value[0].type);
      }),
  })
  .required();

const CSVReader: React.FC<Props> = ({ className, sampleLink, status, message, onParse }) => {
  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CSVReaderForm>({
    resolver: yupResolver(CSVReaderSchema),
  });
  const [showLabel, setShowLabel] = useState<string>('Choose File...');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    setShowLabel(`Selected File : ${file?.name}`);
  };

  const handleOnComplete = () => {
    reset();
    setShowLabel('Choose File...');
  };

  const handleOnSubmit = (formData: CSVReaderForm) => {
    const file = formData.file[0];
    Papa.parse(file as File, {
      delimiter: ',',
      chunkSize: 3,
      header: false,
      skipEmptyLines: true,
      error: (error: Error) => {
        setError('file', {
          type: 'mixed',
          message: error.message,
        });
      },
      complete: ({ data }: any) => onParse(drop(data, 1), handleOnComplete),
    });
  };

  return (
    <div className={className}>
      {(errors.file || status === 'failed') && (
        <div className='alert alert-danger'>
          <>{errors.file?.message || message}</>
        </div>
      )}
      {status === 'success' && <div className='alert alert-success'>Successfully Imported.</div>}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='row'>
          <div className='col-md-12 form-group'>
            <label className='label'>Import File (.csv) format only </label>
            <div className='custom-file'>
              <input
                type='file'
                id='impfile'
                {...register('file')}
                accept='.csv, text/csv'
                onChange={handleOnChange}
                className='custom-file-input'
              />
              <label className='custom-file-label' htmlFor='impfile'>
                {showLabel}
              </label>
              <span className='note mt-1'>
                {'File must be less than 2MB. '}
                <Link to={sampleLink} className=''>
                  <u>Sample View</u>
                </Link>
              </span>
            </div>
          </div>
          <div className='col-md-12'>
            <button type='submit' name='impsubmit' className='btn btn-primary custom-btn'>
              {status === 'loading' && <span className='spinner-border' role='status'></span>}
              {status !== 'loading' && (
                <span>
                  <FontAwesomeIcon icon={faUpload} /> Import
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CSVReader;
