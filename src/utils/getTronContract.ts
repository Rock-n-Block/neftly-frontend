import { ReactNode } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTronContract = async (address: string): Promise<any> => {
  try {
    const contract = await window.tronWeb.contract().at(address);
    return contract;
  } catch (err) {
    toast.error(err as ReactNode);
    throw err;
  }
};