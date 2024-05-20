import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
// internal
import BackToTopCom from '@/components/common/back-to-top';
import Loader from '@/components/loader/loader';
import { useGetUserQuery } from '@/redux/features/auth/authApi';

const AdminWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: user, isLoading, isError, isSuccess } = useGetUserQuery();

  useEffect(() => {
    if ((!user && !isLoading) || isError) {
      router.push('/login');
      return;
    }

    if (user?.role === 'user') {
      router.push('/');
    }
  }, [user, router, isLoading, isError]);

  return !user ? (
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

export default AdminWrapper;
