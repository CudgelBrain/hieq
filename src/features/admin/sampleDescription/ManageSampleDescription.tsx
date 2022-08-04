import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DescriptionForm, DescriptionSchema } from './sampleDescriptionSlice';

interface Props {
  message: string;
  className: string;
  status: string | number;
  onUpload: (file: FormData, onComplete: () => void) => void;
}

const ManageDescription: React.FC<Props> = ({ className, status, message, onUpload }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DescriptionForm>({
    resolver: yupResolver(DescriptionSchema),
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

  const handleOnSubmit = (formData: DescriptionForm) => {
    const data = new FormData();
    data.append('type', formData.type);
    data.append('file', formData.file[0]);
    onUpload(data, handleOnComplete);
  };

  return (
    <React.Fragment>
      <div className={className}>
        {(errors.file || errors.type || status === 'failed') && (
          <div className='alert alert-danger'>
            <>{errors.file?.message || errors.type?.message || message}</>
          </div>
        )}
        {status === 'success' && <div className='alert alert-success'>Successfully Uploaded.</div>}
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label className='label'>
                  Type of Description <span className='required'>*</span>{' '}
                </label>
                <select {...register('type')} className='form-control custom-select'>
                  <option value=''>Select Type</option>
                  <option value='internship'>For Internship</option>
                  <option value='jobs'>Jobs</option>
                  <option value='competition'>Competition</option>
                  <option value='others'>Others</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='label'>Upload PDF</label>
                <div className='custom-file'>
                  <input
                    type='file'
                    id='impfile'
                    {...register('file')}
                    accept='application/pdf'
                    onChange={handleOnChange}
                    className='custom-file-input'
                  />
                  <label className='custom-file-label' htmlFor='impfile'>
                    {showLabel}
                  </label>
                  <span className='note mt-1'>File must be less than 5MB.</span>
                </div>
              </div>
            </div>
            <div className='col-md-12'>
              <button
                type='submit'
                name='submit'
                id='submit'
                className='btn btn-primary custom-btn'
              >
                {status === 'loading' && <span className='spinner-border' role='status'></span>}
                {status !== 'loading' && <span>Save</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ManageDescription;
