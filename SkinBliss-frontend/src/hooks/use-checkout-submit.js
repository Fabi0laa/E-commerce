import * as dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
//internal import
import useCartInfo from './use-cart-info';
import { set_shipping } from '@/redux/features/order/orderSlice';
import { set_coupon } from '@/redux/features/coupon/couponSlice';
import { notifyError, notifySuccess } from '@/utils/toast';
import {
  useCreauseCreateOrderMutation,
  teOrderMutation,
  useSaveOrderMutation,
  useCreateOrderMutation,
} from '@/redux/features/order/orderApi';
import { useGetOfferCouponsQuery } from '@/redux/features/coupon/couponApi';

const useCheckoutSubmit = () => {
  // offerCoupons
  // addOrder
  const [saveOrder, {}] = useSaveOrderMutation();
  // createPaymentIntent
  const [createOrder, {}] = useCreateOrderMutation();
  // cart_products
  const { cart_products, total: cartTotal } = useCartInfo();
  // user
  const { user } = useSelector((state) => state.auth);
  // shipping_info
  const { shipping_info } = useSelector((state) => state.order);
  // total amount
  const { total, setTotal } = useCartInfo();
  // couponInfo
  //cartTotal
  // minimumAmount
  // shippingCost
  const [shippingCost, setShippingCost] = useState(0);
  // discountAmount
  // discountPercentage
  // discountProductType
  // isCheckoutSubmit
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  // cardError
  const [clientSecret, setClientSecret] = useState('');
  // showCard
  // coupon apply message

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  let couponRef = useRef('');

  // handleShippingCost

  //set values
  useEffect(() => {
    setValue('firstName', shipping_info.firstName);
    setValue('lastName', shipping_info.lastName);
    setValue('country', shipping_info.country);
    setValue('address', shipping_info.address);
    setValue('city', shipping_info.city);
    setValue('zipCode', shipping_info.zipCode);
    setValue('contactNo', shipping_info.contactNo);
    setValue('email', shipping_info.email);
    setValue('orderNote', shipping_info.orderNote);
  }, [user, setValue, shipping_info, router]);

  // submitHandler
  const submitHandler = async (data) => {
    let orderInfo = {
      address: {
        address: data.address,
        city: data.city,
        country: data.country,
        postal_code: data.zipCode,
      },
    };

    createOrder({
      ...orderInfo,
    }).then((res) => {
      if (res?.error) {
      } else {
        setIsCheckoutSubmit(false);
        notifySuccess('Your Order Confirmed!');
        router.push(`/order/${res?.data?.id}`);
      }
    });
  };

  // handlePaymentWithStripe

  return {
    couponRef,
    total,
    shippingCost,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    submitHandler,
    handleSubmit,
    clientSecret,
    setClientSecret,
    cartTotal,
    isCheckoutSubmit,
  };
};

export default useCheckoutSubmit;
