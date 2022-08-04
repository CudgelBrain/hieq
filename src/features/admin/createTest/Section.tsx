import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import NestedArray from './Category';
import { CreateTestForm, DefaultFormValue } from './CreateTestSlice';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  errors: any;
  control: Control<CreateTestForm, Record<string, any>>;
  register: UseFormRegister<CreateTestForm>;
}

const Section: React.FC<Props> = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'section',
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div className='col-md-12 form-group' key={field.id}>
            <div className='row m-1 p-2' style={{ background: '#dcdcdc' }}>
              <div className='col-md-5 form-group'>
                <label className='label'>
                  Section Name <span className='required'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Section Name..'
                  {...register(`section.${index}.name` as const, { required: true })}
                />
                {errors.section && errors.section[index].name && (
                  <div className='text-danger error mt-1'>
                    {errors.section[index].name?.message}
                  </div>
                )}
              </div>
              <div className='col-md-5 form-group'>
                <label className='label'>
                  Time <span className='required'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Time..'
                  {...register(`section.${index}.time` as const, { required: true })}
                />
                {errors.section && errors.section[index].time && (
                  <div className='text-danger error mt-1'>
                    {errors.section[index].time?.message}
                  </div>
                )}
              </div>
              <div className='col-md-2 d-flex justify-content-end align-items-start'>
                <button type='button' className='btn btn-danger' onClick={() => remove(index)}>
                  <FontAwesomeIcon icon={faTrash as IconProp} />
                </button>
              </div>
              <NestedArray nestIndex={index} {...{ control, register, errors }} />
            </div>
          </div>
        );
      })}
      <div className='col-md-12 d-flex align-center justify-content-center'>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={() => {
            append(DefaultFormValue.section);
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle as IconProp} />
          Add Section
        </button>
      </div>
    </>
  );
};

export default Section;
