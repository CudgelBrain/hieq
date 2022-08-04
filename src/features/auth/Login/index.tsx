import React from 'react';
import { useParams } from 'react-router-dom';
import WithOtp from './WithOtp';
import WithPassword from './WithPassword';

const components = {
  password: WithPassword,
  otp: WithOtp,
};

const Register = () => {
  const { type } = useParams<{ type: string }>();
  const ToRender = components[type as keyof typeof components];
  return (
    <React.Fragment>
      <ToRender />
    </React.Fragment>
  );
};

export default Register;
