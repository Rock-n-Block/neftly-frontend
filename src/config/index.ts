import { IConnectWallet, IContracts, chainsEnum } from '../typings';
import ethImg from '../assets/img/icons/chains/eth.svg';
import bnbImg from '../assets/img/icons/chains/bnb.svg';
import polygonImg from '../assets/img/icons/chains/polygon.svg';
import metamaskImg from '../assets/img/icons/wallets/metamask.svg';

import { bep20Abi, erc20Abi, nftAbi, wbnbTestnetAbi, wethTestnetAbi, wMaticTestnetAbi } from './abi';

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

const exchangeAddrs = {
  [chainsEnum['Binance-Smart-Chain']]: !is_production
    ? '0x5Fb28cD9423c19FD990d02a44DaFF7787932D709'
    : '',
  [chainsEnum.Ethereum]: !is_production ? '0x190a5d4643e55313906344176F61724fC138501c' : '',
  [chainsEnum.Polygon]: !is_production ? '0x928724290F7F868C2fEe10720aE5b48C94c5139F' : '',
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
    WETH: {
      mainnet: {
        address: '',
        abi: nftAbi,
      },
      testnet: {
        address: '0xdf032bc4b9dc2782bb09352007d4c57b75160b15',
        abi: wethTestnetAbi,
      },
    },
    EXCHANGE: {
      mainnet: {
        address: exchangeAddrs[localStorage.nftcrowd_nft_chainName as chainsEnum],
        abi: [],
      },
      testnet: {
        address: exchangeAddrs[localStorage.nftcrowd_nft_chainName as chainsEnum],
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
        abi: wbnbTestnetAbi,
      },
    },
    WMATIC: {
      mainnet: {
        address: '0xAF984E23EAA3E7967F3C5E007fbe397D8566D23d',
        abi: erc20Abi,
      },
      testnet: {
        address: '0xCF1177e9f54eE20C6E80570D678462363d56C1E5',
        abi: wMaticTestnetAbi,
      },
    },
  },
};
