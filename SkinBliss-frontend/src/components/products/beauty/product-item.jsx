import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
// internal
import { Cart, QuickView } from '@/svg';
import { handleProductModal } from '@/redux/features/productModalSlice';
import useCartInfo from '@/hooks/use-cart-info';
import { useAddProductToCartMutation } from '@/redux/features/cartApi';

const ProductItem = ({ product, prdCenter = false, primary_style = false }) => {
  const { id, photo, name, price, status, stock } = product || {};
  const { cart_products } = useCartInfo();
  const isAddedToCart = cart_products?.cartProducts?.some((prd) => prd.product.id === id);
  const dispatch = useDispatch();
  const [addToCart, {}] = useAddProductToCartMutation();

  // handle add product
  const handleAddProduct = (prd) => {
    addToCart({
      productId: prd.id,
    });
  };

  return (
    <div
      className={`tp-product-item-3 mb-50 ${primary_style ? 'tp-product-style-primary' : ''} ${
        prdCenter ? 'text-center' : ''
      }`}
    >
      <div className="tp-product-thumb-3 mb-15 fix p-relative z-index-1">
        <Link href={`/product-details/${id}`}>
          <Image src={photo} alt="product image" width={282} height={320} />
        </Link>

        <div className="tp-product-badge">{stock === 0 && <span className="product-hot">out-stock</span>}</div>

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? 'active' : ''
                } tp-product-add-cart-btn text-center`}
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-3 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                disabled={status === 'out-of-stock'}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>
          </div>
        </div>

        <div className="tp-product-add-cart-btn-large-wrapper">
          {isAddedToCart ? (
            <Link href="/cart" className="tp-product-add-cart-btn-large text-center">
              View To Cart
            </Link>
          ) : (
            <button
              onClick={() => handleAddProduct(product)}
              type="button"
              className="tp-product-add-cart-btn-large"
              disabled={status === 'out-of-stock'}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
      <div className="tp-product-content-3">
        <h3 className="tp-product-title-3">
          <Link href={`/product-details/${id}`}>{name}</Link>
        </h3>
        <div className="tp-product-price-wrapper-3">
          <span className="tp-product-price-3">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
