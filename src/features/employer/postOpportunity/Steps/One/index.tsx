import React, { KeyboardEventHandler } from 'react';
import { matchSorter } from 'match-sorter';
import { capitalize, forEach, isEmpty, map, orderBy, debounce } from 'lodash';
import AsyncSelect from 'react-select/async';
import { SingleValue, OnChangeValue } from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// Imported from project
import { addWeek } from 'utils';
import { cityList } from 'constant';
import { RootState } from 'app/store';
import DateSelector from 'components/DateSelector';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  AddOpportunity,
  EditOpportunity,
  OpportunityStepOne,
  OpportunityStepOneSchema,
} from '../../postOpportunitySlice';
import { listDomains } from 'features/admin/domain/itemAPI';
import { listJobTitles } from 'features/admin/jobTitle/itemAPI';
import { createOption, OptionType, selectStyle } from 'features/employer/common';

const cities: readonly OptionType[] = orderBy(
  map(cityList, ({ city }) => createOption(city)),
  'label',
);

let opportunityTitles: readonly OptionType[] = [];
const getOpportunityTitles = async () => {
  const { data } = await listJobTitles();
  opportunityTitles = map(data.items, ({ title }) => createOption(title));
};

let opportunityDomains: readonly OptionType[] = [];
const getOpportunityDomains = async () => {
  const { data } = await listDomains();
  opportunityDomains = map(data.items, ({ name }) => createOption(name));
};

if (
  typeof window !== 'undefined' &&
  window.location.pathname.includes('/employer/postOpportunity')
) {
  getOpportunityTitles();
  getOpportunityDomains();
}

