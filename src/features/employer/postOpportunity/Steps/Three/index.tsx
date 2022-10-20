import React, { KeyboardEventHandler } from 'react';
import { matchSorter } from 'match-sorter';
import { capitalize, isEmpty, map, forEach, split, debounce } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import Select, { SingleValue, OnChangeValue } from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { history } from 'utils';
// Imported from project
import Skill from './Skill';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listCompanies } from 'features/admin/company/itemAPI';
import { listInstituteGroups } from 'features/admin/instituteGroup/itemAPI';
import { listSpecializations } from 'features/admin/specialization/itemAPI';
import { OptionType, selectStyle, createOption } from 'features/employer/common';
import {
  EditOpportunity,
  OpportunityStepThree,
  OpportunityStepThreeSchema,
} from '../../postOpportunitySlice';

const years: readonly OptionType[] = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '25+', label: '25+' },
];

const months: readonly OptionType[] = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
];

const openFor: readonly OptionType[] = [
  { value: 'Everyone', label: 'Everyone' },
  { value: 'College Students', label: 'College Students' },
  { value: 'Working Professionals', label: 'Working Professionals' },
  { value: 'School Students', label: 'School Students' },
  { value: 'Freshers', label: 'Freshers' },
  { value: 'Others', label: 'Others' },
];

let speclizations: readonly OptionType[] = [];
const getSpeclizations = async () => {
  const { data } = await listSpecializations();
  speclizations = map(data.items, ({ name }) => createOption(name));
};

let instituteGroups: readonly OptionType[] = [];
const getInstitutes = async () => {
  const { data } = await listInstituteGroups();
  instituteGroups = map(data.items, ({ name }) => createOption(name));
};

let companies: readonly OptionType[] = [];
const getCompanies = async () => {
  const { data } = await listCompanies();
  companies = map(data.items, ({ name }) => createOption(name));
};

if (
  typeof window !== 'undefined' &&
  window.location.pathname.includes('/employer/postOpportunity')
) {
  getCompanies();
  getInstitutes();
  getSpeclizations();
}

interface Props {
  category: string;
  opportunityID: string;
  steps: Record<string, boolean>;
  opportunity: Record<string, any>;
  scrollTo: () => void | undefined;
  ref: React.RefObject<HTMLFormElement>;
  setSteps: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const StepThree = React.forwardRef<HTMLFormElement, Props>(
  ({ category, opportunityID, steps, setSteps, opportunity, scrollTo }, ref) => {
    const dispatch = useAppDispatch();
    const inEditMode = !isEmpty(opportunityID);
    const defaultValues: OpportunityStepThree = React.useMemo(
      () => ({
        category,
        workExperience:
          !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.workExperience)
            ? opportunity.stepThree.workExperience
            : { min: { year: '', month: '' }, max: { year: '', month: '' } },

        qualifications:
          !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.qualifications)
            ? split(opportunity.stepThree.qualifications, ',')
            : [''],

        skills: {
          personal_skills: !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.skills) && !isEmpty(opportunity.stepThree.skills.personal_skills)
            ? opportunity.stepThree.skills.personal_skills
            : [{ title: '', level: '' }],
          technical_skills: !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.skills) && !isEmpty(opportunity.stepThree.skills.technical_skills)
            ? opportunity.stepThree.skills.technical_skills
            : [{ title: '', level: '' }],
          public_skills: !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.skills) && !isEmpty(opportunity.stepThree.skills.public_skills)
            ? opportunity.stepThree.skills.public_skills
            : [{ title: '', level: '' }],

        },
        ...(['job', 'internship'].includes(category) && {
          videoResume:
            !isEmpty(opportunity.stepThree) && opportunity.stepThree.videoResume
              ? opportunity.stepThree.videoResume
              : false,
        }),
        ...(category === 'job' && {
          coverLetter:
            !isEmpty(opportunity.stepThree) && opportunity.stepThree.coverLetter
              ? opportunity.stepThree.coverLetter
              : false,
        }),

