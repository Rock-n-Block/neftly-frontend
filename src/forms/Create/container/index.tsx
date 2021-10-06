// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
// import { useMst } from '../../../store';
// import {validateForm} from '../../../utils/validate';
import * as Yup from 'yup';
import CreateForm, { ICreateForm } from '../component';

export default observer(({ isSingle, walletConnector }: any) => {
  // const { modals } = useMst();
  const FormWithFormik = withFormik<any, ICreateForm>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      img: '',
      cover: '',
      preview: '',
      coverPreview: '',
      sellMethod: 'fixedPrice',
      // unlockOncePurchased: false,
      format: '',
      instantSalePriceEth: '',
      // digitalKey: '',
      price: '',
      tokenName: '',
      tokenDescr: '',
      tokenRoyalties: '10%',
      numberOfCopies: '1',
      tokenProperties: [
        {
          name: '',
          amount: '',
        },
      ],
      isLoading: false,
      collectionId: 0,
      currency: 'WETH',
      bid: '',
      showModal: false,
    }),

    validationSchema: Yup.object().shape({
      displayName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
      customUrl: Yup.string().max(50, 'Too Long!'),
      bio: Yup.string().max(100),
      site: Yup.string().url(),
      twitter: Yup.string().max(50),
      instagram: Yup.string().max(50),
      facebook: Yup.string().max(50),
      email: Yup.string().email('Invalid email'),
      img: Yup.string(),
      cover: Yup.string(),
      preview: Yup.string(),
      coverPreview: Yup.string(),
      sellMethod: Yup.string(),
      // unlockOncePurchased: false,
      format: Yup.string(),
      instantSalePriceEth: Yup.string(),
      // digitalKey: '',
      price: Yup.string(),
      tokenName: Yup.string(),
      tokenDescr: Yup.string().max(500, 'Too Long!'),
      tokenRoyalties: Yup.string(),
      numberOfCopies: Yup.string(),
      tokenProperties: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
          amount: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
        }),
      ),
      isLoading: Yup.bool(),
      collectionId: Yup.number(),
      currency: Yup.string().matches(/(ETH|WETH|USDT)/),
      bid: Yup.string(),
      showModal: Yup.bool(),
    }),
    handleSubmit: (values, { setFieldValue, setFieldError }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('media', values.img);
      if (values.cover) formData.append('cover', values.cover);
      formData.append('name', values.tokenName);
      formData.append('total_supply', isSingle ? '1' : values.numberOfCopies.toString());
      formData.append('description', values.tokenDescr);
      if (values.sellMethod === 'fixedPrice') {
        formData.append('price', values.price.toString());
      }
      if (values.sellMethod === 'openForBids') {
        formData.append('minimal_bid', values.bid.toString());
      }
      if (values.sellMethod) {
        formData.append('available', values.numberOfCopies.toString());
      } else {
        formData.append('available', '0');
      }
      formData.append('creator_royalty', values.tokenRoyalties.toString().slice(0, -1));
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');
      formData.append('collection', values.collectionId.toString());
      formData.append('currency', values.currency);
      formData.append('format', values.format);
      // formData.append('creator', localStorage.dds_token);

      if (values.tokenProperties[0].name) {
        const details: any = {};
        values.tokenProperties.forEach((item) => {
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
