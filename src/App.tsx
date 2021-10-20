import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { Header, Footer } from 'components';
import Connector from './services/walletConnect';
import { Routes, Modals, ScrollToTop } from 'containers';
import { Provider, rootStore } from './store';

import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss';

function App() {
  return (
    <>
      <ToastContainer />
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
}

export default App;
