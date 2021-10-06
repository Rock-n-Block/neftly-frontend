import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Routes } from 'containers';

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
      <Provider value={rootStore}>
        <Router>
          <Connector>
            <Header />
            <Routes />
            <Footer />
          </Connector>
        </Router>
      </Provider>
    </>
  );
}

export default App;
