import React, { useRef } from 'react';
import { capitalize, forEach, isEmpty, kebabCase } from 'lodash';
import Select, { SingleValue } from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Contacts from './Contacts';
import { RootState } from 'app/store';
import { fileExtension } from 'utils';
import Attachments from './Attachments';
import ExternalLinks from './ExternalLinks';
import TextEditor from 'components/TextEditor';
import { Editor } from '@tinymce/tinymce-react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addOpportunityDetail } from '../../postOpportunityAPI';
import { OptionType, selectStyle } from 'features/employer/common';
import { CKEditor } from 'ckeditor4-react';
import {
  attachment,
  EditOpportunity,
  OpportunityStepTwo,
  Opportunity,
  OpportunityStepTwoSchema,
} from '../../postOpportunitySlice';

const cycles: readonly OptionType[] = [
  { value: 'Month', label: 'Month' },
  { value: 'Year', label: 'Year' },
];

const currency: readonly OptionType[] = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'INR', label: 'INR (₹)' },
];

const scales: readonly OptionType[] = [
  { value: 'Sale', label: 'Sale' },
  { value: 'Writeup', label: 'Writeup' },
  { value: 'Design', label: 'Design' },
  { value: 'Video', label: 'Video' },
  { value: 'Data Entry', label: 'Data Entry' },
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

const StepTwo = React.forwardRef<HTMLFormElement, Props>(
  ({ category, opportunityID, steps, setSteps, opportunity, scrollTo }, ref) => {
    const dispatch = useAppDispatch();
    const inEditMode = !isEmpty(opportunityID);
    const [uploadStatus, setUploadStatus] = React.useState<boolean>(false);
    const [descriptionUrl, setDescriptionUrl] = React.useState<string>("");
    // const wholeOpportunity: Opportunity = React.useMemo(
    //   () => ({
    //     jobDescriptionFile:{
    //       desc
    //     }
    //   }),
    //   [category, opportunity.stepTwo],
    // );
    const defaultValues: OpportunityStepTwo = React.useMemo(
      () => ({
        category,
        description:
          !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.description)
            ? opportunity.stepTwo.description
            : '',
        salaryDetail: {
          salaryType:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.salaryType
              : 'fixed',
          fixedAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.fixedAmount
              : '',
          maxAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.maxAmount
              : '',
          minAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.minAmount
              : '',
          variable:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.variable
              : true,
          variablePercentage:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.variablePercentage
              : '',
          variableType:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.variableType
              : 'fixed',
          variableMax:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.variableMax
              : '',
          variableMin:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.variableMin
              : '',
          cycle:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.cycle
              : 'Month',
          additionalDetail:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.additionalDetail
              : '',
          visibleToCandidate:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.visibleToCandidate
              : false,
          showSalary:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.showSalary
              : false,
          currency:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.salaryDetail)
              ? opportunity.stepTwo.salaryDetail.currency
              : 'INR',
        },
        stipendDetail: {
          stipendType:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.stipendType
              : 'fixed',
          cycle:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.cycle
              : 'Month',
          scale:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.scale
              : '',
          currency:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.currency
              : 'INR',
          fixedAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.fixedAmount
              : '',
          maxAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.maxAmount
              : '',
          minAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.minAmount
              : '',
          minAssuredAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.minAssuredAmount
              : '',
          maxAssuredAmount:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity.stepTwo.stipendDetail.maxAssuredAmount
              : '',
          showSalary:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.stipendDetail)
              ? opportunity?.stepTwo.stipendDetail.showSalary
              : false,
        },
        ...(category === 'job' && {
          attachments:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.attachments)
              ? opportunity.stepTwo.attachments
              : [{ title: '', file: '', toBeValidated: true }],
        }),
        ...(category === 'job' && {
          externalLinks:
            !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.externalLinks)
              ? opportunity.stepTwo.externalLinks
              : [{ title: '', url: '' }],
        }),
        contacts:
          !isEmpty(opportunity.stepTwo) && !isEmpty(opportunity.stepTwo.contacts)
            ? opportunity.stepTwo.contacts
            : [{ name: '', email: '', number: '' }],
      }),
      [category, opportunity.stepTwo],
    );
    const [showLabel, setShowLabel] = React.useState<string>('Choose File...');
    const {
      watch,
      reset,
      control,
      register,
      setValue,
      getValues,
      handleSubmit,
      formState: { errors },
    } = useForm<OpportunityStepTwo>({
      shouldUnregister: true,
      resolver: yupResolver(OpportunityStepTwoSchema),
      defaultValues: React.useMemo(() => defaultValues, [defaultValues]),
    });
    const [salaryDetail, stipendDetail] = [watch('salaryDetail'), watch('stipendDetail')];
    const { status, message, currentAction } = useAppSelector(
      (state: RootState) => state.postOpportunity,
    );

    React.useEffect(() => {
      if (inEditMode && !isEmpty(opportunity.stepTwo)) {
        reset(defaultValues);
      }
    }, [defaultValues, inEditMode, opportunity.stepTwo, reset]);
    React.useEffect(() => {
      if (!isEmpty(opportunity.jobDescriptionFile)) {
        setShowLabel(opportunity.jobDescriptionFile.name)
        setDescriptionUrl(opportunity.jobDescriptionFile.url)
      }
    }, [defaultValues, inEditMode, opportunity, reset]);

    React.useEffect(() => {
      if (status === 'success' && currentAction === 'editOpportunity-stepTwo') {
        setSteps({ ...steps, three: true });
        scrollTo && scrollTo();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAction, status]);

    React.useEffect(() => {
      if (!isEmpty(steps)) {
        const { one, two, three, four, five } = steps;
        if (one && two && three && !four && !five) {
          scrollTo && scrollTo(); // scroll to step three
        }
      }
    }, [scrollTo, steps]);

    const handleDescUpload = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = target;
      const file = files && files[0];
      if (file) {
        const formData = new FormData();
        const fileExtName = fileExtension(file.type);
        const name = kebabCase(file.name.split('.')[0]).substring(0, 50);
        setShowLabel(`Selected File: ${name}...${fileExtName}`);
        formData.append('descFile', file);
        try {
          setUploadStatus(true);
          const { data } = await addOpportunityDetail(formData, opportunityID);
          setValue('description', data.desc);
          setValue('descFileName', data.name);
          setDescriptionUrl(data.url);
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => {
            setUploadStatus(false);
          }, 1000);
        }
      }
    };


    const handleOnSubmit = (data: OpportunityStepTwo) => {
      const formData = new FormData();
      forEach(data, (value, key) => {
        if (key === 'attachments') {
          const attachments: Record<string, string>[] = [];
          forEach(value as attachment[], ({ title, file }) => {
            if (typeof file !== 'string') {
              formData.append('attachmentFiles', file[0], title);
            } else {
              attachments.push({ title, file });
            }
          });
          formData.append('attachments', JSON.stringify(attachments));
        } else if (['object', 'array'].includes(typeof value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
      formData.append('status', 'draft');
      formData.append('currentStep', 'stepTwo');
      dispatch(EditOpportunity(formData, opportunityID, 'stepTwo'));
    };

    const editorRef = useRef(null);

    return (
      <form onSubmit={handleSubmit(handleOnSubmit)} ref={ref}>
        <div className='box-container mb-4'>
          <div className='box-container-inner pb-3'>
            <div className='row'>
              <div className='form-row col-12'>
                <h2 className='bc-heading fw-500 txt-yl mb-4'>2. Job Description</h2>
              </div>
              <div className='form-group col-12'>
                <label className='label'>
                  Job Description <span className='note fw-400'>(Only PDF File)</span>
                </label>
                <div className='form-row align-items-end'>
                  <div className='col-4 mb-2 flex'>
                    <div className='custom-file'>
                      <input
                        type='file'
                        id='inputGroupFile01'
                        accept='application/pdf'
                        onChange={(event) => {
                          handleDescUpload(event);
                        }}
                        className='custom-file-input form-control'
                        aria-describedby='inputGroupFileAddon01'
                      />
                      <label
                        className='custom-file-label mb-0 form-control'
                        htmlFor='inputGroupFile01'
                      >
                        {showLabel}
                      </label>
                    </div>
                  </div>
                  {uploadStatus && (
                    <div className='col-4 mb-2'>
                      Uploading and processing your file, please wait
                    </div>
                  )}
                  <div className={`${uploadStatus ? 'col-4' : 'col-8'} text-right mb-2`}>
                    {/* <button className='text-link'>view sample pdf by hieq team</button> */}
                    <a href={descriptionUrl} target="_blank" className="text-link">view sample pdf by hieq team</a>
                  </div>
                </div>
                <label className='label'>Roles and Responsibilities</label>
                {/* <Editor
                  onInit={(evt, editor: any) => editorRef.current = editor}
                  initialValue="<p>Enter job description here.</p>"
                  {...register('description')}
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                /> */}
                {/* Will remove below code for text editor once new text editor code will be approved. */}

                <Controller
                  control={control}
                  name='description'
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (value: any) => {
                      onChange(value);
                    }
                    return (
                      <TextEditor
                        valueChange={handleOnchange}
                        // name={name}
                        value={value}
                      // control={control}
                      // register = {...register('description')}
                      // value={getValues('description')}
                      // placeholder='Enter job description here'
                      />
                    )
                  }}
                />
                <div className='text-right'>
                  <span className='note'>1000 words limit</span>
                </div>
                {errors.description && (
                  <div className='text-danger error mt-1'>
                    {capitalize(errors.description?.message)}
                  </div>
                )}
              </div>
              {category === 'job' && (
                <>
                  <div className='form-group col-12'>
                    <label className='label'>Do you want to show salary details?</label>
                    <div className='custom-control custom-switch custom-switch-lg'>
                      <input
                        type='checkbox'
                        id='showSalaryComponent'
                        className='custom-control-input'
                        {...register('salaryDetail.showSalary')}
                      />
                      <label className='custom-control-label' htmlFor='showSalaryComponent'>
                        {salaryDetail && salaryDetail.showSalary ? 'No' : 'Yes'}
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-12'>
                    <label className='label'>Salary Details</label>
                    <div className='custom-inline'>
                      <div className='custom-control custom-radio'>
                        <input
                          type='radio'
                          value='fixed'
                          id='salaryDetails1'
                          className='custom-control-input'
                          {...register('salaryDetail.salaryType')}
                        />
                        <label className='custom-control-label' htmlFor='salaryDetails1'>
                          Fixed
                        </label>
                      </div>
                      <div className='custom-control custom-radio'>
                        <input
                          type='radio'
                          value='range'
                          id='salaryDetails2'
                          {...register('salaryDetail.salaryType')}
                          className='custom-control-input'
                        />
                        <label className='custom-control-label' htmlFor='salaryDetails2'>
                          Range
                        </label>
                      </div>
                    </div>
                    {errors?.salaryDetail?.salaryType && (
                      <div className='text-danger error mt-1'>
                        {capitalize(errors.salaryDetail?.salaryType?.message)}
                      </div>
                    )}
                    <div className='form-row mt-2'>
                      {salaryDetail && salaryDetail.salaryType === 'fixed' && (
                        <div className='form-group col-2'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Amount'
                            {...register('salaryDetail.fixedAmount')}
                          />
                          {errors.salaryDetail?.fixedAmount && (
                            <div className='text-danger error mt-1'>
                              {capitalize(errors.salaryDetail?.fixedAmount?.message)}
                            </div>
                          )}
                        </div>
                      )}
                      {salaryDetail && salaryDetail.salaryType === 'range' && (
                        <>
                          <div className='form-group col-2'>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Min. Amount'
                              {...register('salaryDetail.minAmount')}
                            />
                            {errors.salaryDetail?.minAmount && (
                              <div className='text-danger error mt-1'>
                                {capitalize(errors.salaryDetail?.minAmount?.message)}
                              </div>
                            )}
                          </div>
                          <div className='form-group col-2'>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Max. Amount'
                              {...register('salaryDetail.maxAmount')}
                            />
                            {errors.salaryDetail?.maxAmount && (
                              <div className='text-danger error mt-1'>
                                {capitalize(errors.salaryDetail?.maxAmount?.message)}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      <div className='form-group col-2'>
                        <Controller
                          control={control}
                          name='salaryDetail.cycle'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                name={name}
                                options={cycles}
                                isSearchable={true}
                                styles={selectStyle}
                                onChange={handleOnchange}
                                placeholder='Year / Month'
                                components={{ IndicatorSeparator: () => null }}
                                value={cycles.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                        {errors.salaryDetail?.cycle && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.salaryDetail?.cycle?.message)}
                          </div>
                        )}
                      </div>
                      <div className='form-group col-2'>
                        <Controller
                          control={control}
                          name='salaryDetail.currency'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                name={name}
                                options={currency}
                                // isSearchable={true}
                                styles={selectStyle}
                                onChange={handleOnchange}
                                placeholder='Select Currency'
                                components={{ IndicatorSeparator: () => null }}
                                value={currency.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                        {errors.salaryDetail?.currency && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.salaryDetail?.currency?.message)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='form-group col-12'>
                    <label className='label'>Does it include variable component?</label>
                    <div className='custom-control custom-switch custom-switch-lg'>
                      <input
                        type='checkbox'
                        id='variableComponent'
                        className='custom-control-input'
                        {...register('salaryDetail.variable')}
                      />
                      <label className='custom-control-label' htmlFor='variableComponent'>
                        {salaryDetail && salaryDetail.variable ? 'No' : 'Yes'}
                      </label>
                    </div>
                    {errors.salaryDetail?.variable && (
                      <div className='text-danger error mt-1'>
                        {capitalize(errors.salaryDetail?.variable?.message)}
                      </div>
                    )}
                    {salaryDetail && salaryDetail.variable && (
                      <>
                        <div className='custom-inline'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value='fixed'
                              id='salaryDetails111'
                              className='custom-control-input'
                              {...register('salaryDetail.variableType')}
                            />
                            <label className='custom-control-label' htmlFor='salaryDetails111'>
                              Fixed
                            </label>
                          </div>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value='range'
                              id='salaryDetails211'
                              {...register('salaryDetail.variableType')}
                              className='custom-control-input'
                            />
                            <label className='custom-control-label' htmlFor='salaryDetails211'>
                              Range
                            </label>
                          </div>
                        </div>
                        {errors?.salaryDetail?.variableType && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.salaryDetail?.variableType?.message)}
                          </div>
                        )}
                        {salaryDetail.variableType == "fixed" && (
                          <>
                            <div className='form-row'>
                              <div className='col-3'>
                                <span className='note d-inline-block mb-1 mt-2'>
                                  Is there any variable compensation in addition to fixed compensation?
                                </span>
                              </div>
                            </div>
                            <div className='form-row'>
                              <div className='col-2'>
                                <div className='input-group ig-append'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='00.00'
                                    {...register('salaryDetail.variablePercentage')}
                                  />
                                  <div className='input-group-append input-click'>
                                    <span className='input-group-text'>%</span>
                                  </div>
                                </div>
                                {errors.salaryDetail?.variablePercentage && (
                                  <div className='text-danger error mt-1'>
                                    {capitalize(errors.salaryDetail?.variablePercentage?.message)}
                                  </div>
                                )}
                              </div>
                            </div></>
                        )}
                        {salaryDetail.variableType == "range" && (
                          <>
                            <div className='form-row'>
                              <div className='col-3'>
                                <span className='note d-inline-block mb-1 mt-2'>
                                  Is there any variable compensation in addition to fixed compensation?
                                </span>
                              </div>
                            </div>
                            <div className='form-row'>
                              <div className='col-2'>
                                <div className='input-group ig-append'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='00.00'
                                    {...register('salaryDetail.variableMin')}
                                  />
                                  <div className='input-group-append input-click'>
                                    <span className='input-group-text'>%</span>
                                  </div>
                                </div>
                                {errors.salaryDetail?.variableMin && (
                                  <div className='text-danger error mt-1'>
                                    {capitalize(errors.salaryDetail?.variableMin?.message)}
                                  </div>
                                )}
                                <div className='input-group ig-append'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='00.00'
                                    {...register('salaryDetail.variableMax')}
                                  />
                                  <div className='input-group-append input-click'>
                                    <span className='input-group-text'>%</span>
                                  </div>
                                </div>
                                {errors.salaryDetail?.variableMax && (
                                  <div className='text-danger error mt-1'>
                                    {capitalize(errors.salaryDetail?.variableMax?.message)}
                                  </div>
                                )}
                              </div>
                            </div></>

                        )}
                      </>
                    )}
                  </div>
                  <div className='form-group col-12'>
                    <label className='label'>Additional Details such as Flexible Work Hours</label>
                    {/* <Editor
                      onInit={(evt, editor: any) => editorRef.current = editor}
                      initialValue="<p>Enter job description here.</p>"
                      {...register('salaryDetail.additionalDetail')}
                      init={{
                        height: 250,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                    /> */}
                    <Controller
                      control={control}
                      name='salaryDetail.additionalDetail'
                      render={({ field: { onChange, value, name } }) => {
                        const handleOnchange = (value: any) => {
                          onChange(value);
                        }
                        return (
                          <TextEditor
                            valueChange={handleOnchange}
                            // name={name}
                            value={value}
                          // control={control}
                          // register = {...register('description')}
                          // value={getValues('description')}
                          // placeholder='Enter job description here'
                          />
                        )
                      }}
                    />
                    <div className='text-right'>
                      <span className='note'>500 words limit</span>
                    </div>
                    {errors.salaryDetail?.additionalDetail && (
                      <div className='text-danger error mt-1'>
                        {capitalize(errors.salaryDetail?.additionalDetail?.message)}
                      </div>
                    )}
                  </div>
                  <div className='form-group col-12'>
                    <label className='label'>Compensation visible to candidates</label>
                    <div className='custom-control custom-switch custom-switch-lg'>
                      <input
                        type='checkbox'
                        id='switchCompensation'
                        className='custom-control-input'
                        {...register('salaryDetail.visibleToCandidate')}
                      />
                      <label className='custom-control-label' htmlFor='switchCompensation'>
                        {salaryDetail && salaryDetail.visibleToCandidate ? 'No' : 'Yes'}
                      </label>
                    </div>
                    {errors.salaryDetail?.visibleToCandidate && (
                      <div className='text-danger error mt-1'>
                        {capitalize(errors.salaryDetail?.visibleToCandidate?.message)}
                      </div>
                    )}
                  </div>
                </>
              )}
              {category === 'internship' && (
                <>
                  <div className='form-group col-12'>
                    <label className='label'>Do you want to show salary details?</label>
                    <div className='custom-control custom-switch custom-switch-lg'>
                      <input
                        type='checkbox'
                        id='stipendDetails0'
                        className='custom-control-input'
                        {...register('stipendDetail.showSalary')}
                      />
                      <label className='custom-control-label' htmlFor='stipendDetails0'>
                        {stipendDetail && stipendDetail.showSalary ? 'No' : 'Yes'}
                      </label>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='form-row'>
                      <div className='col-6'>
                        <label className='label'>Stipend Details</label>
                        <div className='custom-inline ci-input'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value='fixed'
                              id='stipendDetails1'
                              className='custom-control-input'
                              {...register('stipendDetail.stipendType')}
                            />
                            <label className='custom-control-label' htmlFor='stipendDetails1'>
                              Fixed
                            </label>
                          </div>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value='negotiable'
                              id='stipendDetails2'
                              className='custom-control-input'
                              {...register('stipendDetail.stipendType')}
                            />
                            <label className='custom-control-label' htmlFor='stipendDetails2'>
                              Negotiable
                            </label>
                          </div>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value='performanceBased'
                              id='stipendDetails3'
                              className='custom-control-input'
                              {...register('stipendDetail.stipendType')}
                            />
                            <label className='custom-control-label' htmlFor='stipendDetails3'>
                              Performance Based
                            </label>
                          </div>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value='unpaid'
                              id='stipendDetails4'
                              className='custom-control-input'
                              {...register('stipendDetail.stipendType')}
                            />
                            <label className='custom-control-label' htmlFor='stipendDetails4'>
                              Unpaid
                            </label>
                          </div>
                        </div>
                        {errors.stipendDetail?.stipendType && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.stipendDetail?.stipendType?.message)}
                          </div>
                        )}
                      </div>
                      <div className='col-2'>
                        <label className='label'>Currency</label>
                        <Controller
                          control={control}
                          name='stipendDetail.currency'
                          render={({ field: { onChange, value, name } }) => {
                            const handleOnchange = (option: SingleValue<OptionType>) =>
                              onChange(option?.value);
                            return (
                              <Select
                                name={name}
                                options={currency}
                                isSearchable={true}
                                styles={selectStyle}
                                onChange={handleOnchange}
                                components={{ IndicatorSeparator: () => null }}
                                value={currency.find((c) => c.value === value)}
                              />
                            );
                          }}
                        />
                        {errors.stipendDetail?.currency && (
                          <div className='text-danger error mt-1'>
                            {capitalize(errors.stipendDetail?.currency?.message)}
                          </div>
                        )}
                      </div>
                    </div>
                    {stipendDetail && stipendDetail.stipendType === 'fixed' && (
                      <div className='form-row mt-2'>
                        <div className='form-group col-2'>
                          <input
                            type='text'
                            {...register('stipendDetail.fixedAmount')}
                            className='form-control'
                            placeholder='Fixed Amount'
                          />
                          {errors.stipendDetail?.fixedAmount && (
                            <div className='text-danger error mt-1'>
                              {capitalize(errors.stipendDetail?.fixedAmount?.message)}
                            </div>
                          )}
                        </div>
                        <div className='form-group col-2'>
                          <Controller
                            control={control}
                            name='stipendDetail.cycle'
                            render={({ field: { onChange, value, name } }) => {
                              const handleOnchange = (option: SingleValue<OptionType>) =>
                                onChange(option?.value);
                              return (
                                <Select
                                  name={name}
                                  options={cycles}
                                  isSearchable={true}
                                  styles={selectStyle}
                                  onChange={handleOnchange}
                                  placeholder='Year / Month'
                                  components={{ IndicatorSeparator: () => null }}
                                  value={cycles.find((c) => c.value === value)}
                                />
                              );
                            }}
                          />
                          {errors.stipendDetail?.cycle && (
                            <div className='text-danger error mt-1'>
                              {capitalize(errors.stipendDetail?.cycle?.message)}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {stipendDetail && stipendDetail.stipendType === 'negotiable' && (
                      <div className='form-row mt-2'>
                        <div className='form-group col-2'>
                          <input
                            type='text'
                            {...register('stipendDetail.minAmount')}
                            className='form-control'
                            placeholder='Min Amount'
                          />
                          {errors.stipendDetail?.minAmount && (
                            <div className='text-danger error mt-1'>
                              {capitalize(errors.stipendDetail?.minAmount?.message)}
                            </div>
                          )}
                        </div>
                        <div className='form-group col-2'>
                          <input
                            type='text'
                            {...register('stipendDetail.maxAmount')}
                            className='form-control'
                            placeholder='Max Amount'
                          />
                          {errors.stipendDetail?.maxAmount && (
                            <div className='text-danger error mt-1'>
                              {capitalize(errors.stipendDetail?.maxAmount?.message)}
                            </div>
                          )}
                        </div>
                        <div className='form-group col-2'>
                          <Controller
                            control={control}
                            name='stipendDetail.cycle'
                            render={({ field: { onChange, value, name } }) => {
                              const handleOnchange = (option: SingleValue<OptionType>) =>
                                onChange(option?.value);
                              return (
                                <Select
                                  name={name}
                                  options={cycles}
                                  isSearchable={true}
                                  styles={selectStyle}
                                  onChange={handleOnchange}
                                  placeholder='Year / Month'
                                  components={{ IndicatorSeparator: () => null }}
                                  value={cycles.find((c) => c.value === value)}
                                />
                              );
                            }}
                          />
                          {errors.stipendDetail?.cycle && (
                            <div className='text-danger error mt-1'>
                              {capitalize(errors.stipendDetail?.cycle?.message)}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {stipendDetail && stipendDetail.stipendType === 'performanceBased' && (
                      <div className='form-row mt-2'>
                        <div className='form-group ml-1 col-4'>
                          <div className='form-row'>
                            <label className='label w-100'>Minimum Assured</label>
                            <div className='form-group col-6 pl-0'>
                              <input
                                type='text'
                                {...register('stipendDetail.minAssuredAmount')}
                                className='form-control'
                                placeholder='Min Assured Amount'
                              />
                              {errors.stipendDetail?.minAssuredAmount && (
                                <div className='text-danger error mt-1'>
                                  {capitalize(errors.stipendDetail?.minAssuredAmount?.message)}
                                </div>
                              )}
                            </div>
                            <div className='form-group col-6'>
                              <Controller
                                control={control}
                                name='stipendDetail.cycle'
                                render={({ field: { onChange, value, name } }) => {
                                  const handleOnchange = (option: SingleValue<OptionType>) =>
                                    onChange(option?.value);
                                  return (
                                    <Select
                                      name={name}
                                      options={cycles}
                                      isSearchable={true}
                                      styles={selectStyle}
                                      onChange={handleOnchange}
                                      placeholder='Year / Month'
                                      components={{ IndicatorSeparator: () => null }}
                                      value={cycles.find((c) => c.value === value)}
                                    />
                                  );
                                }}
                              />
                              {errors.stipendDetail?.cycle && (
                                <div className='text-danger error mt-1'>
                                  {capitalize(errors.stipendDetail?.cycle?.message)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='form-group ml-1 col-4'>
                          <div className='form-row'>
                            <label className='label w-100'>Maximum Assured</label>
                            <div className='form-group col-6 pl-0'>
                              <input
                                type='text'
                                {...register('stipendDetail.maxAssuredAmount')}
                                className='form-control'
                                placeholder='Max Assured Amount'
                              />
                              {errors.stipendDetail?.maxAssuredAmount && (
                                <div className='text-danger error mt-1'>
                                  {capitalize(errors.stipendDetail?.maxAssuredAmount?.message)}
                                </div>
                              )}
                            </div>
                            <div className='form-group col-6'>
                              <Controller
                                control={control}
                                name='stipendDetail.scale'
                                render={({ field: { onChange, value, name } }) => {
                                  const handleOnchange = (option: SingleValue<OptionType>) =>
                                    onChange(option?.value);
                                  return (
                                    <Select
                                      name={name}
                                      options={scales}
                                      isSearchable={true}
                                      styles={selectStyle}
                                      onChange={handleOnchange}
                                      placeholder='Choose Scale'
                                      components={{ IndicatorSeparator: () => null }}
                                      value={scales.find((c) => c.value === value)}
                                    />
                                  );
                                }}
                              />
                              {errors.stipendDetail?.scale && (
                                <div className='text-danger error mt-1'>
                                  {capitalize(errors.stipendDetail?.scale?.message)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              <Contacts control={control} register={register} errors={errors} />
              {category === 'job' && (
                <ExternalLinks control={control} register={register} errors={errors} />
              )}
              {category === 'job' && (
                <Attachments
                  watch={watch}
                  errors={errors}
                  control={control}
                  register={register}
                  setValue={setValue}
                />
              )}
              <input type='hidden' {...register('descFileName')} />
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
  },
);

export default StepTwo;
