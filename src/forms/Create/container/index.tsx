import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';
// import { useMst } from '../../../store/store';
// import {validateForm} from '../../../utils/validate';
import * as Yup from 'yup';

import { storeApi } from '../../../services/api';
import CreateForm, { ICreateForm } from '../component';

export default observer(({ isSingle, walletConnector }: any) => {
  // const { modals } = useMst();

  let initialCurrency = 'ETH';

  if (['Binance-Smart-Chain', 'Binance'].includes(localStorage.netfly_nft_chainName)) {
    initialCurrency = 'BNB';
  }
  if (localStorage.kephi_nft_chainName === 'Polygon') {
    initialCurrency = 'MATIC';
  }
  const props: ICreateForm = {
    name: '',
    isSingle,
    totalSupply: 1,
    currency: initialCurrency,
    description: '',
    price: '',
    minimalBid: 0,
    creatorRoyalty: '10',
    collection: 0,
    details: [{ name: '', amount: '' }],
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

      const apiReadyFormData = {
        name: values.name,
        standart: values.isSingle ? 'ERC721' : 'ERC1155',
        total_supply: values.totalSupply,
        currency: values.currency,
        description: values.description,
        price: values.price,
        minimal_bid: values.minimalBid,
        creator_royalty: values.creatorRoyalty,
        collection: values.collection,
        details: values.details.filter((detail) => detail.name !== ''),
        selling: values.selling,
      };
      console.log(apiReadyFormData, values);

      storeApi
        .createToken(apiReadyFormData)
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
  return <FormWithFormik />;
});
