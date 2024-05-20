import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddProductArea from '@/components/products/admin/add-product';
import AdminFormWrapper from '@/components/products/admin/admin-form-wrapper';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';

function AddProduct() {
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Add new product" subtitle="Add Product" />
      <AdminFormWrapper>
        <AddProductArea />
      </AdminFormWrapper>

      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default AddProduct;