interface Props {
  category: string;
  opportunityID: string;
  steps: Record<string, boolean>;
  opportunity: Record<string, any>;
  scrollTo: () => void | undefined;
  setSteps: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const StepOne: React.FC<Props> = ({
  steps,
  setSteps,
  scrollTo,
  category,
  opportunity,
  opportunityID,
}) => {
  const dispatch = useAppDispatch();
  const inEditMode = !isEmpty(opportunityID);
  const defaultValues: OpportunityStepOne = React.useMemo(
    () => ({
      category,
      opportunityTitle:
        !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.opportunityTitle)
          ? opportunity.stepOne.opportunityTitle
          : '',
      opportunityDomain:
        !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.opportunityDomain)
          ? opportunity.stepOne.opportunityDomain
          : '',
      ...(category === 'job' && {
        opportunityType:
          !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.opportunityType)
            ? opportunity.stepOne.opportunityType
            : 'fullTime',
      }),
      openings:
        !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.openings)
          ? opportunity.stepOne.openings
          : '',
      locations:
        !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.locations)
          ? opportunity.stepOne.locations
          : [''],
      ...(category === 'job' && {
        locationType:
          !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.locationType)
            ? opportunity.stepOne.locationType
            : 'office',
      }),
      opportunityEndDate:
        !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.opportunityEndDate)
          ? new Date(opportunity.stepOne.opportunityEndDate)
          : addWeek(1),
      ...(category === 'competition' && {
        participation:
          !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.participation)
            ? opportunity.stepOne.participation
            : 'individual',
      }),
      opportunityStartDate:
        !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.opportunityStartDate)
          ? new Date(opportunity.stepOne.opportunityStartDate)
          : new Date(),
      ...(category === 'competition' && {
        teamComposition:
          !isEmpty(opportunity.stepOne) && !isEmpty(opportunity.stepOne.teamComposition)
            ? opportunity.stepOne.teamComposition
            : 'sameOrg',
      }),
    }),
    [category, opportunity.stepOne],
  );
  const {
    watch,
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpportunityStepOne>({
    resolver: yupResolver(OpportunityStepOneSchema),
    defaultValues: React.useMemo(() => defaultValues, [defaultValues]),
  });
  const [opportunityTitle, setOpportunityTitle] = React.useState<OptionType>();
  const [opportunityDomain, setopportunityDomain] = React.useState<OptionType>();
  const [opportunityLocation, setOpportunityLocation] = React.useState<string>('');
  const [opportunityLocations, setOpportunityLocations] = React.useState<OptionType[]>([]);
  const [startDate, endDate] = [watch('opportunityStartDate'), watch('opportunityEndDate')];
  const { status, message, currentAction } = useAppSelector(
    (state: RootState) => state.postOpportunity,
  );

  React.useEffect(() => {
    if (inEditMode && !isEmpty(opportunity.stepOne)) {
      reset(defaultValues);
      setOpportunityTitle(createOption(opportunity.stepOne.opportunityTitle));
      setopportunityDomain(createOption(opportunity.stepOne.opportunityDomain));
      setOpportunityLocations(
        map(opportunity.stepOne.locations, (location: unknown) => createOption(location as string)),
      );
    }
  }, [defaultValues, inEditMode, opportunity.stepOne, reset]);

  React.useEffect(() => {
    if (status === 'success' && currentAction === 'editOpportunity-stepOne') {
      setSteps({ ...steps, two: true });
      scrollTo && scrollTo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAction, status]);

  React.useEffect(() => {
    if (!isEmpty(steps)) {
      const { one, two, three, four, five } = steps;
      if (one && two && !three && !four && !five) {
        scrollTo && scrollTo(); // scroll to step two
      }
    }
  }, [scrollTo, steps]);

  const loadCities = debounce((value: string, callback) => {
    callback(matchSorter(cities, value, { keys: ['label'] }));
  }, 500);

  const loadOpportunityTitles = debounce((value: string, callback) => {
    const options = matchSorter(opportunityTitles, value, { keys: ['label'] });
    callback(isEmpty(options) ? [createOption(value)] : options);
  }, 500);

  const loadOpportunityDomains = debounce((value: string, callback) => {
    const options = matchSorter(opportunityDomains, value, { keys: ['label'] });
    callback(isEmpty(options) ? [createOption(value)] : options);
  }, 500);

  const handleOnSubmit = (data: OpportunityStepOne) => {
    const formData = new FormData();
    forEach(data, (value, key) => {
      if (['object', 'array'].includes(typeof value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });
    formData.append('status', 'draft');
    formData.append('currentStep', 'stepOne');
    dispatch(
      inEditMode ? EditOpportunity(formData, opportunityID, 'stepOne') : AddOpportunity(formData),
    );
  };

  //console.log('stepOne', { errors, defaultValues });

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className='box-container mb-4'>
        <div className='box-container-inner pb-3'>
          <div className='row'>
            <div className='form-row col-12'>
              <h2 className='bc-heading fw-500 txt-yl mb-4'>1. Basic Details</h2>
            </div>
            <div className='form-row col-12'>
              <div className='form-group col-6'>
                <label className='label'>Title</label>
                <Controller
                  control={control}
                  name='opportunityTitle'
                  render={({ field: { onChange } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <AsyncSelect
                        isClearable
                        isSearchable={true}
                        styles={selectStyle}
                        value={opportunityTitle}
                        onChange={handleOnchange}
                        loadOptions={loadOpportunityTitles}
                        placeholder='Select opportunity title'
                        components={{ DropdownIndicator: null }}
                      />
                    );
                  }}
                />
                {errors.opportunityTitle && (
                  <div className='text-danger error mt-1'>
                    {capitalize(errors.opportunityTitle?.message)}
                  </div>
                )}
              </div>
              <div className='form-group col-6'>
                <label className='label'>Domain</label>
                <Controller
                  control={control}
                  name='opportunityDomain'
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <AsyncSelect
                        isClearable
                        cacheOptions
                        styles={selectStyle}
                        value={opportunityDomain}
                        onChange={handleOnchange}
                        loadOptions={loadOpportunityDomains}
                        placeholder='Select opportunity domain'
                        components={{ IndicatorSeparator: () => null }}
                      />
                    );
                  }}
                />
                {errors.opportunityDomain && (
                  <div className='text-danger error mt-1'>
                    {capitalize(errors.opportunityDomain?.message)}
                  </div>
                )}
              </div>
            </div>
            {['job', 'internship'].includes(category) && (
              <>
                <div className='form-group col-12'>
                  <label className='label'>Type of Employment</label>
                  <div className='custom-inline'>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='jobtype1'
                        value='fullTime'
                        {...register('opportunityType')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='jobtype1'>
                        Full Time
                      </label>
                    </div>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='jobtype2'
                        value='partTime'
                        {...register('opportunityType')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='jobtype2'>
                        Part Time
                      </label>
                    </div>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='jobtype3'
                        value='contract'
                        {...register('opportunityType')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='jobtype3'>
                        Contract
                      </label>
                    </div>
                  </div>
                  {errors.opportunityType && (
                    <div className='text-danger error mt-1'>
                      {capitalize(errors.opportunityType?.message)}
                    </div>
                  )}
                </div>
                <div className='form-group col-12'>
                  <label className='label'>Location Type</label>
                  <div className='custom-inline'>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='loctype1'
                        value='office'
                        {...register('locationType')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='loctype1'>
                        In-Office only
                      </label>
                    </div>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='loctype2'
                        value='WFH'
                        {...register('locationType')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='loctype2'>
                        Work from home
                      </label>
                    </div>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='loctype3'
                        value='hybrid'
                        {...register('locationType')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='loctype3'>
                        Hybrid
                      </label>
                    </div>
                  </div>
                  {errors.locationType && (
                    <div className='text-danger error mt-1'>
                      {capitalize(errors.locationType?.message)}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className='form-row col-12'>
              <div className='form-group col-6'>
                <label className='label'>Work Location</label>
                <Controller
                  name='locations'
                  control={control}
                  render={({ field: { onChange, name } }) => {
                    const handleChange = (value: OnChangeValue<OptionType, true>) => {
                      setOpportunityLocations([...value]);
                      onChange(value.map((v) => v.value));
                    };
                    const handleInputChange = (inputValue: string) =>
                      setOpportunityLocation(inputValue);
                    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
                      if (!opportunityLocation) return;
                      switch (event.key) {
                        case 'Tab':
                        case 'Enter':
                          setOpportunityLocation('');
                          onChange([
                            ...opportunityLocations.map((v) => v.value),
                            opportunityLocation,
                          ]);
                          setOpportunityLocations([
                            ...opportunityLocations,
                            createOption(opportunityLocation),
                          ]);
                          event.preventDefault();
                      }
                    };
                    return (
                      <AsyncSelect
                        isMulti
                        isClearable
                        cacheOptions
                        styles={selectStyle}
                        onChange={handleChange}
                        loadOptions={loadCities}
                        onKeyDown={handleKeyDown}
                        value={opportunityLocations}
                        inputValue={opportunityLocation}
                        onInputChange={handleInputChange}
                        components={{ DropdownIndicator: null }}
                        placeholder='Select location and press enter or tab'
                      />
                    );
                  }}
                />
                {errors.locations && (
                  <div className='text-danger error mt-1'>{errors.locations[0]?.message}</div>
                )}
              </div>
            </div>
            <div className='form-row col-12'>
              <div className='form-group col-2'>
                <label className='label'>No. of Openings</label>
                <input type='text' className='form-control' {...register('openings')} />
                {errors.openings && (
                  <div className='text-danger error mt-1'>
                    {capitalize(errors.openings?.message)}
                  </div>
                )}
              </div>
            </div>
            <div className='form-row col-12'>
              <div className='form-group col-3'>
                <label className='label'>Start Date</label>
                <DateSelector
                  maxDate={endDate}
                  control={control}
                  {...register('opportunityStartDate')}
                />
                {errors.opportunityStartDate && (
                  <div className='text-danger error mt-1'>
                    {capitalize(errors.opportunityStartDate?.message)}
                  </div>
                )}
              </div>
              <div className='form-group col-3'>
                <label className='label'>End Date</label>
                <DateSelector
                  control={control}
                  minDate={startDate}
                  {...register('opportunityEndDate')}
                />
                {errors.opportunityEndDate && (
                  <div className='text-danger error mt-1'>
                    {capitalize(errors.opportunityEndDate?.message)}
                  </div>
                )}
              </div>
            </div>
            {category === 'competition' && (
              <>
                <div className='form-group col-12'>
                  <label className='label'>Participation</label>
                  <div className='custom-inline'>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='jobtype1'
                        value='individual'
                        {...register('participation')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='jobtype1'>
                        Individual
                      </label>
                    </div>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='jobtype2'
                        value='team'
                        {...register('participation')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='jobtype2'>
                        Participation as team
                      </label>
                    </div>
                  </div>
                  {errors.participation && (
                    <div className='text-danger error mt-1'>
                      {capitalize(errors.participation?.message)}
                    </div>
                  )}
                </div>
                <div className='form-group col-12'>
                  <label className='label'>Team Composition</label>
                  <div className='custom-inline'>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='loctype1'
                        value='sameOrg'
                        {...register('teamComposition')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='loctype1'>
                        Members of a team should be from the same organization
                      </label>
                    </div>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        id='loctype2'
                        value='differentOrg'
                        {...register('teamComposition')}
                        className='custom-control-input'
                      />
                      <label className='custom-control-label' htmlFor='loctype2'>
                        Members of a team can be from different organizations
                      </label>
                    </div>
                  </div>
                  {errors.teamComposition && (
                    <div className='text-danger error mt-1'>
                      {capitalize(errors.teamComposition?.message)}
                    </div>
                  )}
                </div>
              </>
            )}
            <input type='hidden' {...register('category')} />
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
};

export default StepOne;
