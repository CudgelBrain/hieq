import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Section from './Section';
import { ListDomains } from 'features/admin/domain/itemSlice';
import { isEmpty } from 'lodash';
import {
  CreateTestSchema,
  CreateTest,
  CreateTestForm,
  addTestType,
  editTestType,
} from './CreateTestSlice';

interface Props {
  message: string;
  actionType: string;
  onComplete?: () => void;
  status: string | number;
  underAction?: CreateTest | CreateTestForm;
}

const ManageCompanyLogo: React.FC<Props> = ({
  status,
  message,
  actionType,
  onComplete,
  underAction,
}) => {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTestForm>({
    defaultValues: useMemo(() => underAction, [underAction]),
    resolver: yupResolver(CreateTestSchema),
  });
  const dispatch = useAppDispatch();
  const [module, setModule] = useState<string>('');
  const { domains } = useAppSelector((state: RootState) => state.domain);

  useEffect(() => {
    dispatch(ListDomains());
  }, [dispatch]);

  useEffect(() => {
    if (actionType === 'edit' && underAction && underAction.moduleType === 'functional') {
      if (!isEmpty(domains)) {
        setModule('functional');
        setTimeout(() => reset(underAction), 1200);
      }
    }
  }, [reset, domains, underAction, actionType]);

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const submitForm = (formData: CreateTestForm) => {
    dispatch(
      actionType === 'add'
        ? addTestType(formData, handleOnComplete)
        : editTestType(underAction! as CreateTest, formData, handleOnComplete),
    );
  };

  return (
    <div className='grid bg-white box-shadow-light br-20'>
      {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
      {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='row'>
          <div className={module === 'functional' ? 'col-md-6 form-group' : 'col-md-12 form-group'}>
            <label className='label'>
              Module Type <span className='required'>*</span>
            </label>
            <select
              {...register('moduleType')}
              className='form-control custom-select'
              onChange={(event) => {
                setModule(event.target.value);
              }}
            >
              <option value=''>Select Module Type</option>
              <option value='cognitive'>Cognitive</option>
              <option value='behavioural'>Behavioural</option>
              <option value='functional'>Functional</option>
            </select>
            {errors.moduleType && (
              <div className='text-danger error mt-1'>{errors.moduleType?.message}</div>
            )}
          </div>
          {module === 'functional' && (
            <div className='col-md-6 form-group'>
              <label className='label'>
                Functional Type <span className='required'>*</span>
              </label>
              <select {...register('functionalType')} className='form-control custom-select'>
                <option value=''>Select Functional Type</option>
                {Object.values(domains).map((domain) => (
                  <option value={domain.name} key={Math.random()}>
                    {domain.name}
                  </option>
                ))}
              </select>
              {errors.functionalType && (
                <div className='text-danger error mt-1'>{errors.functionalType?.message}</div>
              )}
            </div>
          )}
          <Section {...{ control, register, errors }} />
          <div className='col-md-6 form-group'>
            <label className='label'>
              Status <span className='required'>*</span>
            </label>
            <select {...register('isActive')} className='form-control custom-select'>
              <option value='true'>Publish</option>
              <option value='false'>Draft</option>
            </select>
            <div className='text-danger error mt-1 d-none'>Required Field.</div>
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
