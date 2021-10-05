import React, {useEffect, useState} from 'react';
import {upload} from 'assets/img/upload';
import cn from 'classnames';
import {Form, Field, FieldArray, FormikProps} from 'formik';
import {observer} from 'mobx-react-lite';

import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
import Modal from '../../../components/Modal';
import TextArea from '../../../components/TextArea';
import TextInput from '../../../components/TextInput';
import Uploader from '../../../components/Uploader';
// import {ratesApi} from '../../../services/api';
import {validateField} from '../../../utils/validate';

// import ChooseCollection from './ChooseCollection';
import ChooseCollection from './ChooseCollection';
import SuccessCreated from './SuccessCreated';

import styles from './CreateCollectibleDetails.module.scss';
import Switch from "../../../components/Switch";
import {useHistory} from "react-router";
import {Radio, Text} from "../../../components";
import {IRadioButton} from "../../../components/Radio";

const royaltiesOptions = ['10%', '20%', '30%'];

// TODO:remove after getting rates
const mockCurrenciesOptions = ['ETH', 'WETH', 'USDT'];

const numberOfCopiesOptions = ['1', '3', '5'];

interface IProperti {
  name: string | number;
  amount: string | number;
}

export interface ICreateForm {
  img: any;
  preview: string;
  coverPreview: string;
  sellMethod: string;
  cover: any;
  tokenName: string;
  tokenDescr: string;
  tokenRoyalties: string;
  numberOfCopies: string;
  tokenProperties: IProperti[];
  isSingle?: boolean;
  isLoading: boolean;
  collectionId: number;
  currency: 'ETH' | 'WETH' | 'USDT';
  bid: string;
  price: string;
  format: string;
  showModal: boolean;
}

const requiredMark = <span className={styles.required}>*</span>;


