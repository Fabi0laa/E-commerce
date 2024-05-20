import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import ManageProductsArea from '@/components/products/admin/manage-products';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';

function ManageProducts() {
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Manage All Products" subtitle="Manage Products" />
      <ManageProductsArea />
      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default ManageProducts;
