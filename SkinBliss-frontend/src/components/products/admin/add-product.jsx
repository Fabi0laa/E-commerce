import ErrorMsg from '@/components/common/error-msg';
import { useGetActiveBrandsQuery } from '@/redux/features/brandApi';
import { useGetShowCategoryQuery } from '@/redux/features/categoryApi';
import { useAddProductMutation, useModifyProductMutation } from '@/redux/features/productApi';
import NiceSelect from '@/ui/nice-select';
import { notifyError, notifySuccess } from '@/utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  photo: Yup.string().required().label('Photo'),
  desc: Yup.string().required().label('Description'),
  price: Yup.number().required().label('Price'),
  brandId: Yup.string().required().label('Brand'),
  categoryId: Yup.string().required().label('Category'),
  stock: Yup.number().required().label('Stock'),
  active: Yup.boolean().required().label('Active'),
  skinType: Yup.string().required().label('Skin Type'),
});

export const skinTypes = [
  { value: 'oily', text: 'Oily' },
  { value: 'dry', text: 'Dry' },
  { value: 'combination', text: 'Combination' },
  { value: 'sensitive', text: 'Sensitive' },
  { value: 'acne_prone_skin', text: 'Acne Prone Skin' },
  { value: 'dry_acne_prone_skin', text: 'Dry Acne Prone Skin' },
  { value: 'hiperpigmentation', text: 'Hiperpigmentation' },
];

function AddProductArea({ initialValues }) {
  const [addProduct, {}] = useAddProductMutation();
  const [editProduct, {}] = useModifyProductMutation();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetShowCategoryQuery();
  const { data: brands, isLoading: isLoadingBrands, isError: isErrorBrands } = useGetActiveBrandsQuery();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      photo: '',
      desc: '',
      price: null,
      brandId: '',
      categoryId: '',
      stock: null,
      active: true,
      skinType: '',
      ...(initialValues || {}),
    },
  });

  const onSubmit = (data) => {
    if (!initialValues) {
      addProduct(data).then((result) => {
        if (result?.error) {
          notifyError('Register Failed');
        } else {
          notifySuccess(result?.data?.message);
          reset();

          router.push('/manage-products');
        }
      });
      return;
    }

    editProduct({ id: initialValues.id, ...data }).then((result) => {
      if (result?.error) {
        notifyError('Register Failed');
      } else {
        notifySuccess(result?.data?.message);
        reset();

        router.push('/manage-products');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('name', { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Product Name</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('desc', { required: `Description is required!` })}
              id="desc"
              name="desc"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="desc">Description</label>
          </div>
          <ErrorMsg msg={errors.desc?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('photo', { required: `Photo is required!` })}
              id="photo"
              name="photo"
              type="text"
              placeholder="www.google.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="photo">Product Image</label>
          </div>
          <ErrorMsg msg={errors.photo?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input {...register('price', { required: `Price is required!` })} id="price" name="price" type="number" />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="price">Price</label>
          </div>
          <ErrorMsg msg={errors.price?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input {...register('stock', { required: `Stock is required!` })} id="stock" name="stock" type="number" />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="stock">Stock</label>
          </div>
          <ErrorMsg msg={errors.stock?.message} />
        </div>
        <div className="tp-login-input-box">
          {brands && (
            <div className="tp-login-select">
              <select {...register('brandId', { required: `Brand is required!` })} id="brandId" name="brandId">
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="tp-login-input-title">
            <label htmlFor="brandId">Brand</label>
          </div>
          <ErrorMsg msg={errors.brandId?.message} />
        </div>
        <div className="tp-login-input-box">
          {categories && (
            <div className="tp-login-select">
              <select
                {...register('categoryId', { required: `Category is required!` })}
                id="categoryId"
                name="categoryId"
                type="number"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="tp-login-input-title">
            <label htmlFor="categoryId">Category</label>
          </div>
          <ErrorMsg msg={errors.categoryId?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-select">
            <select
              {...register('skinType', { required: `Category is required!` })}
              id="skinType"
              name="skinType"
              type="number"
            >
              {skinTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.text}
                </option>
              ))}
            </select>
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="skinType">Skin Type</label>
          </div>
          <ErrorMsg msg={errors.skinType?.message} />
        </div>
        <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
          <div className="tp-login-remeber">
            <input
              {...register('active', {
                required: `Active is required!`,
              })}
              id="active"
              name="active"
              type="checkbox"
            />
            <label htmlFor="active">Is the product Active?</label>
            <ErrorMsg msg={errors.active?.message} />
          </div>
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          {!initialValues ? 'Add Product' : 'Edit Product'}
        </button>
      </div>
    </form>
  );
}

export default AddProductArea;
