
import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthPage from '@/components/auth/AuthPage';

const Auth = () => {
  const location = useLocation();
  const language = (location.state?.language as 'en' | 'np') || 'en';

  return <AuthPage language={language} />;
};

export default Auth;
