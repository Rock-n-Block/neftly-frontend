import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Routes, Modals } from 'containers';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import Footer from './components/Footer';
import Header from './components/Header';
import Connector from './services/walletConnect';
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
              <Routes />
              <Footer />
              <Modals />
            </Connector>
          </Router>
        </Provider>
      </GoogleReCaptchaProvider>
    </>
  );
}

export default App;
