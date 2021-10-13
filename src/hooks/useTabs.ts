import { useState } from 'react';

const useTabs = (allTabs: any[], initialTab?: string) => {
  const [activeTab, setActiveTab] = useState(initialTab || allTabs[0].key);

  return { activeTab, setActiveTab };
};
export default useTabs;
