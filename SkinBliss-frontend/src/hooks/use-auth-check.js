import { useSelector } from 'react-redux';

export default function useAuthCheck() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (auth?.user) {
  //     dispatch(
  //       userLoggedIn({
  //         user: auth.user,
  //       }),
  //     );
  //   }
  //   setAuthChecked(true);
  // }, [dispatch, setAuthChecked]);

  return user;
}
