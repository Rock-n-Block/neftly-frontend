import React, {useCallback, useEffect, useState} from 'react';
import {Form} from 'antd';
// import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import {FieldArray, FormikProps} from 'formik';
import {observer} from 'mobx-react-lite';

import {ReactComponent as FixedPrice} from '../../../assets/img/icons/fixed-price.svg';
import {ReactComponent as Infinity} from '../../../assets/img/icons/infinity.svg';
import {ReactComponent as Lock} from '../../../assets/img/icons/lock.svg';
import {ReactComponent as Timer} from '../../../assets/img/icons/timer.svg';
import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
import DropdownWithImage from '../../../components/DropdownWithImage';
import Icon from '../../../components/Icon';
// import Loader from '../../../components/Loader/Circular1';
import Modal from '../../../components/Modal';
import TextInput from '../../../components/TextInput';
// import { NFTCard } from '../../../components/molecules';
// import { ChooseCollection, Uploader } from '../../../components';
import Uploader from '../../../components/Uploader';
import {ratesApi} from '../../../services/api';
import {useMst} from '../../../store/store';
import {validateField} from '../../../utils/validate';

import ChooseCollection from './ChooseCollection';
// import Cards from './Cards';
// import Preview from './Preview';
import {upload} from 'assets/img/upload'
import SuccessCreated from './SuccessCreated';

import styles from './CreateCollectibleDetails.module.scss';
import TextArea from "../../../components/TextArea";

const royaltiesOptions = ['10%', '20%', '30%'];

interface IProperti {
  size: string | number;
  amount: string | number;
}

export interface ICreateForm {
  img: any;
  preview: string;
  coverPreview: string;
  sellMethod: boolean;
  instantSalePrice: boolean;
  // unlockOncePurchased: boolean;
  instantSalePriceEth: number | string;
  cover: any;
  tokenName: string;
  tokenDescr: string;
  tokenRoyalties: string;
  numberOfCopies: number | string;
  tokenProperties: IProperti[];
  isSingle?: boolean;
  isLoading: boolean;
  collectionId: string;
  currency: string;
  bid: string;
  format: string;
  showModal: boolean;
}

const requiredMark = <span className={styles.required}>*</span>;

