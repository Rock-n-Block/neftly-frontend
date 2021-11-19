import { FC } from 'react';
import { discordNew, emailNew, instagramNew, redditNew, twitterNew, youtubeNew } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const helperObject = [
  {
    icon: twitterNew,
    link: '#',
  },
  {
    icon: instagramNew,
    link: '#',
  },
  {
    icon: discordNew,
    link: '#',
  },
  {
    icon: redditNew,
    link: '#',
  },
  {
    icon: youtubeNew,
    link: 'https://youtube.com',
  },
  {
    icon: emailNew,
    link: 'mailto:email@example.com?subject=Subject&body=Body%20goes%20here',
  },
];

const FooterCommunity: FC<Props> = ({ className }) => {
  return (
    <div className={cx(styles.footerCommunity, className)}>
      <Text size="xxl" color="white">
        Join the community
      </Text>
      <div className={styles.footerLogoLinks}>
        {helperObject.map(({ icon, link }) => {
          return (
            <a href={link} key={link+icon} className={styles.footerIconLink}>
              <img src={icon} alt={icon} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterCommunity;
