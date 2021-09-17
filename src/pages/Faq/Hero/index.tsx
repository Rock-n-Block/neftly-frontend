import { useState } from 'react';
import nextId from 'react-id-generator';
import cn from 'classnames';

import { ReactComponent as GeneralPurple } from '../../../assets/img/icons/general-purple.svg';
import { ReactComponent as General } from '../../../assets/img/icons/general.svg';
import { ReactComponent as HostingPurple } from '../../../assets/img/icons/hosting-purple.svg';
import { ReactComponent as Hosting } from '../../../assets/img/icons/hosting.svg';
import { ReactComponent as ProductPurple } from '../../../assets/img/icons/product-purple.svg';
import { ReactComponent as Product } from '../../../assets/img/icons/product.svg';
import { ReactComponent as SupportPurple } from '../../../assets/img/icons/support-purple.svg';
import { ReactComponent as Support } from '../../../assets/img/icons/support.svg';
import Dropdown from '../../../components/Dropdown';

// import Icon from '../../../components/Icon';
import Item from './Item';

import styles from './Hero.module.scss';

const items: Array<{
  title: string;
  icon: any;
  iconActvie: any;
  items: Array<string>;
}> = [
  {
    title: 'General',
    iconActvie: <General />,
    icon: <GeneralPurple />,
    items: [
      'How does it work',
      'How to start with Stacks',
      'Dose it suppport Dark Mode',
      'Does it support Auto-Layout',
    ],
  },
  {
    title: 'Support',
    iconActvie: <Support />,
    icon: <SupportPurple />,
    items: [
      'Dose it suppport Dark Mode',
      'Does it support Auto-Layout',
      'What is Stacks Design System',
      'How does it work',
      'How to start with Stacks',
    ],
  },
  {
    title: 'Hosting',
    iconActvie: <Hosting />,
    icon: <HostingPurple />,
    items: [
      'How to start with Stacks',
      'Dose it suppport Dark Mode',
      'What is Stacks Design System',
    ],
  },
  {
    title: 'Product',
    iconActvie: <Product />,
    icon: <ProductPurple />,
    items: [
      'Dose it suppport Dark Mode',
      'Does it support Auto-Layout',
      'What is Stacks Design System',
    ],
  },
];

const Hero: React.FC = () => {
  const options: Array<string> = [];
  items.map((x) => options.push(x.title));

  const [direction, setDirection] = useState(options[0]);

  return (
    <div className={cn('section', styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.top}>
          <div className={styles.stage}>learn how to get started</div>
          <h1 className={cn('h2', styles.title)}>Frequently asked questions</h1>
          <div className={styles.info}>
            Join Stacks community now to get free updates and also alot of freebies are waiting for
            you or{' '}
            <a href="/#" rel="noopener noreferrer">
              Contact Support
            </a>
          </div>
          <Dropdown
            className={cn('mobile-show', styles.dropdown)}
            value={direction}
            setValue={setDirection}
            options={options}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.nav}>
              {items.map((x) => (
                <div
                  className={cn(styles.link, {
                    [styles.active]: x.title === direction,
                  })}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex={0}
                  onClick={() => setDirection(x.title)}
                  key={nextId()}
                >
                  {x.title === direction ? x.iconActvie : x.icon}
                  <span className={x.title === direction ? 'text-gradient' : ''}>{x.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            {items
              .find((x) => x.title === direction)
              .items.map((x) => (
                <Item className={styles.item} item={x} key={nextId()} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
