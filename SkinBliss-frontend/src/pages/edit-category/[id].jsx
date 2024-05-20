import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddCategoryArea from '@/components/products/admin/add-category';
import AdminFormWrapper from '@/components/products/admin/admin-form-wrapper';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';
import { useGetCategoryQuery } from '@/redux/features/categoryApi';

function EditCategory({ query }) {
  const { data: category, isLoading, isError } = useGetCategoryQuery(query.id);

  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Edit category" subtitle="Edit Category" />
      <AdminFormWrapper>{category && <AddCategoryArea initialValues={category} />}</AdminFormWrapper>

      <Footer primary_style={true} />
    </AdminWrapper>
  );
}
export default EditCategory;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
