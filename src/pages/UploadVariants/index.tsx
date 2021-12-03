import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { upload } from 'assets/img';

import styles from './UploadVariants.module.scss';
import { Button, H2, Text } from 'components';
import { routes } from 'appConstants';

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
            <Link className={styles.item} to={routes.create.single}>
              <div className={styles.preview}>
                <img src={upload} alt="Upload" />
              </div>
              <Button color="purple" className={styles.button}>
                Create Single
              </Button>
            </Link>
            <Link className={styles.item} to={routes.create.multiple}>
              <div className={styles.prewiew_anim}>
                <div className={styles.preview}>
                  <img src={upload} alt="Upload" />
                </div>
                <div className={cn(styles.preview, styles.anim_item)}>
                  <img src={upload} alt="Upload" />
                </div>
                <div className={cn(styles.preview, styles.anim_item)}>
                  <img src={upload} alt="Upload" />
                </div>
                <div className={cn(styles.preview, styles.anim_item)}>
                  <img src={upload} alt="Upload" />
                </div>
              </div>

              <Button color="purple" className={styles.button}>
                Create Multiple
              </Button>
            </Link>
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
