import React from "react";
import starSolid from 'assets/images/star-solid.svg';
import plus from 'assets/images/plus.svg';
import starBlank from 'assets/images/star-blank.svg';
import deleteImg from 'assets/images/delete.svg';
import plusDark from 'assets/images/plus-dark.svg';

interface Props {
     open:Boolean;
}

const SkillsNPort:React.FC<Props> = ({open}) : JSX.Element => {
    return(
        <>
            {open && <div className="mb-4">
                        <div className="row pt-2">
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-3">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">HTML</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <div className="star-rating d-flex align-items-center">
                                  <img src={starSolid} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <button type="submit" className="plus-btn ml-4"><img src={deleteImg}
                                      width="16" height="18" alt=""/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-3">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">HTML</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <div className="star-rating d-flex align-items-center">
                                  <img src={starSolid} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <button type="submit" className="plus-btn ml-4"><img src={deleteImg}
                                      width="16" height="18" alt=""/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-3">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">HTML</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <div className="star-rating d-flex align-items-center">
                                  <img src={starSolid} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <button type="submit" className="plus-btn ml-4"><img src={deleteImg}
                                      width="16" height="18" alt=""/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={plus} width="20"
                                    height="20" alt="" /><span className="ml-1">Add More</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Social Media Links and Work Portfolio</label>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-2">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Facebook</option>
                                </select>
                              </div>
                              <div className="form-group d-flex align-items-center col-5">
                                <input type="text" className="form-control" placeholder="Enter or Paste link here"/>
                              </div>
                              <div className="form-group col-1">
                                <button type="submit" className="plus-btn ml-2"><img src={deleteImg}
                                    width="16" height="18" alt=""/></button>
                              </div>
      
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-2">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Facebook</option>
                                </select>
                              </div>
                              <div className="form-group d-flex align-items-center col-5">
                                <input type="text" className="form-control" placeholder="Enter or Paste link here"/>
                              </div>
                              <div className="form-group col-1">
                                <button type="submit" className="plus-btn ml-2"><img src={deleteImg}
                                    width="16" height="18" alt=""/></button>
                              </div>
      
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-2">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Facebook</option>
                                </select>
                              </div>
                              <div className="form-group d-flex align-items-center col-5">
                                <input type="text" className="form-control" placeholder="Enter or Paste link here"/>
                              </div>
                              <div className="form-group col-1">
                                <button type="submit" className="plus-btn ml-2"><img src={deleteImg}
                                    width="16" height="18" alt=""/></button>
                              </div>
      
                            </div>
                          </div>
      
      
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={plus} width="20"
                                    height="20" alt=""/><span className="ml-1">Add More</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Additional Information</label>
                          </div>
                          <div className="col-12 mt-3">
                            <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                height="20" alt=""/><span className="ml-1 cc-grey">Certifications/Licenses</span></button>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row pt-4">
                              <div className="col-12">
                                <div className="form-row">
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Certification<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true">
                                      <option value="">Scrum Master</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Institute<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true">
                                      <option value="">Project Management Institute</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Domain<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true">
                                      <option value="">Project Management</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Certification Date<span className="required">*</span></label>
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
                                    <label className="label mb-1">Valid till<span className="required">*</span></label>
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
                                        <label className="custom-control-label pl-1" htmlFor="loctype1">Valid for Lifetime</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mb-4">
                                <div className="row">
                                  <div className="col-6">
                                    <button type="submit" className="plus-btn"><img src={plus}
                                        width="20" height="20" alt=""/><span className="ml-1">Add More</span></button>
                                  </div>
                                  <div className="col-6 text-right pr-3">
                                    <button type="submit" className="plus-btn"><img src={deleteImg}
                                        width="16" height="18" alt=""/></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">Positions of Responsibility</span></button>
                              </div>
                              <div className="col-12 mt-2">
                                <textarea rows={4} className="form-control"></textarea>
                                <div className="text-right"><span className="note">250 words limit</span></div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">Projects, Publications</span></button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">EXTRA-curriculars</span></button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">ACHIEVEMENTS</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
            
            }
        </>
    )
}

export default SkillsNPort;