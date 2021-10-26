import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { parameters } from './helpers';

export type TChainId = keyof typeof parameters.chainsMap;

export type TChainIdMap = Record<number, TChainId>;

export type THelperParameters = {
  chainIDMap: TChainIdMap;
  chainsMap: Record<string | number, INetwork>;
};

export interface IProvider {
  name: string;
  useProvider?: 'bridge' | 'infura' | 'rpc';
  provider?: {
    bridge?: {
      url: string;
      infura?: string[];
    };
    infura?: {
      infuraId: string;
    };
    rpc?: {
      rpc: {
        [index: number]: string;
      };
      chainId?: number;
    };
  };
}

export type ContractWeb3 = Contract;

export interface IConnect {
  address: string;
  type?: string;
  network: {
    name: string;
    chainID: number;
  };
}

export interface IConnectorMessage {
  code: number;
  type?: string;
  connected: boolean;
  provider?: string | any;
  message?: {
    title: string;
    subtitle: string;
    text: string;
  };
}

export interface IError {
  code: number;
  type?: string;
  message?: {
    title: string;
    subtitle: string;
    text: string;
  };
}

export interface ISettings {
  providerType?: boolean;
}

export interface INetwork {
  name: string;
  chainID: number;
}

export interface IMessageProvider {
  code: number;
  message?: {
    title?: string;
    text: string;
  };
  provider?: string;
}

export interface IContract {
  [index: string]: Contract;
}

export interface INoNameContract {
  address: string;
  abi: AbiItem | Array<AbiItem>;
}

export interface IAddContract extends INoNameContract {
  name: string;
}

export interface IChain {
  name: string;
  chainID: TChainId;
  hex: string;
}

export interface ICode {
  type: string;
  name: string;
}
