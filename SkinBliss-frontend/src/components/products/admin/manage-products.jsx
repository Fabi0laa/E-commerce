import { useRemoveProductFromCartMutation } from '@/redux/features/cartApi';
import { useDeleteProductMutation, useGetAllProductsQuery } from '@/redux/features/productApi';
import { Close } from '@/svg';
import EditIcon from '@/svg/edit-icon';
import Image from 'next/image';
import Link from 'next/link';

function ManageProductsArea() {
  const { data: products, isLoading, isError, isSuccess } = useGetAllProductsQuery();
  const [deleteProduct, {}] = useDeleteProductMutation();

  return (
    <section className="tp-cart-area pb-120">
      <div className="container">
        {products?.length > 0 && (
          <div className="row">
            <div className="col-xl-16 col-lg-14">
              <div className="tp-cart-list mb-25 mr-30">
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan="2" className="tp-cart-header-product">
                        Product
                      </th>
                      <th className="tp-cart-header-price">Price</th>
                      <th className="tp-cart-header-quantity">Stock</th>
                      <th className="tp-cart-header-quantity">Category</th>
                      <th className="tp-cart-header-quantity">Brand</th>
                      <th className="tp-cart-header-quantity">Skin Type</th>
                      <th className="tp-cart-header-quantity">Active</th>
                      <th className="tp-cart-header-quantity">Actions</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(({ id, photo, price, stock, name, category, brand, skinType, active }) => (
                      <tr key={id}>
                        <td className="tp-cart-img">
                          <Link href={`/product-details/${id}`}>
                            <Image src={photo} alt="product img" width={70} height={100} />
                          </Link>
                        </td>
                        {/* title */}
                        <td className="tp-cart-title">
                          <Link href={`/product-details/${id}`}>{name}</Link>
                        </td>
                        <td className="tp-cart-price">
                          <span>${price.toFixed(2)}</span>
                        </td>
                        <td className="tp-cart-price">
                          <span>{stock}</span>
                        </td>
                        <td className="tp-cart-price">
                          <span>{category.name}</span>
                        </td>
                        <td className="tp-cart-price">
                          <span>{brand.name}</span>
                        </td>
                        <td className="tp-cart-price">
                          <span>{skinType}</span>
                        </td>
                        <td className="tp-cart-price">
                          <span>{active ? 'active' : 'inactive'}</span>
                        </td>
                        <td className="tp-cart-title">
                          <button onClick={() => deleteProduct({ id: id })} className="tp-cart-action-btn">
                            <Close />
                            <span> Make inactive</span>
                          </button>
                          <Link href={`/edit-product/${id}`} className="tp-cart-action-btn">
                            <EditIcon />
                            <span> Edit</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {/* {cart_products.cartProducts.map((item, i) => (
                      <CartItem key={i} product={item} />
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ManageProductsArea;
