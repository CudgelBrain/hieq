import React from 'react';
import { forEach, isEmpty } from 'lodash';
import Select, { SingleValue } from 'react-select';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

// Imported from project
import { addWeek } from 'utils';
import { RootState } from 'app/store';
import DateSelector from 'components/DateSelector';
import deleteImg from 'assets/images/delete-ico.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { OptionType, selectStyle } from 'features/employer/common';
import {
  EditOpportunity,
  interviewRounds,
  OpportunityStepFour,
  OpportunityStepFourSchema,
} from '../../postOpportunitySlice';

const roundType: OptionType[] = [
  { value: 'Group Discussion', label: 'Group Discussion' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Quiz', label: 'Quiz' },
  { value: 'Submission', label: 'Submission' },
  { value: 'Others', label: 'Others' },
];
interface Props {
  category: string;
  opportunityID: string;
  steps: Record<string, boolean>;
  opportunity: Record<string, any>;
  scrollTo: () => void | undefined;
  ref: React.RefObject<HTMLFormElement>;
  setSteps: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const StepFour = React.forwardRef<HTMLFormElement, Props>(
  ({ category, opportunityID, steps, setSteps, opportunity, scrollTo }, ref) => {
    const dispatch = useAppDispatch();
    const inEditMode = !isEmpty(opportunityID);
    const defaultValues: OpportunityStepFour = React.useMemo(
      () => ({
        category,
        rounds:
          !isEmpty(opportunity.stepFour) && !isEmpty(opportunity.stepFour.rounds)
            ? opportunity.stepFour.rounds.map((round: interviewRounds) => ({
                ...round,
                endDate: round.endDate,
                startDate: round.startDate,
              }))
            : [
                {
                  roundType: '',
                  name: '',
                  description: '',
                  startDate: new Date(opportunity.stepOne.opportunityStartDate),
                  endDate: new Date(opportunity.stepOne.opportunityEndDate),
                },
                {
                  roundType: '',
                  name: '',
                  description: '',
                  startDate: new Date(opportunity.stepOne.opportunityStartDate),
                  endDate: new Date(opportunity.stepOne.opportunityEndDate),
                },
              ],
      }),
      [
        category,
        opportunity.stepFour,
        opportunity.stepOne.opportunityEndDate,
        opportunity.stepOne.opportunityStartDate,
      ],
    );
    const {
      reset,
      control,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<OpportunityStepFour>({
      resolver: yupResolver(OpportunityStepFourSchema),
      defaultValues: React.useMemo(() => defaultValues, [defaultValues]),
    });
    const { status, message, currentAction } = useAppSelector(
      (state: RootState) => state.postOpportunity,
    );
    const { fields, append, remove } = useFieldArray({ control, name: 'rounds' });

    const opportunityDates = React.useMemo(
      () => ({
        startDate: !isEmpty(opportunity.stepOne)
          ? new Date(opportunity.stepOne.opportunityStartDate)
          : new Date(),
        endDate: !isEmpty(opportunity.stepOne)
          ? new Date(opportunity.stepOne.opportunityEndDate)
          : addWeek(1),
      }),
      [opportunity.stepOne],
    );

    React.useEffect(() => {
      if (inEditMode && !isEmpty(opportunity.stepFour)) {
        reset(defaultValues);
      }
    }, [defaultValues, inEditMode, opportunity.stepFour, reset]);

    React.useEffect(() => {
      if (status === 'success' && currentAction === 'editOpportunity-stepFour') {
        scrollTo && scrollTo();
        setSteps({ ...steps, five: true });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAction, status]);

    React.useEffect(() => {
      if (!isEmpty(steps)) {
        const { one, two, three, four, five } = steps;
        if (one && two && three && four && five) {
          scrollTo && scrollTo();
        }
      }
    }, [scrollTo, steps]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      append({
        roundType: '',
        name: '',
        description: '',
        startDate: new Date(opportunity.stepOne.opportunityStartDate),
        endDate: new Date(opportunity.stepOne.opportunityEndDate),
      });
    };

    const handleOnSubmit = (data: OpportunityStepFour) => {
      const formData = new FormData();
      forEach(data, (value, key) => {
        if (['object', 'array'].includes(typeof value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
      formData.append('status', 'draft');
      formData.append('currentStep', 'stepFour');
      dispatch(EditOpportunity(formData, opportunityID, 'stepFour'));
    };

    //console.log('stepFour', { errors, defaultValues });

    return (
      <form onSubmit={handleSubmit(handleOnSubmit)} ref={ref}>
        <div className='box-container mb-4'>
          <div className='box-container-inner pb-3'>
            <div className='row'>
              <div className='form-row col-12'>
                <h2 className='bc-heading fw-500 txt-yl mb-4'>4. Add/Manage Rounds</h2>
              </div>
              {fields.map((field, index) => {
                return (
                  <React.Fragment key={field.id}>
                    <div className='col-12'>
                      <div className='d-flex mb-3'>
                        <div className='bc-heading flex-grow-1 cc-yellow'>{`Round ${
                          index + 1
                        }`}</div>
                        {index > 0 && (
                          <button className='text-link delete-link' onClick={() => remove(index)}>
                            <img className='mr-1' src={deleteImg} height='18' alt='' />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>

                      <label className='label'>Round Type</label>
                      <div className='form-row'>
                        <div className='form-group col-3'>
                          <Controller
                            control={control}
                            name={`rounds.${index}.roundType`}
                            render={({ field: { onChange, value, name } }) => {
                              const handleOnchange = (option: SingleValue<OptionType>) =>
                                onChange(option?.value);
                              return (
                                <Select
                                  name={name}
                                  options={roundType}
                                  isSearchable={true}
                                  isClearable={true}
                                  styles={selectStyle}
                                  onChange={handleOnchange}
                                  placeholder='Select round type'
                                  components={{ IndicatorSeparator: () => null }}
                                  value={roundType.find((c) => c.value === value)}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                      {errors.rounds && errors.rounds[index] && errors.rounds[index]?.roundType && (
                        <div className='text-danger error mt-1'>
                          {errors.rounds[index]?.roundType?.message}
                        </div>
                      )}
                    </div>
                    <div className='col-12'>
                      <label className='label'>Round Name</label>
                      <div className='form-row'>
                        <div className='form-group col-6'>
                          <input
                            type='text'
                            className='form-control'
                            {...register(`rounds.${index}.name` as const)}
                          />
                        </div>
                      </div>
                      {errors.rounds && errors.rounds[index] && errors.rounds[index]?.name && (
                        <div className='text-danger error mt-1'>
                          {errors.rounds[index]?.name?.message}
                        </div>
                      )}
                    </div>
                    <div className='form-group col-12'>
                      <label className='label'>Description</label>
                      <textarea
                        rows={4}
                        className='form-control'
                        {...register(`rounds.${index}.description` as const)}
                      />
                      {errors.rounds &&
                        errors.rounds[index] &&
                        errors.rounds[index]?.description && (
                          <div className='text-danger error mt-1'>
                            {errors.rounds[index]?.description?.message}
                          </div>
                        )}
                      <div className='text-right'>
                        <span className='note'>1000 words limit</span>
                      </div>
                    </div>
                    <div className='form-row col-12'>
                      <div className='form-group col-3'>
                        <label className='label'>Start Date</label>
                        <div className='input-group ig-append'>
                          <DateSelector
                            showTimeSelect
                            control={control}
                            format='dd/MM/yyyy hh:mm a'
                            maxDate={opportunityDates.endDate}
                            minDate={opportunityDates.startDate}
                            {...register(`rounds.${index}.startDate` as const)}
                          />
                        </div>
                        {errors.rounds &&
                          errors.rounds[index] &&
                          errors.rounds[index]?.startDate && (
                            <div className='text-danger error mt-1'>
                              {errors.rounds[index]?.startDate?.message}
                            </div>
                          )}
                      </div>
                      <div className='form-group col-3'>
                        <label className='label'>End Date</label>
                        <div className='input-group ig-append'>
                          <DateSelector
                            showTimeSelect
                            control={control}
                            format='dd/MM/yyyy h:mm a'
                            maxDate={opportunityDates.endDate}
                            minDate={opportunityDates.startDate}
                            {...register(`rounds.${index}.endDate` as const)}
                          />
                        </div>
                        {errors.rounds && errors.rounds[index] && errors.rounds[index]?.endDate && (
                          <div className='text-danger error mt-1'>
                            {errors.rounds[index]?.endDate?.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {fields.length - 1 === index && (
                      <div className='col-md-12 mb-3 pb-3 text-center pt-3 bt-1'>
                        <button
                          type='submit'
                          className='btn btn-trans-yl'
                          onClick={(event) => handleClick(event)}
                        >
                          + Add Round
                        </button>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              <input type='hidden' {...register('category')} />
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <button type='submit' className='btn btn-yl btn-full btn-dn-curve'>
                  {status === 'loading' && <span className='spinner-border' role='status'></span>}
                  {status !== 'loading' && <span>Save &amp; Continue</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  },
);

export default StepFour;
