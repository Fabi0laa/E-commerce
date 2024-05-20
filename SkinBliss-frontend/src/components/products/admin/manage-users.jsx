import { useDisableUserAccountMutation, useGetAllUsersQuery } from '@/redux/features/auth/authApi';
import { Close } from '@/svg';
import Link from 'next/link';

function ManageUsersArea() {
  const { data: users, isLoading, isError, isSuccess } = useGetAllUsersQuery();
  const [disableUserAccount, {}] = useDisableUserAccountMutation();

  return (
    <section className="tp-cart-area pb-120">
      <div className="container">
        {users?.length > 0 && (
          <div className="row">
            <div className="col-xl-16 col-lg-14">
              <div className="tp-cart-list mb-25 mr-30">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="tp-cart-header-product">Name</th>
                      <th className="tp-cart-header-product">Surname</th>
                      <th className="tp-cart-header-price">Phone</th>
                      <th className="tp-cart-header-quantity">Email</th>
                      <th className="tp-cart-header-quantity">Skin Type</th>
                      <th className="tp-cart-header-quantity">Active</th>
                      <th className="tp-cart-header-quantity">Actions</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(({ id, email, name, surname, phone, skinType, active }) => (
                      <tr key={id}>
                        {/* title */}
                        <td className="tp-cart-title">
                          <Link href={``}>{name}</Link>
                        </td>
                        <td className="tp-cart-title">
                          <Link href={``}>{surname}</Link>
                        </td>

                        <td className="tp-cart-price">
                          <span>{phone}</span>
                        </td>
                        <td className="tp-cart-price">
                          <span>{email}</span>
                        </td>

                        <td className="tp-cart-price">
                          <span>{skinType}</span>
                        </td>
                        <td className="tp-cart-price">
                          <span>{active ? 'active' : 'inactive'}</span>
                        </td>
                        <td className="tp-cart-title">
                          <button onClick={() => disableUserAccount(id)} className="tp-cart-action-btn">
                            <Close />
                            <span> Make inactive</span>
                          </button>
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

export default ManageUsersArea;
