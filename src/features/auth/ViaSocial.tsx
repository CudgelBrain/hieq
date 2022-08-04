import React, { useState, useRef } from 'react';
import googleImg from 'assets/images/google-ico.svg';
import linkedInImg from 'assets/images/linkedin-ico.svg';
import {
  IResolveParams,
  TypeCrossFunction,
  LoginSocialGoogle,
  LoginSocialLinkedin,
} from 'reactjs-social-login';

interface Props {
  googleButtonText: string;
  linkedInButtonText: string;
}

const ViaSocial: React.FC<Props> = ({ googleButtonText, linkedInButtonText }) => {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();
  const googleRef = useRef<TypeCrossFunction>(null!);
  const linkedinRef = useRef<TypeCrossFunction>(null!);

  console.log({ provider, profile });

  return (
    <React.Fragment>
      <LoginSocialGoogle
        ref={googleRef}
        client_id={process.env.REACT_APP_GOOGLE_APP_ID || ''}
        onLoginStart={() => null}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <button type='button' className='btn w-100 btn-gmail d-inline-flex'>
          <img className='ml-2' src={googleImg} height='20' alt='' />
          <span className='flex-grow-1'>{googleButtonText}</span>
        </button>
      </LoginSocialGoogle>
      <LoginSocialLinkedin
        ref={linkedinRef}
        client_id={process.env.REACT_APP_LINKEDIN_APP_ID ?? ''}
        client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET ?? ''}
        redirect_uri={process.env.REACT_APP_REDIRECT_URI ?? ''}
        onLoginStart={() => null}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <button type='button' className='btn w-100 btn-linkedin d-inline-flex mt-2'>
          <img className='ml-2' src={linkedInImg} height='18' alt='' />
          <span className='flex-grow-1'>{linkedInButtonText}</span>
        </button>
      </LoginSocialLinkedin>
    </React.Fragment>
  );
};

export default ViaSocial;
