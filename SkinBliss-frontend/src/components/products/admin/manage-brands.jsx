import { useDeleteBrandMutation, useGetActiveBrandsQuery, useGetBrandQuery } from '@/redux/features/brandApi';
import { useRemoveProductFromCartMutation } from '@/redux/features/cartApi';
import { useDeleteProductMutation, useGetAllProductsQuery } from '@/redux/features/productApi';
import { Close } from '@/svg';
import EditIcon from '@/svg/edit-icon';
import Image from 'next/image';
import Link from 'next/link';

function ManageBrandArea() {
  const { data: brands, isLoading, isError, isSuccess } = useGetActiveBrandsQuery();
  const [deleteBrand, {}] = useDeleteBrandMutation();

  return (
    <section className="tp-cart-area pb-120">
      <div className="container">
        {brands?.length > 0 && (
          <div className="row">
            <div className="col-xl-16 col-lg-14">
              <div className="tp-cart-list mb-25 mr-30">
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan="2" className="tp-cart-header-product">
                        Brand
                      </th>
                      <th colSpan={'6'} className="tp-cart-header-price">
                        Description
                      </th>
                      <th className="tp-cart-header-quantity">Actions</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map(({ id, photo, name, desc }) => (
                      <tr key={id}>
                        <td className="tp-cart-img">
                          <Link href={`/edit-brand/${id}`}>
                            <Image src={photo} alt="product img" width={70} height={100} />
                          </Link>
                        </td>
                        {/* title */}
                        <td className="tp-cart-title">
                          <Link href={`/edit-brand/${id}`}>{name}</Link>
                        </td>

                        <td className="tp-cart-price" colSpan={'6'}>
                          <span>{desc}</span>
                        </td>
                        <td className="tp-cart-title">
                          <button onClick={() => deleteBrand(id)} className="tp-cart-action-btn">
                            <Close />
                            <span> Delete</span>
                          </button>
                          <Link href={`/edit-brand/${id}`} className="tp-cart-action-btn">
                            <EditIcon />
                            <span> Edit</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
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

export default ManageBrandArea;
