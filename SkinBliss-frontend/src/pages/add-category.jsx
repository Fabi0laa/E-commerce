import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddCategoryArea from '@/components/products/admin/add-category';
import AdminFormWrapper from '@/components/products/admin/admin-form-wrapper';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';

function AddCategory() {
  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Add new category" subtitle="Add Category" />
      <AdminFormWrapper>
        <AddCategoryArea />
      </AdminFormWrapper>

      <Footer primary_style={true} />
    </AdminWrapper>
  );
}

export default AddCategory;
