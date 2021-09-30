import React from 'react';
import nextId from 'react-id-generator';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {single, multiple} from 'assets/img/upload';

import styles from './UploadVariants.module.scss';
import {Button} from "../../components";

const items = [
  {
    url: '/create/single',
    buttonText: 'Create Single',
    image: single,
  },
  {
    url: '/create/multiple',
    buttonText: 'Create Multiple',
    image: multiple,
  },
];

const Upload: React.FC = () => {
  return (
    <div className={styles.upload}>
      <div className={styles.section}>
        <div className={cn(styles.container)}>
          <div className={styles.top}>
            <h1 className={cn('h2', styles.title)}>Upload item</h1>
            <div className={styles.info}>
              Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one
              collectible multiple times
            </div>
          </div>
          <div className={styles.list}>
            {items.map((x) => (
              <Link className={styles.item} key={nextId()} to={x.url}>
                <div className={styles.preview}>
                  <img src={x.image} alt="Upload"/>
                </div>
                <Button color="blue" className={styles.button}>
                  {x.buttonText}
                </Button>
              </Link>
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
