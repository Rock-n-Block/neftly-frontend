import React from 'react';
import cn from 'classnames';
import { Form, Field, FormikProps } from 'formik';

import { H3, TextInput, Text, Button, TextArea, RequiredMark, Uploader } from 'components';

import styles from './CreateCollection.module.scss';

export interface ICreateCollection {
  name: string;
  symbol: string;
  shortUrl: string;
  description?: string;
  avatar: any;
  preview?: string;
  isLoading: boolean;
  standart: 'ERC721' | 'ERC1155';
}

const CreateCollection: React.FC<FormikProps<ICreateCollection>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
}) => {
  return (
    <Form name="form-create-coll" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.createCollection}>
        <H3 className={styles.title}>Create collection</H3>
        <div className={styles.upload}>
          {values.avatar ? <img alt="" src={values.preview} /> : <div className={styles.empty} />}
          <div className={styles.wrapper}>
            <Text className={styles.text} color="gray" align="center">
              We recommend an image of at least 400 x 400. Gifs work too.
              <RequiredMark />
            </Text>
            <div className={styles.file}>
              <Field
                id="avatar"
                name="avatar"
                render={() => <Uploader isImgOnly formikValue="avatar" isButton />}
              />
            </div>
          </div>
        </div>
        <div className={styles.fieldset}>
          <Field
            name="name"
            render={() => (
              <TextInput
                label={
                  <>
                    Display name <RequiredMark />
                  </>
                }
                name="name"
                type="text"
                placeholder="Collection Name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.field}
              />
            )}
          />
          {errors.name && touched.name && (
            <Text color="red">Display name should be more than 2 and less than 50 symbols</Text>
          )}
          <Field
            name="symbol"
            render={() => (
              <TextInput
                label={
                  <>
                    Symbol <RequiredMark />
                  </>
                }
                name="symbol"
                type="text"
                placeholder="Enter Token symbol"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.field}
              />
            )}
          />
          {errors.symbol && touched.symbol && (
            <Text color="red">Symbol should be more than 2 and less than 6 symbols</Text>
          )}
          <Field
            name="description"
            render={() => (
              <TextArea
                label="Description"
                name="description"
                value={values.description}
                placeholder="Spread some words about your token collection"
                onChange={handleChange}
                className={styles.field}
                maxLettersCount={500}
              />
            )}
          />
          <Field
            name="shortUrl"
            render={() => (
              <TextInput
                label="Short url"
                name="shortUrl"
                type="text"
                placeholder="Enter your url"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.field}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          className={cn('button', styles.button)}
          disabled={values.isLoading || !!Object.keys(errors).length}
        >
          Create Collection
        </Button>
      </div>
    </Form>
  );
};

export default CreateCollection;
