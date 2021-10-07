import { useState } from 'react';

const useFilters = () => {
  const [time, setTime] = useState<any>(null);
  const [queries, setQueries] = useState({
    type: 'items',
    order_by: '-date',
    tags: 'All items',
    max_price: [0],
    currency: '',
    page: 1,
    is_verificated: 'All',
  });

  const handleChangeFilters = (key: string, value: any) => {
    console.log(key, value);
    if (key === 'max_price') {
      if (time) {
        clearTimeout(time);
        setTime(
          setTimeout(() => {
            setQueries((prevState: any) => ({
              ...prevState,
              [key]: value,
            }));
          }, 1000),
        );
      } else {
        setTime(
          setTimeout(() => {
            setQueries((prevState: any) => ({
              ...prevState,
              [key]: value,
            }));
          }, 1000),
        );
      }
    } else {
      setQueries((prevState: any) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  return { handleChangeFilters, queries };
};

export default useFilters;
