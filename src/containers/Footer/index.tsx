import { Link } from 'react-router-dom';
import { resourcesHelperObject, routes } from 'appConstants';
import cx from 'classnames';
import { Button, Logo, Text } from 'components';
import { observer } from 'mobx-react';
import { useMst } from 'store';

import { FooterCommunity, FooterEmail } from './components';

import styles from './styles.module.scss';

const Footers: React.FC = observer(() => {
  const {
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

  const companyHelperObject = [
    {
      label: 'About',
      link: 'https://google.com',
    },
    {
      label: 'Careers',
      link: 'https://google.com',
    },
  ];

  const linksHelperObject = [
    {
      linkBlockTitle: 'My Account',
      linkArray: accountHelperObject,
      isInternal: true,
    },
    {
      linkBlockTitle: 'Resources',
      linkArray: resourcesHelperObject,
      isInternal: false,
    },
    {
      linkBlockTitle: 'Company',
      linkArray: companyHelperObject,
      isInternal: false,
    },
  ];

  const LinkBody = ({ title }: { title: string }) => (
    <Button color="transparent" padding="0" className={styles.footerBtnLink}>
      <Text color="lightGray">{title}</Text>
    </Button>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.controlAndSocial}>
          <FooterEmail />
          <FooterCommunity />
        </div>
        <div className={styles.linksAndLogo}>
          <div className={cx(styles.footerLogo, styles.footerLogoChild)}>
            <Logo className={styles.logo} />
            <Text className={styles.footerLogoChild} size="xl" color="white">
              The New Creative Economy
            </Text>
            <Text className={styles.footerLogoChild} size="m" color="white">
              The world’s first and largest digital marketplace for crypto collectibles and
              non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.
            </Text>
          </div>
          <div className={styles.linkBlockContainer}>
            <div className={styles.linkBlock}>
              <Text weight="bold" size="m" color="white">
                Marketplace
              </Text>
              {tags.map(({ title }) => {
                return (
                  <Link to={routes.discover.filter(title)} key={title}>
                    <LinkBody title={title} />
                  </Link>
                );
              })}
            </div>
            {linksHelperObject.map(({ linkBlockTitle, linkArray, isInternal }) => {
              return (
                <div key={linkBlockTitle + isInternal} className={styles.linkBlock}>
                  <Text weight="bold" size="m" color="white">
                    {linkBlockTitle}
                  </Text>
                  {linkArray.map(({ label, link }) => {
                    return isInternal ? (
                      <Link to={link} key={label}>
                        <LinkBody title={label} />
                      </Link>
                    ) : (
                      <a href={link} key={label}>
                        <LinkBody title={label} />
                      </a>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.copyrightBlock}>
          <Text color="gray">Copyright © 2021 UI8 LLC. All rights reserved</Text>
          <div className={styles.copytrightLinks}>
            <a href="https://google.com" className={styles.copyRightLink}>
              <Text weight="bold" color="lightGray">
                Privacy Policy
              </Text>
            </a>
            <a href="https://google.com" className={styles.copyRightLink}>
              <Text weight="bold" color="lightGray">
                Terms of Service
              </Text>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footers;
