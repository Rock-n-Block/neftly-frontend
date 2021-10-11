import s from '../Artworks/Artworks.module.scss';
import { H3, Select, Text } from 'components';
import { OptionType, selectOptions } from '../../../../typings';

interface IProps {
  title: string;
  handleOrderByFilter?: any;
  orderByFilter?: OptionType;
}

const TabHeader: React.FC<IProps> = ({ title, handleOrderByFilter, orderByFilter }) => {
  return (
    <div className={s.page_body__top}>
      <div className={s.page_body__top_col}>
        <H3 className={s.title}>My Artworks</H3>
        <Text className={s.counter}>{title}</Text>
      </div>
      <div className={s.page_body__top_sorters}>
        <Select
          onChange={handleOrderByFilter as any}
          value={orderByFilter}
          options={selectOptions}
        />
      </div>
    </div>
  );
};
export default TabHeader;
