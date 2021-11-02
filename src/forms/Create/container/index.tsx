import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

import { storeApi } from 'services/api';
import CreateForm, { ICreateForm } from '../component';
import { toast } from 'react-toastify';
import { useMst } from 'store';
import { chainsEnum } from 'typings';
import { useWalletConnectorContext } from 'services';
import { ToastContentWithTxHash } from 'components';
import { useHistory } from 'react-router';

export default observer(({ isSingle }: any) => {
  const history = useHistory();
  const walletConnector = useWalletConnectorContext();
  const { user } = useMst();
  const props: ICreateForm = {
    name: '',
    isSingle: true,
    totalSupply: 1,
    currency: '',
    description: '',
    price: 0,
    minimalBid: 0,
    creatorRoyalty: '10',
    collection: 99,
    details: [{ name: '', amount: '' }],
    selling: true,
    media: '',
    cover: '',
    coverPreview: '',
    format: 'image',
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
      minimalBid: Yup.number().when('sellMethod', {
        is: 'openForBids',
        then: Yup.number().min(0.0001),
      }),
      price: Yup.number().when('sellMethod', {
        is: 'fixedPrice',
        then: Yup.number().min(0.0001),
      }),
    }),
    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');
      if (!isSingle) {
        formData.append('total_supply', values.totalSupply.toString());
      }
      formData.append('currency', values.currency);
      if (values.description) {
        formData.append('description', values.description);
      }
      if (values.sellMethod === 'fixedPrice') {
        formData.append('price', values.price.toString());
      } else {
        formData.append('minimal_bid', values.minimalBid.toString());
      }
      formData.append('creator_royalty', values.creatorRoyalty);
      formData.append('collection', values.collection.toString());

      if (values.details[0].name) {
        const details: any = {};
        values.details.forEach((item) => {
          if (item.name) {
            details[item.name] = item.amount;
          }
        });
        formData.append('details', JSON.stringify(details));
      }
      // TODO: change selling from always true
      formData.append('selling', values.selling.toString());

      formData.append('media', values.media);
      if (values.format !== 'image') {
        formData.append('cover', values.cover);
      }
      formData.append('format', values.format);

      storeApi
        .createToken(formData)
        .then(({ data }) => {
          console.log('data', data);
          if (localStorage.nftcrowd_nft_chainName === chainsEnum.Tron) {
            walletConnector.walletService.trxCreateTransaction(data.initial_tx, user.address);
          } else {
            // window.tronWeb.transactionBuilder
            //   .triggerSmartContract(
            //     data.initial_tx.contractAddress,
            //     data.initial_tx.function,
            //     data.initial_tx.options,
            //     data.initial_tx.parameter,
            //     user.address,
            //   )
            //   .then(({ transaction }: any) => {
            //     window.tronWeb.trx
            //       .sign(transaction)
            //       .then((signedMsg: any) => {
            //         console.log('signedMsg', signedMsg);
            //         window.tronWeb.trx
            //           .sendRawTransaction(signedMsg)
            //           .then((receipt: any) => console.log(receipt))
            //           .catch((error: any) => console.log('error1', error));
            //       })
            //       .catch((error: any) => console.log('error2', error));
            //   });
            walletConnector.walletService
              .sendTransaction(data.initial_tx)
              .on('transactionHash', (txHash: string) => {
                toast.info(<ToastContentWithTxHash txHash={txHash} />);
                history.push('/');
              })
              .then(() => {
                toast.success('Token Created');
              })
              .catch(({ response }: any) => {
                if (response.data && response.data.name) {
                  toast.error(response.data.name);
                } else {
                  toast.error('Create Token failed');
                }
                console.error('Backend Create token failure', response.data);
              })
              .finally(() => {
                setFieldValue('isLoading', false);
              });
          }
        })
        .catch(({ response }) => {
          if (response.data && response.data.name) {
            toast.error(response.data.name);
          } else {
            toast.error('Create Token failed');
          }
          console.error('Backend Create token failure', response.data);
          setFieldValue('isLoading', false);
        });
    },

    displayName: 'ChangePasswordForm',
  })(CreateForm);
  return <FormWithFormik isSingle={isSingle} />;
});
