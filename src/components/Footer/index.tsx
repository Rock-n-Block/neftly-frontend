/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, Logo, Text, TextInput } from 'components';

import styles from './styles.module.scss';

const nav = [
  {
    title: 'Stacks',
    links: [
      {
        title: 'Discover',
        link: 'https://google.com',
      },
      {
        title: 'Connect wallet',
        link: 'https://google.com',
      },
      {
        title: 'Create item',
        link: 'https://google.com',
      },
    ],
  },
  {
    title: 'Info',
    links: [
      {
        title: 'Download',
        link: 'https://google.com',
      },
      {
        title: 'Demos',
        link: 'https://google.com',
      },
      {
        title: 'Support',
        link: 'https://google.com',
      },
    ],
  },
];

const Footers: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.linksAndControls}>
          <div className={styles.footerLogo}>
            <Logo className={styles.logo} />
            <Text size="xxl">The New Creative</Text>
            <Text size="xxl">Economy.</Text>
          </div>
          <div className={styles.footerLinks}>
            {nav.map((block) => {
              const { title, links } = block;
              return (
                <div key={title} className={styles.linkBlock}>
                  <Text size="m">{title}</Text>
                  {links.map((link) => (
                    <Link key={link.title} color="lightGray" name={link.title} link={link.link} />
                  ))}
                </div>
              );
            })}
          </div>
          <div className={styles.footerActions}>
            <Text size="m">Join Newsletter</Text>
            <Text size="m">
              Subscribe our newsletter to get more free design course and resource
            </Text>
            <TextInput isButton placeholder="Enter your email" type="text" />
          </div>
        </div>
        <div className={styles.copyrightBlock}>
          <Text color="gray">Copyright © 2021 UI8 LLC. All rights reserved</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