const sellMethods: IRadioButton[] = [
  {
    value: 'fixedPrice',
    optionTitle: 'Fixed price',
    optionInfo: 'Sell at fixed price'
  },
  {
    value: 'openForBids',
    optionTitle: 'Open for bids',
    optionInfo: 'Sell through Auction'
  },
]

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
    // const [rates, setRates] = useState([]);
    const [addToCollection, setAddToCollection] = useState(true);
    // const [visiblePreview, setVisiblePreview] = useState(false);
    const serviceFee = 3; // TODO: remove after get service fee request
    // const cryptocurrencies = ['ETH', 'BTC'];
    const onSubmit = () => {
      handleSubmit();
    };
    const onCancel = () => {
      history.goBack();
    };
    const handleChangeProperty = (e: any, index: any, type: any) => {
      const localProperties = [...values.tokenProperties];

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
      setFieldValue('tokenProperties', localProperties);
      handleChange(e);
    };

    /* const fetchRates = useCallback(() => {
       ratesApi.getRates().then(({data}: any) => {
         setRates(data);
       });
     }, []); */

    /* useEffect(() => {
       fetchRates();
     }, [fetchRates]); */
    useEffect(() => {
      console.log(values);
    }, [values]);
    return (
      <>
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
                      <Field
                        name="cover"
                        className={styles.load}
                        validateStatus={validateField('cover', touched, errors)}
                        render={() => (
                          <Uploader
                            type="cover"
                            name="cover"
                            setFormat={(value: string) => setFieldValue('format', value)}
                          />)}/>
                      <div className={styles.capture}>
                        <div className={styles.icon}>
                          <img alt="" src={upload}/>
                        </div>
                        <div className={styles.category}>Upload preview</div>
                        <div className={styles.note}>Drag or choose your file to upload</div>
                        <div className={styles.format}>(PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)</div>
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
                    <Field
                      name="img"
                      className={styles.load}
                      validateStatus={validateField('img', touched, errors)}
                      render={() => (
                        <Uploader
                          type="img"
                          name="img"
                          setFormat={(value: string) => setFieldValue('format', value)}
                        />)}/>
                    <div className={styles.capture}>
                      <div className={styles.icon}>
                        <img alt="" src={upload}/>
                      </div>
                      <div className={styles.category}>Upload preview</div>
                      <div className={styles.note}>Drag or choose your file to upload</div>
                      <div className={styles.format}>(PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <div className={styles.fieldset}>
                <h3 className={styles.fieldsetTitle}>Sell method</h3>
                <Field name="sellMethod"
                       className={styles.field}
                       render={() => (
                         <Radio className={styles.options} name='sellMethod' options={sellMethods}
                                controlledValue={values.sellMethod} onChange={newValue => {
                           setFieldValue('sellMethod', newValue)
                         }}/>
                       )}/>
              </div>
              <div className={styles.fieldset}>
                <h3 className={styles.fieldsetTitle}>Artwork Details</h3>
                <Field
                  render={() => (
                    <TextInput
                      label={<>Item name {requiredMark}</>}
                      name="tokenName"
                      type="text"
                      placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                      value={values.tokenName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.field}
                      required
                    />)}/>
                <Text>
                  {touched.tokenName && errors.tokenName && <div>{errors.tokenName}</div>}
                </Text>
                <Field
                  name="tokenDescr"
                  render={() => (
                    <TextArea
                      label={<>Description {requiredMark}</>}
                      name="tokenDescr"
                      value={values.tokenDescr}
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      onChange={handleChange}
                      maxLettersCount={500}
                      className={styles.field}
                    />)}/>
                <Text>
                  {touched.tokenName && errors.tokenName && <div>{errors.tokenName}</div>}</Text>
                <div className={styles.fieldsetRow}>
                  <div className={cn(styles.price, styles.fieldsetRowColumn)}>
                    <p className={styles.label}>Price</p>
                    <div className={styles.inputs}>
                      <Field render={() => (
                        <Dropdown
                          name="currency"
                          setValue={(value) => setFieldValue('currency', value)}
                          options={mockCurrenciesOptions}
                          className={styles.dropdown}
                          value={values.currency}
                        />)}/>
                      <Field render={() => (
                        <TextInput
                          name="price"
                          type="number"
                          placeholder="e.g. 0.007"
                          value={values.price.toString()}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={styles.priceInput}
                        />)}/>
                      {touched.price && errors.price && <div>{errors.price}</div>}
                    </div>
                    <div className={styles.postfix}>
                      {/* change dynamically */}
                      <p>Minimum price 0.004 ETH</p>
                      <p>USD 234.24 PER/ETH</p>
                    </div>
                  </div>
                  <div className={styles.fieldsetRowColumn}>
                    <p className={styles.label}>In Stock {requiredMark}</p>
                    <Field render={() => (
                      <Dropdown
                        name="numberOfCopies"
                        setValue={(value) => setFieldValue('numberOfCopies', value)}
                        options={numberOfCopiesOptions}
                        className={styles.dropdown}
                        value={values.numberOfCopies}
                      />)}/>
                  </div>
                  <div className={styles.fieldsetRowColumn}>
                    <p className={styles.label}>Royalties {requiredMark}</p>
                    <Field render={() => (
                      <Dropdown
                        name="Royalties"
                        setValue={(value) => setFieldValue('tokenRoyalties', value)}
                        options={royaltiesOptions}
                        className={styles.dropdown}
                        value={values.tokenRoyalties}
                      />)}/>
                  </div>
                </div>
                <div className={styles.fee}>
                  <p>Service fee {serviceFee}%</p>
                  <p>
                    {/* change dynamically */}
                    You will receive {(parseFloat(values.bid) * (100 - serviceFee)) / 100 || 0}{' '}
                    {values.currency.toUpperCase()}
                  </p>
                </div>
                {!isSingle && (
                  <Field
                    className={styles.field}
                    name="numberOfCopies"
                    validateStatus={validateField('numberOfCopies', touched, errors)}
                    render={() => (
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
                      />)}/>
                )}
                <div className={styles.tokenProperties}>
                  <FieldArray
                    name="tokenProperties"
                    render={() => {
                      return values.tokenProperties?.map((item: any, index: any) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className={styles.tokenProperty} key={`tokenProperty_${index}`}>
                          <Field
                            name={`tokenProperties[${index}].name`}
                            validateStatus={validateField(`tokenProperties`, touched, errors)}
                            /* help={(() => {
                               return errors.tokenProperties &&
                               errors.tokenProperties[index] &&
                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                               // @ts-ignore
                               // eslint-disable-next-line no-param-reassign
                               errors.tokenProperties[index].name
                                 ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                   // @ts-ignore
                                   // eslint-disable-next-line no-param-reassign
                                 errors.tokenProperties[index].name
                                 : false;
                             })()} */
                            render={() => (
                              <TextInput
                                label="Property"
                                type="text"
                                name={`tokenProperties[${index}].name`}
                                placeholder="e. g. Size"
                                onChange={(e) => handleChangeProperty(e, index, 'size')}
                                onBlur={handleBlur}
                                className={styles.tokenPropertyName}
                              />)}/>

                          <Field
                            name={`tokenProperties[${index}].amount`}
                            validateStatus={validateField(`tokenProperties`, touched, errors)}
                            /* help={(() => {
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
                             })()} */
                            render={() => (
                              <TextInput
                                name="amount"
                                label="amount"
                                type="text"
                                placeholder="e. g. M"
                                onChange={(e) => handleChangeProperty(e, index, 'amount')}
                                onBlur={handleBlur}
                                className={styles.tokenPropertyValue}
                              />)}/>
                        </div>
                      ));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={cn(styles.fieldset, styles.addCollection)}>
              <h3 className={styles.fieldsetTitle}>
                Add to collection
                <Switch
                  value={addToCollection}
                  setValue={() => setAddToCollection(!addToCollection)}
                />
              </h3>
              {addToCollection && (<ChooseCollection
                className={styles.collections}
                activeCollectionId={values.collectionId}
                onChange={(value) => setFieldValue('collectionId', value)}
                isSingle={isSingle}/>)}

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

        <Modal visible={values.showModal} onClose={() => setFieldValue('showModal', false)}>
          <SuccessCreated close={() => setFieldValue('showModal', false)} title="token"/>
        </Modal>
      </>
    );
  },
);

export default CreateForm;
