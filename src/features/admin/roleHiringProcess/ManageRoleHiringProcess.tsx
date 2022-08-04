import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'app/hooks';
import {
  addRoleHiringProcess,
  editRoleHiringProcess,
  RoleHiringProcessForm,
  RoleHiringProcessSchema,
  RoleHiringProcess,
} from './roleHiringProcessSlice';

interface Props {
  status: string | number;
  message: string;
  roleHiringProcess?: RoleHiringProcess;
  actionType: string;
  onComplete?: () => void;
}

const ManageRoleHiringProcess: React.FC<Props> = ({
  status,
  message,
  actionType,
  roleHiringProcess,
  onComplete,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleHiringProcessForm>({
    defaultValues: useMemo(() => roleHiringProcess, [roleHiringProcess]),
    resolver: yupResolver(RoleHiringProcessSchema),
  });
  const dispatch = useAppDispatch();

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const submitForm = (formData: RoleHiringProcessForm) => {
    dispatch(
      actionType === 'add'
        ? addRoleHiringProcess(formData, handleOnComplete)
        : editRoleHiringProcess(roleHiringProcess!, formData, handleOnComplete),
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
              Role in the Hiring Process Name <span className='required'>*</span>{' '}
            </label>
            <input
              type='text'
              {...register('name')}
              className='form-control'
              placeholder='Enter Role in the Hiring Process Name..'
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

export default ManageRoleHiringProcess;
