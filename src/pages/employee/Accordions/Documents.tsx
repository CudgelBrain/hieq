import React from 'react';
import plusGrey from 'assets/images/plus-grey.svg';
import greenTick from 'assets/images/green-tick.svg';

interface Props{
    open:Boolean;
}

const Documents:React.FC<Props> = ({open}):JSX.Element => {

    return(
        <>
            {open && <div className="mb-4">
                        <div className="row">
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Resume</label>
                          </div>
                          <div className="col-4">
                            <label className="label mb-1">Choose a resume</label>
                            <div className="input-group input-append mb-2 cursor">
                              <input type="text" className="form-control" value="nived general" readOnly/>
                              <div className="input-group-append"> <span className="input-group-text"></span> </div>
                            </div>
                            <div className="input-group input-append mb-2 cursor">
                              <input type="text" className="form-control" value="nived software" readOnly/>
                              <div className="input-group-append"> <span className="input-group-text"><img src={greenTick} height="25" alt=""/></span> </div>
                            </div>
                            <button type="submit" className="plus-btn"><img src={plusGrey} width="20"
                              height="20" alt=""/><span className="ml-1 cc-grey text-normal">Upload a new resume</span></button>
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Visume</label>
                          </div>
                          <div className="col-6">
                            <label className="label mb-1">Visume Drive Link</label>
                            <input type="text" className="form-control" placeholder="Enter or Paste Google Drive / YouTube Link"/>
                          </div>
                        </div>
                      </div>}
        </>
    )
}

export default Documents;