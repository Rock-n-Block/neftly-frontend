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
    {tags.length && (

      <div className={styles.tagWrapper}>
        <Text size="m" className={styles.tagTitle}>
          Tags:
        </Text>
        {tags.map((tag) => (
          <div className={styles.tag} key={`tag-${tag.value}`}>
            <Text size="s">{`#${tag.value}`}</Text>
          </div>
        ))}
      </div>

    )}
  </div>
);

export default DescriptionAndTagsComponent;
