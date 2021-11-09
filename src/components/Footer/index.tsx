import { Link } from 'react-router-dom';
import { marketplaceLinks, routes } from 'appConstants';
import { Button, Logo, Text, TextInput } from 'components';
import IconLinks from 'components/IconLinks';
import { observer } from 'mobx-react';
import { useMst } from 'store';

import styles from './styles.module.scss';

const Footers: React.FC = observer(() => {
  const { user } = useMst();

  const accountHelperObject = [
    {
      label: 'Profile',
      link: routes.profile.root,
    },
    {
      label: 'Favourites',
      link: `${routes.profile.root}/favourite`,
    },
    {
      label: 'My Collection',
      link: `${routes.profile.root}/myCollectction`,
    },
    {
      label: 'Settings',
      link: routes.profile.edit,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.linksAndControls}>
          <div className={styles.footerLogo}>
            <Logo className={styles.logo} />
            <Text size="xxl">The New Creative</Text>
            <Text size="xxl">Economy.</Text>
          </div>
          <div className={styles.linkBlock}>
            <Text weight="bold" size="m">
              Marketplace
            </Text>
            {marketplaceLinks.map(({ label, value }) => {
              return (
                <Link to={routes.discover.filter(value)} key={value}>
                  <Button color="transparent">
                    <Text color="lightGray">{label}</Text>
                  </Button>
                </Link>
              );
            })}
          </div>
          {user.address && (
            <div className={styles.linkBlock}>
              <Text weight="bold" size="m">
                My Account
              </Text>
              {accountHelperObject.map(({ label, link }) => {
                return (
                  <Link to={link} key={label}>
                    <Button color="transparent">
                      <Text color="lightGray">{label}</Text>
                    </Button>
                  </Link>
                );
              })}

              <Link to={routes.activity.root}>
                <Text weight="bold" size="m">
                  Activity
                </Text>
              </Link>
            </div>
          )}
          <div className={styles.footerActions}>
            <Text weight="bold" size="m">
              Join Newsletter
            </Text>
            <Text>Subscribe our newsletter to get more free design course and resource</Text>
            <TextInput isButton placeholder="Enter your email" type="text" />

            <div>
              <Text weight="bold" size="m">
                Join the community
              </Text>
              <IconLinks className={styles.footerIconLinks} />
            </div>
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
