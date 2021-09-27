import { FC, useState } from 'react';
import cx from 'classnames';
import { Button, Text } from 'components';

import styles from './styles.module.scss';
// TODO: look at any
type Props = {
  className?: string;
  tabClassName?: string;
  tabs: any[];
  action: (id: string) => void;
};

const TabLookingComponent: FC<Props> = ({ className, tabs, action, tabClassName }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleClick = (index: number, id: string) => {
    setSelectedTab(index);
    if (id) {
      alert(id);
      action(id);
    }
  };
  return (
    <div className={styles.scrollProvider}>
      <div className={cx(styles.tabWrapper, className)}>
        {tabs.map(({ title, id, icon }, index) => (
          <Button
            onClick={() => handleClick(index, id)}
            color="transparent"
            className={cx(styles.tab, { [styles.selected]: index === selectedTab }, tabClassName)}
          >
            {icon && <img className={styles.tabIcon} src={icon} alt="" />}
            <Text className={styles.tabText} size="l">
              {title}
            </Text>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabLookingComponent;
