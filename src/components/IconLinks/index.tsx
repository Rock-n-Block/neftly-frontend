import { FC } from 'react';
import { iconDiscord, iconFacebook, iconInstagram, iconReddit, iconTelegram } from 'assets/img';
import cx from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const iconLinksHelperObject = [
  {
    link: '#',
    icon: iconFacebook,
  },
  {
    link: '#',
    icon: iconInstagram,
  },
  {
    link: '#',
    icon: iconTelegram,
  },
  {
    link: '#',
    icon: iconDiscord,
  },
  {
    link: '#',
    icon: iconReddit,
  },
];

const IconLinks: FC<Props> = ({ className }) => (
  <div className={cx(styles.iconLinks, className)}>
    {iconLinksHelperObject.map(({ link, icon }) => {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" key={icon}>
          <img src={icon} alt="" />
        </a>
      );
    })}
  </div>
);

export default IconLinks;
