import React, { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  addQuestionCategory,
  editQuestionCategory,
  QuestionCategoryForm,
  QuestionCategorySchema,
  QuestionCategory,
} from './questionCategorySlice';
import { ListDomains } from 'features/admin/domain/itemSlice';

interface Props {
  status: string | number;
  message: string;
  questionCategory?: QuestionCategory;
  actionType: string;
  onComplete: () => void;
}

const ManageCompanyLogo: React.FC<Props> = ({
  status,
  message,
  actionType,
  questionCategory,
  onComplete,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionCategoryForm>({
    defaultValues: useMemo(() => questionCategory, [questionCategory]),
    resolver: yupResolver(QuestionCategorySchema),
  });
  const dispatch = useAppDispatch();
  const [module, setModule] = useState<string>('');
  const { domains } = useAppSelector((state: RootState) => state.domain);

  useEffect(() => {
    dispatch(ListDomains());
  }, [dispatch]);

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const submitForm = (formData: QuestionCategoryForm) => {
    dispatch(
      actionType === 'add'
        ? addQuestionCategory(formData, handleOnComplete)
        : editQuestionCategory(questionCategory!, formData, handleOnComplete),
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
            <div className='col-md-12 form-group'>
              <label className='label'>
                Functional Type <span className='required'>*</span>
              </label>
              <select {...register('functionalType')} className='form-control custom-select'>
                <option value=''>Select Functional Type</option>
                {domains &&
                  Object.values(domains).map((domain, index) => (
                    <option value={domain.name} key={index}>
                      {domain.name}
                    </option>
                  ))}
              </select>
              {errors.functionalType && (
                <div className='text-danger error mt-1'>{errors.functionalType?.message}</div>
              )}
            </div>
          )}
          <div className='col-md-12 form-group'>
            <label className='label'>
              Category Name <span className='required'>*</span>
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
