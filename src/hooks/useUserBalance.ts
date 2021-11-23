import { useCallback, useEffect, useState } from 'react';

import { useWalletConnectorContext, WalletConnect } from 'services';

export default (
  userAddress: string,
  currency: string,
  refresh = false,
  isIntervalUpdate = false,
) => {
  const [balance, setBalance] = useState<string>('');

  const { walletService } = useWalletConnectorContext();

  const getUserBalance = useCallback(async () => {
    let req: Promise<any>;
    if (
      currency.toUpperCase() === 'BNB' ||
      currency.toUpperCase() === 'ETH' ||
      currency.toUpperCase() === 'MATIC'
    ) {
      req = walletService.connectWallet.getBalance(userAddress);
    } else {
      req = walletService.getTokenBalance(currency.toUpperCase());
    }

    req.then((data: string | number) => {
      setBalance(WalletConnect.weiToEth(data.toString()));
    });
  }, [walletService, userAddress, currency]);

  useEffect(() => {
    let interval: any = null;
    if (userAddress || (userAddress && refresh)) {
      getUserBalance();
      if (isIntervalUpdate && !interval) {
        interval = setInterval(getUserBalance, 30000);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [getUserBalance, userAddress, refresh, isIntervalUpdate]);

  return balance;
};
