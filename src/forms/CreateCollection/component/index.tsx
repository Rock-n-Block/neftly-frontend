import React from 'react';
import { Form } from 'antd';
import cn from 'classnames';
import { FormikProps } from 'formik';

import Modal from '../../../components/Modal';
import TextInput from '../../../components/TextInput';
// import { Button } from '../../../components/atoms';
import Uploader from '../../../components/Uploader';
import { validateField } from '../../../utils/validate';

import SuccessCreated from './SuccessCreated'

import styles from './CreateCollection.module.scss';

export interface ICreateCollection {
  img: any;
  tokenName: string;
  symbol: string;
  descr?: string;
  shortUrl: string;
  preview?: string;
  isLoading: boolean;
  showModal: boolean
}

const CreateCollection: React.FC<FormikProps<ICreateCollection>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  setFieldValue
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form-create-coll" className={styles.form} layout="vertical">
      <div className={styles.createCollection}>
        <div className={cn('h4', styles.title)}>Create collection</div>
        <div className={styles.upload}>
          {values.img ? <img alt="" src={values.preview} /> : <div className={styles.empty} />}
          <div className={styles.wrapper}>
            <span className={styles.text}>
              We recommend an image of at least 400 x 400. Gift work too.
            </span>
            <div className={styles.file}>
              <Form.Item
                name="img"
                className="form-create__item input__field"
                validateStatus={validateField('img', touched, errors)}
                help={!touched.img ? false : errors.img}
              >
                <Uploader type="img" isButton />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={styles.fieldset}>
          <Form.Item
            name="tokenName"
            validateStatus={validateField('tokenName', touched, errors)}
            help={!touched.tokenName ? 'Token name cannot be changed in future' : errors.tokenName}
          >
            <div className={styles.field}>
              <TextInput
                label="Display name"
                name="tokenName"
                type="text"
                placeholder="Collection Name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="symbol"
            validateStatus={validateField('symbol', touched, errors)}
            help={!touched.symbol ? false : errors.symbol}
          >
            <div className={styles.field}>
              <TextInput
                label="Symbol"
                name="symbol"
                type="text"
                placeholder="Enter Token name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="descr"
            validateStatus={validateField('descr', touched, errors)}
            help={!touched.descr ? false : errors.descr}
          >
            <div className={styles.field}>
              <TextInput
                label="Description"
                name="descr"
                type="text"
                placeholder="Spreads some words about your token collection"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="shortUrl"
            validateStatus={validateField('shortUrl', touched, errors)}
            help={!touched.shortUrl ? false : errors.shortUrl}
          >
            <div className={styles.field}>
              <TextInput
                label="Short url"
                name="shortUrl"
                type="text"
                placeholder="Enter your url"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
        </div>

        <button className={cn('button', styles.button)} type="button" onClick={onSubmit}>
          Create Collection
        </button>
        <Modal visible={values.showModal} onClose={() => setFieldValue('showModal', false)}>
          <SuccessCreated close={() => setFieldValue('showModal', false)} title="collection" />
        </Modal>
      </div>
    </Form>
  );
};

export default CreateCollection;
