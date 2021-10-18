import React, { createContext, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';
import { is_production } from 'config';
import { observer } from 'mobx-react';
import { connectTron, userApi, WalletConnect } from 'services';
import { rootStore } from 'store';
import { chainsEnum } from 'typings';

declare global {
  interface Window {
    ethereum: any;
    kardiachain: any;
  }
}

const walletConnectorContext = createContext<{
  connect: (chainName: chainsEnum, providerName: 'MetaMask' | 'WalletConnect' | 'TronLink') => void;
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
    if (window.ethereum) {
      if (localStorage.netfly_nft_chainName && localStorage.netfly_nft_providerName) {
        if (localStorage.netfly_nft_chainName === 'Tron') {
          connectTron();
          return;
        }
        this.connect(localStorage.netfly_nft_chainName, localStorage.netfly_nft_providerName);
      }
    }
  }

  connect = async (
    chainName: chainsEnum,
    providerName: 'MetaMask' | 'WalletConnect' | 'TronLink',
  ) => {
    if (window.ethereum) {
      try {
        console.log(chainName, providerName, 'COONNNECT');
        const isConnected = await this.state.provider.initWalletConnect(
          chainName,
          providerName as any,
        );
        if (isConnected) {
          const subscriber = this.state.provider.getAccount().subscribe(
            async (userAccount: any) => {
              if (rootStore.user.address && userAccount.address !== rootStore.user.address) {
                subscriber.unsubscribe();
                this.disconnect();
              } else {
                this.state.provider.setAccountAddress(userAccount.address);
                if (!localStorage.nftcrowd_nft_token) {
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

                  localStorage.nftcrowd_nft_token = login.data.key;
                }
                localStorage.nftcrowd_nft_chainName = chainName;
                localStorage.nftcrowd_nft_providerName = providerName;
                rootStore.user.setAddress(userAccount.address);
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
              alert(
                `Wrong Network, please select ${
                  is_production ? 'mainnet' : 'testnet'
                } network in your wallet and try again`,
              );
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
    delete localStorage.nftcrowd_nft_chainName;
    delete localStorage.nftcrowd_nft_providerName;
    delete localStorage.walletconnect;
    delete localStorage.nftcrowd_nft_token;

    this.props.history.push('/');
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
