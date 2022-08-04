import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'app/hooks';
import {
  AddSpecialization,
  EditSpecialization,
  SpecializationForm,
  SpecializationSchema,
  Specialization,
} from './itemSlice';

interface Props {
  status: string | number;
  message: string;
  specialization?: Specialization;
  actionType: string;
  onComplete?: () => void;
}

const ManageItem: React.FC<Props> = ({
  status,
  message,
  actionType,
  specialization,
  onComplete,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpecializationForm>({
    defaultValues: useMemo(() => specialization, [specialization]),
    resolver: yupResolver(SpecializationSchema),
  });
  const dispatch = useAppDispatch();

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const submitForm = (formData: SpecializationForm) => {
    dispatch(
      actionType === 'add'
        ? AddSpecialization(formData, handleOnComplete)
        : EditSpecialization(specialization!, formData, handleOnComplete),
    );
  };

  return (
    <div className='grid bg-white box-shadow-light br-20'>
      {(errors.name || status === 'failed') && (
        <div className='alert alert-danger'>{errors.name?.message || message}</div>
      )}
      {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='row'>
          <div className='col-md-12 form-group'>
            <label className='label'>
              Specialization Name <span className='required'>*</span>{' '}
            </label>
            <input
              type='text'
              {...register('name')}
              className='form-control'
              placeholder='Enter Specialization Name..'
            />
          </div>
          <div className='col-md-12 form-group'>
            <label className='label'>
              Degree Name <span className='required'>*</span>{' '}
            </label>
            <input
              type='text'
              {...register('degree')}
              className='form-control'
              placeholder='Enter Degree Name..'
            />
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
