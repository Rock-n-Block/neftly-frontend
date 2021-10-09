import { FC, useCallback, useRef, useState } from 'react';
import cx from 'classnames';
import { Button, Text } from 'components';

import styles from './styles.module.scss';
// TODO: look at any
type Props = {
  className?: string;
  tabClassName?: string;
  tabs: any[];
  action: (id: string) => void;
  changeFilters?: (key: string, value: string) => void
};

const TabLookingComponent: FC<Props> = ({ className, tabs, action, tabClassName, changeFilters }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleClick = (index: number, id: string, title: string) => {
    setSelectedTab(index);
    if (id) {
      alert(id);
      action(id);
    }
    if (changeFilters) changeFilters('tags', title);
  };

  const scrollProviderRef = useRef<HTMLDivElement>(null);
  const tabWrapperRef = useRef<HTMLDivElement>(null);

  const getIsScrollTips = useCallback(() => {
    if (scrollProviderRef.current && tabWrapperRef.current) {
      if (scrollProviderRef.current.offsetWidth < tabWrapperRef.current.offsetWidth) {
        return true;
      }
    }

    return false;
  }, []);
  return (
    <div className={cx(styles.tabContainer, { [styles.scrollTips]: getIsScrollTips() })}>
      <div ref={scrollProviderRef} className={styles.scrollProvider}>
        <div ref={tabWrapperRef} className={cx(styles.tabWrapper, className)}>
          {tabs.map(({ title, id, icon }, index) => (
            <Button
              onClick={() => handleClick(index, id, title)}
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
    </div>
  );
};

export default TabLookingComponent;
