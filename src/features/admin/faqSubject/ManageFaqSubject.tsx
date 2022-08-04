import React, { useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'app/hooks';
import faPlus from 'assets/images/plus.svg';
import faMinus from 'assets/images/minus.svg';
import {
  addFaqSubject,
  editFaqSubject,
  FaqSubjectForm,
  FaqSubjectSchema,
  FaqSubject,
} from './faqSubjectSlice';

interface Props {
  status: string | number;
  message: string;
  subject?: FaqSubject | FaqSubjectForm;
  actionType: string;
  onComplete?: () => void;
}

const ManageCollege: React.FC<Props> = ({ status, message, actionType, subject, onComplete }) => {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqSubjectForm>({
    defaultValues: useMemo(() => subject, [subject]),
    resolver: yupResolver(FaqSubjectSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'topics',
  });
  const dispatch = useAppDispatch();

  const handleOnComplete = () => {
    reset();
    onComplete && onComplete();
  };

  const submitForm = (formData: FaqSubjectForm) => {
    dispatch(
      actionType === 'add'
        ? addFaqSubject(formData, handleOnComplete)
        : editFaqSubject(subject! as FaqSubject, formData, handleOnComplete),
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
          <div className={actionType === 'edit' ? 'col-12 form-group' : 'col-6 form-group'}>
            <label className='label'>
              Subject Name <span className='required'>*</span>
            </label>
            <input
              type='text'
              {...register('name')}
              className='form-control'
              placeholder='Enter Subject Name..'
            />
          </div>
          <div className='col-md-12'>
            <label className='label'>
              Topic Name <span className='required'>*</span>
            </label>
            <div className='row'>
              {fields.map((field, index) => {
                return (
                  <div className='col-md-12 form-row align-items-center form-group' key={field.id}>
                    <div className={actionType === 'edit' ? 'col-11' : 'col-6'}>
                      <input
                        type='text'
                        {...register(`topics.${index}.name` as const, { required: true })}
                        className='form-control'
                        placeholder='Enter Topic Name..'
                      />
                    </div>
                    <div className='col-1'>
                      <button
                        type='button'
                        className='imgBtn'
                        onClick={() =>
                          index === 0
                            ? append({
                                name: '',
                              })
                            : remove(index)
                        }
                      >
                        <img src={index === 0 ? faPlus : faMinus} height='30' alt='' />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={actionType === 'edit' ? 'col-6 form-group' : 'col-4 form-group'}>
            <label className='label'>
              Status <span className='required'>*</span>
            </label>
            <select {...register('isActive')} className='form-control custom-select'>
              <option value=''>Select status</option>
              <option value='true'>Publish</option>
              <option value='false'>Draft</option>
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

export default ManageCollege;
