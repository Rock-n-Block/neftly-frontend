// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

// import { storeApi } from '../../../services/api';
// import { useWalletConnectorContext } from '../../../services/walletConnect';
// import { useMst } from '../../../store';
import CreateCollection, { ICreateCollection } from '../component';
import * as Yup from 'yup';

export default observer(({ isSingle }: any) => {
  // const { modals } = useMst();
  // const walletConnector = useWalletConnectorContext();
  const props: ICreateCollection = {
    name: '',
    img: '',
    symbol: '',
    descr: '',
    shortUrl: '',
    preview: '',
    isLoading: false,
  };
  const FormWithFormik = withFormik<any, ICreateCollection>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
      symbol: Yup.string().min(2, 'Too Short!').max(6, 'Too Long!'),
      descr: Yup.string().max(500, 'Too Long!'),
      shortUrl: Yup.string().max(50, 'Too Long!'),
    }),
    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('avatar', values.img);
      formData.append('symbol', values.symbol);
      // formData.append('creator', localStorage.dds_token);
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');

      if (values.descr) {
        formData.append('description', values.descr);
      }
      if (values.shortUrl) {
        formData.append('short_url', values.shortUrl);
      }

      /* storeApi
        .createCollection(formData)
        .then(({ data }) => {
          walletConnector.walletService
            .sendTransaction(data)
            .then((res: any) => {
              formData.append('tx_hash', res.transactionHash);

              storeApi
                .saveCollection(formData)
                .then(() => {
                  setFieldValue('showModal', true);
                })
                .catch((err: any) => {
                  // modals.info.setMsg('An error occurred while creating the collection', 'error');
                  console.log(err, 'err');
                })
                .finally(() => {
                  setFieldValue('isLoading', false);
                });
            })
            .catch((err: any) => {
              console.log(err, 'err');
              setFieldValue('isLoading', false);
            });
        })
        .catch(({ response }) => {
          if (response.data.name) {
            setTimeout(() => {
              setFieldError('tokenName', response.data.name);
            }, 100);
          }
          if (response.data.symbol) {
            setTimeout(() => {
              setFieldError('symbol', response.data.symbol);
            }, 100);
          }
          if (response.data.short_url) {
            setTimeout(() => {
              setFieldError('shortUrl', response.data.short_url);
            }, 100);
          }
          setFieldValue('isLoading', false);
        }); */
    },

    displayName: 'CreateCollectionForm',
  })(CreateCollection);
  return <FormWithFormik />;
});
