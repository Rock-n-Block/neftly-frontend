import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js/bignumber';
import { Observable } from 'rxjs';
import { chainsEnum } from 'typings';
import { getTokenAmount, getTokenAmountDisplay, getTronContract } from 'utils';
import Web3 from 'web3';

import abiERC721 from '../../appConstants/abiERC721.json';
import abiERC1155 from '../../appConstants/abiERC1155.json';
import { connectWallet as connectWalletConfig, contracts, is_production } from '../../config';

const MS_RETRY_TRON = 2000;
const trxFeeLimit = 100000000;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export class WalletConnect {
  public connectWallet: ConnectWallet;

  public tronWeb: any;

  public walletAddress = '';

  constructor() {
    this.connectWallet = new ConnectWallet();
    this.tronWeb = null;
    this.connectTronWeb();
  }

  public async initWalletConnect(
    chainName: chainsEnum,
    providerName: 'MetaMask' | 'WalletConnect',
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const { provider, network, settings } = connectWalletConfig(chainName);

      const connecting = this.connectWallet
        .connect(provider[providerName], network, settings)
        .then((connected: boolean | {}) => {
          return connected;
        })
        .catch((err: any) => {
          console.error('initWalletConnect providerWallet err: ', err);
        });

      Promise.all([connecting]).then((connect: any) => {
        resolve(connect[0]);
      });
    });
  }

  public logOut(): void {
    this.connectWallet.resetConect();
  }

  public Web3(): Web3 {
    return this.connectWallet.currentWeb3();
  }

  async connectTronWeb() {
    try {
      if (!window.tronWeb?.defaultAddress?.base58) {
        await delay(MS_RETRY_TRON);
      }
      this.tronWeb = window.tronWeb;
    } catch (err) {
      console.error(err);
    }
  }
  // Promise<string | number>

  public async getTokenBalance(contractAbi: string) {
    if (contractAbi === 'WTRX') {
      const { address } = contracts.params[contractAbi][is_production ? 'mainnet' : 'testnet'];
      const contract = await getTronContract(address);
      return contract.balanceOf(this.walletAddress).call();
    }
    const contract = this.connectWallet.getContract({
      address: contracts.params[contractAbi][is_production ? 'mainnet' : 'testnet'].address,
      abi: contracts.params[contractAbi][is_production ? 'mainnet' : 'testnet'].abi,
    });
    // eslint-disable-next-line consistent-return
    return contract.methods.balanceOf(this.walletAddress).call();
  }

  public setAccountAddress(address: string) {
    this.walletAddress = address;
  }

  async checkNftTokenAllowance(tokenAddress: string) {
    const contract = this.connectWallet.getContract({
      address: tokenAddress,
      abi: contracts.params.BEP20[is_production ? 'mainnet' : 'testnet'].abi,
    });

    const result = await contract.methods
      .isApprovedForAll(
        this.walletAddress,
        contracts.params.EXCHANGE[is_production ? 'mainnet' : 'testnet'].address,
      )
      .call();

    return result;
  }

  public getAccount(): Observable<IConnect | IError> {
    return this.connectWallet.getAccounts();
  }

  getWethBalance() {
    const contractAbi = 'WETH';
    const contract = this.connectWallet.getContract({
      address: contracts.params[contractAbi][is_production ? 'mainnet' : 'testnet'].address,
      abi: contracts.params[contractAbi][is_production ? 'mainnet' : 'testnet'].abi,
    });
    return contract.methods.balanceOf(this.walletAddress).call();
  }

  static getMethodInterface(abi: Array<any>, methodName: string) {
    return abi.filter((m) => {
      return m.name === methodName;
    })[0];
  }

  encodeFunctionCall(abi: any, data: Array<any>) {
    return this.Web3().eth.abi.encodeFunctionCall(abi, data);
  }

  async createTransaction(
    method: string,
    data: Array<any>,
    contract: 'BEP20' | 'WETH' | 'WBNB' | 'WMATIC' | 'WTRX' | 'NFT',
    tx?: any,
    tokenAddress?: string,
    walletAddress?: string,
    value?: any,
  ) {
    const transactionMethod = WalletConnect.getMethodInterface(
      contracts.params[contract][is_production ? 'mainnet' : 'testnet'].abi,
      method,
    );
    console.log('buy transaction');
    let signature;
    if (transactionMethod) {
      signature = this.encodeFunctionCall(transactionMethod, data);
    }

    if (tx) {
      tx.from = walletAddress || this.walletAddress;
      tx.data = signature;

      return this.sendTransaction(tx);
    }
    return this.sendTransaction({
      from: walletAddress || this.walletAddress,
      to: tokenAddress || contracts.params[contract][is_production ? 'mainnet' : 'testnet'].address,
      data: signature || '',
      value: value || '',
      // type: baseFeePerGas ? '0x2' : '0x0',
    });
  }

  sendTransaction(transactionConfig: any) {
    return this.Web3().eth.sendTransaction({
      ...transactionConfig,
      from: this.walletAddress,
    });
  }

  async trxCreateTransaction(data: any, address: string) {
    console.log(data);
    const { transaction } = await this.tronWeb.transactionBuilder.triggerSmartContract(
      data.contractAddress,
      data.function,
      data.options,
      data.parameter,
      address,
    );

    console.log(data.function, data.function.replace(/\(.*/, ''));
    const isTransferOrBurn =
      data.function.toLowerCase().includes('transfer') || data.function.includes('burn');
    console.log(isTransferOrBurn);

    if (isTransferOrBurn) {
      const abiSelecteor = data.is1155 ? abiERC1155 : abiERC721;
      const methodName = data.function.replace(/\(.*/, '');
      const params = data.parameter.map((param: any) => param.value);
      const contract = await this.tronWeb.contract(abiSelecteor, data.contractAddress);
      await contract[methodName](...params).send({
        from: address,
      });

      return null;
    }

    return this.trxSendTransaction(transaction);
  }

  async trxSendTransaction(transaction: any) {
    console.log(transaction, 12312313123);
    let receipt;
    try {
      const signedMsg = await this.tronWeb.trx.sign(transaction);
      receipt = await window.tronWeb.trx.sendRawTransaction(signedMsg);
    } catch (err: any) {
      console.log(err);
    }

    return receipt;
  }

  async totalSupply(tokenAddress: string, abi: Array<any>, tokenDecimals: number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
    const totalSupply = await contract.methods.totalSupply().call();

    return +new BigNumber(totalSupply).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
  }

  async checkTokenAllowance(
    contractName: string,
    tokenDecimals: number,
    approvedAddress?: string,
    walletAddress?: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const contract = this.connectWallet.getContract({
      address: contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].address,
      abi: contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].abi,
    });
    const walletAdr = walletAddress || this.walletAddress;

    try {
      let result = await contract.methods
        .allowance(
          walletAdr,
          approvedAddress ||
            contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].address,
        )
        .call();

      const totalSupply = await this.totalSupply(
        contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].address,
        contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].abi,
        tokenDecimals,
      );

      result =
        result === '0'
          ? null
          : +new BigNumber(result).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
      if (result && new BigNumber(result).minus(totalSupply).isPositive()) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async trxTotalSupply(contract: any) {
    const { _hex } = await contract.totalSupply().call();
    const totalSupply = new BigNumber(_hex).toString();
    return +getTokenAmountDisplay(totalSupply, 6);
  }

  async trxCheckAllowance(contractName: string, approvedAddress: string, walletAddress: string) {
    try {
      const contract = await this.tronWeb.contract().at(WalletConnect.getAddress(contractName));

      const { _hex } = await contract.allowance(walletAddress, approvedAddress).call();
      let result: number | string | null = new BigNumber(_hex).toString();
      const totalSupply = await this.trxTotalSupply(contract);

      result = result === '0' ? null : +getTokenAmount(result, 6);
      if (result && new BigNumber(result).minus(totalSupply).isPositive()) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('Allowance error', error);
      return false;
    }
  }

  async approveToken(
    contractName: string,
    tokenDecimals: number,
    approvedAddress?: string,
    walletAddress?: string,
  ) {
    try {
      const approveMethod = WalletConnect.getMethodInterface(
        contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].abi,
        'approve',
      );

      const approveSignature = this.encodeFunctionCall(approveMethod, [
        approvedAddress || walletAddress || this.walletAddress,
        WalletConnect.calcTransactionAmount(90071992000.5474099, tokenDecimals),
      ]);

      return this.sendTransaction({
        from: walletAddress || this.walletAddress,
        to: contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].address,
        data: approveSignature,
      });
    } catch (error) {
      return error;
    }
  }

  async trxApproveToken(contractName: string, approvedAddress: string) {
    try {
      const contract = await this.tronWeb.contract().at(WalletConnect.getAddress(contractName));

      const amount = WalletConnect.calcTransactionAmount(90071992000.5474099, 6);
      const res = await contract.approve(approvedAddress, amount).send({ feeLimit: trxFeeLimit });
      console.log('res', res);
      return true;
    } catch (error) {
      console.log('Approve error', error);
      return error;
    }
  }

  static calcTransactionAmount(amount: number | string, tokenDecimal: number): string {
    return new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimal)).toString(10);
  }

  static weiToEth(amount: number | string): string {
    return new BigNumber(amount).dividedBy(new BigNumber(10).pow(18)).toString(10);
  }

  static getAddress(contractName: string): string {
    return contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].address;
  }
}
