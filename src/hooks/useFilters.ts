import { useState } from 'react';

const useFilters = (setQueries: (value: any) => void) => {
  const [time, setTime] = useState<any>(null);

  const handleChangeFilters = (key: string, value: any) => {
    console.log(key, value)
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

  return handleChangeFilters;
};

export default useFilters;
