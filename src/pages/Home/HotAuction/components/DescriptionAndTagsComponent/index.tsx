import { FC } from 'react';
import { Text } from 'components';

import styles from './styles.module.scss';
import { ITag } from '../../../../../typings';

type Props = {
  className?: string;
  tags: ITag[];
  body: string;
};

const DescriptionAndTagsComponent: FC<Props> = ({ className, tags, body }) => (
  <div className={className}>
    <Text className={styles.descriptionBody} size="m">
      {body}
    </Text>
    {tags.length ? (
      <>
        <Text color="gray" size="m">
          Tags
        </Text>
        <div className={styles.tagWrapper}>
          {tags.map((tag) => (
            <div className={styles.tag} key={`tag-${tag.value}`}>
              <Text size="m">{`#${tag.value}`}</Text>
            </div>
          ))}
        </div>
      </>
    ) : null}
  </div>
);

export default DescriptionAndTagsComponent;
