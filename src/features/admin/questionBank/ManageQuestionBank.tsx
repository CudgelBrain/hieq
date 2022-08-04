import React, { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Question from './Question';
import { ListDomains } from 'features/admin/domain/itemSlice';
import { listQuestionCategories } from 'features/admin/questionCategory/questionCategorySlice';
import {
  QuestionBankForm,
  QuestionBankSchema,
  QuestionBank,
  addQuestion,
  editQuestion,
} from './questionBankSlice';
import { isEmpty } from 'lodash';

interface Props {
  message: string;
  actionType: string;
  onComplete?: () => void;
  status: string | number;
  underAction?: QuestionBankForm | QuestionBank;
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
  } = useForm<QuestionBankForm>({
    defaultValues: useMemo(() => underAction, [underAction]),
    resolver: yupResolver(QuestionBankSchema),
  });
  const dispatch = useAppDispatch();
  const [module, setModule] = useState<string>('');
  const [questionType, setQuestionType] = useState<string>('');
  const { domains } = useAppSelector((state: RootState) => state.domain);
  const { categories } = useAppSelector((state: RootState) => state.questionCategory);

  useEffect(() => {
    dispatch(ListDomains());
    dispatch(listQuestionCategories());
  }, [dispatch]);

  useEffect(() => setQuestionType(underAction?.type ?? ''), [underAction?.type]);

  useEffect(() => {
    if (actionType === 'edit' && underAction && underAction.moduleType === 'functional') {
      if (!isEmpty(domains)) {
        setModule(underAction?.moduleType ?? '');
        setTimeout(() => reset(underAction), 1200);
      }
    }
  }, [reset, domains, underAction, actionType]);

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const submitForm = (formData: any) => {
    dispatch(
      actionType === 'add'
        ? addQuestion(formData, handleOnComplete)
        : editQuestion(underAction! as QuestionBank, formData, handleOnComplete),
    );
  };

  return (
    <div className='grid bg-white box-shadow-light br-20'>
      {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
      {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='row'>
          <div className='col-md-12'>
            <div className='form-row'>
              <div className={module === 'functional' ? 'col-6 form-group' : 'col-12 form-group'}>
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
                <div className='col-6 form-group'>
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
            </div>
            <div className='form-row'>
              <div className='col-md-4 col-6 form-group'>
                <label className='label'>
                  Question&aposs Category<span className='required'>*</span>
                </label>
                <select {...register('category')} className='form-control custom-select'>
                  <option value=''>Select Question Category</option>
                  {Object.values(categories).map((category) => (
                    <option value={category.name} key={Math.random()}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className='text-danger error mt-1'>{errors.category?.message}</div>
                )}
              </div>
              <div className='col-md-4 col-6 form-group'>
                <label className='label'>
                  Questionaposs Level <span className='required'>*</span>
                </label>
                <select {...register('level')} className='form-control custom-select'>
                  <option value=''>Select Question Level</option>
                  <option value='easy'>Easy</option>
                  <option value='medium'>Medium</option>
                  <option value='tough'>Tough</option>
                </select>
                {errors.level && (
                  <div className='text-danger error mt-1'>{errors.level?.message}</div>
                )}
              </div>
              <div className='col-md-4 col-6 form-group'>
                <label className='label'>
                  Questionaposs Type <span className='required'>*</span>
                </label>
                <select
                  {...register('type')}
                  className='form-control custom-select'
                  onChange={(event) => {
                    setQuestionType(event.target.value);
                  }}
                >
                  <option value=''>Select Question Type</option>
                  <option value='single'>Single correct MCQ</option>
                  <option value='multi'>Multi-correct MCQ</option>
                  <option value='fitb'>Fill in the blanks</option>
                  <option value='numerical'>Numerical (Integral)</option>
                  <option value='case'>Case</option>
                </select>
                {errors.type && (
                  <div className='text-danger error mt-1'>{errors.type?.message}</div>
                )}
              </div>
            </div>
            <div className='form-row bt-1 pt-4 mt-3'>
              <div className='form-group col-md-3 col-6'>
                <label className='label'>
                  Questionapoaposs Time <span className='required'>*</span>{' '}
                  <span className='note'>(in minutes)</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  {...register('time')}
                  placeholder='Enter Time'
                />
                {errors.time && (
                  <div className='text-danger error mt-1'>{errors.time?.message}</div>
                )}
              </div>
              <div className='form-group col-md-9'>
                <label className='label'>
                  Questionaposs Marking <span className='required'>*</span>
                </label>
                <div className='form-row'>
                  <div className='col-4'>
                    <input
                      type='text'
                      className='form-control'
                      {...register('absoluteMarking')}
                      placeholder='Absolute Marking'
                    />
                    {errors.absoluteMarking && (
                      <div className='text-danger error mt-1'>
                        {errors.absoluteMarking?.message}
                      </div>
                    )}
                  </div>
                  <div className='col-4'>
                    <input
                      type='text'
                      className='form-control'
                      {...register('partialMarking')}
                      placeholder='Partial Marking'
                    />
                    {errors.partialMarking && (
                      <div className='text-danger error mt-1'>{errors.partialMarking?.message}</div>
                    )}
                  </div>
                  <div className='col-4'>
                    <input
                      type='text'
                      className='form-control'
                      {...register('negativeMarking')}
                      placeholder='Negative Marking'
                    />
                    {errors.negativeMarking && (
                      <div className='text-danger error mt-1'>
                        {errors.negativeMarking?.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='form-group'>
              <label className='label'>
                Questionaposs Instructions <span className='required'>*</span>
              </label>
              <textarea className='form-control' {...register('instruction')} />
              {errors.instruction && (
                <div className='text-danger error mt-1'>{errors.instruction?.message}</div>
              )}
            </div>
            <Question {...{ control, register, errors, underAction, questionType }} />
            <div className='form-row'>
              <label className='label'>
                Status <span className='required'>*</span>
              </label>
              <select {...register('isActive')} className='form-control custom-select'>
                <option value=''>Select status</option>
                <option value='true'>Publish</option>
                <option value='false'>Draft</option>
              </select>
              {errors.isActive && (
                <div className='text-danger error mt-1'>{errors.isActive?.message}</div>
              )}
            </div>
          </div>
          <div className='col-md-12 mt-3'>
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
