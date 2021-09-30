/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import './styles.scss';

type TabType = {
  title: string;
  body: ReactNode | string;
};

type Props = {
  className?: string;
  tabs: TabType[];
};

// eslint-disable-next-line no-unused-vars
const TabComponent: FC<Props> = ({ className, tabs }) => (
  <Tabs className={className}>
    <TabList>
      {tabs.map(({ title }) => (
        <Tab>{title}</Tab>
      ))}
    </TabList>

    {tabs.map(({ body }) => (
      <TabPanel>{body}</TabPanel>
    ))}
  </Tabs>
);

export default TabComponent;
