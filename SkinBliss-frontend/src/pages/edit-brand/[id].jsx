import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddBrandArea from '@/components/products/admin/add-brand';
import AddProductArea from '@/components/products/admin/add-product';
import AdminFormWrapper from '@/components/products/admin/admin-form-wrapper';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';
import { useGetBrandQuery } from '@/redux/features/brandApi';
import { useGetProductQuery } from '@/redux/features/productApi';

function EditBrand({ query }) {
  const { data: brand, isLoading, isError } = useGetBrandQuery(query.id);

  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Edit brand" subtitle="Edit Brand" />
      <AdminFormWrapper>{brand && <AddBrandArea initialValues={brand} />}</AdminFormWrapper>

      <Footer primary_style={true} />
    </AdminWrapper>
  );
}
export default EditBrand;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
