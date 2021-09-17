// import { useState } from 'react';
import logoFooter from '../../assets/img/icons/logo-footer.svg';
import github from '../../assets/img/icons/social/github.svg';
import medium from '../../assets/img/icons/social/medium.svg';
import telegram from '../../assets/img/icons/social/telegram.svg';
import twitter from '../../assets/img/icons/social/twitter.svg';
import Image from '../Image';

import styles from './Footer.module.scss';

const Footers: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <a href="https://less.xyz/" target="_blank" rel="noreferer noreferrer">
          <Image src={logoFooter} alt="Footer logo" />
        </a>
      </div>
      <div className={styles.divider} />
      <div className={styles.links}>
        <div className={styles.copyright}>2021 © Lesspad a product of Less Token — less.xyz</div>
        <div className={styles.socials}>
          <a target="_blank" href="https://twitter.com/LessToken" rel="noreferrer">
            <Image src={twitter} alt="Footer logo" />
          </a>
          <a target="_blank" href="https://less-token.medium.com/" rel="noreferrer">
            <Image src={medium} alt="Footer logo" />
          </a>
          <a target="_blank" href="https://t.me/lesstokenann" rel="noreferrer">
            <Image src={telegram} alt="Footer logo" />
          </a>
          <a target="_blank" href="https://github.com/LESS-xyz/" rel="noreferrer">
            <Image src={github} alt="Footer logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
