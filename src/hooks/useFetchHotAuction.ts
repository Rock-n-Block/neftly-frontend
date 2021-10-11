import { useEffect } from 'react';
import { storeApi } from 'services';


export const useFetchHotAuction = () => {
  // const [hotAuction, setHotAuction] = useState({});

  const fetchHotAuction = () => {
    storeApi
      .getHotAction()
      .then(data => console.log(data))
      .catch(e => console.log(e));
    };

  useEffect(() => {
    fetchHotAuction();
  }, []);

  return {
    
  }
};
