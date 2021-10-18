import { TronStatus } from 'appConstants';
import { userApi } from 'services';
import { rootStore } from 'store';
import { TronState } from 'typings/tron';

/* eslint-disable no-await-in-loop */
const MS_RETRY_TRON = 2000;
const MAX_ATTEMPT_GET_BALANCE = 5;
const MS_RETRY_GET_BALANCE = 1500;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getTronBalance(address: string) {
  for (let i = 0; i < MAX_ATTEMPT_GET_BALANCE; i += 1) {
    try {
      if (address) {
        const balance = await window.tronWeb.trx.getBalance(address);
        return Number(await window.tronWeb.fromSun(balance));
      }

      return 0;
    } catch (err: any) {
      if (i < MAX_ATTEMPT_GET_BALANCE - 1) {
        if (err.message === 'Network Error') {
          await delay(MS_RETRY_GET_BALANCE);
        } else {
          throw new Error('Get Balance failed');
        }
      }
    }
  }

  throw new Error('Get Balance failed');
}

async function setConnect() {
  if (window.tronWeb) {
    const address = window.tronWeb.defaultAddress?.base58 || '';

    const payload: TronState = {
      address,
      status: address ? TronStatus.ADDRESS_SELECTED : TronStatus.AVAILABLE,
      // balance: await getTronBalance(address),
    };
    if (!localStorage.netfly_nft_token) {
      const { data }: any = await userApi.getMsg();

      const hexData = window.tronWeb.toHex(data);

      const signedMsg = await window.tronWeb.trx.sign(hexData);

      const {
        data: { key },
      }: any = await userApi.login({
        address: payload.address,
        msg: data,
        signedMsg,
      });

      localStorage.netfly_nft_token = key;
    }
    localStorage.netfly_nft_chainName = 'Tron';
    localStorage.netfly_nft_providerName = 'TronLink';
    rootStore.user.setAddress(payload.address);
    rootStore.user.getMe();
  } else {
    const payload: TronState = {
      address: '',
      status: TronStatus.NOT_AVAILABLE,
      balance: 0,
    };

    console.log('cant find tron', payload);
  }
}

export async function connectTron() {
  try {
    if (!window.tronWeb?.defaultAddress?.base58) {
      await delay(MS_RETRY_TRON);
    }
    await setConnect();
  } catch (err) {
    console.log(err);
  }
}
