import { useMst } from 'store';

const { user } = useMst();

const parameter = [
  { type: 'address', value: user.address },
  { type: 'uint256', value: 100 },
];
const options = {
  feeLimit: 100000000,
  callValue: 0,
  tokenValue: 10,
  tokenId: 1000001,
};
const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(
  '41d8637b16f4d9994ca537dff58b0ac913838576bb',
  'transfer(address,uint256)',
  options,
  parameter,
  user.address,
);
