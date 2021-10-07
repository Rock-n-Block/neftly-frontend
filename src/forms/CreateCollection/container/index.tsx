// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { useWalletConnectorContext, storeApi } from 'services';
// import { useMst } from '../../../store';
import CreateCollection, { ICreateCollection } from '../component';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ToastContentWithTxHash } from 'components';
// import { mapKeys, snakeCase } from 'lodash';

export default observer(({ isSingle }: any) => {
  // const { modals } = useMst();
  const walletConnector = useWalletConnectorContext();
  const props: ICreateCollection = {
    name: '',
    img: '',
    symbol: '',
    description: '',
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
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');
      formData.append('avatar', values.img);
      formData.append('symbol', values.symbol);
      // formData.append('creator', localStorage.dds_token);

      if (values.description) {
        formData.append('description', values.description);
      }
      if (values.shortUrl) {
        formData.append('short_url', values.shortUrl);
      }

      // const formDataSnakeCase = mapKeys(values, (_, k) => snakeCase(k));

      storeApi
        .createCollection(formData)
        .then(({ data }) => {
          walletConnector.walletService
            .sendTransaction(data)
            .on('transactionHash', (txHash) => {
              /* TODO: remove autoclose Option */
              toast.info(<ToastContentWithTxHash txHash={txHash} />, {
                autoClose: false,
              });
            })
            .then(() => {
              toast.success('Collection Created');
            })
            .catch((error) => {
              toast.error('Create Collection failed');
              console.error('Wallet Create collection failure', error);
            });
        })
        .catch((error) => {
          toast.error('Create Collection failed');
          console.error('Backend Create collection failure', error);
        })
        .finally(() => {
          setFieldValue('isLoading', false);
        });
    },

    displayName: 'CreateCollectionForm',
  })(CreateCollection);
  return <FormWithFormik />;
});
