import React from 'react';
import plus from 'assets/images/plus.svg';
import deleteImg from 'assets/images/delete.svg'

interface Props{
open:Boolean;
}

const WorkExp:React.FC<Props> = ({open}): JSX.Element => {
    return(
        <>
            {open &&   <div className="mb-4">
                        <div className="row">
                          <div className="form-group col-12">
                            <div className="d-flex align-items-center txt-md">
                              <span className="mr-2">Fresher</span>
                              <div className="custom-control custom-switch custom-switch-lg">
                                <input type="checkbox" className="custom-control-input" id="switchVariable" checked={true}/>
                                <label className="custom-control-label" htmlFor="switchVariable">Experienced</label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group d-inline-flex align-items-center pr-0 col-3 pt-2">
                            <label className="label mb-0">Total Work Experience<span className="required">*</span></label>
                          </div>
                          <div className="form-group col-5 pt-2">
                            <div className="form-row">
                              <div className="col-6"><select className="selectpicker form-control">
                                  <option value="">Year</option>
                                </select></div>
                              <div className="col-6"><select className="selectpicker form-control">
                                  <option value="">Month</option>
                                </select></div>
                            </div>
                          </div>
                        </div>
                        <div className="row pt-2">
                          <div className="col-12">
                            <div className="form-row">
                              <div className="form-group col-4">
                                <label className="label mb-1">Organization<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Tata Consultancy Services (TCS)</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">Designation<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Systems Engineer</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">Employment Type<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Full-Time Job</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">From<span className="required">*</span></label>
                                <div className="form-row">
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Month</option>
                                    </select></div>
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Year</option>
                                    </select></div>
                                </div>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">To<span className="required">*</span></label>
                                <div className="form-row">
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Month</option>
                                    </select></div>
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Year</option>
                                    </select></div>
                                </div>
                              </div>
                              <div className="col-4 d-flex align-items-center">
                                <div className="custom-inline">
                                  <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype"/>
                                    <label className="custom-control-label pl-1" htmlFor="loctype1">I currently work here</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="label mb-1">Description (Role, responsibilities, achievements etc.)</label>
                            <textarea rows={8} className="form-control"></textarea>
                            <div className="text-right"><span className="note">250 words limit</span></div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={plus} width="20"
                                    height="20" alt=""/><span className="ml-1">Add More</span></button>
                              </div>
                              <div className="col-6 text-right pr-3">
                                <button type="submit" className="plus-btn"><img src={deleteImg} width="16"
                                    height="18" alt=""/></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
            
            }
        </>
    )
}

export default WorkExp;