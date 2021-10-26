/* eslint-disable prefer-promise-reject-errors */
import { Observable } from 'rxjs';
import WalletLink from 'walletlink';

import { AbstractConnector } from '../abstract-connector';
import { parameters } from '../helpers';
import { IConnectorMessage, IProvider } from '../interface';

export class WalletLinkConnect extends AbstractConnector {
  public connector: any;

  private chainID = 0;

  /**
   * WalletLinkConnect class to connect browser Coinbase Wallet extention to your application
   * using connect wallet.
   */

  /**
   * Connect Coinbase Wallet browser. Create connection with connect
   * wallet and return provider for Web3.
   *
   * @returns return connect status and connect information with provider for Web3.
   * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
   */
  public connect(provider: IProvider, usedChain: number): Promise<IConnectorMessage> {
    return new Promise<any>((resolve, reject) => {
      if (typeof window.ethereum && window.ethereum.isWalletLink === true) {
        this.connector = window.ethereum;
        resolve({
          code: 1,
          connected: true,
          provider: this.connector,
          message: {
            title: 'Success',
            subtitle: 'Connect success',
            text: `WalletLink found and connected.`,
          },
        } as IConnectorMessage);
      } else {
        const walletLink = new WalletLink({
          darkMode: false,
          appName: '123',
          overrideIsMetaMask: true,
        });

        const chain = parameters.chainsMap[parameters.chainIDMap[usedChain]];
        this.chainID = chain.chainID;

        if (provider.provider && provider.provider.infura) {
          this.connector = walletLink.makeWeb3Provider(
            `https://${chain.name}.infura.io/v3/${provider.provider.infura.infuraId}`,
            usedChain,
          );
        }

        resolve({
          code: 1,
          connected: true,
          provider: this.connector,
          message: {
            title: 'Success',
            subtitle: 'WalletLink Connect',
            text: `WalletLink found and connected.`,
          },
        } as IConnectorMessage);
      }

      reject({
        code: 2,
        connected: false,
        message: {
          title: 'Error',
          subtitle: 'Error connect',
          text: `WalletLink not found, please install it from <a href='https://metamask.io/' target="_blank">metamask.io</a>.`,
        },
      } as IConnectorMessage);
    });
  }

  private ethRequestAccounts(): Promise<any> {
    return this.connector.enable();
  }

  /**
   * Get account address and chain information from Coinbase Wallet extention.
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
      if (this.connector) {
        // this.connector.on('chainChanged', async (chainId: string) => {
        //   const accounts = await this.ethRequestAccounts();
        //   onNext(observer, {
        //     address: accounts[0],
        //     network: parameters.chainsMap[parameters.chainIDMap[+chainId]],
        //   });
        // });

        this.connector.on('accountsChanged', (address: Array<any>) => {
          if (address.length) {
            onNext(observer, {
              address: address[0],
              network: parameters.chainsMap[parameters.chainIDMap[+this.chainID]],
            });
          } else {
            onError(observer, {
              code: 3,
              message: {
                title: 'Error',
                subtitle: 'Authorized error',
                message: 'You are not authorized.',
              },
            });
          }
        });

        this.ethRequestAccounts()
          .then((accounts) => {
            if (!accounts[0]) {
              this.connector.enable().catch(() => {
                onError(observer, {
                  code: 3,
                  message: {
                    title: 'Error',
                    subtitle: 'Authorized error',
                    message: 'You are not authorized.',
                  },
                });
              });
            } else if (accounts[0]) {
              this.connector
                .request({
                  method: 'net_version',
                })
                .then((chainID: string) => {
                  this.chainID = +chainID;
                  onNext(observer, {
                    address: accounts[0],
                    network: parameters.chainsMap[parameters.chainIDMap[+chainID]],
                  });
                });
            } else {
              onError(observer, {
                code: 3,
                message: {
                  title: 'Error',
                  subtitle: 'Authorized error',
                  message: 'You are not authorized.',
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
}
