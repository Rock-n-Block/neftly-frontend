import React from 'react';
import { useWalletConnectorContext } from '../services/walletConnect';
import { WalletConnect } from '../services/walletService';

export default (userAddress: string, currency: string, refresh = false) => {
  const [balance, setBalance] = React.useState<string>('');

  const { walletService } = useWalletConnectorContext();

  const getUserBalance = React.useCallback(() => {
    let req: Promise<any>;
    if (currency.toUpperCase() === 'BNB' || currency.toUpperCase() === 'ETH') {
      req = walletService.connectWallet.getBalance(userAddress);
    } else {
      req = walletService.getTokenBalance(currency.toUpperCase());
    }
    req.then((data: string | number) => {
      setBalance(WalletConnect.weiToEth(data));
    });
  }, [walletService, userAddress, currency]);

  React.useEffect(() => {
    if (userAddress || (userAddress && refresh)) {
      getUserBalance();
    }
  }, [getUserBalance, userAddress, refresh]);

  return balance;
};
