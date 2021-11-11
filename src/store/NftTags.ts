import { types } from 'mobx-state-tree';

const Tag = types.model({
  title: types.optional(types.string, ''),
  icon: types.optional(types.string, ''),
});

export const NftTags = types
  .model({
    tags: types.optional(types.array(Tag), []),
  })
  .actions((self) => {
    const setTags = (tags: any) => {
      self.tags = tags;
    };

    return {
      setTags,
    };
  });
