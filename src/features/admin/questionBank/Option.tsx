import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { QuestionBankForm, QuestionBank } from './questionBankSlice';
import TextEditor from 'components/TextEditor';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  errors: any;
  nestIndex: number;
  control: Control<QuestionBankForm, Record<string, any>>;
  register: UseFormRegister<QuestionBankForm>;
  underAction?: QuestionBankForm | QuestionBank;
}

const Option: React.FC<Props> = ({ control, register, errors, underAction, nestIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options` as const,
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div className='form-group col-md-6' key={field.id}>
            <label className='label'>
              {`Option ${index + 1}`} <span className='required'>*</span>
            </label>
            <TextEditor
              control={control}
              name={`questions.${nestIndex}.options.${index}.option`}
              value={
                (underAction &&
                  underAction?.questions[nestIndex] &&
                  underAction?.questions[nestIndex].options &&
                  underAction?.questions[nestIndex].options[index] &&
                  underAction?.questions[nestIndex].options[index].option) ||
                ''
              }
            />
            <div className='mt-2 d-flex'>
              <div className='form-check form-check-inline dark-btn'>
                <input
                  type='checkbox'
                  id={`option-${index}`}
                  className='form-check-input'
                  {...register(`questions.${nestIndex}.options.${index}.isCorrect` as const, {
                    required: true,
                  })}
                />
                <label className='form-check-label' htmlFor={`option-${index}`}>
                  Correct Answer
                </label>
              </div>
              <div className='flex-grow-1'>
                <button type='button' className='red-btn' onClick={() => remove(index)}>
                  <FontAwesomeIcon icon={faTimesCircle as IconProp} />
                  Remove option
                </button>
              </div>
            </div>
            {errors.questions &&
              errors.questions[nestIndex] &&
              errors.questions[nestIndex].options &&
              errors.questions[nestIndex].options[index] && (
                <div className='text-danger error mt-1'>{`Option ${
                  index + 1
                } is a required field`}</div>
              )}
          </div>
        );
      })}
      <div className='form-group bt-1 pt-3 text-right'>
        <button
          type='button'
          className='blue-btn'
          onClick={() => {
            append({ option: '', isCorrect: false });
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle as IconProp} />
          Add more option
        </button>
      </div>
    </>
  );
};

export default Option;
