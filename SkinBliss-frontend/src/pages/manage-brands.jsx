import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import ManageBrandArea from '@/components/products/admin/manage-brands';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';

function ManageBrands() {
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Manage All Brands" subtitle="Manage Brands" />
      <ManageBrandArea />
      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default ManageBrands;
