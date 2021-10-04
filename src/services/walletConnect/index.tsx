import React, { createContext, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';
import { is_production } from 'config';
import { observer } from 'mobx-react';
import { userApi, WalletConnect } from 'services';
import { rootStore } from 'store/store';

declare global {
  interface Window {
    ethereum: any;
    kardiachain: any;
  }
}

const walletConnectorContext = createContext<{
  connect: (
    chainName: 'Binance' | 'KardiaChain',
    providerName: 'MetaMask' | 'WalletConnect' | 'WalletLink' | 'KardiaChain',
  ) => void;
  disconnect: () => void;
  walletService: WalletConnect;
}>({
  connect: (): void => {},
  disconnect: (): void => {},
  walletService: new WalletConnect(),
});

@observer
class Connector extends React.Component<
  any,
  {
    provider: WalletConnect;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new WalletConnect(),
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    if (window.ethereum || window.kardiachain) {
      if (localStorage.netfly_nft_chainName && localStorage.netfly_nft_providerName) {
        this.connect(localStorage.netfly_nft_chainName, localStorage.netfly_nft_providerName);
      }
    }
  }

  connect = async (
    chainName: 'Binance' | 'KardiaChain',
    providerName: 'MetaMask' | 'WalletConnect' | 'WalletLink' | 'KardiaChain',
  ) => {
    if (window.ethereum || window.kardiachain) {
      try {
        const isConnected = await this.state.provider.initWalletConnect(chainName, providerName);
        if (isConnected) {
          const subscriber = this.state.provider.getAccount().subscribe(
            async (userAccount: any) => {
              if (rootStore.user.address && userAccount.address !== rootStore.user.address) {
                subscriber.unsubscribe();
                this.disconnect();
              } else {
                this.state.provider.setAccountAddress(userAccount.address);
                if (!localStorage.netfly_nft_token) {
                  const metMsg: any = await userApi.getMsg();
                  const signedMsg = await this.state.provider.connectWallet.signMsg(
                    userAccount.address,
                    metMsg.data,
                  );

                  const login: any = await userApi.login({
                    address: userAccount.address,
                    msg: metMsg.data,
                    signedMsg,
                  });

                  localStorage.netfly_nft_token = login.data.key;
                  rootStore.user.setAddress(userAccount.address);
                  if (this.props.location.pathname === '/connect-wallet') {
                    this.props.history.goBack();
                  }
                }
                localStorage.netfly_nft_chainName = chainName;
                localStorage.netfly_nft_providerName = providerName;
                rootStore.user.getMe();
              }
            },
            (err: any) => {
              console.log('getAccount wallet connect - get user account err: ', err);
              if (err.code && err.code === 6) {
                console.log('');
              } else {
                this.disconnect();
              }
              notification.error({
                message: err.message.title,
                description: `Wrong Network, please select ${
                  is_production ? 'mainnet' : 'testnet'
                } network in your wallet and try again`,
              });
            },
          );
        }
      } catch (err) {
        console.log(err);
        this.disconnect();
      }
    }
  };

  disconnect() {
    rootStore.user.disconnect();
    delete localStorage.netfly_nft_chainName;
    delete localStorage.netfly_nft_providerName;
    delete localStorage.walletconnect;

    this.props.history.push('/');
    // if (
    //   [
    //     '/upload-variants',
    //     '/upload-details-single',
    //     '/profile',
    //     '/upload-details-multiple',
    //   ].includes(this.props.location.pathname)
    // ) {
    //   this.props.history.push('/');
    // }
  }

  render() {
    return (
      <walletConnectorContext.Provider
        value={{
          walletService: this.state.provider,
          connect: this.connect,
          disconnect: this.disconnect,
        }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

export default withRouter(Connector);

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}
