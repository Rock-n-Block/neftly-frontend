import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { Button, Logo, Text, TextInput } from 'components';
import { observer } from 'mobx-react';
import { useMst } from 'store';

import styles from './styles.module.scss';

const Footers: React.FC = observer(() => {
  const {
    user,
  } = useMst();

  const accountHelperObject = [
    {
      label: 'Download',
      link: routes.profile.root,
    },
    {
      label: 'Demos',
      link: `${routes.profile.root}/favourite`,
    },
    {
      label: 'Support',
      link: `${routes.profile.root}/myCollectction`,
    },
  ];

  const stacks = [
    {
      label: 'Discover',
      link: routes.profile.root,
    },
    {
      label: 'Connect wallet',
      link: `${routes.profile.root}/favourite`,
    },
    {
      label: 'Create item',
      link: `${routes.profile.root}/myCollectction`,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.linksAndControls}>
          <div className={styles.footerLogo}>
            <Logo className={styles.logo} />
            <Text size="xxl" weight='bold' color="black">
              The New Creative
            </Text>
            <Text size="xxl" weight='bold' color="black">
              Economy.
            </Text>
          </div>
          <div className={styles.linkBlock}>
            <Text weight="bold" size="m">
              Stacks
            </Text>
            {stacks.map(({ label, link }) => {
              return (
                <Link to={link} key={label}>
                  <Button className={styles.button} color="transparent">
                    <Text color="lightGray">{label}</Text>
                  </Button>
                </Link>
              );
            })}
          </div>
          {user.address && (
            <div className={styles.linkBlock}>
              <Text weight="bold" size="m">
                Info
              </Text>
              {accountHelperObject.map(({ label, link }) => {
                return (
                  <Link to={link} key={label}>
                    <Button className={styles.button} color="transparent">
                      <Text color="lightGray">{label}</Text>
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
          <div className={styles.footerActions}>
            <Text color="black" weight="bold" size="m">
              Join Newsletter
            </Text>
            <Text color="lightGray" size="m">
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
});

export default Footers;