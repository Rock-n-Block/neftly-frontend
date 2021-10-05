import React, {useState} from 'react';
import cn from 'classnames';
import {observer} from 'mobx-react';

import {CreateForm} from 'forms';
import {useWalletConnectorContext} from 'services/walletConnect';

import styles from './UploadDetails.module.scss';
import {Button, H2, Text} from "components";

const UploadSingle: React.FC = observer(() => {
  const walletConnector = useWalletConnectorContext();
  const [isSingle, setIsSingle] = useState(true);
  return (
    <>
    <div className={cn(styles.upload)}>
      <div className={styles.head}>
        <H2 className={styles.title} align="center">
          Create {isSingle ? 'single' : 'multiple'} collectible
        </H2>
        <Text className={styles.info} size="m" color="lightGray" weight="medium" align="center">
          Upload your best artwork here and get your money
        </Text>
        <Button
          color="outline"
          onClick={() => setIsSingle(!isSingle)}>
          Switch to {isSingle ? 'Multiple' : 'Single'}
        </Button>
    </div>
    <div className={cn(styles.container)}>
      <CreateForm isSingle={isSingle} walletConnector={walletConnector}/>
    </div>
    </div>
</>
)
  ;
});

export default UploadSingle;
