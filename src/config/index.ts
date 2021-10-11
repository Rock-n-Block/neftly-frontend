import { IConnectWallet, IContracts, chainsEnum } from '../typings';
import ethImg from '../assets/img/icons/chains/eth.svg';
import bnbImg from '../assets/img/icons/chains/bnb.svg';
import polygonImg from '../assets/img/icons/chains/polygon.svg';
import metamaskImg from '../assets/img/icons/wallets/metamask.svg';

import { bep20Abi, erc20Abi, nftAbi } from './abi';

export const is_production = false;

export const chains: {
  [key: string]: {
    name: chainsEnum;
    chainId: number;
    provider: {
      [key: string]: any;
    };
    img?: any;
    explorer: string;
  };
} = {
  [chainsEnum.Ethereum]: {
    name: chainsEnum.Ethereum,
    chainId: is_production ? 1 : 4,
    img: ethImg,
    explorer: is_production ? '' : '',
    provider: {
      MetaMask: { name: 'MetaMask', img: metamaskImg },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 1 : 4]: is_production
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-2-s1.binance.org:8545/',
            },
            chainId: is_production ? 1 : 4,
          },
        },
      },
    },
  },
  [chainsEnum['Binance-Smart-Chain']]: {
    name: chainsEnum['Binance-Smart-Chain'],
    chainId: is_production ? 56 : 97,
    img: bnbImg,
    provider: {
      MetaMask: { name: 'MetaMask', img: metamaskImg },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 56 : 97]: is_production
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-2-s1.binance.org:8545/',
            },
            chainId: is_production ? 56 : 97,
          },
        },
      },
    },
    explorer: is_production ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
  },
  [chainsEnum.Polygon]: {
    name: chainsEnum.Polygon,
    chainId: is_production ? 137 : 80001,
    img: polygonImg,
    provider: {
      MetaMask: { name: 'MetaMask', img: metamaskImg },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 137 : 80001]: is_production
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-2-s1.binance.org:8545/',
            },
            chainId: is_production ? 137 : 80001,
          },
        },
      },
    },
    explorer: is_production ? '' : '',
  },
};

export const connectWallet = (
  chainName: chainsEnum,
): IConnectWallet & {
  blockchains: Array<string>;
} => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask', 'WalletConnect'],
    blockchains: ['Ethereum', 'Binance Smart Chain', 'Polygon'],
    network: {
      name: chain.name.toString(),
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: ['Token', 'Staking', 'Presale', 'UsdtToken'],
  decimals: 18,
  params: {
    BEP20: {
      mainnet: {
        address: '',
        abi: bep20Abi,
      },
      testnet: {
        address: '',
        abi: bep20Abi,
      },
    },
    NFT: {
      mainnet: {
        address: '',
        abi: nftAbi,
      },
      testnet: {
        address: '',
        abi: nftAbi,
      },
    },
    EXCHANGE: {
      mainnet: {
        address: '0xEca42E21C0D44a7Df04F1f0177C321a123eA9B14',
        abi: [],
      },
      testnet: {
        address:
          localStorage.netfly_nft_chainName === 'Binance'
            ? '0xF61a883f0688C58cb83fba808bAf6F0e18448366'
            : '0xdC2fBC02197dF78643a53a39fD5F322307613127',
        abi: [],
      },
    },
    WBNB: {
      mainnet: {
        address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        abi: erc20Abi,
      },
      testnet: {
        address: '0x591873d1fff4ae144307f8da8dcfbb52b00bdf20',
        abi: erc20Abi,
      },
    },
  },
};
