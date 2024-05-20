import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import ManageCategoriesArea from '@/components/products/admin/manage-categories';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';

function ManageCategories() {
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Manage All Categories" subtitle="Manage Categories" />
      <ManageCategoriesArea />
      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default ManageCategories;
