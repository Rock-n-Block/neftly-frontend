import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { Button, Logo, Text, TextInput } from 'components';
import IconLinks from 'components/IconLinks';
import { observer } from 'mobx-react';
import { useMst } from 'store';

import styles from './styles.module.scss';

const Footers: React.FC = observer(() => {
  const {
    user,
    nftTags: { tags },
  } = useMst();

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
            <Text size="xxl" color="white">
              The New Creative
            </Text>
            <Text size="xxl" color="white">
              Economy.
            </Text>
          </div>
          <div className={styles.linkBlock}>
            <Text weight="bold" size="m">
              Marketplace
            </Text>
            {tags.map(({ title }) => {
              return (
                <Link to={routes.discover.filter(title)} key={title}>
                  <Button color="transparent">
                    <Text color="lightGray">{title}</Text>
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
            <Text color="white" size="m">
              Join Newsletter
            </Text>
            <Text color="white" size="m">
              Subscribe our newsletter to get more free design course and resource
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
