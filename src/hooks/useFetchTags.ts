import { useCallback, useEffect } from 'react';
import { storeApi } from 'services';
import { rootStore } from 'store';

const useFetchTags = () => {
  const fetchTags = useCallback(async () => {
    try {
      const {
        data: { tags },
      } = await storeApi.getTags();

      rootStore.nftTags.setTags(tags);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);
};

export default useFetchTags;
