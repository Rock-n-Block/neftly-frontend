import { FC, useCallback, useRef } from 'react';
import cx from 'classnames';
import { Button, Text } from 'components';

import styles from './styles.module.scss';

export interface ITab {
  key: string;
  title: string;
  icon?: JSX.Element | string;
  url?: string;
}

type Props = {
  className?: string;
  wrapClassName?: string,
  tabClassName?: string;
  tabs: ITab[];
  activeTab?: string;
  action: (value: string) => void;
};

const TabLookingComponent: FC<Props> = ({ className, activeTab, tabs, action, tabClassName, wrapClassName }) => {

  const handleClick = (key: string) => {
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
    <div className={cx(styles.tabContainer, wrapClassName, { [styles.scrollTips]: getIsScrollTips() })}>
      <div ref={scrollProviderRef} className={styles.scrollProvider}>
        <div ref={tabWrapperRef} className={cx(styles.tabWrapper, className)}>
          {tabs.map(({ title, icon, key, url }) => (
            <Button
              onClick={() => handleClick(key)}
              color="transparent"
              key={title}
              href={url}
              className={cx(styles.tab, { [styles.selected]: key === activeTab }, tabClassName)}
            >
              {icon && typeof icon === 'string' ? (
                <img className={styles.tabIcon} src={icon} alt="" />
              ) : (
                icon
              )}
              <Text className={styles.tabText} weight="medium" size="m">
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
