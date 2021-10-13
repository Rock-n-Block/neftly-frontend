import { types, getSnapshot, applySnapshot, getParent } from 'mobx-state-tree';

const NftCollection = types.model({
  address: types.string,
  avatar: types.string,
  id: types.union(types.string, types.number),
  name: types.string,
});

const NftForSale = types.model({
  tokenId: types.optional(types.number, 0),
  standart: types.optional(types.string, ''),
  sellerId: types.optional(types.union(types.number, types.string), 0),
  tokenName: types.optional(types.string, ''),
  fee: types.optional(types.number, 0),
  feeCurrency: types.optional(types.number, 0),
  price: types.maybeNull(types.optional(types.number, 0)),
  usdPrice: types.maybeNull(types.optional(types.number, 0)),
  minimalBid: types.optional(types.number, 0),
  currency: types.optional(types.string, ''),
  tokenAvailable: types.optional(types.number, 0),
  media: types.optional(types.string, ''),
  royalty: types.optional(types.number, 0),
  collection: types.optional(NftCollection, {
    address: '',
    avatar: '',
    id: 0,
    name: '',
  }),
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

const PutOnSale = types
  .model({
    isOpen: types.optional(types.boolean, false),
    isSuccess: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getIsOpen() {
      const parent: any = getParent(self);
      if (
        parent.nft.tokenId &&
        parent.nft.currency &&
        parent.nft.royalty &&
        parent.nft.fee &&
        parent.nft.collection &&
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

const SellModals = types
  .model({
    nft: types.optional(NftForSale, {}),
    checkout: Checkout,
    chooseSeller: ChooseSeller,
    placeBid: PlaceBid,
    putOnSale: PutOnSale,
  })
  .actions((self) => ({
    setNft: (data: any) => {
      self.nft = data;
    },
    setSellerId: (sellerId: string | number) => {
      self.nft.sellerId = sellerId;
    },
  }));

const Burn = types
  .model({
    tokenId: types.optional(types.number, 0),
    standart: types.optional(types.string, ''),
  })
  .views((self) => ({
    get getIsOpen() {
      return !!(self.tokenId && self.standart);
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
      open: (tokenId: number, standart: string) => {
        self.tokenId = tokenId;
        self.standart = standart;
      },
    };
  });
const Remove = types
  .model({
    tokenId: types.optional(types.number, 0),
    isSuccess: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getIsOpen() {
      return !!self.tokenId;
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
      open: (tokenId: number) => {
        self.tokenId = tokenId;
      },
      success: () => {
        self.isSuccess = true;
      },
    };
  });

const Transfer = types
  .model({
    tokenId: types.optional(types.number, 0),
    standart: types.optional(types.string, ''),
    isSuccess: types.optional(types.boolean, false),
    available: types.optional(types.number, 0),
  })
  .views((self) => ({
    get getIsOpen() {
      return !!(self.tokenId && self.standart && self.available);
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
      open: (tokenId: number, standart: string, available: number) => {
        self.tokenId = tokenId;
        self.standart = standart;
        self.available = available;
      },
      success: () => {
        self.isSuccess = true;
      },
    };
  });
const Report = types
  .model({
    isOpen: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      close: () => {
        self.isOpen = false;
      },
      open: () => {
        self.isOpen = true;
      },
    };
  });

export const Modals = types.model({
  sell: SellModals,
  burn: Burn,
  remove: Remove,
  transfer: Transfer,
  report: Report,
});
