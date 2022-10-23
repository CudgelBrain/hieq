import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { Control, useFieldArray, UseFormRegister, Controller } from 'react-hook-form';
import { EmployerProfileForm } from './profileSlice';
import plusImg from 'assets/images/btn-plus.svg';
import minusImg from 'assets/images/btn-minus.svg';
import { selectStyle, OptionType } from 'features/employer/common';

const links: readonly OptionType[] = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Github', label: 'Github' },
];

interface Props {
  errors: any;
  mode: string | null;
  control: Control<EmployerProfileForm, Record<string, any>>;
  register: UseFormRegister<EmployerProfileForm>;
}

const SocialMedia: React.FC<Props> = ({ control, register, errors, mode }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socials',
  });

  const [optionCount, setOptionCount] = useState<number>(1);
  const [usedMedia, setUsedMedia] = useState<string[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (index === 0) {
      append({ name: '', url: '' });
      setOptionCount(optionCount + 1);
    } else {
      remove(index);
      setOptionCount(optionCount - 1);
    }
  };

  return (
    <>
      {fields.map((field, index) => {
        if (index < links.length) {
          return (
            <div className='form-group form-row mb-2' key={field.id}>
              <div className='col-2'>
                <Controller
                  control={control}
                  name={`socials.${index}.name`}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) => {
                      if (option && option.value) {
                        setUsedMedia([...usedMedia, option.value + ""])
                      }
                      return onChange(option?.value);
                    }
                    return (
                      <Select
                        name={name}
                        isDisabled={mode === 'view'}
                        options={links.filter((li) => !usedMedia.includes(`${li.value}`))}
                        styles={selectStyle}
                        onChange={handleOnchange}
                        placeholder='Select type'
                        components={{ IndicatorSeparator: () => null }}
                        value={links.find((c) => c.value === value)}
                      />
                    );
                  }
                  }
                />
                {errors.socials && errors.socials[index] && errors.socials[index].name && (
                  <div className='text-danger error mt-1'>
                    {errors.socials[index].name?.message}
                  </div>
                )}
              </div>
              <div className='col-5'>
                <input
                  type='text'
                  disabled={mode === 'view'}
                  {...register(`socials.${index}.url` as const, { required: true })}
                  className='form-control'
                  placeholder='Enter or Paste link here'
                />
                {errors.socials && errors.socials[index] && errors.socials[index].url && (
                  <div className='text-danger error mt-1'>{errors.socials[index].url?.message}</div>
                )}
              </div>
              <div className='col-1'>
                <button
                  type='button'
                  className='btn btn-plus-minus'
                  onClick={(event) => handleClick(event, index)}
                  disabled={mode === 'view' || (index === 0 && optionCount === links.length)}
                >
                  <img src={index === 0 ? plusImg : minusImg} height='38' alt='' />
                </button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default SocialMedia;
