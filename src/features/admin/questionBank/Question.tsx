import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import TextEditor from 'components/TextEditor';
import Option from './Option';
import { QuestionBankForm, QuestionBank, DefaultQuestionValue } from './questionBankSlice';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  errors: any;
  questionType: string;
  control: Control<QuestionBankForm, Record<string, any>>;
  register: UseFormRegister<QuestionBankForm>;
  underAction?: QuestionBankForm | QuestionBank;
}

const Question: React.FC<Props> = ({ control, register, errors, underAction, questionType }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  return (
    <>
      {questionType === 'case' &&
        fields.map((field, index) => (
          <div className='bg-lightgrey relativeBox pt-5 pl-4 pr-4 pb-4' key={field.id}>
            <div className='flex-grow-1 text-right absoluteBox'>
              <button
                type='button'
                className='red-btn'
                title='Delete'
                onClick={() => remove(index)}
              >
                <FontAwesomeIcon icon={faTrash as IconProp} />
              </button>
            </div>
            <div className='form-row'>
              <div className='col-md-12'>
                <div className='form-row'>
                  <div className='form-group col-md-6 col-6'>
                    <label className='label'>
                      Question&aposs Level <span className='required'>*</span>
                    </label>
                    <select
                      {...register(`questions.${index}.level` as const, { required: true })}
                      className='form-control custom-select'
                    >
                      <option value=''>Select Question Level</option>
                      <option value='easy'>Easy</option>
                      <option value='medium'>Medium</option>
                      <option value='tough'>Tough</option>
                    </select>
                  </div>
                  <div className='form-group col-md-6 col-6'>
                    <label className='label'>
                      Question&aposs Type <span className='required'>*</span>
                    </label>
                    <select
                      {...register(`questions.${index}.type` as const, { required: true })}
                      className='form-control custom-select'
                    >
                      <option value=''>Select Question Type</option>
                      <option value='single'>Single correct MCQ</option>
                      <option value='multi'>Multi-correct MCQ</option>
                      <option value='fitb'>Fill in the blanks</option>
                      <option value='numerical'>Numerical (Integral)</option>
                    </select>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-3 col-6'>
                    <label className='label'>
                      Questionaposs Time <span className='required'>*</span>
                      <span className='note'>(in minutes)</span>
                    </label>
                    <input
                      type='text'
                      {...register(`questions.${index}.time` as const, { required: true })}
                      className='form-control'
                      placeholder='Enter Time'
                    />
                  </div>
                  <div className='form-group col-md-9'>
                    <label className='label'>
                      Questionaposs Marking <span className='required'>*</span>
                    </label>
                    <div className='form-row'>
                      <div className='col-4'>
                        <input
                          type='text'
                          {...register(`questions.${index}.absoluteMarking` as const, {
                            required: true,
                          })}
                          className='form-control'
                          placeholder='Absolute Marking'
                        />
                      </div>
                      <div className='col-4'>
                        <input
                          type='text'
                          {...register(`questions.${index}.partialMarking` as const, {
                            required: true,
                          })}
                          className='form-control'
                          placeholder='Partial Marking'
                        />
                      </div>
                      <div className='col-4'>
                        <input
                          type='text'
                          {...register(`questions.${index}.negativeMarking` as const, {
                            required: true,
                          })}
                          className='form-control'
                          placeholder='Negative Marking'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <label className='label'>
                    {`Question ${index + 1}`} <span className='required'>*</span>
                  </label>
                  <TextEditor
                    // name={`questions.${index}.question`}
                    // control={control}
                    // value={
                    //   (underAction &&
                    //     underAction?.questions &&
                    //     underAction?.questions[index] &&
                    //     underAction?.questions[index].question) ||
                    //   ''
                    // }
                  />
                  {errors.questions &&
                    errors.questions[index] &&
                    errors.questions[index].question && (
                      <div className='text-danger error mt-1'>
                        {errors.questions[index].question?.message}
                      </div>
                    )}
                </div>
                <div className='form-row'>
                  <Option nestIndex={index} {...{ control, register, errors, underAction }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      {questionType === 'case' && (
        <div className='form-group bt-1 pt-3 text-center'>
          <button
            type='button'
            className='blue-btn'
            onClick={() => {
              append(DefaultQuestionValue);
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle as IconProp} />
            ADD Question
          </button>
        </div>
      )}
      {questionType !== 'case' && (
        <>
          <div className='form-group'>
            <label className='label'>
              Question <span className='required'>*</span>
            </label>
            <TextEditor
              // name={`questions.${0}.question`}
              // control={control}
              // value={
              //   (underAction &&
              //     underAction?.questions &&
              //     underAction?.questions[0] &&
              //     underAction?.questions[0].question) ||
              //   ''
              // }
            />
            {errors.questions && errors.questions[0].question && (
              <div className='text-danger error mt-1'>{errors.questions[0].question?.message}</div>
            )}
          </div>
          <div className='form-row'>
            <Option nestIndex={0} {...{ control, register, errors, underAction }} />
          </div>
        </>
      )}
    </>
  );
};

export default Question;
