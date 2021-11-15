import {useCallback, useEffect, useState} from 'react';
import {contracts, is_production} from 'config';
import {getTronBalance} from 'services/tron';
import {getTronContract} from 'utils';

import {useWalletConnectorContext, WalletConnect} from 'services';

export default (userAddress: string, currency: string, refresh = false) => {
  const [balance, setBalance] = useState<string>('');

  const {walletService} = useWalletConnectorContext();

  const getUserBalance = useCallback(async () => {
    let req: Promise<any>;
    if (currency.toUpperCase() === 'TRX') {
      req = getTronBalance(userAddress);
    } else if (currency.toUpperCase() === 'WTRX') {
      const {address} = contracts.params.WTRX[is_production ? 'mainnet' : 'testnet'];
      const contract = await getTronContract(address);
      req = contract.balanceOf(userAddress).call();
    } else if (
      currency.toUpperCase() === 'BNB' ||
      currency.toUpperCase() === 'ETH' ||
      currency.toUpperCase() === 'MATIC'
    ) {
      req = walletService.connectWallet.getBalance(userAddress);
    } else {
      req = walletService.getTokenBalance(currency.toUpperCase());
    }

    req.then((data: string | number) => {
      // convert to string cause tron contracts return balance in BN
      if (currency.toUpperCase() === 'TRX') {
        setBalance(data.toString());
      } else {
        setBalance(WalletConnect.weiToEth(data.toString()));
      }
    });
  }, [walletService, userAddress, currency]);

  useEffect(() => {
    if (userAddress || (userAddress && refresh)) {
      getUserBalance();
    }
  }, [getUserBalance, userAddress, refresh]);

  return balance;
};
