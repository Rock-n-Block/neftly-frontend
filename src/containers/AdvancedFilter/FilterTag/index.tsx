import { FC } from 'react';
import { cross } from 'assets/img';
import cx from 'classnames';
import { Button } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  label: string;
  closeTag?: () => void;
};

const FilterTag: FC<Props> = ({ label, closeTag, className }) => (
  <div className={cx(styles.filterTag, className)}>
    {label}
    <Button padding="0" onClick={closeTag} color="transparent">
      <img src={cross} alt="" />
    </Button>
  </div>
);

export default FilterTag;
