import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddProductArea from '@/components/products/admin/add-product';
import AdminFormWrapper from '@/components/products/admin/admin-form-wrapper';
import AdminWrapper from '@/layout/admin-wrapper';
import Footer from '@/layout/footers/footer';
import HeaderTwo from '@/layout/headers/header-2';
import { useGetProductQuery } from '@/redux/features/productApi';

function EditProduct({ query }) {
  const { data: product, isLoading, isError } = useGetProductQuery(query.id);

  return (
    <AdminWrapper>
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Edit product" subtitle="Edit Product" />
      <AdminFormWrapper>{product && <AddProductArea initialValues={product} />}</AdminFormWrapper>

      <Footer primary_style={true} />
    </AdminWrapper>
  );
}
export default EditProduct;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
