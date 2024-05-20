import { useGetCartQuery } from '@/redux/features/cartApi';
import { useEffect, useState } from 'react';

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const { data: cart_products, isLoading, error } = useGetCartQuery();

  useEffect(() => {
    if (isLoading) return;
    if (error) return;

    const cart = cart_products?.cartProducts?.reduce(
      (cartTotal, cartItem) => {
        const { product, quantity } = cartItem;
        const itemTotal = product.price * quantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity += quantity;

        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      },
    );
    setQuantity(cart.quantity);
    setTotal(cart.total);
  }, [cart_products, isLoading, error]);
  return {
    quantity,
    total,
    setTotal,
    cart_products,
  };
};

export default useCartInfo;
