import { types, getSnapshot, applySnapshot } from 'mobx-state-tree';

const Checkout = types
  .model({
    tokenId: types.optional(types.number, 0),
    standart: types.optional(types.string, ''),
    sellerId: types.optional(types.union(types.number, types.string), 0),
    tokenName: types.optional(types.string, ''),
    fee: types.optional(types.number, 0),
    feeCurrency: types.optional(types.number, 0),
    price: types.optional(types.number, 0),
    usdPrice: types.optional(types.number, 0),
    currency: types.optional(types.string, ''),
    tokenAvailable: types.optional(types.number, 0),
    media: types.optional(types.string, ''),
    isSuccess: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get isOpen() {
      if (
        self.tokenId &&
        self.standart &&
        self.sellerId &&
        self.tokenName &&
        self.fee &&
        self.price &&
        self.currency &&
        self.tokenAvailable &&
        self.media
      ) {
        return true;
      }
      return false;
    },
  }))
  .actions((self) => {
    let initialState = {};
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      close: () => {
        applySnapshot(self, initialState);
      },
      open: (data: any) => {
        self.isSuccess = false;
        applySnapshot(self, data);
      },
      success: () => {
        self.isSuccess = true;
      },
    };
  });

export const Modals = types.model({
  checkout: Checkout,
});
