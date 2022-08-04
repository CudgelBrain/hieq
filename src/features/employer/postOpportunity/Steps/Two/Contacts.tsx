import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import plusImg from 'assets/images/btn-plus.svg';
import minusImg from 'assets/images/btn-minus.svg';
import { OpportunityStepTwo } from '../../postOpportunitySlice';

interface Props {
  errors: any;
  control: Control<OpportunityStepTwo, Record<string, any>>;
  register: UseFormRegister<OpportunityStepTwo>;
}

const Contacts: React.FC<Props> = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts',
  });

  const [optionCount, setOptionCount] = React.useState<number>(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (index === 0) {
      append({ name: '', email: '', number: '' });
      setOptionCount(optionCount + 1);
    } else {
      remove(index);
      setOptionCount(optionCount - 1);
    }
  };

  return (
    <div className='form-group col-sm-12'>
      <label className='label fw-600 mb-2 w-100'>
        Contact Information <span className='note fw-400'>(Max. 3 allowed)</span>
      </label>
      {fields.map((field, index) => {
        if (optionCount <= 3) {
          return (
            <div className='form-group form-row mb-2' key={field.id}>
              <div className='col-3'>
                <label className='label'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Name'
                  {...register(`contacts.${index}.name` as const)}
                />
                {errors.contacts && errors.contacts[index] && errors.contacts[index].name && (
                  <div className='text-danger error mt-1'>
                    {errors.contacts[index].name?.message}
                  </div>
                )}
              </div>
              <div className='col-3'>
                <label className='label'>Email Address</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Email Address'
                  {...register(`contacts.${index}.email` as const)}
                />
                {errors.contacts && errors.contacts[index] && errors.contacts[index].email && (
                  <div className='text-danger error mt-1'>
                    {errors.contacts[index].email?.message}
                  </div>
                )}
              </div>
              <div className='col-3'>
                <label className='label'>Contact Number</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Contact Number'
                  {...register(`contacts.${index}.number` as const)}
                />
                {errors.contacts && errors.contacts[index] && errors.contacts[index].number && (
                  <div className='text-danger error mt-1'>
                    {errors.contacts[index].number?.message}
                  </div>
                )}
              </div>
              <div className='col-1'>
                <label className='label'>&nbsp;</label>
                <button
                  type='submit'
                  className='btn btn-plus-minus'
                  onClick={(event) => handleClick(event, index)}
                  disabled={index === 0 && optionCount === 3}
                >
                  <img src={index === 0 ? plusImg : minusImg} height='38' alt='' />
                </button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Contacts;
