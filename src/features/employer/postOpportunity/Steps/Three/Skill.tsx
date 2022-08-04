import React from 'react';
import Select, { SingleValue } from 'react-select';
import { Control, Controller, useFieldArray, UseFormRegister } from 'react-hook-form';
import plusImg from 'assets/images/btn-plus.svg';
import minusImg from 'assets/images/btn-minus.svg';
import { OptionType, selectStyle } from 'features/employer/common';
import { OpportunityStepThree } from '../../postOpportunitySlice';

const levels = [
  { value: 'Expert', label: 'Expert' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Beginner', label: 'Beginner' },
];

interface Props {
  errors: any;
  control: Control<OpportunityStepThree, Record<string, any>>;
  register: UseFormRegister<OpportunityStepThree>;
}

const Skill: React.FC<Props> = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const [optionCount, setOptionCount] = React.useState<number>(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (index === 0) {
      append({ name: '', proficiencyLevel: '' });
      setOptionCount(optionCount + 1);
    } else {
      remove(index);
      setOptionCount(optionCount - 1);
    }
  };

  return (
    <div className='form-group col-sm-12'>
      <label className='label fw-600 mb-2 w-100'>
        Skills <span className='note fw-400'>(upto 4 allowed)</span>
      </label>
      {fields.map((field, index) => {
        if (optionCount <= 4) {
          return (
            <div className='form-group form-row mb-2' key={field.id}>
              <div className='col-3'>
                <label className='label'>Skills Name</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Name'
                  {...register(`skills.${index}.name` as const)}
                />
                {errors.skills && errors.skills[index] && errors.skills[index].name && (
                  <div className='text-danger error mt-1'>{errors.skills[index].name?.message}</div>
                )}
              </div>
              <div className='col-3'>
                <label className='label'>Proficiency Level</label>
                <Controller
                  control={control}
                  name={`skills.${index}.proficiencyLevel`}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <Select
                        name={name}
                        isSearchable
                        options={levels}
                        styles={selectStyle}
                        onChange={handleOnchange}
                        placeholder='Select Proficiency Level'
                        components={{ IndicatorSeparator: () => null }}
                        value={levels.find((c) => c.value === value)}
                      />
                    );
                  }}
                />
                {errors.skills && errors.skills[index] && errors.skills[index].proficiencyLevel && (
                  <div className='text-danger error mt-1'>
                    {errors.skills[index].proficiencyLevel?.message}
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

export default Skill;
