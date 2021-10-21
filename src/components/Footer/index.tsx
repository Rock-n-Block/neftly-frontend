import { useCallback, useState } from 'react';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, Logo, Text, TextInput, Modal, ChooseWallet, Button } from 'components';

import { routes } from 'appConstants';

import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import { useMst } from 'store';

const Footers: React.FC = observer(() => {
  const { user } = useMst();
  const [isConnectOpen, setConnectOpen] = useState(false);

  const handleOpenConnect = useCallback(() => {
    setConnectOpen(true);
  }, []);

  const handleCloseConnect = useCallback(() => {
    setConnectOpen(false);
  }, []);

  const nav = [
    {
      title: 'Stacks',
      links: [
        {
          title: 'Discover',
          link: routes.discover.root,
          isVisible: true,
        },
        {
          title: 'Connect wallet',
          onClick: () => handleOpenConnect(),
          isVisible: !user.address,
        },
        {
          title: 'Create item',
          link: routes.create.root,
          isVisible: true,
        },
      ],
    },
    {
      title: 'Info',
      links: [
        {
          title: 'Download',
          link: 'https://google.com',
          isVisible: true,
        },
        {
          title: 'Demos',
          link: 'https://google.com',
          isVisible: true,
        },
        {
          title: 'Support',
          link: 'https://google.com',
          isVisible: true,
        },
      ],
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
          <div className={styles.footerLinks}>
            {nav.map((block) => {
              const { title, links } = block;
              return (
                <div key={title} className={styles.linkBlock}>
                  <Text size="m">{title}</Text>
                  {links.map((link) => {
                    if (!link.isVisible) {
                      return null;
                    }
                    return typeof link.link === 'string' ? (
                      <Link key={link.title} color="lightGray" name={link.title} link={link.link} />
                    ) : (
                      <Button className={styles.connect} color="transparent" onClick={link.onClick}>
                        <Text className={styles.connectText} size="m" color="lightGray">
                          {link.title}
                        </Text>
                      </Button>
                    );
                  })}
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
      <Modal
        visible={isConnectOpen && !user.address}
        onClose={handleCloseConnect}
        title="Pick a wallet"
      >
        <ChooseWallet />
      </Modal>
    </footer>
  );
});

export default Footers;
