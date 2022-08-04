import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/hooks';
import { HIEQ_SERVICE_URL } from 'constant';
import {
  addSuccessStory,
  editSuccessStory,
  SuccessStoryForm,
  SuccessStorySchema,
  SuccessStory,
} from './successStorySlice';

interface Props {
  status: string | number;
  message: string;
  successStory?: SuccessStory;
  actionType: string;
  onComplete?: () => void;
}

const defaultLabel = {
  logoOne: 'Choose File...',
  logoTwo: 'Choose File...',
  featuredImage: 'Choose File...',
};

const ManageSuccessStory: React.FC<Props> = ({
  status,
  message,
  actionType,
  successStory,
  onComplete,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SuccessStoryForm>({
    defaultValues: useMemo(() => successStory, [successStory]),
    resolver: yupResolver(SuccessStorySchema),
  });
  const dispatch = useAppDispatch();
  const [showLabel, setShowLabel] = useState<Record<string, string>>(defaultLabel);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files, name },
    } = event;
    const file = files && files[0];
    setShowLabel({ ...showLabel, [name]: `Selected File : ${file?.name}` });
  };

  const handleRemoveImage = (story: SuccessStory) => {
    console.log(story);
  };

  const handleOnComplete = () => {
    reset();
    setShowLabel(defaultLabel);
    onComplete && onComplete();
  };

  const submitForm = (formData: SuccessStoryForm) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('quote', formData.quote);
    data.append('logoOne', formData.logoOne[0]);
    data.append('logoTwo', formData.logoTwo[0]);
    data.append('youtubeUrl', formData.youtubeUrl);
    data.append('linkedInUrl', formData.linkedInUrl);
    data.append('companyName', formData.companyName);
    data.append('collegeName', formData.collegeName);
    data.append('isActive', String(formData.isActive));
    data.append('featuredImage', formData.featuredImage[0]);
    dispatch(
      actionType === 'add'
        ? addSuccessStory(data, handleOnComplete)
        : editSuccessStory(successStory!, data, handleOnComplete),
    );
  };

  return (
    <div className='grid bg-white box-shadow-light br-20'>
      {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
      {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='row'>
          <div className='col-md-8'>
            <div className='form-group'>
              <label className='label'>
                Person Name <span className='required'>*</span>
              </label>
              <input type='text' className='form-control' {...register('name')} />
              {errors.name && <div className='text-danger error mt-1'>{errors.name?.message}</div>}
            </div>
            <div className='form-row'>
              <div className='form-group col-6'>
                <label className='label'>
                  Company Name <span className='required'>*</span>
                </label>
                <input type='text' className='form-control' {...register('companyName')} />
                {errors.companyName && (
                  <div className='text-danger error mt-1'>{errors.companyName?.message}</div>
                )}
              </div>
              <div className='form-group col-6'>
                <label className='label'>
                  College Name with Year <span className='required'>*</span>
                </label>
                <input type='text' className='form-control' {...register('collegeName')} />
                {errors.collegeName && (
                  <div className='text-danger error mt-1'>{errors.collegeName?.message}</div>
                )}
              </div>
            </div>
            <div className='form-group'>
              <label className='label'>
                Quote <span className='required'>*</span>
              </label>
              <textarea {...register('quote')} rows={6} className='form-control'></textarea>
              {errors.quote && (
                <div className='text-danger error mt-1'>{errors.quote?.message}</div>
              )}
            </div>
            <div className='form-row'>
              <div className='form-group col-6'>
                <label className='label'>
                  LinkedIn Url <span className='required'>*</span>
                </label>
                <input type='text' className='form-control' {...register('linkedInUrl')} />
                {errors.linkedInUrl && (
                  <div className='text-danger error mt-1'>{errors.linkedInUrl?.message}</div>
                )}
              </div>
              <div className='form-group col-6'>
                <label className='label'>
                  YouTube Url <span className='required'>*</span>
                </label>
                <input type='text' className='form-control' {...register('youtubeUrl')} />
                {errors.youtubeUrl && (
                  <div className='text-danger error mt-1'>{errors.youtubeUrl?.message}</div>
                )}
              </div>
              <div className='form-group col-6'>
                <label className='label'>
                  Company Logo 1 <span className='note'>(Size: W: 60px / H: 60px)</span>
                </label>
                <div className='custom-file'>
                  <input
                    type='file'
                    className='custom-file-input'
                    id='logoOne'
                    {...register('logoOne')}
                    accept='image/jpeg,image/png,image/gif,image/svg+xml'
                    onChange={handleOnChange}
                  />
                  <label className='custom-file-label' htmlFor='logoOne'>
                    {showLabel.logoOne}
                  </label>
                  <span className='note mt-1'>File must be less than 5MB.</span>
                </div>
                {errors.logoOne && (
                  <div className='text-danger error mt-1'>{errors.logoOne?.message}</div>
                )}
                {actionType === 'edit' && successStory?.logoOneName && (
                  <div className='b-1g p-3 position-relative'>
                    <button
                      type='button'
                      className='removebtn remove-absolute'
                      onClick={() => {
                        handleRemoveImage({ ...successStory, logoOneName: '' });
                      }}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} /> Remove
                    </button>
                    <img
                      className='img-fluid'
                      src={`${HIEQ_SERVICE_URL}/successStory/${successStory?.logoOneName}`}
                      width='300'
                      alt=''
                    />
                  </div>
                )}
              </div>
              <div className='form-group col-6'>
                <label className='label'>
                  Company Logo 2 <span className='note'>(Size: W: 60px / H: 60px)</span>
                </label>
                <div className='custom-file'>
                  <input
                    type='file'
                    className='custom-file-input'
                    id='logoTwo'
                    {...register('logoTwo')}
                    accept='image/jpeg,image/png,image/gif,image/svg+xml'
                    onChange={handleOnChange}
                  />
                  <label className='custom-file-label' htmlFor='logoTwo'>
                    {showLabel.logoTwo}
                  </label>
                  <span className='note mt-1'>File must be less than 5MB.</span>
                </div>
                {errors.logoTwo && (
                  <div className='text-danger error mt-1'>
                    <>{errors.logoTwo?.message}</>
                  </div>
                )}
                {actionType === 'edit' && successStory?.logoTwoName && (
                  <div className='b-1g p-3 position-relative'>
                    <button
                      type='button'
                      className='removebtn remove-absolute'
                      onClick={() => {
                        handleRemoveImage({ ...successStory, logoTwoName: '' });
                      }}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} /> Remove
                    </button>
                    <img
                      className='img-fluid'
                      src={`${HIEQ_SERVICE_URL}/successStory/${successStory?.logoTwoName}`}
                      width='300'
                      alt=''
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label className='label'>
                Featured Image {actionType === 'add' && <span className='required'>*</span>}
                <span className='note'>(Size: W: 200px / H: 200px)</span>
              </label>
              <div className='custom-file'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='featuredImage'
                  {...register('featuredImage')}
                  accept='image/jpeg,image/png,image/gif'
                  onChange={handleOnChange}
                />
                <label className='custom-file-label' htmlFor='featuredImage'>
                  {showLabel.featuredImage}
                </label>
                <span className='note mt-1'>File must be less than 5MB.</span>{' '}
              </div>
              {errors.featuredImage && (
                <div className='text-danger error mt-1'>
                  <>{errors.featuredImage?.message}</>
                </div>
              )}
              {actionType === 'edit' && successStory?.featuredImageName && (
                <div className='b-1g p-3 position-relative'>
                  <button
                    type='button'
                    className='removebtn remove-absolute'
                    onClick={() => {
                      handleRemoveImage({ ...successStory, featuredImageName: '' });
                    }}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} /> Remove
                  </button>
                  <img
                    className='img-fluid'
                    src={`${HIEQ_SERVICE_URL}/successStory/${successStory?.featuredImageName}`}
                    width='300'
                    alt=''
                  />
                </div>
              )}
            </div>
            <div className='form-group'>
              <label className='label'>Status</label>
              <select className='custom-select form-control' {...register('isActive')}>
                <option value='true'>Publish</option>
                <option value='false'>Draft</option>
              </select>
            </div>
          </div>
          <div className='col-md-12'>
            <button type='submit' name='submit' id='submit' className='btn btn-primary custom-btn'>
              {status === 'loading' && <span className='spinner-border' role='status'></span>}
              {status !== 'loading' && <span>Save</span>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageSuccessStory;
