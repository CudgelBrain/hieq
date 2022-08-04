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

const ExternalLinks: React.FC<Props> = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'externalLinks',
  });

  const [optionCount, setOptionCount] = React.useState<number>(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (index === 0) {
      append({ title: '', url: '' });
      setOptionCount(optionCount + 1);
    } else {
      remove(index);
      setOptionCount(optionCount - 1);
    }
  };

  return (
    <div className='form-group col-sm-12'>
      <label className='label fw-600 mb-2 w-100'>
        External Links <span className='note fw-400'>(upto 3 allowed)</span>
      </label>
      {fields.map((field, index) => {
        if (optionCount <= 3) {
          return (
            <div className='form-group form-row mb-2' key={field.id}>
              <div className='col-4'>
                <label className='label'>Link Title</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Title'
                  {...register(`externalLinks.${index}.title` as const)}
                />
                {errors.externalLinks &&
                  errors.externalLinks[index] &&
                  errors.externalLinks[index].title && (
                    <div className='text-danger error mt-1'>
                      {errors.externalLinks[index].title?.message}
                    </div>
                  )}
              </div>
              <div className='col-5'>
                <label className='label'>
                  Link URL <span className='note fw-400'>(with https or http)</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='URL'
                  {...register(`externalLinks.${index}.url` as const)}
                />
                {errors.externalLinks &&
                  errors.externalLinks[index] &&
                  errors.externalLinks[index].url && (
                    <div className='text-danger error mt-1'>
                      {errors.externalLinks[index].url?.message}
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

export default ExternalLinks;
