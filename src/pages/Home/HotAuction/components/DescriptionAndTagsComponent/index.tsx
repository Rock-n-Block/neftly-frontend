import { FC, useEffect, useRef, useState } from 'react';
import { Text } from 'components';

import styles from './styles.module.scss';
import { ITag } from '../../../../../typings';
import { Cursor } from 'assets/img';

type Props = {
  className?: string;
  tags: ITag[];
  body: string;
};

const DescriptionAndTagsComponent: FC<Props> = ({ className, tags, body }) => {

  const textRef = useRef<any>(null);
  const [showHover, setShowHover] = useState(true);

  useEffect(()=>{
   
    if(textRef.current){
      if(textRef.current.offsetHeight >= 100){
        setShowHover(true);
      }else{
        setShowHover(false);
      }
    }
  }, [textRef, body])

  return (
    <div className={className}>
      <div className={styles.descriptionBody} ref={textRef}>
        <div className={`${styles.hoverText} ${showHover && styles.showHoverNotification}`}>
          <Text>Hover to read more</Text>
          <Cursor aria-label='hover' className={styles.cursor} />
        </div>
        {body}
      </div>
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

}
export default DescriptionAndTagsComponent;
