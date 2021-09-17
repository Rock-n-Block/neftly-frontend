import { useHistory } from 'react-router';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { CreateForm } from '../../forms';
import { useWalletConnectorContext } from '../../services/walletConnect';

import styles from './UploadDetails.module.scss';

interface IUploadDetails {
  isSingle: boolean;
}

const UploadDetails: React.FC<IUploadDetails> = observer(({ isSingle }) => {
  const history = useHistory()
  const walletConnector = useWalletConnectorContext();
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
                onClick={() => history.push(isSingle ? '/upload-details-multiple' : '/upload-details-single')}
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

export default UploadDetails;
