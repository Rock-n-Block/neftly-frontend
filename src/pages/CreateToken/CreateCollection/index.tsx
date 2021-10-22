import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { TextInput } from 'components';
import { storeApi } from 'services/api';
import { useWalletConnectorContext } from 'services/walletConnect';

import styles from './CreateCollection.module.scss';

interface ICreateCollectionProps {
  className?: string;
  setCollection: (value: any) => void;
  close: () => void;
}

const CreateCollection: React.FC<ICreateCollectionProps> = ({
  className,
  setCollection,
  close,
}) => {
  const walletConnector = useWalletConnectorContext();
  const [avatarURL, setAvatarURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    avatar: '',
    name: '',
    description: '',
    symbol: '',
    short_url: '',
  });

  const handleChange = (key: string, value: any) => {
    if (key === 'avatar') {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setAvatarURL(typeof reader.result === 'string' ? reader.result : '');
      });
      reader.readAsDataURL(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    const newFormData = new FormData();
    if (typeof formData.avatar !== 'string')
      newFormData.append('avatar', formData.avatar, 'avatar');
    newFormData.append('name', formData.name);
    newFormData.append('description', formData.description);
    newFormData.append('symbol', formData.symbol);
    newFormData.append('short_url', formData.short_url);
    newFormData.append('standart', 'ERC721');
    storeApi
      .createCollection(newFormData)
      .then(({ data }: any) => {
        walletConnector.walletService
          .sendTransaction(data)
          .then(({ transactionHash }: any) => {
            newFormData.append('tx_hash', transactionHash);
            storeApi.saveCollection(newFormData);
            setCollection(formData.short_url);
          })
          .finally(() => close());
      })
      .catch((e) => console.error('Error', e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [formData, walletConnector.walletService, setCollection, close]);

  // const fetchCollections = useCallback(() => {
  //   storeApi.getCollections()
  // }, [])
  useEffect(() => {
    if (isLoading) {
      handleSubmit();
    }
  }, [isLoading, handleSubmit]);
  return (
    <div className={cn(className, styles.createCollection)}>
      <div className={cn('h4', styles.title)}>Create collection</div>
      <div className={styles.upload}>
        {avatarURL ? <img alt="" src={avatarURL} /> : <div className={styles.empty} />}
        <div className={styles.wrapper}>
          <span className={styles.text}>
            We recommend an image of at least 400 x 400. Gift work too.
          </span>
          <div className={styles.file}>
            <button type="button" className={cn('button-stroke button-small', styles.button)}>
              Upload
            </button>
            <input
              className={styles.load}
              type="file"
              // eslint-disable-next-line
              // @ts-ignore
              onChange={(e) => handleChange('avatar', e.target.files[0])}
            />
          </div>
        </div>
      </div>
      <form
        className={styles.form}
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
        }}
      >
        <div className={styles.fieldset}>
          <TextInput
            className={styles.field}
            label="Display name"
            name="Item"
            type="text"
            placeholder="Display name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            // required
          />
          <TextInput
            className={styles.field}
            label="Symbol"
            name="Symbol"
            type="text"
            placeholder="Enter Token name"
            value={formData.symbol}
            onChange={(e) => handleChange('symbol', e.target.value)}
            // required
          />
          <TextInput
            className={styles.field}
            label="Description"
            name="Description"
            type="text"
            placeholder="Spreads some words about your token collection"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            // required
          />
          <TextInput
            className={styles.field}
            label="Short url"
            name="Short url"
            type="text"
            placeholder="Enter your url"
            value={formData.short_url}
            onChange={(e) => handleChange('short_url', e.target.value)}
            // required
          />
        </div>
        <button className={cn('button', styles.button)} type="submit">
          Create Collection
        </button>
      </form>
    </div>
  );
};

export default CreateCollection;
