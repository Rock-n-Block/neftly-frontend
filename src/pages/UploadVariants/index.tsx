import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { single, multiple } from 'assets/img';

import styles from './UploadVariants.module.scss';
import { Button, H2, Text } from 'components';
import { routes } from 'appConstants';

const items = [
  {
    key: 'single',
    url: routes.create.single,
    buttonText: 'Create Single',
    image: single,
  },
  {
    key: 'multiple',
    url: routes.create.multiple,
    buttonText: 'Create Multiple',
    image: multiple,
  },
];

const Upload: FC = () => {
  return (
    <div className={styles.upload}>
      <div className={styles.section}>
        <div className={cn(styles.container)}>
          <div className={styles.top}>
            <H2 className={styles.title} align="center">
              Upload item
            </H2>
            <Text className={styles.info} size="m" color="gray" weight="medium" align="center">
              Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you
              want to sell one collectible multiple times
            </Text>
          </div>
          <div className={styles.list}>
            {items.map((option) => (
              <Link className={styles.item} key={`upload_option_${option.key}`} to={option.url}>
                <div className={styles.preview}>
                  <img src={option.image} alt="Upload" />
                </div>
                <Button color="blue" className={styles.button}>
                  {option.buttonText}
                </Button>
              </Link>
            ))}
          </div>
          <Text className={styles.note} size="m" color="gray" weight="medium" align="center">
            We do not own your private keys and cannot access your funds without your confirmation.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Upload;
