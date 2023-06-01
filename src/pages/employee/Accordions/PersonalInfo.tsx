import React, { ChangeEventHandler, useState } from 'react';
import calender from 'assets/images/calendar.svg';
import profile from 'assets/images/profile.jpg';

interface PersonalProps {
  open :boolean
}

const PersonalInfo: React.FC<PersonalProps> = ({open}): JSX.Element  => {
  // const [nameData, setName] = useState('');
  // const [emailData, setEmail] = useState('');
  // const [phData, setPh] = useState<number>(0);
  // const [genderData, setGender] = useState();
  // const [dobData, setDob] = useState();
  // const [summaryData, setSummary] = useState();

  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };
  // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target.value);
  // };
  // const handlePhChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   const newValue = parseInt(event.target.value, 10);
  //   setPh(newValue);
  // };
  // const handleGenderChange = (next: any) => {
  //   setGender(next);
  // };
  // const handledobChange = (next: any) => {
  //   setDob(next);
  // };
  // const handleSummaryChange = (next: any) => {
  //   setSummary(next);
  // };

  return (
    <>
      {open && <div className={`mb-4`}>
        <div className='col-md-8'>
          <div className='row'>
            <div className='row'>
              <div className='form-group col-12'>
                <label className='label mb-1'>
                  Full Name <span className='required'>*</span>
                </label>
                <input type='text' className='form-control' 
                // onChange={handleNameChange} 
                disabled />
              </div>
              <div className='col-12'>
                <div className='form-row'>
                  <div className='form-group col-sm-6'>
                    <label className='label mb-1'>
                      Email Address<span className='required'>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      // onChange={handleEmailChange}
                      disabled
                    />
                  </div>
                  <div className='form-group col-sm-6'>
                    <label className='label mb-1'>
                      Contact Number<span className='required'>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      // onChange={handlePhChange}
                      disabled
                    />
                  </div>
                  <div className='form-group col-sm-6'>
                    <label className='label mb-1'>
                      Gender<span className='required'>*</span>
                    </label>
                    <select
                      className='selectpicker form-control'
                      name='[gender]'
                      // onChange={handleGenderChange}
                    >
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='not'>Prefer don't say</option>
                    </select>
                  </div>
                  <div className='form-group col-sm-6'>
                    <label className='label mb-1'>
                      Date of Birth<span className='required'>*</span>
                    </label>
                    <div className='input-group input-append disabled'>
                      <input
                        type='text'
                        className='form-control'
                        // onChange={handledobChange}
                        disabled
                      />
                      <div className='input-group-append'>
                        {' '}
                        <span className='input-group-text'>
                          <img src={calender} height='20' alt='' />
                        </span>{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-4 text-center' style={{display:"flex", marginLeft:"120%"}}>
            <div className='change-img'>
              <div className='featured'  style={{marginTop:"-165px"}}>
                <img src={profile} width='150' height='150' alt='' />
              </div>
            </div>
          </div>
          <div className='form-group col-12'>
            <label className='label mb-1'>Profile Summary</label>
            <textarea rows={4} className='form-control' 
            // onChange={handleSummaryChange} 
            />
          </div>
        </div>
      </div>}
    </>
  );
};

export default PersonalInfo;
