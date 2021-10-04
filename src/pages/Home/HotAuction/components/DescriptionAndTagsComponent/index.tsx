import { FC } from 'react';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  tags: any[];
  body: string;
};

const DescriptionAndTagsComponent: FC<Props> = ({ className, tags, body }) => (
  <div className={className}>
    <Text className={styles.descriptionBody} size="m">{`by ${body}`}</Text>
    {tags.length ? (
      <>
        <Text color="gray" size="m">
          Tags
        </Text>
        <div className={styles.tagWrapper}>
          {tags.map((tag) => (
            <div className={styles.tag}>
              <Text size="m">{`#${tag}`}</Text>
            </div>
          ))}
        </div>
      </>
    ) : (
      ''
    )}
  </div>
);

export default DescriptionAndTagsComponent;
