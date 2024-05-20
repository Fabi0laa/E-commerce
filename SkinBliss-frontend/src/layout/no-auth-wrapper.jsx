import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
// internal
import BackToTopCom from '@/components/common/back-to-top';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loader from '@/components/loader/loader';
import { useGetUserQuery } from '@/redux/features/auth/authApi';

const NoAuthWrapper = ({ children }) => {
  const { data: user, isLoading, isError } = useGetUserQuery();

  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading && !isError) {
      router.push('/');
    }
  }, [user, router, isLoading, isError]);

  return (isLoading || user) && !isError ? (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Loader spinner="fade" loading={!user} />
    </div>
  ) : (
    <div id="wrapper">
      {children}
      <BackToTopCom />
      <ToastContainer />
    </div>
  );
};

export default NoAuthWrapper;
