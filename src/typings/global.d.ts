interface Window {
  tronWeb: {
    defaultAddress?: {
      base58: string;
      name: string;
    };
    contract: () => {
      at: (value: string) => Promise<void>;
    };
    toDecimal: (value: number) => number;
    fromSun: (value: string | number) => string;
    toSun: (value: number) => string;
    toHex: (value: number | string) => string;
    toBigNumber: (value: string | number) => BigInt;
    address: {
      fromHex: (value: string) => string;
    };
    trx: {
      getBalance: (address: string) => number;
      sign: any;
      sendRawTransaction: (signedTxn: string) => any;
    };
    getEventResult: (
      address: string,
      options: {
        eventName: string;
        size: number;
        onlyConfirmed: true;
      },
      callback?: () => void,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any[]>;
    transactionBuilder: any
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tronLinkInitialData: {
    address: string;
    name: string;
  };
}