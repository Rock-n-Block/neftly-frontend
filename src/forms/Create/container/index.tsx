// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
// import { useMst } from '../../../store/store';
// import {validateForm} from '../../../utils/validate';
import * as Yup from 'yup';
import CreateForm, { ICreateForm } from '../component';

export default observer(({ isSingle, walletConnector }: any) => {
  // const { modals } = useMst();

  const props: ICreateForm = {
    name: '',
    isSingle: true,
    totalSupply: 1,
    currency: 'ETH',
    description: '',
    price: '',
    minimalBid: 0,
    creatorRoyalty: '10%',
    collection: 0,
    details: [],
    selling: true,
    // startAuction: new Date(),
    // endAuction: new Date(),
    media: '',
    cover: '',
    coverPreview: '',
    format: '',
    img: '',
    preview: '',
    sellMethod: 'fixedPrice',
    isLoading: false,
  };
  const FormWithFormik = withFormik<any, ICreateForm>({
    enableReinitialize: true,
    mapPropsToValues: () => props,

    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, 'Too short!').max(50, 'Too long!'),
      totalSupply: Yup.number().min(1, 'Minimal amount equal to 1!').max(100, 'Too much!'),
      description: Yup.string().max(500, 'Too long!'),
      minimalBid: Yup.number().min(0),
    }),
    handleSubmit: (values, { setFieldValue, setFieldError }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('media', values.img);
      if (values.cover) formData.append('cover', values.cover);
      formData.append('name', values.name);
      formData.append('total_supply', isSingle ? '1' : values.totalSupply.toString());
      formData.append('description', values.description);
      if (values.sellMethod === 'fixedPrice') {
        formData.append('price', values.price.toString());
      }
      if (values.sellMethod === 'openForBids') {
        formData.append('minimal_bid', values.minimalBid.toString());
      }
      formData.append('creator_royalty', values.creatorRoyalty.toString().slice(0, -1));
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');
      formData.append('collection', values.collection.toString());
      formData.append('currency', values.currency);
      formData.append('format', values.format);
      // formData.append('creator', localStorage.dds_token);

      if (values.details[0].name) {
        const details: any = {};
        values.details.forEach((item) => {
          if (item.name) {
            details[item.name] = item.amount;
          }
        });

        formData.append('details', details);
      }
      storeApi
        .createToken(formData)
        .then(({ data }) => {
          walletConnector.walletService
            .sendTransaction(data.initial_tx)
            .then(() => {
              setFieldValue('showModal', true);
            })
            .catch((err: any) => {
              // modals.info.setMsg('Something went wrong', 'error');
              setFieldValue('isLoading', false);
              console.log(err, 'err');
            });
        })
        .catch(({ response }) => {
          setFieldValue('isLoading', false);
          if (response.data && response.data.name) {
            setFieldError('tokenName', response.data.name);
          }
          if (response.data) {
            // modals.info.setMsg(Object.values(response.data).join(', '), 'error');
          }
        });
    },

    displayName: 'ChangePasswordForm',
  })(CreateForm);
  return <FormWithFormik isSingle={isSingle} />;
});
