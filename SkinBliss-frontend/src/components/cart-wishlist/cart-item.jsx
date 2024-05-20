import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
// internal
import { Close, Minus, Plus } from '@/svg';
import { useRemoveProductFromCartMutation, useUpdateCartMutation } from '@/redux/features/cartApi';

const CartItem = ({ product }) => {
  const {
    title,
    product: { price, photo: img, id, name },
    quantity = 0,
  } = product || {};

  const [deleteFromCart, {}] = useRemoveProductFromCartMutation();
  const [updateCart, {}] = useUpdateCartMutation();

  // handle add product
  const handleAddProduct = (prd) => {
    updateCart({
      productId: prd.productId,
      quantity: quantity + 1,
    });
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    updateCart({
      productId: prd.productId,
      quantity: quantity - 1,
    });
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    deleteFromCart(prd);
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${id}`}>
          <Image src={img} alt="product img" width={70} height={100} />
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link href={`/product-details/${id}`}>{name}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>${(price * quantity).toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={() => handleDecrement(product)} className="tp-cart-minus">
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={quantity} readOnly />
          <span onClick={() => handleAddProduct(product)} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button onClick={() => handleRemovePrd({ id: id })} className="tp-cart-action-btn">
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
