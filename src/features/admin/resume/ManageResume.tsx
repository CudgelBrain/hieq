import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResumeForm, ResumeSchema } from './resumeSlice';

interface Props {
  message: string;
  className: string;
  status: string | number;
  onUpload: (file: FormData, onComplete: () => void) => void;
}

const ManageResume: React.FC<Props> = ({ className, status, message, onUpload }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeForm>({
    resolver: yupResolver(ResumeSchema),
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

  const handleOnSubmit = (formData: ResumeForm) => {
    const file = new FormData();
    file.append('file', formData.file[0]);
    onUpload(file, handleOnComplete);
  };

  return (
    <React.Fragment>
      <div className={className}>
        {(errors.file || status === 'failed') && (
          <div className='alert alert-danger'>{errors.file?.message || message}</div>
        )}
        {status === 'success' && <div className='alert alert-success'>Successfully Uploaded.</div>}
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='row'>
            <div className='col-md-12'>
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

export default ManageResume;
