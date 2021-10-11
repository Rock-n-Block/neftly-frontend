import { types, getSnapshot, applySnapshot, getParent } from 'mobx-state-tree';

const NftForSale = types.model({
  tokenId: types.optional(types.number, 0),
  standart: types.optional(types.string, ''),
  sellerId: types.optional(types.union(types.number, types.string), 0),
  tokenName: types.optional(types.string, ''),
  fee: types.optional(types.number, 0),
  feeCurrency: types.optional(types.number, 0),
  price: types.maybeNull(types.optional(types.number, 0)),
  usdPrice: types.optional(types.number, 0),
  minimalBid: types.optional(types.number, 0),
  currency: types.optional(types.string, ''),
  tokenAvailable: types.optional(types.number, 0),
  media: types.optional(types.string, ''),
});

const Seller = types.model({
  avatar: types.string,
  id: types.union(types.string, types.number),
  name: types.string,
  price: types.number,
  quantity: types.number,
});

const PlaceBid = types
  .model({
    isSuccess: types.optional(types.boolean, false),
    isOpen: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getIsOpen() {
      const parent: any = getParent(self);
      if (
        parent.nft.tokenId &&
        parent.nft.standart &&
        parent.nft.tokenName &&
        parent.nft.fee &&
        parent.nft.currency &&
        parent.nft.tokenAvailable &&
        parent.nft.media &&
        parent.nft.minimalBid &&
        self.isOpen
      ) {
        return true;
      }
      return false;
    },
  }))
  .actions((self) => ({
    close: () => {
      self.isOpen = false;
    },
    open: () => {
      self.isSuccess = false;
      self.isOpen = true;
    },
    success: () => {
      self.isSuccess = true;
    },
  }));

const ChooseSeller = types
  .model({
    sellers: types.optional(types.array(Seller), []),
  })
  .views((self) => ({
    get getIsOpen() {
      const parent: any = getParent(self);
      if (
        parent.nft.tokenId &&
        parent.nft.standart &&
        parent.nft.tokenName &&
        parent.nft.fee &&
        parent.nft.price &&
        parent.nft.currency &&
        parent.nft.tokenAvailable &&
        parent.nft.media &&
        self.sellers.length
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
      open: (sellers: any) => {
        self.sellers = sellers;
      },
    };
  });

const Checkout = types
  .model({
    isSuccess: types.optional(types.boolean, false),
    isOpen: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getIsOpen() {
      const parent: any = getParent(self);
      if (
        parent.nft.tokenId &&
        parent.nft.standart &&
        parent.nft.sellerId &&
        parent.nft.tokenName &&
        parent.nft.fee &&
        parent.nft.price &&
        parent.nft.currency &&
        parent.nft.tokenAvailable &&
        parent.nft.media &&
        self.isOpen
      ) {
        return true;
      }
      return false;
    },
  }))
  .actions((self) => ({
    close: () => {
      self.isOpen = false;
    },
    open: (sellerId: string | number) => {
      const parent: any = getParent(self);
      parent.setSellerId(sellerId);
      self.isSuccess = false;
      self.isOpen = true;
    },
    success: () => {
      self.isSuccess = true;
    },
  }));

const SellModals = types
  .model({
    nft: types.optional(NftForSale, {}),
    checkout: Checkout,
    chooseSeller: ChooseSeller,
    placeBid: PlaceBid,
  })
  .actions((self) => ({
    setNft: (data: any) => {
      self.nft = data;
    },
    setSellerId: (sellerId: string | number) => {
      self.nft.sellerId = sellerId;
    },
  }));

export const Modals = types.model({
  sell: SellModals,
});
