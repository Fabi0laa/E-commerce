import ErrorMsg from '@/components/common/error-msg';
import { useAddBrandMutation, useGetActiveBrandsQuery } from '@/redux/features/brandApi';
import { useAddCategoryMutation, useEditCategoryMutation, useGetShowCategoryQuery } from '@/redux/features/categoryApi';
import { useAddProductMutation } from '@/redux/features/productApi';
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
});

function AddCategoryArea({ initialValues }) {
  const [addCategory, {}] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
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
      ...(initialValues || {}),
    },
  });

  const onSubmit = (data) => {
    if (!initialValues) {
      addCategory(data).then((result) => {
        if (result?.error) {
          notifyError('Register Failed');
        } else {
          notifySuccess(result?.data?.message);
          reset();

          router.push('/manage-categories');
        }
      });
      return;
    }

    editCategory({ id: initialValues.id, data }).then((result) => {
      if (result?.error) {
        notifyError('Update Failed');
      } else {
        notifySuccess(result?.data?.message);
        reset();

        router.push('/manage-categories');
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
            <label htmlFor="name">Category Name</label>
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
            <label htmlFor="photo">Category Image</label>
          </div>
          <ErrorMsg msg={errors.photo?.message} />
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          {initialValues ? 'Edit' : 'Add'} Category
        </button>
      </div>
    </form>
  );
}

export default AddCategoryArea;
