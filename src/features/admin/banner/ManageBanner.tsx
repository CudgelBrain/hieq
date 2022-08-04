import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BannerForm, BannerSchema } from './bannerSlice';

interface Props {
  message: string;
  className: string;
  status: string | number;
  onUpload: (file: FormData, onComplete: () => void) => void;
}

const ManageBanner: React.FC<Props> = ({ className, status, message, onUpload }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BannerForm>({
    resolver: yupResolver(BannerSchema),
  });
  const [mobileLabel, setMobileLabel] = useState<string>('Choose File...');
  const [desktopLabel, setDesktopLabel] = useState<string>('Choose File...');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    fileType === 'desktopFile'
      ? setDesktopLabel(`Selected File : ${file?.name}`)
      : setMobileLabel(`Selected File : ${file?.name}`);
  };

  const handleOnComplete = () => {
    reset();
    setMobileLabel('Choose File...');
    setDesktopLabel('Choose File...');
  };

  const handleOnSubmit = (formData: BannerForm) => {
    const file = new FormData();
    file.append('mobileFile', formData.mobileFile[0]);
    file.append('desktopFile', formData.desktopFile[0]);
    onUpload(file, handleOnComplete);
  };

  return (
    <React.Fragment>
      <div className={className}>
        {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
        {status === 'success' && <div className='alert alert-success'>Successfully Uploaded.</div>}
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label className='label'>
                  Upload Image (Desktop)
                  <React.Fragment>
                    <span> - </span>
                    <span className='note'>W 1920 x H 600</span>
                  </React.Fragment>
                </label>
                <div className='custom-file'>
                  <input
                    type='file'
                    id='impfile'
                    {...register('desktopFile')}
                    accept='image/jpeg,image/png,image/gif'
                    onChange={(event) => handleOnChange(event, 'desktopFile')}
                    className='custom-file-input'
                  />
                  <label className='custom-file-label' htmlFor='impfile'>
                    {desktopLabel}
                  </label>
                  <div className={`mt-1 ${errors.desktopFile ? 'text-danger error' : 'note'}`}>
                    <>{errors.desktopFile?.message || 'File must be less than 5MB.'}</>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-12'>
              <div className='form-group'>
                <label className='label'>
                  Upload Image (Mobile)
                  <React.Fragment>
                    <span> - </span>
                    <span className='note'>W 1920 x H 600</span>
                  </React.Fragment>
                </label>
                <div className='custom-file'>
                  <input
                    type='file'
                    id='impfile'
                    {...register('mobileFile')}
                    accept='image/jpeg,image/png,image/gif'
                    onChange={(event) => handleOnChange(event, 'mobileFile')}
                    className='custom-file-input'
                  />
                  <label className='custom-file-label' htmlFor='impfile'>
                    {mobileLabel}
                  </label>
                  <div className={`mt-1 ${errors.mobileFile ? 'text-danger error' : 'note'}`}>
                    <>{errors.mobileFile?.message || 'File must be less than 5MB.'}</>
                  </div>
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

export default ManageBanner;
