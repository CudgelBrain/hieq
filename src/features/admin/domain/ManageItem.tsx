/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/hooks';
import { HIEQ_SERVICE_URL } from 'constant';
import {
  RemoveDomainLogo,
  AddDomain,
  EditDomain,
  MultipleDomainForm,
  MultipleDomainSchema,
  MultipleDomain,
} from './itemSlice';

interface Props {
  status: string | number;
  message: string;
  multipleDomain?: MultipleDomain;
  actionType: string;
  onComplete?: () => void;
}

const ManageCompanyLogo: React.FC<Props> = ({
  status,
  message,
  actionType,
  multipleDomain,
  onComplete,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MultipleDomainForm>({
    defaultValues: useMemo(() => multipleDomain, [multipleDomain]),
    resolver: yupResolver(MultipleDomainSchema),
  });
  const dispatch = useAppDispatch();
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
    onComplete && onComplete();
  };

  const submitForm = (formData: MultipleDomainForm) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('file', formData.file[0]);
    dispatch(
      actionType === 'add'
        ? AddDomain(data, handleOnComplete)
        : EditDomain(multipleDomain!, data, handleOnComplete),
    );
  };

  return (
    <div className='grid bg-white box-shadow-light br-20'>
      {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
      {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='row'>
          <div className='col-md-12 form-group'>
            <label className='label'>
              Domain Name <span className='required'>*</span>
            </label>
            <input
              type='text'
              {...register('name')}
              className='form-control'
              placeholder='Enter Company Name..'
            />
            {errors.name && <div className='text-danger error mt-1'>{errors.name?.message}</div>}
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <div className='form-row'>
                <div className='col-md-8'>
                  <label className='label'>
                    Domain Logo {actionType === 'add' && <span className='required'>*</span>}
                    <React.Fragment>
                      <span> - </span>
                      <span className='note'>W 100 x H 100</span>
                    </React.Fragment>
                  </label>
                  <div className='custom-file'>
                    <input
                      type='file'
                      id='impfile'
                      {...register('file')}
                      accept='image/jpeg,image/png,image/gif,image/svg+xml'
                      onChange={handleOnChange}
                      className='custom-file-input'
                    />
                    <label className='custom-file-label' htmlFor='impfile'>
                      {showLabel}
                    </label>
                    <span className='note mt-1'>File must be less than 5MB.</span>
                  </div>
                </div>
                {errors.file && (
                  <div className='text-danger error mt-1'>{errors.file?.message}</div>
                )}
                {actionType === 'edit' && multipleDomain?.fileName && (
                  <div className='col-md-4'>
                    <div className='b-1g p-1 position-relative'>
                      <button
                        type='button'
                        className='removebtn remove-absolute'
                        onClick={() => {
                          dispatch(RemoveDomainLogo(multipleDomain!));
                        }}
                      >
                        <FontAwesomeIcon icon={faTimesCircle} /> Remove
                      </button>
                      <img
                        className='img-fluid'
                        src={`${HIEQ_SERVICE_URL}/multipleDomain/${multipleDomain?.fileName}`}
                        width='300'
                        alt=''
                      />
                    </div>
                  </div>
                )}
              </div>
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

export default ManageCompanyLogo;
