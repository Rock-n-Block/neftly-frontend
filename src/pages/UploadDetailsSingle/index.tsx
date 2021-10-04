import React, { useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { CreateForm } from '../../forms';
import { useWalletConnectorContext } from '../../services/walletConnect';

import styles from './UploadDetails.module.scss';
import {Button} from "../../components";

const UploadSingle: React.FC = observer(() => {
  const walletConnector = useWalletConnectorContext();
  const [isSingle, setIsSingle] = useState(true);
  return (
    <>
      <div className={cn( styles.upload)}>
        <div className={styles.head}>
          <div className={cn('h2', styles.title)}>
            Create {isSingle ? 'single' : 'multiple'} collectible
          </div>
          <div className={styles.info}>
            Upload your best artwork here and get your money
          </div>
          <Button
            color="outline"
            onClick={() => setIsSingle(!isSingle)}>
            Switch to {isSingle ? 'Multiple' : 'Single'}
          </Button>
        </div>
        <div className={cn( styles.container)}>
          <CreateForm isSingle={isSingle} walletConnector={walletConnector} />
        </div>
      </div>
    </>
  );
});

export default UploadSingle;
