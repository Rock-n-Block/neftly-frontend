import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { AuthorHomePage, BookHomePage, SaleHomePage, WalletHomePage } from 'assets/img';
import cx from 'classnames';
import { Button, H2, Text } from 'components';
import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const createAndSellNftHelperObject = [
  {
    IconComponent: WalletHomePage,
    title: 'Set up your wallet',
    description:
      'Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.',
  },
  {
    IconComponent: BookHomePage,
    title: 'Create your collection',
    description:
      'Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.',
  },
  {
    IconComponent: AuthorHomePage,
    title: 'Add your NFTs',
    description:
      'Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.',
  },
  {
    IconComponent: SaleHomePage,
    title: 'List them for sale',
    description:
      'Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!',
  },
];

const CreateAndSell: FC<Props> = observer(({ className }) => {
  const { user } = useMst();

  return (
    <div className={cx(styles.ourArtworkGallery, className)}>
      <div className={styles.title}>
        <H2>
          CREATE AND SELL YOUR <span className={styles.gradientTitle}>NFTS</span>
        </H2>
      </div>
      <div className={styles.cardsWrapper}>
        {createAndSellNftHelperObject.map(({ IconComponent, title, description }) => {
          return (
            <div key={title} className={styles.howItWorksCard}>
              <IconComponent />
              <Text>{title}</Text>
              <Text>{description}</Text>
            </div>
          );
        })}
      </div>
      {!!user.address && (
        <div className={styles.viewMoreBtnWrapper}>
          <Link to={routes.create.root}>
            <Button className={styles.viewMoreBtn}>Start selling now</Button>
          </Link>
        </div>
      )}
    </div>
  );
});

export default CreateAndSell;
