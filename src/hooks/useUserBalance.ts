import React from 'react';
import { contracts, is_production } from 'config';
import { getTronBalance } from 'services/tron/tronConnect';
import { getTronContract } from 'utils';

import { useWalletConnectorContext } from '../services/walletConnect';
import { WalletConnect } from '../services/walletService';

export default (userAddress: string, currency: string) => {
  const [balance, setBalance] = React.useState<string>('');

  const { walletService } = useWalletConnectorContext();

  const getUserBalance = React.useCallback(async () => {
    let req: Promise<any>;
    if (currency.toUpperCase() === 'TRX') {
      req = getTronBalance(userAddress);
    } else if (currency.toUpperCase() === 'WTRX') {
      const { address } = contracts.params.WTRX[is_production ? 'mainnet' : 'testnet'];
      const contract = await getTronContract(address);
      req = contract.balanceOf(userAddress).call();
    } else if (currency.toUpperCase() === 'BNB' || currency.toUpperCase() === 'ETH') {
      req = walletService.connectWallet.getBalance(userAddress);
    } else {
      req = walletService.getTokenBalance(currency.toUpperCase());
    }

    req.then((data: string | number) => {
      // convert to string cause tron contracts return balance in BN
      setBalance(WalletConnect.weiToEth(data));
    });
  }, [walletService, userAddress, currency]);

  React.useEffect(() => {
    if (userAddress) {
      getUserBalance();
    }
  }, [getUserBalance, userAddress]);

  return balance;
};
