import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Page from './components/Page/index';
import Activity from './pages/Activity/index';
import ConnectWallet from './pages/ConnectWallet/index';
import Faq from './pages/Faq/index';
import Home from './pages/Home/index';
import Item from './pages/Item/index';
import Profile from './pages/Profile/index';
import ProfileEdit from './pages/ProfileEdit/index';
import Search01 from './pages/Search01/index';
import Search02 from './pages/Search02/index';
import UploadDetails from './pages/UploadDetails/index';
import UploadVariants from './pages/UploadVariants/index';
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
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route
                path="/upload-variants"
                render={() => {
                  return localStorage.nft_token ? <UploadVariants /> : <Redirect to="/" />;
                }}
              />
              <Route
                path="/upload-details-single"
                render={() => {
                  return localStorage.nft_token ? <UploadDetails isSingle /> : <Redirect to="/" />;
                }}
              />
              <Route
                path="/upload-details-multiple"
                render={() => {
                  return localStorage.nft_token ? (
                    <UploadDetails isSingle={false} />
                  ) : (
                    <Redirect to="/" />
                  );
                }}
              />
              <Route path="/connect-wallet">
                <ConnectWallet />
              </Route>
              <Route path="/faq">
                <Faq />
              </Route>
              <Route path="/activity">
                <Activity />
              </Route>
              <Route path="/search01">
                <Search01 />
              </Route>
              <Route path="/search02">
                <Search02 />
              </Route>
              <Route path="/profile/:userId">
                <Profile />
              </Route>
              <Route path="/profile-edit">
                <ProfileEdit />
              </Route>
              <Route path="/item/:itemId">
                <Item />
              </Route>
            </Switch>
            <Footer />
          </Page>
        </Connector>
      </Router>
    </Provider>
  );
}

export default App;
