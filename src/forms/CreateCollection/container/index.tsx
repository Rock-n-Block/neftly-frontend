// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { toast } from 'react-toastify';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { storeApi, useWalletConnectorContext } from 'services';
import * as Yup from 'yup';

import CreateCollection, { ICreateCollection } from '../component';
import { ToastContentWithTxHash } from 'components';

export default observer(({ isSingle, onClose }: any) => {
  const walletConnector = useWalletConnectorContext();
  const props: ICreateCollection = {
    name: '',
    avatar: '',
    symbol: '',
    description: '',
    shortUrl: '',
    preview: '',
    isLoading: false,
    standart: 'ERC721',
  };
  const FormWithFormik = withFormik<any, ICreateCollection>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
      symbol: Yup.string().min(2, 'Too Short!').max(6, 'Too Long!').required(),
      descr: Yup.string().max(500, 'Too Long!'),
      shortUrl: Yup.string().max(50, 'Too Long!'),
      avatar: Yup.string().required(),
    }),
    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('avatar', values.avatar);
      formData.append('symbol', values.symbol);
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');

      if (values.description) {
        formData.append('description', values.description);
      }
      if (values.shortUrl) {
        formData.append('short_url', values.shortUrl);
      }
      storeApi
        .createCollection(formData)
        .then(({ data }) => {
          walletConnector.walletService
            .sendTransaction(data.initial_tx)
            .on('transactionHash', (txHash) => {
              toast.info(<ToastContentWithTxHash txHash={txHash} />);
            })
            .then(() => {
              toast.success('Collection Created');
              onClose();
            })
            .catch((response) => {
              if (response && response.data && response.data.name) {
                toast.error(response.data.name);
              } else {
                toast.error('Create Collection failed');
              }
              storeApi.rejectTransaction({ type: 'collection', id: data.collection.id });
              console.error('Wallet Create collection failure', response);
            })
            .finally(() => {
              setFieldValue('isLoading', false);
            });
        })
        .catch(({ response }) => {
          console.log(response);
          if (response && response.data && response.data.name) {
            toast.error(response.data.name);
          } else {
            toast.error('Create Collection failed');
          }
          console.error('Wallet Create collection failure', response);
        })
        .finally(() => {
          setFieldValue('isLoading', false);
        });
    },

    displayName: 'CreateCollectionForm',
  })(CreateCollection);
  return <FormWithFormik />;
});
