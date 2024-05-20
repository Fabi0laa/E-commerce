import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import ManageProductsArea from '@/components/products/admin/manage-products';
import ManageUsersArea from '@/components/products/admin/manage-users';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';

function ManageUsers() {
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Manage All Users" subtitle="Manage Users" />
      <ManageUsersArea />
      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default ManageUsers;
