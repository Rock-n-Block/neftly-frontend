import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { IconRefresh, iconUpload } from 'assets/img';
import { ReactComponent as IconPropAdd } from 'assets/img/icons/icon-prop-add.svg';
import { ReactComponent as IconPropDelete } from 'assets/img/icons/icon-prop-delete.svg';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import {
  Button,
  Dropdown,
  H6,
  Radio,
  RequiredMark,
  Switch,
  Text,
  TextArea,
  TextInput,
  Uploader,
} from 'components';
import { IRadioButton } from 'components/Radio';
import { Field, FieldArray, Form, FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { ratesApi } from 'services';

import ChooseCollection from './ChooseCollection';

import styles from './CreateCollectibleDetails.module.scss';

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

const CreateForm: FC<FormikProps<ICreateForm> & ICreateForm> = observer(
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
    const [rates, setRates] = useState<IRate[]>([]);
    const [addToCollection, setAddToCollection] = useState(true);
    const [isRefresh, setIsRefresh] = useState(true);
    const serviceFee = 3; // TODO: remove after get service fee request
    const stringRecieveValue =
      (parseFloat(`${values.price || values.minimalBid}`) * (100 - serviceFee)) / 100 || 0;
    const stringRatesValue = new BigNumber(
      rates.find((rate) => rate.symbol === values.currency)?.rate || 0,
    ).toFixed(2);
    const currencyOptions = useMemo(() => {
      return values.sellMethod === 'openForBids'
        ? [...rates.map((rate) => rate.symbol)].filter(
            (rateSymbol) => !['bnb', 'eth', 'matic'].includes(rateSymbol),
          )
        : rates.map((rate) => rate.symbol);
    }, [rates, values.sellMethod]);
    const handleClearImg = () => {
      setFieldValue('media', '');
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
        setFieldValue('details', localProperties);
        handleChange(e);
      },
      [handleChange, setFieldValue, values.details],
    );

    const handleAddProperty = useCallback(() => {
      setFieldValue('details', [
        ...values.details,
        {
          size: '',
          amount: '',
        },
      ]);
    }, [setFieldValue, values.details]);

    const handleRemoveProperty = useCallback(
      (elemIndex: number) => {
        const newValue = values.details.filter((_, index) => index !== elemIndex);

        setFieldValue('details', newValue);
      },
      [setFieldValue, values.details],
    );

    const fetchRates = useCallback(() => {
      ratesApi.getRates().then(({ data }: any) => {
        setRates(data);
        setFieldValue('currency', data[0]?.symbol);
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
                            isImgOnly
                            formikValue="cover"
                            setFormat={(value: string) => setFieldValue('format', value)}
                          />
                        )}
                      />
                      <div className={styles.capture}>
                        <div className={styles.icon}>
                          <img alt="" src={iconUpload} />
                        </div>
                        <Text className={styles.category} size="m" weight="medium" color="black">
                          Upload preview cover
                        </Text>
                        <Text className={styles.note} color="black">
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
              {values.media ? (
                <div className={styles.previewImg}>
                  {values.format === 'image' && (
                    <>
                      <img src={values.preview} alt="Media" />
                      {/* TODO: add same btn to video/audio  */}
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
                      <source src={values.preview} />
                      <track kind="captions" />
                    </audio>
                  )}
                </div>
              ) : (
                <>
                  <div className={styles.file}>
                    <Field
                      name="media"
                      className={styles.load}
                      required
                      render={() => (
                        <Uploader
                          formikValue="media"
                          setFormat={(value: string) => setFieldValue('format', value)}
                        />
                      )}
                    />
                    <div className={styles.capture}>
                      <div className={styles.icon}>
                        <img alt="" src={iconUpload} />
                      </div>
                      <Text className={styles.category} size="m" weight="medium" color="black">
                        Upload preview
                      </Text>
                      <Text className={styles.note} color="black">
                        Drag or choose your file to upload
                      </Text>
                      <Text className={styles.format} size="xxs" color="gray">
                        (PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)
                      </Text>
                    </div>
                  </div>
                </>
              )}
              {values.media && (
                <Button className={styles.clean} onClick={handleClearImg}>
                  Clear
                </Button>
              )}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={cn(styles.fieldset, styles.fieldset_first)}>
                <H6 className={styles.fieldsetTitle}>Sell method</H6>
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
                <H6 className={styles.fieldsetTitle}>Artwork Details</H6>
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
                    <Text className={styles.label} color="black" size="m" weight="medium">
                      {`${values.sellMethod === 'fixedPrice' ? 'Price' : 'Minimal Bid'}`}{' '}
                      <RequiredMark />
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
                    </div>
                    {touched.price && errors.price && <Text color="red">{errors.price}</Text>}
                    <div className={styles.postfix}>
                      {/* change dynamically */}
                      <Text color="middleGray">
                        Minimum price 0.0001 {values.currency?.toUpperCase()}
                      </Text>
                      <Text color="middleGray">
                        USD {stringRatesValue} PER/
                        {values.currency?.toUpperCase()}
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
                          suffix="%"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={styles.fee}>
                  <Text color="primary">
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

                          <div
                            className={cn(styles.detailsBtns, {
                              [styles.detailsBtnsDouble]:
                                index === values.details.length - 1 && index !== 0,
                            })}
                          >
                            {values.details.length === index + 1 && values.details.length < 10 ? (
                              <div
                                className={cn(styles.btn, styles.btn_add)}
                                onClick={handleAddProperty}
                                role="button"
                                tabIndex={0}
                                onKeyDown={() => {}}
                              >
                                <IconPropAdd />
                              </div>
                            ) : null}
                            {values.details.length !== 1 ? (
                              <div
                                className={cn(styles.btn, styles.btn_remove)}
                                onClick={() => handleRemoveProperty(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={() => {}}
                              >
                                <IconPropDelete />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={cn(styles.fieldset, styles.addCollection)}>
              <H6 className={styles.fieldsetTitle}>
                <div>
                  Add to collection
                  <IconRefresh className={styles.refresh} onClick={() => setIsRefresh(true)} />
                </div>
                <Switch
                  value={addToCollection}
                  setValue={() => setAddToCollection(!addToCollection)}
                />
              </H6>
              <ChooseCollection
                className={styles.collections}
                activeCollectionId={values.collection}
                onChange={(value: any) => setFieldValue('collection', value)}
                isSingle={isSingle}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
                addToCollection={addToCollection}
              />
            </div>
            <div className={styles.btns}>
              <Button
                className={cn('button', styles.button, styles.submitBtn)}
                onClick={onSubmit}
                disabled={values.isLoading || !values.collection}
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
      </>
    );
  },
);

export default CreateForm;
