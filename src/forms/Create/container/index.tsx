// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
// import { useMst } from '../../../store/store';
import { validateForm } from '../../../utils/validate';
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
      sellMethod: true,
      instantSalePrice: true,
      // unlockOncePurchased: false,
      format: '',
      instantSalePriceEth: '',
      // digitalKey: '',
      price: '',
      tokenName: '',
      tokenDescr: '',
      tokenRoyalties: '10%',
      numberOfCopies: '',
      tokenProperties: [
        {
          size: '',
          amount: '',
        },
      ],
      isLoading: false,
      collectionId: '16',
      currency: 'WETH',
      bid: '',
      showModal: false,
    }),
    validate: (values: any) => {
      const notRequired: string[] = ['tokenDescr', 'preview'];
      if (
        !values.putOnSale ||
        (!values.instantSalePrice && !notRequired.includes('instantSalePriceEth'))
      ) {
        notRequired.push('instantSalePriceEth');
      } /*
      if (!values.unlockOncePurchased && !notRequired.includes('digitalKey')) {
        notRequired.push('digitalKey');
      } */
      if (isSingle) {
        notRequired.push('numberOfCopies');
      }
      if (!values.putOnSale || values.instantSalePrice) {
        notRequired.push('bid');
      }
      const errors = validateForm({ values, notRequired });

      return errors;
    },

    handleSubmit: (values, { setFieldValue, setFieldError }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('media', values.img);
      if (values.cover) formData.append('cover', values.cover);
      formData.append('name', values.tokenName);
      formData.append('total_supply', isSingle ? '1' : values.numberOfCopies.toString());
      formData.append('description', values.tokenDescr);
      if (values.instantSalePrice && values.sellMethod) {
        formData.append('price', values.instantSalePriceEth.toString());
      }
      if (!values.instantSalePrice && values.sellMethod) {
        formData.append('minimal_bid', values.bid.toString());
      }
      if (values.sellMethod) {
        formData.append('available', values.numberOfCopies.toString());
      } else {
        formData.append('available', '0');
      }
      formData.append('creator_royalty', values.tokenRoyalties.toString().slice(0, -1));
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');
      formData.append('collection', values.collectionId);
      formData.append('currency', values.currency);
      formData.append('format', values.format);
      // formData.append('creator', localStorage.dds_token);

      if (values.tokenProperties[0].size) {
        const details: any = {};
        values.tokenProperties.forEach((item) => {
          if (item.size) {
            details[item.size] = item.amount;
          }
        });

        formData.append('details', details);
      }
      storeApi
        .createToken(formData)
        .then(({ data }) => {
          walletConnector.metamaskService
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
