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

const TabComponent: FC<Props> = ({ className, tabs }) => (
  <Tabs className={className}>
    <TabList>
      {tabs.map(({ title }) => (
        <Tab key={title}>{title}</Tab>
      ))}
    </TabList>

    {tabs.map(({ title, body }) => (
      <TabPanel key={title}>{body}</TabPanel>
    ))}
  </Tabs>
);

export default TabComponent;
