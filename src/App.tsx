import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from 'components';
import { Footer, Modals, Routes, ScrollToTop } from 'containers';
import { useFetchTags } from 'hooks';

import Connector from './services/walletConnect';
import { Provider, rootStore } from './store';

import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss';

const App = () => {
  useFetchTags();
  return (
    <>
      <ToastContainer limit={3} pauseOnFocusLoss={false} />
      <GoogleReCaptchaProvider
        reCaptchaKey="6LfRLJscAAAAAEsnpB4vjDK-ZZABY6blkCiXk49v"
        language="en"
      >
        <Provider value={rootStore}>
          <Router>
            <Connector>
              <Header />
              <ScrollToTop>
                <Routes />
                <Modals />
              </ScrollToTop>
              <Footer />
            </Connector>
          </Router>
        </Provider>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default App;
