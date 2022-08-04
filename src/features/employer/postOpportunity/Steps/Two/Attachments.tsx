import React from 'react';
import { isEmpty, kebabCase } from 'lodash';
import {
  Control,
  UseFormWatch,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { fileExtension } from 'utils';
import plusImg from 'assets/images/btn-plus.svg';
import minusImg from 'assets/images/btn-minus.svg';
import { OpportunityStepTwo } from '../../postOpportunitySlice';

interface Props {
  errors: any;
  watch: UseFormWatch<OpportunityStepTwo>;
  register: UseFormRegister<OpportunityStepTwo>;
  setValue: UseFormSetValue<OpportunityStepTwo>;
  control: Control<OpportunityStepTwo, Record<string, any>>;
}

const Attachments: React.FC<Props> = ({ control, register, errors, watch, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attachments',
  });

  const attachments = watch('attachments');
  const [optionCount, setOptionCount] = React.useState<number>(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (index === 0) {
      append({ title: '', file: '', toBeValidated: true });
      setOptionCount(optionCount + 1);
    } else {
      remove(index);
      setOptionCount(optionCount - 1);
    }
  };

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setValue(`attachments.${index}.toBeValidated`, true);
  };

  return (
    <div className='form-group col-sm-12'>
      <label className='label fw-600 mb-2 w-100'>
        Attachments <span className='note fw-400'>(upto 3 allowed)</span>
      </label>
      {fields.map((field, index) => {
        if (optionCount <= 3) {
          let fileLabel = 'Choose file...';
          const uploadedFile = attachments && attachments![index]?.file;
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
              <div className='col-4'>
                <label className='label'>Attachment Title</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Title'
                  {...register(`attachments.${index}.title` as const)}
                />
                {errors.attachments &&
                  errors.attachments[index] &&
                  errors.attachments[index].title && (
                    <div className='text-danger error mt-1'>
                      {errors.attachments[index].title?.message}
                    </div>
                  )}
              </div>
              <div className='col-5'>
                <label className='label'>
                  Upload File <span className='note fw-400'>(.jpg and .pdf format only)</span>
                </label>
                <div className='custom-file'>
                  <input
                    type='file'
                    id='inputGroupFile01'
                    accept='application/pdf, image/jpeg'
                    aria-describedby='inputGroupFileAddon01'
                    className='custom-file-input form-control'
                    {...register(`attachments.${index}.file` as const, {
                      onChange: (e) => handleOnChange(e, index),
                    })}
                  />
                  <label className='custom-file-label mb-0 form-control' htmlFor='inputGroupFile01'>
                    {fileLabel}
                  </label>
                  {errors.attachments &&
                    errors.attachments[index] &&
                    errors.attachments[index].file && (
                      <div className='text-danger error mt-1'>
                        {errors.attachments[index].file?.message}
                      </div>
                    )}
                </div>
              </div>
              <input type='hidden' {...register(`attachments.${index}.toBeValidated` as const)} />
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

export default Attachments;
