import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddBrandArea from '@/components/products/admin/add-brand';
import AdminFormWrapper from '@/components/products/admin/admin-form-wrapper';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';

function AddBrand() {
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Add new brand" subtitle="Add Brand" />
      <AdminFormWrapper>
        <AddBrandArea />
      </AdminFormWrapper>

      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default AddBrand;
