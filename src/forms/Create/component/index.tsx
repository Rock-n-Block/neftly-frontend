import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { upload } from 'assets/img/upload';
import cn from 'classnames';
import {
  Button,
  Dropdown,
  H6,
  Radio,
  RequiredMark,
  Switch,
  Text,
  // Modal,
  TextArea,
  TextInput,
  Uploader,
} from 'components';
import { IRadioButton } from 'components/Radio';
import { Field, FieldArray, Form, FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';

import ChooseCollection from './ChooseCollection';

// import SuccessCreated from './SuccessCreated';
import styles from './CreateCollectibleDetails.module.scss';
import { ratesApi } from '../../../services';
import { iconClose } from '../../../assets/img/icons';
import BigNumber from 'bignumber.js/bignumber';

const royaltiesOptions = ['10', '20', '30'];

interface IRate {
  rate: string;
  symbol: string;
  image: string;
}

interface IProperti {
  name: string | number;
  amount: string | number;
}

export interface ICreateForm {
  name: string;
  isSingle?: boolean; // standart
  totalSupply: number;
  currency: string;
  description: string;
  price: number;
  minimalBid: number;
  creatorRoyalty: '10' | '20' | '30';
  collection: number;
  details: IProperti[];
  selling: boolean;
  media: string;
  cover: string;
  coverPreview: string;
  format: 'image' | 'video' | 'audio';

  img: any;
  preview: string;
  sellMethod: string;
  isLoading: boolean;
}

const sellMethods: IRadioButton[] = [
  {
    value: 'fixedPrice',
    optionTitle: 'Fixed price',
    optionInfo: 'Sell at fixed price',
  },
  {
    value: 'openForBids',
    optionTitle: 'Open for bids',
    optionInfo: 'Sell through Auction',
  },
];

const CreateForm: React.FC<FormikProps<ICreateForm> & ICreateForm> = observer(
  ({
    setFieldValue,
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSingle = true,
  }) => {
    const history = useHistory();
    // const [rates, setRates] = useState<IRate[]>([]);
    // const [currencies, setCurrencies] = useState<string[]>([]);
    const [rates, setRates] = useState<IRate[]>([]);
    const [addToCollection, setAddToCollection] = useState(true);
    // const [visiblePreview, setVisiblePreview] = useState(false);
    const serviceFee = 3; // TODO: remove after get service fee request
    // const cryptocurrencies = ['ETH', 'BTC'];
    const stringRecieveValue = (parseFloat(`${values.minimalBid}`) * (100 - serviceFee)) / 100 || 0;
    const stringRatesValue = new BigNumber(
      rates.find((rate) => rate.symbol === values.currency)?.rate || 0,
    ).toFixed(2);
    const currencyOptions = useMemo(() => {
      return values.sellMethod === 'openForBids'
        ? [...rates.map((rate) => rate.symbol)].filter(
            (rateSymbol) => !['bnb', 'eth'].includes(rateSymbol),
          )
        : rates.map((rate) => rate.symbol);
    }, [rates, values.sellMethod]);
    const handleClearImg = () => {
      setFieldValue('img', '');
      setFieldValue('preview', '');
      setFieldValue('cover', '');
      setFieldValue('coverPreview', '');
    };
    const onSubmit = () => {
      handleSubmit();
    };
    const onCancel = () => {
      history.goBack();
    };
    const handleChangeProperty = useCallback(
      (e: any, index: any, type: 'name' | 'amount') => {
        const localProperties = [...values.details];

        if (type === 'name') {
          localProperties[index].name = e.target.value;
        }
        if (type === 'amount') {
          localProperties[index].amount = e.target.value;
        }
        if (
          localProperties[localProperties.length - 1].name &&
          localProperties[localProperties.length - 1].amount
        ) {
          localProperties.push({
            name: '',
            amount: '',
          });
        }
        setFieldValue('details', localProperties);
        handleChange(e);
      },
      [handleChange, setFieldValue, values.details],
    );

    const fetchRates = useCallback(() => {
      ratesApi.getRates().then(({ data }: any) => {
        setRates(data);
        // setCurrencies(data.map((item: IRate) => item.symbol));
        setFieldValue('currency', data[0].symbol);
      });
    }, [setFieldValue]);
    useEffect(() => {
      fetchRates();
    }, [fetchRates]);

    useEffect(() => {
      setFieldValue('isSingle', isSingle);
    }, [isSingle, setFieldValue]);

    return (
      <>
        <Form name="form-create" className={styles.form}>
          <div className={cn(styles.column, styles.columnUpload)}>
            {(values.format === 'video' || values.format === 'audio') && (
              <div className={styles.item}>
                {values.cover ? (
                  <div className={styles.previewImg}>
                    <img src={values.coverPreview} alt="Preview" />
                    <Button
                      color="transparent"
                      className={styles.clearPreview}
                      onClick={handleClearImg}
                    >
                      <img src={iconClose} alt="clear img" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className={styles.file}>
                      <Field
                        name="cover"
                        className={styles.load}
                        required
                        render={() => (
                          <Uploader
                            type="cover"
                            name="cover"
                            setFormat={(value: string) => setFieldValue('format', value)}
                          />
                        )}
                      />
                      <div className={styles.capture}>
                        <div className={styles.icon}>
                          <img alt="" src={upload} />
                        </div>
                        <Text className={styles.category} size="m" weight="medium" color="white">
                          Upload preview cover
                        </Text>
                        <Text className={styles.note} color="lightGray">
                          Drag or choose your file to upload
                        </Text>
                        <Text className={styles.format} size="xxs" color="gray">
                          (PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)
                        </Text>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            <div className={styles.item}>
              {values.img ? (
                <div className={styles.previewImg}>
                  {values.format === 'image' && (
                    <>
                      <img src={values.preview} alt="Media" />
                      {/* TODO: add same btn to video/audio  */}
                      <Button
                        color="transparent"
                        className={styles.clearPreview}
                        onClick={handleClearImg}
                      >
                        <img src={iconClose} alt="clear img" />
                      </Button>
                    </>
                  )}
                  {values.format === 'video' && (
                    <video controls>
                      <source
                        src={values.preview}
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                      />
                      <track kind="captions" />
                    </video>
                  )}
                  {values.format === 'audio' && (
                    <audio controls>
                      <source
                        src={values.preview}
                        // type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                      />
                      <track kind="captions" />
                    </audio>
                  )}
                </div>
              ) : (
                <>
                  <div className={styles.file}>
                    <Field
                      name="img"
                      className={styles.load}
                      required
                      render={() => (
                        <Uploader
                          type="img"
                          name="img"
                          setFormat={(value: string) => setFieldValue('format', value)}
                        />
                      )}
                    />
                    <div className={styles.capture}>
                      <div className={styles.icon}>
                        <img alt="" src={upload} />
                      </div>
                      <Text className={styles.category} size="m" weight="medium" color="white">
                        Upload preview
                      </Text>
                      <Text className={styles.note} color="lightGray">
                        Drag or choose your file to upload
                      </Text>
                      <Text className={styles.format} size="xxs" color="gray">
                        (PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)
                      </Text>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={styles.fieldset}>
                <H6>Sell method</H6>
                <Field
                  name="sellMethod"
                  render={() => (
                    <Radio
                      className={cn(styles.field, styles.options)}
                      name="sellMethod"
                      options={sellMethods}
                      controlledValue={values.sellMethod}
                      onChange={(newValue) => {
                        setFieldValue('sellMethod', newValue);
                      }}
                    />
                  )}
                />
              </div>
              <div className={styles.fieldset}>
                <H6>Artwork Details</H6>
                <Field
                  render={() => (
                    <TextInput
                      label={
                        <>
                          Item name <RequiredMark />
                        </>
                      }
                      name="name"
                      type="text"
                      placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.field}
                      required
                    />
                  )}
                />
                {touched.name && errors.name && <Text color="red">{errors.name}</Text>}
                <Field
                  name="description"
                  render={() => (
                    <TextArea
                      label="Description"
                      name="description"
                      value={values.description}
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      onChange={handleChange}
                      maxLettersCount={500}
                      className={styles.field}
                    />
                  )}
                />
                {touched.description && errors.description && (
                  <Text color="red">{errors.description}</Text>
                )}
                <div className={styles.fieldsetRow}>
                  <div className={cn(styles.price, styles.fieldsetRowColumn)}>
                    <Text className={styles.label} size="m" weight="medium">
                      {`${values.sellMethod === 'fixedPrice' ? 'Price' : 'Minimal Bid'}`} <RequiredMark />
                    </Text>
                    <div className={styles.inputs}>
                      <Field
                        render={() => (
                          <Dropdown
                            name="currency"
                            setValue={(value) => setFieldValue('currency', value)}
                            options={currencyOptions}
                            className={styles.dropdown}
                            value={values.currency}
                          />
                        )}
                      />
                      <Field
                        render={() => {
                          if (values.sellMethod === 'fixedPrice') {
                            return (
                              <TextInput
                                name="price"
                                type="number"
                                placeholder="e.g. 0.007"
                                value={values.price.toString()}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                positiveOnly
                                className={styles.priceInput}
                              />
                            );
                          }
                          return (
                            <TextInput
                              name="minimalBid"
                              type="number"
                              placeholder="e.g. 0.007"
                              value={values.minimalBid.toString()}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              positiveOnly
                              className={styles.priceInput}
                            />
                          );
                        }}
                      />
                      {touched.price && errors.price && <Text color="red">{errors.price}</Text>}
                    </div>
                    <div className={styles.postfix}>
                      {/* change dynamically */}
                      <Text color="gray">Minimum price 0.0001 {values.currency.toUpperCase()}</Text>
                      <Text color="gray">
                        USD {stringRatesValue} PER/
                        {values.currency.toUpperCase()}
                      </Text>
                    </div>
                  </div>
                  {!isSingle && (
                    <div className={styles.fieldsetRowColumn}>
                      <Text className={styles.label} size="m" weight="medium">
                        In Stock <RequiredMark />
                      </Text>
                      <Field
                        render={() => (
                          <TextInput
                            name="totalSupply"
                            type="number"
                            placeholder="e.g. 0.007"
                            value={`${values.totalSupply}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                        )}
                      />
                      {touched.totalSupply && errors.totalSupply && (
                        <Text color="red">{errors.totalSupply}</Text>
                      )}
                    </div>
                  )}
                  <div className={styles.fieldsetRowColumn}>
                    <Text className={styles.label} size="m" weight="medium">
                      Royalties <RequiredMark />
                    </Text>
                    <Field
                      render={() => (
                        <Dropdown
                          name="Royalties"
                          setValue={(value) => setFieldValue('creatorRoyalty', value)}
                          options={royaltiesOptions}
                          className={styles.dropdown}
                          value={`${values.creatorRoyalty}%`}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={styles.fee}>
                  <Text color="secondary">
                    Service fee {serviceFee}%
                    <br />
                    You will receive {stringRecieveValue} {values.currency?.toUpperCase()}
                  </Text>
                </div>
                <div className={styles.tokenProperties}>
                  <FieldArray
                    name="details"
                    render={() => {
                      return values.details?.map((item: IProperti, index: number) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className={styles.tokenProperty} key={`details_${index}`}>
                          <Field
                            name={`details[${index}].name`}
                            render={() => (
                              <TextInput
                                label="Property"
                                type="text"
                                name={`details[${index}].name`}
                                placeholder="e. g. Size"
                                onChange={(e) => handleChangeProperty(e, index, 'name')}
                                onBlur={handleBlur}
                                className={styles.tokenPropertyName}
                              />
                            )}
                          />

                          {!values.isSingle ? (
                            <Field
                              name={`details[${index}].amount`}
                              render={() => (
                                <TextInput
                                  name="amount"
                                  label="amount"
                                  type="text"
                                  placeholder="e. g. M"
                                  onChange={(e) => handleChangeProperty(e, index, 'amount')}
                                  onBlur={handleBlur}
                                  className={styles.tokenPropertyValue}
                                />
                              )}
                            />
                          ) : null}
                        </div>
                      ));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={cn(styles.fieldset, styles.addCollection)}>
              <H6 className={styles.fieldsetTitle}>
                Add to collection
                <Switch
                  value={addToCollection}
                  setValue={() => setAddToCollection(!addToCollection)}
                />
              </H6>
              {addToCollection && (
                <ChooseCollection
                  className={styles.collections}
                  activeCollectionId={values.collection}
                  onChange={(value: any) => setFieldValue('collection', value)}
                  isSingle={isSingle}
                />
              )}
            </div>
            <div className={styles.btns}>
              <Button
                className={cn('button', styles.button, styles.submitBtn)}
                onClick={onSubmit}
                loading={values.isLoading}
              >
                Create item
              </Button>
              <Button
                className={cn('button', styles.button, styles.cancelBtn)}
                onClick={onCancel}
                color="transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>

        {/* <Modal visible={values.showModal} onClose={() => setFieldValue('showModal', false)}>
          <SuccessCreated close={() => setFieldValue('showModal', false)} title='token' />
        </Modal> */}
      </>
    );
  },
);

export default CreateForm;
