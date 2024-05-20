import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import MyOrders from '@/components/my-account/my-orders';
import ManageProductsArea from '@/components/products/admin/manage-products';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';
import { useGetAllOrdersQuery } from '@/redux/features/order/orderApi';

function ManageProducts() {
  const { data, isLoading, isError } = useGetAllOrdersQuery();
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Manage All Orders" subtitle="Manage Orders" />
      <section className="tp-cart-area pb-120">
        <div className="container">
          <MyOrders orderData={data} />
        </div>
      </section>
      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default ManageProducts;