const CreateForm: React.FC<FormikProps<ICreateForm> & ICreateForm> = observer(
  ({
     setFieldValue,
     values,
     touched,
     errors,
     handleBlur,
     handleChange,
     handleSubmit,
     isSingle,
   }) => {
    const {user} = useMst();
    // const [active, setActive] = useState('price');
    const [rates, setRates] = useState([]);
    // const [visiblePreview, setVisiblePreview] = useState(false);
    const serviceFee = 3; // TODO: remove after get service fee request
    // const cryptocurrencies = ['ETH', 'BTC'];
    const onSubmit = () => {
      handleSubmit();
    };
    const handleChangeProperty = (e: any, index: any, type: any) => {
      const localProperties = [...values.tokenProperties];

      if (type === 'size') {
        localProperties[index].size = e.target.value;
      }
      if (type === 'amount') {
        localProperties[index].amount = e.target.value;
      }
      if (
        localProperties[localProperties.length - 1].size &&
        localProperties[localProperties.length - 1].amount
      ) {
        localProperties.push({
          size: '',
          amount: '',
        });
      }
      setFieldValue('tokenProperties', localProperties);
      handleChange(e);
    };

    const fetchRates = useCallback(() => {
      ratesApi.getRates().then(({data}: any) => {
        setRates(data);
      });
    }, []);

    useEffect(() => {
      fetchRates();
    }, [fetchRates]);
    return (
      <div className={styles.formWrapper}>
        <Form name="form-create" className={styles.form}>
          <div className={styles.column}>
            {(values.format === 'video' || values.format === 'audio') && (
              <div className={styles.item}>
                {values.cover ? (
                  <div className={styles.previewImg}>
                    <img src={values.coverPreview} alt="Preview"/>
                  </div>
                ) : (
                  <>
                    <div className={styles.file}>
                      <Form.Item
                        name="cover"
                        className={styles.load}
                        validateStatus={validateField('cover', touched, errors)}
                        help={!touched.cover ? false : errors.cover}
                      >
                        <Uploader
                          type="cover"
                          name="cover"
                          setFormat={(value: string) => setFieldValue('format', value)}
                        />
                      </Form.Item>
                      <div className={styles.icon}>
                        <img alt="" src={upload}/>
                      </div>
                      <div className={styles.category}>Upload preview</div>
                      <div className={styles.note}>Drag or choose your file to upload</div>
                      <div className={styles.format}>(PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            <div className={styles.item}>
              {values.img ? (
                <div className={styles.previewImg}>
                  {console.log('format', values.format, values.preview)}
                  {values.format === 'image' && <img src={values.preview} alt="Media"/>}
                  {values.format === 'video' && (
                    <video controls>
                      <source
                        src={values.preview}
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                      />
                      <track kind="captions"/>
                    </video>
                  )}
                  {values.format === 'audio' && (
                    <audio controls>
                      <source
                        src={values.preview}
                        // type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                      />
                      <track kind="captions"/>
                    </audio>
                  )}
                </div>
              ) : (
                <>
                  <div className={styles.file}>
                    <Form.Item
                      name="img"
                      className={styles.load}
                      validateStatus={validateField('img', touched, errors)}
                      help={!touched.img ? false : errors.img}
                    >
                      <Uploader
                        type="img"
                        name="img"
                        setFormat={(value: string) => setFieldValue('format', value)}
                      />
                    </Form.Item>
                    <div className={styles.icon}>
                      <img alt="" src={upload}/>
                    </div>
                    <div className={styles.category}>Upload file</div>
                    <div className={styles.note}>Drag or choose your file to upload</div>
                    <div className={styles.format}>
                      (PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={styles.fieldset}>
                <h3 className={styles.fieldsetTitle}>
                  Sell method
                </h3>
                <Form.Item
                  name="sellMethod"
                  className={styles.field}>

                  <div className={styles.options}>
                    <div className={cn(styles.option, styles.active)}>
                      {/* <div className={styles.box}>
                        <div className={styles.category}>Put on sale</div>
                        <div className={styles.text}>You’ll receive bids on this item</div>
                      </div>
                      <Switch
                        value={values.sellMethod}
                        setValue={(value) => setFieldValue('sellMethod', value)}
                      /> */}
                      <h4>
                        Fixed price
                      </h4>
                      <p>Sell at fixed price</p>
                    </div>
                    <div className={styles.option}>
                      {/* <div className={styles.box}>
                        <div className={styles.category}>Put on sale</div>
                        <div className={styles.text}>You’ll receive bids on this item</div>
                      </div>
                      <Switch
                        value={values.sellMethod}
                        setValue={(value) => setFieldValue('sellMethod', value)}
                      /> */}
                      <h4>
                        Open for bids
                      </h4>
                      <p>Sell through Auction</p>
                    </div>
                  </div>
                </Form.Item>
              </div>
              <div className={styles.fieldset}>
                <h3 className={styles.fieldsetTitle}>
                  Artwork Details
                </h3>
                <Form.Item
                  name="tokenName"
                  className={styles.field}
                  validateStatus={validateField('tokenName', touched, errors)}
                  help={!touched.tokenName ? false : errors.tokenName}
                >
                  <TextInput
                    label={<>Item name {requiredMark}</>}
                    name="tokenName"
                    type="text"
                    placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                    value={values.tokenName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Form.Item>
                <Form.Item
                  className={styles.field}
                  name="tokenDescr"
                  validateStatus={validateField('tokenDescr', touched, errors)}
                  help={!touched.tokenDescr ? false : errors.tokenDescr}
                >
                  <TextArea
                    label={<>Description {requiredMark}</>}
                    name="tokenDescr"
                    value={values.tokenDescr}
                    placeholder="e. g. “After purchasing you will able to recived the logo...”"
                    onChange={handleChange}
                    maxLettersCount={500}
                  />
                </Form.Item>
                <div className={styles.fieldsetRow}>
                  <div className={styles.price}>
                    <Form.Item>
                      <Dropdown
                        name="Royalties"
                        label="Price"
                        setValue={(value) => setFieldValue('tokenRoyalties', value)}
                        options={royaltiesOptions}
                        className={styles.dropdown}
                        value={values.tokenRoyalties}
                      />
                    </Form.Item>
                    <Form.Item>
                      <TextInput
                        className={styles.field}
                        name="price"
                        type="number"
                        placeholder="e.g. 0.007"
                        value={values.price.toString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Form.Item>
                  </div>
                </div>
                {!isSingle && (
                  <Form.Item
                    className={styles.field}
                    name="numberOfCopies"
                    validateStatus={validateField('numberOfCopies', touched, errors)}
                    help={!touched.numberOfCopies ? false : errors.numberOfCopies}
                  >
                    <div>
                      <TextInput
                        className={styles.field}
                        label="Tokens amount"
                        name="numberOfCopies"
                        type="number"
                        placeholder="Enter the amount of tokens"
                        value={values.numberOfCopies.toString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </div>
                  </Form.Item>
                )}
                <div className={styles.row}>
                  <div className={styles.col}>
                    <div className={styles.label}>Royalties</div>
                    {/* <Form.Item
                      className={styles.field}
                      name="Royalties"
                      validateStatus={validateField('tokenRoyalties', touched, errors)}
                      help={!touched.tokenRoyalties ? false : errors.tokenRoyalties}
                      // initialValue={values.tokenRoyalties}
                      // va
                    > */}
                    {/* console.log(values.tokenRoyalties) */}
                    <Dropdown
                      name="Royalties"
                      setValue={(value) => setFieldValue('tokenRoyalties', value)}
                      options={royaltiesOptions}
                      className={styles.dropdown}
                      value={values.tokenRoyalties}
                    />
                    {/* </Form.Item> */}
                  </div>
                  <FieldArray
                    name="tokenProperties"
                    render={() => {
                      return values.tokenProperties?.map((item: any, index: any) => (
                        <>
                          <Form.Item
                            name={`tokenProperties[${index}].size`}
                            validateStatus={validateField(`tokenProperties`, touched, errors)}
                            className={styles.col}
                            help={(() => {
                              return errors.tokenProperties &&
                              errors.tokenProperties[index] &&
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              // eslint-disable-next-line no-param-reassign
                              errors.tokenProperties[index].size
                                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-ignore
                                  // eslint-disable-next-line no-param-reassign
                                errors.tokenProperties[index].size
                                : false;
                            })()}
                          >
                            <div>
                              <TextInput
                                label="Size"
                                type="text"
                                name={`tokenProperties[${index}].size`}
                                placeholder="e. g. Size"
                                onChange={(e) => handleChangeProperty(e, index, 'size')}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Form.Item>

                          <Form.Item
                            name={`tokenProperties[${index}].amount`}
                            className={styles.col}
                            validateStatus={validateField(`tokenProperties`, touched, errors)}
                            help={(() => {
                              return errors.tokenProperties &&
                              errors.tokenProperties[index] &&
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              // eslint-disable-next-line no-param-reassign
                              errors.tokenProperties[index].amount
                                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-ignore
                                  // eslint-disable-next-line no-param-reassign
                                errors.tokenProperties[index].amount
                                : false;
                            })()}
                          >
                            <div>
                              <TextInput
                                name="Amount"
                                label="Amount"
                                type="text"
                                placeholder="e. g. M"
                                onChange={(e) => handleChangeProperty(e, index, 'amount')}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Form.Item>
                        </>
                      ));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.squares}>
              <div
                className={cn({[styles.active]: values.instantSalePrice}, styles.square)}
                onClick={() => setFieldValue('instantSalePrice', true)}
                onKeyDown={() => {
                }}
                role="button"
                tabIndex={0}
              >
                <div className={styles.inner}>
                  <div className={cn({[styles.hidden]: !values.instantSalePrice}, styles.circle)}>
                    <FixedPrice/>
                  </div>
                  <span>Fixed Price</span>
                </div>
              </div>
              <div
                className={cn({[styles.active]: !values.instantSalePrice}, styles.square)}
                onClick={() => setFieldValue('instantSalePrice', false)}
                onKeyDown={() => {
                }}
                role="button"
                tabIndex={0}
              >
                <div className={styles.inner}>
                  <div className={cn({[styles.hidden]: values.instantSalePrice}, styles.circle)}>
                    <Infinity/>
                  </div>
                  <span>Open for bids</span>
                </div>
              </div>
              <div className={cn(styles.disabled, styles.square)}>
                <div className={styles.header}>
                  <Lock/>
                  <span>Coming soon</span>
                </div>
                <div className={styles.body}>
                  <Timer/>
                  <span>Timed auction</span>
                </div>
              </div>
            </div>
            {values.sellMethod && (
              <>
                <Form.Item
                  name={values.instantSalePrice ? 'instantSalePriceEth' : 'bid'}
                  validateStatus={
                    values.instantSalePrice
                      ? validateField('instantSalePriceEth', touched, errors)
                      : validateField('bid', touched, errors)
                  }
                  help={
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line
                    values.instantSalePrice
                      ? !touched.instantSalePriceEth
                        ? false
                        : errors.instantSalePriceEth
                      : !touched.bid
                        ? false
                        : errors.bid
                  }
                >
                  <div style={{position: 'relative'}} className={styles.fieldset}>
                    <TextInput
                      name={values.instantSalePrice ? 'instantSalePriceEth' : 'bid'}
                      className={cn(styles.field, styles.priceBid)}
                      label={values.instantSalePrice ? 'Enter price' : 'Minimum bid'}
                      value={
                        values.instantSalePrice ? values.instantSalePriceEth.toString() : values.bid
                      }
                      placeholder={
                        values.instantSalePrice ? 'Enter price for one piece' : 'Enter minimum bid'
                      }
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <DropdownWithImage
                      className={styles.cryptocurrenciesDropdown}
                      value={values.currency.toUpperCase()}
                      options={rates}
                      setValue={(value: string) => setFieldValue('currency', value)}
                      customClasses={{
                        head: styles.cryptocurrenciesDropdownHead,
                        selection: styles.cryptocurrenciesDropdownSelection,
                        arrow: styles.cryptocurrenciesDropdownArrow,
                      }}
                    />
                  </div>
                </Form.Item>
                <div className={styles.fee}>
                <span>
                  Service fee <span className={styles.purple}>{serviceFee}%</span>{' '}
                </span>
                  <span>
                  You will receive{' '}
                    <span className={styles.purple}>
                    {(parseFloat(values.bid) * (100 - serviceFee)) / 100}{' '}
                      {values.currency.toUpperCase()}
                  </span>{' '}
                </span>
                </div>
              </>
            )}
            {user.address ? <ChooseCollection isSingle={isSingle}/> : ''}
            <Button
              className={cn('button', styles.button)}
              onClick={onSubmit}
              loading={values.isLoading}
            >
              <span>Create item</span>
              <Icon name="arrow-next" size="10"/>
            </Button>
          </div>
        </Form>
        {/*
        <Preview
          className={cn(styles.preview, { [styles.active]: visiblePreview })}
          onClose={() => setVisiblePreview(false)}
          mediaURL={values.format === 'image' ? values.preview : values.coverPreview}
          name={values.tokenName}
          price={values.instantSalePriceEth.toString()}
          format={values.format}
          // onClear={handleClear}
        /> */}

        <Modal visible={values.showModal} onClose={() => setFieldValue('showModal', false)}>
          <SuccessCreated close={() => setFieldValue('showModal', false)} title="token"/>
        </Modal>
      </div>
    );
  },
);

export default CreateForm;
