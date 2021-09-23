import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'containers';

import Footer from './components/Footer';
import Header from './components/Header';
import Page from './components/Page/index';
import Connector from './services/walletConnect';
import { Provider, rootStore } from './store/store';

import './styles/app.scss';

function App() {
  return (
    <Provider value={rootStore}>
      <Router>
        <Connector>
          <Page>
            <Header />
            <Routes />
            <Footer />
          </Page>
        </Connector>
      </Router>
    </Provider>
  );
}

export default App;
