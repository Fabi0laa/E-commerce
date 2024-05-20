import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
// internal
import useCartInfo from '@/hooks/use-cart-info';
import RenderCartProgress from './render-cart-progress';
import empty_cart_img from '@assets/img/product/cartmini/empty-cart.png';
import { closeCartMini, remove_product } from '@/redux/features/cartSlice';
import { useRemoveProductFromCartMutation } from '@/redux/features/cartApi';

const CartMiniSidebar = () => {
  const { cartMiniOpen } = useSelector((state) => state.cart);
  const { total, cart_products } = useCartInfo();
  const dispatch = useDispatch();
  const [removeProduct, {}] = useRemoveProductFromCartMutation();

  // handle remove product
  const handleRemovePrd = (id) => {
    // dispatch(remove_product(prd));
    removeProduct({ id });
  };

  // handle close cart mini
  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };
  return (
    <>
      <div className={`cartmini__area tp-all-font-roboto ${cartMiniOpen ? 'cartmini-opened' : ''}`}>
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper">
            <div className="cartmini__top p-relative">
              <div className="cartmini__top-title">
                <h4>Shopping cart</h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={() => dispatch(closeCartMini())}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            <div className="cartmini__shipping">
              <RenderCartProgress />
            </div>
            {cart_products?.cartProducts?.length > 0 && (
              <div className="cartmini__widget">
                {cart_products?.cartProducts?.map((item) => (
                  <div key={item.productId} className="cartmini__widget-item">
                    <div className="cartmini__thumb">
                      <Link href={`/product-details/${item.productId}`}>
                        <Image src={item.product.photo} width={70} height={60} alt="product img" />
                      </Link>
                    </div>
                    <div className="cartmini__content">
                      <h5 className="cartmini__title">
                        <Link href={`/product-details/${item.productId}`}>{item.product.name}</Link>
                      </h5>
                      <div className="cartmini__price-wrapper">
                        {item.product?.discount > 0 ? (
                          <span className="cartmini__price">
                            $
                            {(
                              Number(item.product.price) -
                              (Number(item.product.price) * Number(item.product.discount)) / 100
                            ).toFixed(2)}
                          </span>
                        ) : (
                          <span className="cartmini__price">${item.product.price.toFixed(2)}</span>
                        )}
                        <span className="cartmini__quantity"> x{item.quantity}</span>
                      </div>
                    </div>
                    <a onClick={() => handleRemovePrd(item.productId)} className="cartmini__del cursor-pointer">
                      <i className="fa-regular fa-xmark"></i>
                    </a>
                  </div>
                ))}
              </div>
            )}
            {/* if no item in cart */}
            {cart_products?.cartProducts?.length === 0 && (
              <div className="cartmini__empty text-center">
                <Image src={empty_cart_img} alt="empty-cart-img" />
                <p>Your Cart is empty</p>
                <Link href="/shop" className="tp-btn">
                  Go to Shop
                </Link>
              </div>
            )}
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title mb-30">
              <h4>Subtotal:</h4>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cartmini__checkout-btn">
              <Link href="/cart" onClick={handleCloseCartMini} className="tp-btn mb-10 w-100">
                {' '}
                view cart
              </Link>
              <Link href="/checkout" onClick={handleCloseCartMini} className="tp-btn tp-btn-border w-100">
                {' '}
                checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* overlay start */}
      <div onClick={handleCloseCartMini} className={`body-overlay ${cartMiniOpen ? 'opened' : ''}`}></div>
      {/* overlay end */}
    </>
  );
};

export default CartMiniSidebar;