        institutes:
          !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.institutes)
            ? split(opportunity.stepThree.institutes, ',')
            : [''],

        assessmentScore:
          !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.assessmentScore)
            ? opportunity.stepThree.assessmentScore
            : {
              behavioural: {},
              cognitive: {},
              functional: {},
            },
        experiences:
          !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.experiences)
            ? split(opportunity.stepThree.experiences, ',')
            : [''],
        ...(category === 'competition' && {
          gender:
            !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.gender)
              ? opportunity.stepThree.gender
              : 'male',
        }),
        ...(category === 'competition' && {
          openFor:
            !isEmpty(opportunity.stepThree) && !isEmpty(opportunity.stepThree.openFor)
              ? opportunity.stepThree.openFor
              : 'Everyone',
        }),
      }),
      [category, opportunity.stepThree],
    );
    const {
      watch,
      reset,
      control,
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    } = useForm<OpportunityStepThree>({
      shouldUnregister: true,
      resolver: yupResolver(OpportunityStepThreeSchema),
      defaultValues: React.useMemo(() => defaultValues, [defaultValues]),
    });
    const [videoResume, coverLetter] = [watch('videoResume'), watch('coverLetter')];
    const [opportunityInstitute, setOpportunityInstitute] = React.useState<string>('');
    const [opportunityPastEmployer, setOpportunityPastEmployer] = React.useState<string>('');
    const [opportunityEduBackground, setOpportunityEduBackground] = React.useState<string>('');
    const [opportunityInstitutes, setOpportunityInstitutes] = React.useState<OptionType[]>([]);
    const [opportunityPastEmployers, setOpportunityPastEmployers] = React.useState<OptionType[]>(
      [],
    );
    const [opportunityEduBackgrounds, setOpportunityEduBackgrounds] = React.useState<OptionType[]>(
      [],
    );
    const { status, message, currentAction } = useAppSelector(
      (state: RootState) => state.postOpportunity,
    );
    React.useEffect(() => {
      getSpeclizations();
    }, [])
    React.useEffect(() => {
      if (inEditMode && !isEmpty(opportunity.stepThree)) {
        reset(defaultValues);
        setOpportunityInstitutes(
          map(split(opportunity.stepThree.institutes, ','), (institute: unknown) =>
            createOption(institute as string),
          ),
        );
        setOpportunityPastEmployers(
          map(split(opportunity.stepThree.experiences, ','), (experience: unknown) =>
            createOption(experience as string),
          ),
        );
        setOpportunityEduBackgrounds(
          map(split(opportunity.stepThree.qualifications, ','), (qualification: unknown) =>
            createOption(qualification as string),
          ),
        );
      }
    }, [defaultValues, inEditMode, opportunity.stepThree, reset]);

    React.useEffect(() => {
      if (status === 'success' && currentAction === 'editOpportunity-stepThree') {
        setSteps({ ...steps, four: true });
        scrollTo && scrollTo();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAction, status]);

    React.useEffect(() => {
      if (!isEmpty(steps)) {
        const { one, two, three, four, five } = steps;
        if (one && two && three && four && !five) {
          scrollTo && scrollTo(); // scroll to fourth step
        }
      }
    }, [scrollTo, steps]);

    const loadSpeclizations = debounce((value: string, callback) => {
      const options = matchSorter(speclizations, value, { keys: ['label'] });
      callback(options);
    }, 500);

    const loadInstituteGroups = debounce((value: string, callback) => {
      const options = matchSorter(instituteGroups, value, { keys: ['label'] });
      callback(isEmpty(options) ? [createOption(value)] : options);
    }, 500);

    const loadCompanies = debounce((value: string, callback) => {
      const options = matchSorter(companies, value, { keys: ['label'] });
      callback(isEmpty(options) ? [createOption(value)] : options);
    }, 500);

    const handleOnSubmit = (data: OpportunityStepThree) => {
      const formData = new FormData();
      forEach(data, (value, key) => {
        if (['object', 'array'].includes(typeof value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
      formData.append('status', 'draft');
      formData.append('currentStep', 'stepThree');
      formData.append('category', category);
      dispatch(EditOpportunity(formData, opportunityID, 'stepThree'));

    };
    // console.log('stepThree', { errors, defaultValues });

    return (
      <form onSubmit={handleSubmit(handleOnSubmit)} ref={ref}>
        <div className='box-container mb-4'>
          <div className='box-container-inner pb-3'>
            <div className='row'>
              <div className='form-row col-12'>
                <h2 className='bc-heading fw-500 txt-yl mb-4'>3. Quality Check</h2>
              </div>
              {['job', 'internship'].includes(category) && (
                <>
                  <div className='col-12'>
                    <label className='label'>Minimum Work Experience</label>
                    <div className='form-row'>
                      <div className='form-group col-2'>
                        <Controller
                          control={control}
                          name='workExperience.min.year'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                options={years}
                                isSearchable={true}
                                styles={selectStyle}
                                onChange={handleOnchange}
                                placeholder='Year(s)'
                                components={{ IndicatorSeparator: () => null }}
                                value={years.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                        {errors.workExperience?.min?.year && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.workExperience?.min.year.message)}
                          </div>
                        )}
                      </div>
                      <div className='form-group col-2'>
                        <Controller
                          control={control}
                          name='workExperience.min.month'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                options={months}
                                isSearchable={true}
                                styles={selectStyle}
                                onChange={handleOnchange}
                                placeholder='Month(s)'
                                components={{ IndicatorSeparator: () => null }}
                                value={months.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                        {errors.workExperience?.min?.month && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.workExperience?.min.month.message)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <label className='label'>Maximum Work Experience</label>
                    <div className='form-row'>
                      <div className='form-group col-2'>
                        <Controller
                          control={control}
                          name='workExperience.max.year'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                options={years}
                                isSearchable={true}
                                styles={selectStyle}
                                onChange={handleOnchange}
                                placeholder='Year(s)'
                                components={{ IndicatorSeparator: () => null }}
                                value={years.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                        {errors.workExperience?.max?.year && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.workExperience?.max.year.message)}
                          </div>
                        )}
                      </div>
                      <div className='form-group col-2'>
                        <Controller
                          control={control}
                          name='workExperience.max.month'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                options={months}
                                isSearchable={true}
                                styles={selectStyle}
                                onChange={handleOnchange}
                                placeholder='Month(s)'
                                components={{ IndicatorSeparator: () => null }}
                                value={months.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                        {errors.workExperience?.max?.month && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.workExperience?.max.month.message)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='form-row col-12'>
                    <div className='form-group col-6'>
                      <label className='label'>Preferred Educational Background</label>
                      <Controller
                        control={control}
                        name='qualifications'
                        render={({ field: { onChange, name } }) => {
                          const handleChange = (value: OnChangeValue<OptionType, true>) => {
                            setOpportunityEduBackgrounds([...value]);
                            onChange(value.map((v) => v.value));
                          };
                          // const handleInputChange = (inputValue: string) =>
                          //   setOpportunityEduBackground(inputValue);
                          const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
                            if (!opportunityEduBackground) return;
                            switch (event.key) {
                              case 'Tab':
                              case 'Enter':
                                setOpportunityEduBackground('');
                                onChange([
                                  ...opportunityEduBackgrounds.map((v) => v.value),
                                  opportunityEduBackground,
                                ]);
                                setOpportunityEduBackgrounds([
                                  ...opportunityEduBackgrounds,
                                  createOption(opportunityEduBackground),
                                ]);
                                event.preventDefault();
                            }
                          };
                          return (
                            <AsyncSelect
                              isMulti
                              isClearable
                              cacheOptions
                              defaultOptions
                              // isSearchable={true}
                              styles={selectStyle}
                              onChange={handleChange}
                              // onKeyDown={handleKeyDown}
                              loadOptions={loadSpeclizations}
                              value={opportunityEduBackgrounds}
                              // onInputChange={handleInputChange}
                              // inputValue={opportunityEduBackground}
                              // components={{ DropdownIndicator: null }}
                              placeholder='For ex. BBA, MBA, B.Tech, etc.'
                            />
                          );
                        }}
                      />
                      {errors.qualifications && (
                        <div className='text-danger error mt-1'>
                          {errors.qualifications[0]?.message}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {...{ control, register, errors }} */}
                  <Skill {...{ control, register, errors }} skillType={"personal_skills"} />
                  <Skill {...{ control, register, errors }} skillType={"technical_skills"} />
                  <Skill {...{ control, register, errors }} errors={errors} skillType={"public_skills"} />
                </>
              )}
              <div className='form-row col-12'>
                {['job', 'internship'].includes(category) && (
                  <div className='form-group col-3'>
                    <label className='label'>Video Resume</label>
                    <div className='custom-control custom-switch custom-switch-lg'>
                      <input
                        type='checkbox'
                        {...register('videoResume')}
                        className='custom-control-input'
                        id='switchViResume'
                      />
                      <label className='custom-control-label' htmlFor='switchViResume'>
                        {videoResume ? 'No' : 'Yes'}
                      </label>
                    </div>
                    {errors.videoResume && (
                      <div className='text-danger error mt-1'>{errors.videoResume?.message}</div>
                    )}
                  </div>
                )}
                {category === 'job' && (
                  <div className='form-group col-3'>
                    <label className='label'>Cover Letter</label>
                    <div className='custom-control custom-switch custom-switch-lg'>
                      <input
                        type='checkbox'
                        {...register('coverLetter')}
                        className='custom-control-input'
                        id='switchCLetter'
                      />
                      <label className='custom-control-label' htmlFor='switchCLetter'>
                        {coverLetter ? 'No' : 'Yes'}
                      </label>
                    </div>
                    {errors.coverLetter && (
                      <div className='text-danger error mt-1'>{errors.coverLetter?.message}</div>
                    )}
                  </div>
                )}
              </div>
              {category === 'job' && (
                <>

                  <div className='form-row col-12'>
                    <label className='label w-100'>Assessments</label>
                    <div className='multi-grp'>
                      <div className='form-group col-4 '>
                        <div className='form-row p-3 br-gr-1 brad-4'>
                          <div className='asst-graph w-100 h-120'>
                            <div className='graph-list green-graph'>
                              <ul className='chart-skills'>
                                <li style={{ animationName: 'rotate-three' }}></li>
                              </ul>
                              <div className='score-graph'>
                                <div className='txt-large'>B</div>
                                <div className='txt-medium'>Behavioural</div>
                              </div>
                            </div>
                          </div>
                          <div className='col-6'>
                            <input
                              type='text'
                              {...register('assessmentScore.behavioural.min')}
                              className='form-control'
                              placeholder='Min. Scores'
                            />
                            {errors.assessmentScore?.behavioural?.min && (
                              <div className='text-danger error mt-1'>
                                {capitalize(errors.assessmentScore?.behavioural?.min.message)}
                              </div>
                            )}
                          </div>
                          <div className='col-6'>
                            <input
                              type='text'
                              {...register('assessmentScore.behavioural.max')}
                              className='form-control'
                              placeholder='Max. Scores'
                            />
                            {errors.assessmentScore?.behavioural?.max && (
                              <div className='text-danger error mt-1'>
                                {capitalize(errors.assessmentScore?.behavioural?.max.message)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='form-group col-4 '>
                        <div className='form-row p-3 br-yl-1 brad-4'>
                          <div className='asst-graph w-100 h-120'>
                            <div className='graph-list yellow-graph'>
                              <ul className='chart-skills'>
                                <li style={{ animationName: 'rotate-three' }}></li>
                              </ul>
                              <div className='score-graph'>
                                <div className='txt-large'>C</div>
                                <div className='txt-medium'>Cognitive</div>
                              </div>
                            </div>
                          </div>
                          <div className='col-6'>
                            <input
                              type='text'
                              {...register('assessmentScore.cognitive.min')}
                              className='form-control'
                              placeholder='Min. Scores'
                            />
                            {errors.assessmentScore?.cognitive?.min && (
                              <div className='text-danger error mt-1'>
                                {capitalize(errors.assessmentScore?.cognitive?.min.message)}
                              </div>
                            )}
                          </div>
                          <div className='col-6'>
                            <input
                              type='text'
                              {...register('assessmentScore.cognitive.max')}
                              className='form-control'
                              placeholder='Max. Scores'
                            />
                            {errors.assessmentScore?.cognitive?.max && (
                              <div className='text-danger error mt-1'>
                                {capitalize(errors.assessmentScore?.cognitive?.max.message)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </>
              )}
              {category === 'competition' && (
                <>
                  <div className='form-group col-12'>
                    <label className='label'>Gender</label>
                    <div className='custom-inline'>
                      <div className='custom-control custom-radio'>
                        <input
                          type='radio'
                          id='gender1'
                          value='male'
                          {...register('gender')}
                          className='custom-control-input'
                        />
                        <label className='custom-control-label' htmlFor='gender1'>
                          Male
                        </label>
                      </div>
                      <div className='custom-control custom-radio'>
                        <input
                          type='radio'
                          id='gender2'
                          value='female'
                          {...register('gender')}
                          className='custom-control-input'
                        />
                        <label className='custom-control-label' htmlFor='gender2'>
                          Female
                        </label>
                      </div>
                    </div>
                    {errors.gender && (
                      <div className='text-danger error mt-1'>{errors.gender?.message}</div>
                    )}
                  </div>
                  <div className='col-12'>
                    <label className='label'>Opportunity Open for</label>
                    <div className='form-row'>
                      <div className='form-group col-4'>
                        <Controller
                          control={control}
                          name='workExperience.min.year'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                options={openFor}
                                isSearchable={true}
                                placeholder='Select'
                                styles={selectStyle}
                                onChange={handleOnchange}
                                components={{ IndicatorSeparator: () => null }}
                                value={openFor.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                    {errors.openFor && (
                      <div className='text-danger error mt-1'>{errors.openFor?.message}</div>
                    )}
                  </div>
                </>
              )}
              {/* <input {...register('category')} /> */}
            </div>
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
      </form>
    );
  },
);

export default StepThree;
