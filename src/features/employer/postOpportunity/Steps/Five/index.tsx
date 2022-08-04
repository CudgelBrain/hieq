import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { OpportunityStepFive, OpportunityStepFiveSchema } from '../../postOpportunitySlice';

interface Props {
  category: string;
  opportunityID: string;
  opportunity: Record<string, any>;
  ref: React.RefObject<HTMLFormElement>;
}

const StepFive = React.forwardRef<HTMLFormElement, Props>(
  ({ category, opportunityID, opportunity }, ref) => {
    const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<OpportunityStepFive>({
      resolver: yupResolver(OpportunityStepFiveSchema),
    });

    return (
      <form ref={ref}>
        <div className='box-container mb-4'>
          <div className='box-container-inner pb-3'>
            <div className='row align-items-start'>
              <div className='form-row col-12'>
                <h2 className='bc-heading fw-500 txt-yl mb-4'>5. Custom Branding</h2>
              </div>
              <div className='form-row pr-5 col-7 mb-3'>
                <label className='label bc-heading text-center w-100 mb-3'>
                  Choose Banner Image
                </label>
                <div className='img-container'>
                  <div className='img-wrapper cust-scrollbar'>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype1'
                          name='ctype'
                          checked={false}
                        />
                        <label className='custom-control-label' htmlFor='ctype1'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/student.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype2'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype2'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-01.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype3'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype3'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-03.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype4'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype4'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-04.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype5'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype5'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-05.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype1'
                          name='ctype'
                          checked={false}
                        />
                        <label className='custom-control-label' htmlFor='ctype1'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/student.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype2'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype2'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-01.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype3'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype3'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-03.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype4'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype4'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-04.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='img-list'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='radio'
                          className='custom-control-input'
                          id='ctype5'
                          name='ctype'
                        />
                        <label className='custom-control-label' htmlFor='ctype5'>
                          <div className='img-list-inner'>
                            <img
                              className='img-cover img-fluid'
                              src='assets/images/students-05.jpg'
                              alt=''
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='form-row justify-content-center col-5 mb-3'>
                <label className='label bc-heading text-center w-100 mb-3'>
                  Upload your own Image
                </label>
                <div className='form-group'>
                  <label className='label'>
                    Desktop Image <span className='note'>(Size: w:1600px h:800px)</span>
                  </label>
                  <div className='img-preview'>
                    <img
                      className='img-cover img-fluid'
                      src='assets/images/students-05.jpg'
                      alt=''
                    />
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input form-control'
                      id='inputGroupFile01'
                      aria-describedby='inputGroupFileAddon01'
                    />
                    <label
                      className='custom-file-label mb-0 form-control'
                      htmlFor='inputGroupFile01'
                    >
                      Choose file
                    </label>
                  </div>
                </div>
                <div className='form-group'>
                  <label className='label'>
                    Mobile Image <span className='note'>(Size: w:500px h:800px)</span>
                  </label>
                  <div className='img-preview'>
                    <img
                      className='img-cover img-fluid'
                      src='assets/images/students-04.jpg'
                      alt=''
                    />
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input form-control'
                      id='inputGroupFile01'
                      aria-describedby='inputGroupFileAddon01'
                    />
                    <label
                      className='custom-file-label mb-0 form-control'
                      htmlFor='inputGroupFile01'
                    >
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <button type='submit' className='btn btn-yl btn-full btn-dn-curve'>
                  Save &amp; Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  },
);

export default StepFive;
