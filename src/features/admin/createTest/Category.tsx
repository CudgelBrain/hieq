import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CreateTestForm } from './CreateTestSlice';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  errors: any;
  nestIndex: number;
  control: Control<CreateTestForm, Record<string, any>>;
  register: UseFormRegister<CreateTestForm>;
}

const Category: React.FC<Props> = ({ control, register, errors, nestIndex }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `section.${nestIndex}.category` as const,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div className='col-md-12 form-group' key={field.id}>
          <div className='row m-1 p-2 bg-white'>
            <div className='col-md-4 form-group'>
              <label className='label'>
                Question&aposs Category <span className='required'>*</span>
              </label>
              <select
                className='form-control custom-select'
                {...register(`section.${nestIndex}.category.${index}.name` as const, {
                  required: true,
                })}
              >
                <option value=''>Select Question Category</option>
                <option value='b2b'>B2B</option>
                <option value='b2c'>B2C</option>
                <option value='marketing'>Marketing</option>
              </select>
              {errors.section && errors.section[nestIndex].category[index].name && (
                <div className='text-danger error mt-1'>
                  {errors.section[nestIndex].category[index].name?.message}
                </div>
              )}
            </div>
            <div className='col-md-4 form-group'>
              <label className='label'>
                Question&aposs Type <span className='required'>*</span>
              </label>
              <select
                className='form-control custom-select'
                {...register(`section.${nestIndex}.category.${index}.type` as const, {
                  required: true,
                })}
              >
                <option value=''>Select Question Type</option>
                <option value='single'>Single correct MCQ</option>
                <option value='multi'>Multi-correct MCQ</option>
                <option value='fitb'>Fill in the blank</option>
                <option value='numerical'>Numerical (Integral)</option>
                <option value='case'>Case</option>
              </select>
              {errors.section && errors.section[nestIndex].category[index].type && (
                <div className='text-danger error mt-1'>
                  {errors.section[nestIndex].category[index].type?.message}
                </div>
              )}
            </div>
            <div className='col-md-3 form-group'>
              <label className='label'>
                Questionaposs Level <span className='required'>*</span>
              </label>
              <input
                type='text'
                placeholder='Easy'
                className='form-control my-2'
                {...register(`section.${nestIndex}.category.${index}.easy` as const, {
                  required: true,
                })}
              />
              {errors.section && errors.section[nestIndex].category[index].easy && (
                <div className='text-danger error mt-1'>
                  {errors.section[nestIndex].category[index].easy?.message}
                </div>
              )}
              <input
                type='text'
                placeholder='Medium'
                className='form-control my-2'
                {...register(`section.${nestIndex}.category.${index}.medium` as const, {
                  required: true,
                })}
              />
              {errors.section && errors.section[nestIndex].category[index].medium && (
                <div className='text-danger error mt-1'>
                  {errors.section[nestIndex].category[index].medium?.message}
                </div>
              )}
              <input
                type='text'
                placeholder='Tough'
                className='form-control my-2'
                {...register(`section.${nestIndex}.category.${index}.tough` as const, {
                  required: true,
                })}
              />
              {errors.section && errors.section[nestIndex].category[index].tough && (
                <div className='text-danger error mt-1'>
                  {errors.section[nestIndex].category[index].tough?.message}
                </div>
              )}
            </div>
            <div className='col-md-1 justify-content-end align-items-start'>
              <button type='button' className='btn btn-danger' onClick={() => remove(index)}>
                <FontAwesomeIcon icon={faTrash as IconProp} />
              </button>
            </div>
          </div>
        </div>
      ))}
      ;
      <hr />
      <div className='d-flex align-center justify-content-center'>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={() => append({ name: '', type: '', easy: '', medium: '', tough: '' })}
        >
          <FontAwesomeIcon icon={faPlusCircle as IconProp} />
          Add Category
        </button>
      </div>
    </div>
  );
};

export default Category;
