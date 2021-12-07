import React from 'react';
import { Text } from '../Typography';
import { chains } from '../../config';

interface IProps {
  txHash: string;
}

const ToastContentWithTxHash: React.FC<IProps> = ({ txHash }) => {
  return (
    <>
      {/* TODO: change 'Binance' | 'KardiaChain' to supportedChains */}
      <Text color="gray">Transaction submitted</Text>
      <a
        href={`${
          chains[localStorage.lessnft_nft_chainName as 'Binance' | 'KardiaChain'].explorer
        }/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View in explorer
      </a>
    </>
  );
};

export default ToastContentWithTxHash;
