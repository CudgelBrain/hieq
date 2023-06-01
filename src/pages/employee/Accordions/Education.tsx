import React ,{useState} from 'react';

interface Props {
    open:boolean;
}
const Education:React.FC<Props> = ({open}): JSX.Element => {

    return (
        <>
             {open && <div className="mb-4">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-row">
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Degree<span className="required">*</span></label>
                                <input type="text" className="form-control" placeholder="High School (10th)"/>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Specialization<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">2022</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-8">
                                <label className="label mb-1">School<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Kendriya Vidyalaya No.1</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                    data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                      src={""} width="16" height="16" alt=""/></span></label>
                                <input type="text" className="form-control" placeholder="7.46"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={""} width="20"
                                    height="20" alt=""/><span className="ml-1">Add Senior Secondary details</span></button>
                              </div>
                              <div className="col-6 text-right pr-3">
                                <button type="submit" className="plus-btn"><img src={""} width="16"
                                    height="18" alt=""/></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col-md-12 pt-4 bt-1">&nbsp;</div>
                          <div className="col-12">
                            <div className="form-row">
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Degree<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">MBA</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Specialization<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">General Management</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">2022</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-8">
                                <label className="label mb-1">Institute<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Indian Institute of Mangement, Kashipur</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                    data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                      src={""} width="16" height="16" alt=""/></span></label>
                                <input type="text" className="form-control" placeholder="7.46"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={""} width="20"
                                    height="20" alt=""/><span className="ml-1">Add More</span></button>
                              </div>
                              <div className="col-6 text-right pr-3">
                                <button type="submit" className="plus-btn"><img src={""} width="16"
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

export default Education;
