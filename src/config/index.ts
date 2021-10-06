import { IConnectWallet, IContracts } from '../typings';

import { bep20Abi, erc20Abi, nftAbi } from './abi';

export const is_production = false;

export const chains = {
  Binance: {
    name: 'binance-testnet',
    chainId: is_production ? 56 : 97,
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletLink: {
        name: 'WalletLink',
        useProvider: 'infura',
        provider: {
          infura: {
            infuraId: 'b939155f8c9941ab8fd0c47fe6ddb601',
          },
        },
      },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 56 : 97]: is_production
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            },
            chainId: is_production ? 56 : 97,
          },
        },
      },
    },
  },
  KardiaChain: {
    name: 'KardiaChain',
    chainId: is_production ? 0 : 69,
    provider: {
      KardiaChain: { name: 'KardiaChain' },
    },
  },
};

export const connectWallet = (chainName: 'Binance' | 'KardiaChain'): IConnectWallet => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask', 'WalletConnect', 'WalletLink', 'KardiaChain'],
    network: {
      name: chain.name,
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
    BUSD: {
      mainnet: {
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        abi: erc20Abi,
      },
      testnet: {
        address: '0x86e9dcd4ce61f0091ead7e283085ef808c8fd2f3',
        abi: erc20Abi,
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
    KPHI: {
      mainnet: {
        address:
          localStorage.netfly_nft_chainName === 'Binance'
            ? '0xfa4a5c4ce029fd6872400545df44675219c2e037'
            : '0x6CD689DefCA80f9F2CBED9D0C6f3B2Cf4abc4598',
        abi: erc20Abi,
      },
      testnet: {
        address:
          localStorage.netfly_nft_chainName === 'Binance'
            ? '0xe55f13926c3f630df80b13a8f9bc8603a44aa025'
            : '0xa26A0c2c9E81332C6654922b3800e2487a49D40F',
        abi: erc20Abi,
      },
    },
    KUSDT: {
      mainnet: {
        address: '0x92364Ec610eFa050D296f1EEB131f2139FB8810e',
        abi: erc20Abi,
      },
      testnet: {
        address: '0x5070383762806D838EbA8d7a877075b77d59FE74',
        abi: erc20Abi,
      },
    },
    WKAI: {
      mainnet: {
        address: '0xAF984E23EAA3E7967F3C5E007fbe397D8566D23d',
        abi: erc20Abi,
      },
      testnet: {
        address: '0x02655eEF130e5F37F8b648BD9c8D10aA2e6bf698',
        abi: erc20Abi,
      },
    },
  },
};
