import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddCollege, EditCollege, CollegeForm, CollegeSchema, College } from './itemSlice';
import { ListInstituteGroups } from '../instituteGroup/itemSlice';

interface Props {
  status: string | number;
  message: string;
  college?: College;
  actionType: string;
  onComplete?: () => void;
}

const ManageItem: React.FC<Props> = ({ status, message, actionType, college, onComplete }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollegeForm>({
    resolver: yupResolver(CollegeSchema),
  });
  const dispatch = useAppDispatch();
  const { instituteGroups } = useAppSelector((state: RootState) => state.instituteGroup);

  useEffect(() => {
    dispatch(ListInstituteGroups());
  }, [dispatch]);

  useEffect(() => {
    if (actionType === 'edit') {
      if (!isEmpty(instituteGroups)) {
        setTimeout(() => reset(college), 600);
      }
    }
  }, [reset, actionType, instituteGroups, college]);

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const submitForm = (formData: CollegeForm) => {
    dispatch(
      actionType === 'add'
        ? AddCollege(formData, handleOnComplete)
        : EditCollege(college!, formData, handleOnComplete),
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
              College Name <span className='required'>*</span>
            </label>
            <input
              type='text'
              {...register('name')}
              className='form-control'
              placeholder='Enter College Name..'
            />
          </div>
          <div className='col-md-12 form-group'>
            <label className='label'>Group Name</label>
            <select {...register('group')} className='form-control custom-select'>
              <option value=''>Select Group</option>
              {Object.values(instituteGroups).map((group, key) => (
                <option key={key} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
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
