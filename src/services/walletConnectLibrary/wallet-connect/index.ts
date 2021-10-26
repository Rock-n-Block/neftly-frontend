/* eslint-disable prefer-promise-reject-errors */
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Observable } from 'rxjs';

import { AbstractConnector } from '../abstract-connector';
import { parameters } from '../helpers';
import { IConnectorMessage, IProvider } from '../interface';

export class WalletsConnect extends AbstractConnector {
  public connector: WalletConnectProvider | undefined;

  /**
   * Connect wallet to application using connect wallet via WalletConnect by scanning Qr Code
   * in your favourite cryptowallet.
   */
  /**
   * Connect WalletConnect to application. Create connection with connect wallet and return provider for Web3.
   *
   * @returns return connect status and connect information with provider for Web3.
   * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
   */
  public async connect(provider: IProvider): Promise<IConnectorMessage> {
    return new Promise<any>((resolve, reject) => {
      if (provider.provider && provider.useProvider) {
        this.connector = new WalletConnectProvider(provider.provider[provider.useProvider] as any);
        this.connector
          .enable()
          .then(() => {
            resolve({
              code: 1,
              connected: true,
              provider: this.connector,
              message: {
                title: 'Success',
                subtitle: 'Wallet Connect',
                text: `Wallet Connect connected.`,
              },
            } as IConnectorMessage);
          })
          .catch(() => {
            reject({
              code: 5,
              connected: false,
              message: {
                title: 'Error',
                subtitle: 'Error connect',
                text: `User closed qr modal window.`,
              },
            } as IConnectorMessage);
          });
      }
    });
  }

  /**
   * Get account address and chain information from connected wallet.
   *
   * @returns return an Observable array with data error or connected information.
   * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
   */
  public getAccounts(): Observable<any> {
    const onError = (observer: any, errorParams: any) => {
      observer.error(errorParams);
    };

    const onNext = (observer: any, nextParams: any) => {
      observer.next(nextParams);
    };

    return new Observable((observer) => {
      if (this.connector && !this.connector.connected) {
        this.connector.createSession();
      }

      if (this.connector) {
        onNext(observer, {
          address: this.connector.accounts[0],
          network: parameters.chainsMap[parameters.chainIDMap[this.connector.chainId]],
        });

        this.connector.on('connect', (error: any, payload: any) => {
          if (error) {
            onError(observer, {
              code: 3,
              message: {
                title: 'Error',
                subtitle: 'Authorized error',
                message: 'You are not authorized.',
              },
            });
          }

          const { accounts, chainId } = payload.params[0];

          onNext(observer, { address: accounts, network: chainId });
        });

        this.connector.on('disconnect', (error: any, payload: any) => {
          if (error) {
            console.log('wallet connect on connect error', error, payload);
            onError(observer, {
              code: 6,
              message: {
                title: 'Error',
                subtitle: 'Disconnect',
                message: 'Wallet disconnected',
              },
            });
          }
        });

        this.connector.on('wc_sessionUpdate', (error: any, payload: any) => {
          console.log(payload, 'wc_sessionUpdate');
        });

        this.connector.on('wc_sessionRequest', (error: any, payload: any) => {
          console.log(payload, 'wc_sessionRequest');
        });

        this.connector.on('call_request', (error: any, payload: any) => {
          console.log(payload, 'call_request');
        });

        this.connector.on('session_update', (error: any, payload: any) => {
          console.log(payload, 'session_update');
        });

        this.connector.on('session_request', (error: any, payload: any) => {
          console.log(payload, 'session_request');
        });
      }

      return {
        unsubscribe(): any {},
      };
    });
  }
}
