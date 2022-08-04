import React, { useState } from 'react';
import { isEmpty, kebabCase } from 'lodash';
import Select, { SingleValue } from 'react-select';
import {
  Control,
  Controller,
  UseFormWatch,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { fileExtension } from 'utils';
import plusImg from 'assets/images/btn-plus.svg';
import minusImg from 'assets/images/btn-minus.svg';
import { EmployerProfileForm } from './profileSlice';
import { selectStyle, OptionType } from 'features/employer/common';

const docs: readonly OptionType[] = [
  { value: 'Certificate of Incorporation', label: 'Certificate of Incorporation' },
  { value: 'PAN Card', label: 'PAN Card' },
  { value: 'Cancelled Cheque', label: 'Cancelled Cheque' },
  { value: 'Other Authorized Document', label: 'Other Authorized Document' },
];

interface Props {
  errors: any;
  mode: string | null;
  watch: UseFormWatch<EmployerProfileForm>;
  setValue: UseFormSetValue<EmployerProfileForm>;
  register: UseFormRegister<EmployerProfileForm>;
  control: Control<EmployerProfileForm, Record<string, any>>;
}

const VerificationDocument: React.FC<Props> = ({
  control,
  register,
  errors,
  setValue,
  mode,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  });

  const documents = watch('documents');
  const [optionCount, setOptionCount] = useState<number>(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (index === 0) {
      append({ name: '', file: '' });
      setOptionCount(optionCount + 1);
    } else {
      remove(index);
      setOptionCount(optionCount - 1);
    }
  };

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setValue(`documents.${index}.toBeValidated`, true);
  };

  return (
    <>
      {fields.map((field, index) => {
        if (index < docs.length) {
          let fileLabel = 'Choose file...';
          const uploadedFile = documents && documents![index]?.file;
          if (!isEmpty(uploadedFile)) {
            if (uploadedFile[0]?.name) {
              const fileExtName = fileExtension(uploadedFile[0]?.type);
              const name = kebabCase(uploadedFile[0]?.name.split('.')[0]).substring(0, 50);
              fileLabel = `Selected File: ${name}...${fileExtName}`;
            } else {
              fileLabel = `Selected File: ${uploadedFile}`;
            }
          }
          return (
            <div className='form-group form-row mb-2' key={field.id}>
              <div className='col-3'>
                <Controller
                  control={control}
                  name={`documents.${index}.name`}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <Select
                        options={docs}
                        styles={selectStyle}
                        placeholder='Select type'
                        onChange={handleOnchange}
                        isDisabled={mode === 'view'}
                        components={{ IndicatorSeparator: () => null }}
                        value={docs.find((c) => c.value === value)}
                      />
                    );
                  }}
                />
                {errors.documents && errors.documents[index] && errors.documents[index].name && (
                  <div className='text-danger error mt-1'>
                    {errors.documents[index].name?.message}
                  </div>
                )}
              </div>
              <div className='col-4'>
                <div className='custom-file'>
                  <input
                    type='file'
                    id='inputGroupFile01'
                    disabled={mode === 'view'}
                    accept='application/pdf, image/jpeg'
                    aria-describedby='inputGroupFileAddon01'
                    className='custom-file-input form-control'
                    {...register(`documents.${index}.file` as const, {
                      onChange: (e) => handleOnChange(e, index),
                    })}
                  />
                  <label className='custom-file-label mb-0 form-control' htmlFor='inputGroupFile01'>
                    {fileLabel}
                  </label>
                  {errors.documents && errors.documents[index] && errors.documents[index].file && (
                    <div className='text-danger error mt-1'>
                      {errors.documents[index].file?.message}
                    </div>
                  )}
                </div>
              </div>
              <input type='hidden' {...register(`documents.${index}.toBeValidated` as const)} />
              <div className='col-1'>
                <button
                  type='button'
                  className='btn btn-plus-minus'
                  onClick={(event) => handleClick(event, index)}
                  disabled={mode === 'view' || (index === 0 && optionCount === docs.length)}
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

export default VerificationDocument;
