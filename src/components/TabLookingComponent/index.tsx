import { FC, useCallback, useRef, useState } from 'react';
import cx from 'classnames';
import { Button, Text } from 'components';

import styles from './styles.module.scss';

export interface ITab {
  key: string;
  title: string;
  icon?: any;
}

type Props = {
  className?: string;
  tabClassName?: string;
  tabs: ITab[];
  activeTab?: string;
  action: (value: string) => void;
};

const TabLookingComponent: FC<Props> = ({ className, activeTab, tabs, action, tabClassName }) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const handleClick = (key: string) => {
    setSelectedTab(key);
    action(key);
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
          {tabs.map(({ title, icon, key }) => (
            <Button
              onClick={() => handleClick(key)}
              color="transparent"
              key={title}
              className={cx(styles.tab, { [styles.selected]: key === selectedTab }, tabClassName)}
            >
              {icon &&
                (typeof icon === 'string' ? (
                  <img className={styles.tabIcon} src={icon} alt="" />
                ) : (
                  { icon }
                ))}
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
