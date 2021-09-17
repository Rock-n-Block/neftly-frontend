import React from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Control from '../../components/Control';

import styles from './UploadVariants.module.scss';

const breadcrumbs = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Upload Item',
  },
];

const items = [
  {
    url: '/upload-details-single',
    buttonText: 'Create Single',
    image: '/images/content/upload-pic-01.png',
  },
  {
    url: '/upload-details-multiple',
    buttonText: 'Create Multiple',
    image: '/images/content/upload-pic-02.png',
  },
];

const Upload: React.FC = () => {
  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn('section-pt80', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.top}>
            <h1 className={cn('h2', styles.title)}>Upload item</h1>
            <div className={styles.info}>
              Choose <span>“Single”</span> if you want your collectible to be one of a kind or{' '}
              <span>“Multiple”</span> if you want to sell one collectible multiple times
            </div>
          </div>
          <div className={styles.list}>
            {items.map((x) => (
              <div className={styles.item} key={nextId()}>
                <div className={styles.preview}>
                  <img src={x.image} alt="Upload" />
                </div>
                <Link className={cn('button-stroke', styles.button)} to={x.url}>
                  {x.buttonText}
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.note}>
            We do not own your private keys and cannot access your funds without your confirmation.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
