import React from 'react';
import { capitalize } from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// imported from project
import { useAppDispatch } from 'app/hooks';
import { JobTitleForm, JobTitleSchema, JobTitle, AddJobTitle, EditJobTitle } from './itemSlice';

interface Props {
  status: string | number;
  message: string;
  jobTitle?: JobTitle;
  actionType: string;
  onComplete?: () => void;
}

const ManageItem: React.FC<Props> = ({ status, message, jobTitle, actionType, onComplete }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobTitleForm>({
    resolver: yupResolver(JobTitleSchema),
    defaultValues: React.useMemo(() => jobTitle, [jobTitle]),
  });
  const dispatch = useAppDispatch();

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const handleOnSubmit = (formData: JobTitleForm) => {
    dispatch(
      actionType === 'add'
        ? AddJobTitle(formData, handleOnComplete)
        : EditJobTitle(jobTitle!, formData, handleOnComplete),
    );
  };

  return (
    <div className='grid bg-white box-shadow-light br-20'>
      {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
      {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='row'>
          <div className='col-md-12 form-group'>
            <label className='label'>
              Job Title <span className='required'>*</span>
            </label>
            <input
              type='text'
              {...register('title')}
              className='form-control'
              placeholder='Enter title..'
            />
            {errors.title && (
              <div className='text-danger error mt-1'>{capitalize(errors.title?.message)}</div>
            )}
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

export default ManageItem;
