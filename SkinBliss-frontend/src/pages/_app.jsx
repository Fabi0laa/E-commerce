import store from '@/redux/store';
import { Provider } from 'react-redux';
import ReactModal from 'react-modal';
import '../styles/index.scss';
import { AuthProvider } from '@/contexts/auth-provider';

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body');
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div id="root">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </Provider>
  );
}
