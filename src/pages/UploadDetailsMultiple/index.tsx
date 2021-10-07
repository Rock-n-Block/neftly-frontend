import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ReactComponent as FixedPrice } from '../../assets/img/icons/fixed-price.svg';
import { ReactComponent as Infinity } from '../../assets/img/icons/infinity.svg';
import { ReactComponent as Lock } from '../../assets/img/icons/lock.svg';
import { ReactComponent as Timer } from '../../assets/img/icons/timer.svg';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Icon from '../../components/Icon';
// import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import Switch from '../../components/Switch';
import TextInput from '../../components/TextInput';
import { ratesApi, storeApi, userApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import { useMst } from '../../store';

import Cards from './Cards';
import CreateCollection from './CreateCollection';
import FolowSteps from './FolowSteps';
import Preview from './Preview';
import SuccessCreated from './SuccessCreated';

import styles from './UploadDetails.module.scss';

const royaltiesOptions = ['10%', '20%', '30%'];

const UploadMultiple: React.FC = observer(() => {
  const [fee, setFee] = useState(0);
  const [activeCurrency, setActiveCurrency] = useState('WETH');
  const [rates, setRates] = useState<Array<any>>([]);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const { user } = useMst();
  const [activeCollection, setActiveCollection] = useState('');
  // const [royalties, setRoyalties] = useState(royaltiesOptions[0]);
  const walletConnector = useWalletConnectorContext();
  const [sale, setSale] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  // const [locking, setLocking] = useState(false);
  const [collectionsArray, setCollectionsArray] = useState<any>([]);
  const [active, setActive] = useState('price');
  const [mediaURL, setMediaURL] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [format, setFormat] = useState('');
  const [isLoading, setLoading] = useState(false);

  const fetchFee = useCallback(() => {
    storeApi.getFee('BNB').then(({ data }: any) => setFee(data));
  }, []);

  const [formData, setFormData] = useState({
    media: '',
    cover: '',
    name: '',
    description: '',
    creator_royalty: royaltiesOptions[0],
    size: '',
    propertie: '',
    price: '',
    minimal_bid: '',
    total_supply: '',
    currency: activeCurrency,
  });

  const handleChange = (key: string, value: any) => {
    if (key === 'media') {
      const isValidType =
        value.type === 'image/jpeg' ||
        value.type === 'image/png' ||
        value.type === 'image/webp' ||
        value.type === 'image/gif' ||
        value.type === 'audio/mp3' ||
        value.type === 'audio/mpeg' ||
        value.type === 'video/mp4';
      if (!isValidType) {
        return;
      }
      setFormat(value.type.slice(0, value.type.indexOf('/')));
      const isLt2M = value.size / 1024 / 1024 < 30;
      if (!isLt2M) {
        return;
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setMediaURL(typeof reader.result === 'string' ? reader.result : '');
      });
      reader.readAsDataURL(value);
    }
    if (key === 'cover' && value) {
      const isValidType =
        value.type === 'image/jpeg' ||
        value.type === 'image/png' ||
        value.type === 'image/webp' ||
        value.type === 'image/gif';
      if (!isValidType) {
        return;
      }
      const isLt2M = value.size / 1024 / 1024 < 30;
      if (!isLt2M) {
        return;
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreviewURL(typeof reader.result === 'string' ? reader.result : '');
      });
      reader.readAsDataURL(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setFormData((prevState) => ({
      ...prevState,
      media: '',
      cover: '',
      name: '',
      description: '',
      creator_royalty: royaltiesOptions[0],
      size: '',
      propertie: '',
      price: '',
      minimal_bid: '',
      standart: 'ERC1155',
      currency: 'WETH',
      collection: 3,
      total_supply: '',
    }));
    setMediaURL('');
    setPreviewURL('');
    setFormat('');
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const newFormData = new FormData();
    if (typeof formData.media !== 'string') newFormData.append('media', formData.media, 'media');
    if (typeof formData.cover !== 'string') newFormData.append('cover', formData.cover, 'cover');
    newFormData.append('name', formData.name);
    newFormData.append('description', formData.description);
    newFormData.append(
      'creator_royalty',
      formData.creator_royalty.slice(0, formData.creator_royalty.length - 1),
    );
    if (sale) {
      if (active === 'price') {
        newFormData.append('price', formData.price);
        newFormData.delete('minimal_bid');
      } else {
        if (formData.minimal_bid) {
          newFormData.append('minimal_bid', formData.minimal_bid);
        } else {
          newFormData.delete('minimal_bid');
        }
        newFormData.delete('price');
      }
    } else {
      newFormData.delete('minimal_bid');
      newFormData.delete('price');
    }
    newFormData.append('selling', sale.toString());
    newFormData.append('standart', 'ERC1155');
    newFormData.append('currency', formData.currency);
    newFormData.append('collection', activeCollection);
    newFormData.append('total_supply', formData.total_supply);
    newFormData.append('format', format);
    storeApi
      .createToken(
        newFormData,
        //   , {
        //   [formData.size]: formData.propertie,
        // }
      )
      .then(({ data }) => {
        walletConnector.walletService
          .sendTransaction(data.initial_tx)
          .then(() => {
            setVisibleSuccess(true);
          })
          .finally(() => {
            handleClear();
            setLoading(false);
          });
      })
      .catch((e) => {
        console.log('Error', e);
        setLoading(false);
      })
      .finally(() => {});
  }, [sale, formData, walletConnector.walletService, active, activeCollection, format]);

  const fetchCollections = useCallback(() => {
    userApi.getSingleCollections(user.address).then(({ data }: any) => {
      if (data.collections.length) {
        const erc1155colls = data.collections.filter((col: any) => col.standart === 'ERC1155');
        if (erc1155colls.length) {
          setActiveCollection(erc1155colls[0].id);
        }
      }
      setCollectionsArray([
        {
          title: 'Create collection',
          color: ' linear-gradient(90deg, #6F45FF 0%, #FF6365 100%)',
        },
        ...data.collections.filter((col: any) => col.standart === 'ERC1155'),
      ]);
    });
  }, [user.address]);

  useEffect(() => {
    if (user.address) {
      fetchCollections();
      fetchFee();
    }
  }, [fetchFee, fetchCollections, user.address]);

  const fetchRates = useCallback(() => {
    ratesApi.getRates().then(({ data }: any) => {
      setRates(data);
    });
    // eslint-disable-next-line
  }, []);

  const handleClick = (str: string) => {
    setActiveCurrency(str.toUpperCase());
    setVisibleDropdown(false);
  };

  const customDropdown = () => (
    <OutsideClickHandler onOutsideClick={() => setVisibleDropdown(false)}>
      <div className={cn(styles.dropdownCurrency, { [styles.activeDropdown]: visibleDropdown })}>
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={styles.headCurrency}
          onClick={() => setVisibleDropdown(!visibleDropdown)}
        >
          <div className={styles.selection}>{activeCurrency}</div>
        </div>
        <div className={styles.bodyCurrency}>
          {rates.map((x: any) => (
            <div
              onKeyDown={() => {}}
              tabIndex={0}
              role="button"
              className={cn(styles.optionCurrency, {
                [styles.selectioned]: x.symbol === activeCurrency,
              })}
              onClick={() => handleClick(x.symbol)}
              key={nextId()}
            >
              <img alt="" className={styles.image} src={x.image} />
              <span className={styles.textCurrency}>{x.symbol}</span>
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);
  return (
    <>
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn('h2', styles.title)}>Create multiple collectible</div>
              <Link
                to="/upload-details-single"
                className={cn('button-stroke button-small', styles.button)}
              >
                Switch to Single
              </Link>
            </div>
            <form
              className={styles.form}
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className={styles.list}>
                {(format === 'video' || format === 'audio') && (
                  <div className={styles.item}>
                    {previewURL ? (
                      <div className={styles.preview}>
                        <img src={previewURL} alt="Preview" />
                      </div>
                    ) : (
                      <>
                        <div className={styles.category}>Upload preview</div>
                        <div className={styles.note}>Drag or choose your file to upload</div>
                        <div className={styles.file}>
                          <input
                            className={styles.load}
                            type="file"
                            // eslint-disable-next-line
                            // @ts-ignore
                            onChange={(e) => handleChange('cover', e.target.files[0])}
                            required
                          />
                          <div className={styles.icon}>
                            <img alt="" src="/images/content/icon-upload-gradient.svg" />
                          </div>
                          <div className={styles.format}>JPG, JPEG, PNG, GIF or WEBP. Max 1Gb.</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                <div className={styles.item}>
                  {mediaURL ? (
                    <div className={styles.preview}>
                      {format === 'image' && <img src={mediaURL} alt="Media" />}
                      {format === 'video' && (
                        <video controls>
                          <source
                            src={mediaURL}
                            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                          />
                          <track kind="captions" />
                        </video>
                      )}
                      {format === 'audio' && (
                        <audio controls>
                          <source
                            src={mediaURL}
                            // type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                          />
                          <track kind="captions" />
                        </audio>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className={styles.category}>Upload file</div>
                      <div className={styles.note}>Drag or choose your file to upload</div>
                      <div className={styles.file}>
                        <input
                          className={styles.load}
                          type="file"
                          // eslint-disable-next-line
                          // @ts-ignore
                          onChange={(e) => handleChange('media', e.target.files[0])}
                          required
                        />
                        <div className={styles.icon}>
                          <img alt="" src="/images/content/icon-upload-gradient.svg" />
                        </div>
                        <div className={styles.format}>
                          JPG, JPEG, PNG, GIF, WEBP, MP3 or MP4. Max 1Gb.
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Item name"
                      name="Item"
                      type="text"
                      placeholder='e. g. Redeemable Bitcoin Card with logo"'
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      // required
                    />
                    <TextInput
                      className={styles.field}
                      label="Description"
                      name="Description"
                      type="text"
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      // required
                    />
                    <TextInput
                      className={styles.field}
                      label="Tokens amount"
                      name="Tokens amount"
                      type="number"
                      placeholder="Enter the amount of tokens"
                      value={formData.total_supply}
                      onChange={(e) => handleChange('total_supply', e.target.value)}
                      required
                    />
                    <div className={styles.row}>
                      <div className={styles.col}>
                        <div className={styles.field}>
                          <div className={styles.label}>Royalties</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={formData.creator_royalty}
                            setValue={(value) => handleChange('creator_royalty', value)}
                            options={royaltiesOptions}
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Size"
                          name="Size"
                          type="text"
                          placeholder="e. g. Size"
                          value={formData.size}
                          onChange={(e) => handleChange('size', e.target.value)}
                          // required
                        />
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Propertie"
                          name="Propertie"
                          type="text"
                          placeholder="e. g. Propertie"
                          value={formData.propertie}
                          onChange={(e) => handleChange('propertie', e.target.value)}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.options}>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Put on sale</div>
                    <div className={styles.text}>You’ll receive bids on this item</div>
                  </div>
                  <Switch value={sale} setValue={setSale} />
                </div>
                <div className={styles.squares}>
                  <div
                    className={cn({ [styles.active]: active === 'price' }, styles.square)}
                    onClick={() => setActive('price')}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.inner}>
                      <div className={cn({ [styles.hidden]: active !== 'price' }, styles.circle)}>
                        <FixedPrice />
                      </div>
                      <span>Fixed Price</span>
                    </div>
                  </div>
                  <div
                    className={cn({ [styles.active]: active === 'minimal_bid' }, styles.square)}
                    onClick={() => setActive('minimal_bid')}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.inner}>
                      <div
                        className={cn({ [styles.hidden]: active !== 'minimal_bid' }, styles.circle)}
                      >
                        <Infinity />
                      </div>
                      <span>Open for bids</span>
                    </div>
                  </div>
                  <div className={cn(styles.disabled, styles.square)}>
                    <div className={styles.header}>
                      <Lock />
                      <span>Coming soon</span>
                    </div>
                    <div className={styles.body}>
                      <Timer />
                      <span>Timed auction</span>
                    </div>
                  </div>
                </div>
                {sale && (
                  <>
                    <TextInput
                      className={cn(styles.field, styles.priceBid)}
                      label={active === 'price' ? 'Enter price' : 'Minimum bid'}
                      name="Price or Bid"
                      type="number"
                      placeholder={active === 'price' ? '10' : 'Enter minimum bid'}
                      suffix={customDropdown()}
                      value={active === 'price' ? formData.price : formData.minimal_bid}
                      onChange={(e) => handleChange(active, e.target.value)}
                      // required
                    />
                    <div className={styles.fee}>
                      <span>
                        Service fee <span className={styles.purple}>{fee}%</span>{' '}
                      </span>
                      <span>
                        You will receive{' '}
                        <span className={styles.purple}>
                          {active === 'price'
                            ? (+formData.price * (100 - fee)) / 100
                            : (+formData.minimal_bid * (100 - fee)) / 100}{' '}
                          {activeCurrency}
                        </span>{' '}
                      </span>
                    </div>
                  </>
                )}
                <div className={styles.category}>Choose collection</div>
                <div className={styles.text}>Choose an exiting collection or create a new one</div>
                <Cards
                  className={styles.cards}
                  items={collectionsArray}
                  createCollection={() => setVisibleCreateModal(true)}
                  setCollection={(value: any) => setActiveCollection(value)}
                  activeCollection={activeCollection}
                />
              </div>
              <div className={styles.foot}>
                <Button
                  className={cn('button-stroke tablet-show', styles.button)}
                  onClick={() => setVisiblePreview(true)}
                >
                  Preview
                </Button>
                <Button className={cn('button', styles.button)} type="submit" loading={isLoading}>
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </Button>
                {/* <div className={styles.saving}>
                  <span>Auto saving</span>
                  <Loader className={styles.loader} />
                </div> */}
              </div>
            </form>
          </div>
          <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
            mediaURL={format === 'image' ? mediaURL : previewURL}
            name={formData.name}
            price={formData.price}
            onClear={handleClear}
          />
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowSteps className={styles.steps} />
      </Modal>
      <Modal visible={visibleCreateModal} onClose={() => setVisibleCreateModal(false)}>
        <CreateCollection
          className={styles.steps}
          setCollection={(value: any) => handleChange('collection', value)}
          close={() => setVisibleCreateModal(false)}
        />
      </Modal>
      <Modal visible={visibleSuccess} onClose={() => setVisibleSuccess(false)}>
        <SuccessCreated close={() => setVisibleSuccess(false)} title="token" />
      </Modal>
    </>
  );
});

export default UploadMultiple;
