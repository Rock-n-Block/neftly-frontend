import { useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { CreateForm } from '../../forms';
import { useWalletConnectorContext } from '../../services/walletConnect';

import styles from './UploadDetails.module.scss';

const UploadSingle: React.FC = observer(() => {
  const walletConnector = useWalletConnectorContext();
  const [isSingle, setIsSingle] = useState(true);
  return (
    <>
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn('h2', styles.title)}>
                Create {isSingle ? 'single' : 'multiple'} collectible
              </div>
              <button
                type="button"
                onClick={() => setIsSingle(!isSingle)}
                className={cn('button-stroke button-small', styles.button)}
              >
                Switch to {isSingle ? 'Multiple' : 'Single'}
              </button>
            </div>
            <CreateForm isSingle={isSingle} walletConnector={walletConnector} />
          </div>
        </div>
      </div>
    </>
  );
});

export default UploadSingle;
