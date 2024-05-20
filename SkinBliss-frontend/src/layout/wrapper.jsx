import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
// internal
import BackToTopCom from '@/components/common/back-to-top';
import ProductModal from '@/components/common/product-modal';
import { get_cart_products, initialOrderQuantity } from '@/redux/features/cartSlice';
import { get_compare_products } from '@/redux/features/compareSlice';
import Loader from '@/components/loader/loader';
import { useGetUserQuery } from '@/redux/features/auth/authApi';
import QuizModal from '@/components/common/quiz-modal';
import { handleQuizModalOpen } from '@/redux/features/quizModalSlice';

const Wrapper = ({ children }) => {
  const { productItem } = useSelector((state) => state.productModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: user, isLoading, isError, isSuccess } = useGetUserQuery();
  const [openedOnce, setOpenedOnce] = useState(false);
  const { isModalOpen } = useSelector((state) => state.quizModal);

  useEffect(() => {
    dispatch(get_cart_products());
    dispatch(get_compare_products());
    dispatch(initialOrderQuantity());
  }, [dispatch]);

  useEffect(() => {
    if ((!user && !isLoading) || isError) {
      router.push('/login');
    }
  }, [user, router, isLoading, isError]);

  useEffect(() => {
    if (user && user?.skinType === 'not_specified' && !isModalOpen && user.role === 'user') {
      const openBefore = sessionStorage.getItem('quizModalOpened');
      // if (Boolean(openBefore)) return;
      dispatch(handleQuizModalOpen());
      // setOpenedOnce(true);
      sessionStorage.setItem('quizModalOpened', 'true');
    }
  }, [user, dispatch, isModalOpen]);

  return !user ? (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Loader spinner="fade" loading={!user} />
    </div>
  ) : (
    <div id="wrapper">
      {children}
      <BackToTopCom />
      <ToastContainer />
      {/* product modal start */}
      {productItem && <ProductModal />}
      <QuizModal />
      {/* product modal end */}
    </div>
  );
};

export default Wrapper;
