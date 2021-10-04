import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { Bid, Button, Modal } from 'components';
import { contracts } from 'config';
import { observer } from 'mobx-react';
import { storeApi, useWalletConnectorContext } from 'services';
import { useMst } from 'store/store';
import { IOwner } from 'typings/UserInfo';

import { IItem } from '../index';

import Checkout from './Checkout';
import PutSale from './PutSale';
import Sellers from './Sellers';
import SuccessfullyPurchased from './SuccessfullyPurchased';

import styles from './Control.module.scss';

interface IControlProps {
  className?: string;
  token: IItem;
  updateTokenData: () => void;
}

const Control: React.FC<IControlProps> = observer(({ className, token, updateTokenData }) => {
  const walletConnector = useWalletConnectorContext();
  const [isAllowed, setIsAllowed] = useState(false);
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalSellers, setVisibleModalSellers] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [endAuc, setEndAuc] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fee, setFee] = useState(0);
  const [sellerId, setSellerId] = useState('');
  const { user } = useMst();

  const {
    owners,
    bids,
    id,
    standart,
    is_auc_selling,
    price,
    USD_price,
    name,
    creator,
    available,
    currency,
    royalty,
  } = token;

  const checkIsOwner = useCallback(() => {
    if (owners) {
      if (Array.isArray(owners)) {
        setIsOwner(
          !!owners.find((owner: IOwner) => {
            return owner.id === user.id;
          }),
        );
      } else {
        setIsOwner(user.id === owners.id);
      }
    }
  }, [owners, user.id]);

  // const handleCheckApproveNft = useCallback(async () => {
  //   let result;
  //   if (token.collection) {
  //     try {
  //       result = await walletConnector.walletService.checkNftTokenAllowance(
  //         token.collection.address,
  //       );

  //       // setIsApprove(result);
  //     } catch (err) {
  //       console.log(err);
  //       return false;
  //     }
  //   }
  //   return result;
  // }, [token.collection, walletConnector.walletService]);

  // const handleApproveNft = useCallback(async () => {
  //   if (token.collection) {
  //     try {
  //       const isAppr = await handleCheckApproveNft();
  //       if (!isAppr) {
  //         await walletConnector.walletService.createTransaction(
  //           'setApprovalForAll',
  //           ['0xdDd7A645E998884879162f964F54e6ee1a5CBAAd', true],
  //           'NFT',
  //           false,
  //           token.collection.address,
  //         );
  //       }
  //     } catch (err) {
  //       throw Error;
  //     }
  //   }
  // }, [walletConnector.walletService, token.collection, handleCheckApproveNft]);
  const checkAllowance = useCallback(() => {
    walletConnector.walletService
      .checkTokenAllowance(currency.name, 18, contracts.params.EXCHANGE.testnet.address)
      .then((res: boolean) => {
        setIsAllowed(res);
      })
      .catch((err: any) => {
        // setApproved(false);
        console.log(err, 'check');
      });
  }, [currency.name, walletConnector.walletService]);
  const handleApproveToken = useCallback(() => {
    walletConnector.walletService
      .approveToken(currency.name, 18, contracts.params.EXCHANGE.testnet.address)
      .then(() => {
        setIsAllowed(true);
      })
      .catch((err: any) => {
        console.log(err, 'err approve');
      });
  }, [currency.name, walletConnector.walletService]);

  const fetchFee = useCallback(() => {
    storeApi.getFee().then(({ data }: any) => setFee(data));
  }, []);

  const handleEndAuc = useCallback(() => {
    storeApi.endAuction(id).then(({ data }: any) =>
      walletConnector.walletService.createTransaction(
        data.initial_tx.method,
        [
          data.initial_tx.data.idOrder,
          data.initial_tx.data.SellerBuyer,
          data.initial_tx.data.tokenToBuy,
          data.initial_tx.data.tokenToSell,
          data.initial_tx.data.fee.feeAddresses,
          [
            data.initial_tx.data.fee.feeAmounts[0].toString(),
            data.initial_tx.data.fee.feeAmounts[1].toString(),
          ],
          data.initial_tx.data.signature,
        ],
        'BEP20',
        {
          gas: data.initial_tx.gas,
          gasPrice: data.initial_tx.gasPrice,
          nonce: data.initial_tx.nonce,
          to: data.initial_tx.to,
          value: data.initial_tx.value,
        },
      ),
    );
  }, [id, walletConnector.walletService]);

  useEffect(() => {
    // handleApproveNft();
    fetchFee();
  }, [fetchFee]);

  useEffect(() => {
    if (user.address) checkAllowance();
  }, [user.address, checkAllowance]);

  useEffect(() => checkIsOwner(), [checkIsOwner]);

  useEffect(() => {
    if (endAuc) handleEndAuc();
  }, [handleEndAuc, endAuc]);

  const getOnClick = (allowed: boolean, isMultiple: boolean) => {
    if (allowed) {
      if (isMultiple) {
        setVisibleModalSellers(true);
      } else {
        setVisibleModalPurchase(true);
      }
    } else {
      handleApproveToken();
    }
  };

  const handleOpenCheckout = useCallback((value: string) => {
    setSellerId(value);
    setVisibleModalPurchase(true);
  }, []);

  return (
    <>
      <div className={cn(styles.control, className)}>
        <div className={styles.head}>
          {bids.length ? (
            <>
              {/* TODO: change to highest bid */}
              <div className={styles.avatar}>
                <img src={token.highest_bid.bidder_avatar} alt="Avatar" />
              </div>
              <div className={styles.details}>
                <div className={styles.info}>
                  Highest bid by{' '}
                  <span>
                    {token.highest_bid.bidder?.length > 21
                      ? `${token.highest_bid.bidder.slice(
                          0,
                          14,
                        )}...${token.highest_bid.bidder.slice(-4)}`
                      : token.highest_bid.bidder}
                  </span>
                </div>
                <div className={styles.cost}>
                  <div className={styles.price}>
                    {token.highest_bid.amount} {token.highest_bid.currency.name}
                  </div>
                  {token.highest_bid.USD_price ? (
                    <div className={styles.price}>${token.highest_bid.USD_price}</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </>
          ) : (
            is_auc_selling && (
              <div className={styles.details}>
                <div className={styles.info}>
                  {token.minimal_bid
                    ? `${token.minimal_bid} ${token.currency.name}`
                    : 'No bids yet'}
                </div>
              </div>
            )
          )}
        </div>
        {user.address && (
          <div>
            {(token.standart === 'ERC721' && !isOwner) ||
            (token.standart === 'ERC1155' && !isOwner) ||
            (token.standart === 'ERC1155' &&
              isOwner &&
              (token.is_selling ? token.available !== 0 : true) &&
              (token.is_selling
                ? (token.sellers.length === 1 && token.sellers[0].id !== user.id) ||
                  token.sellers.length > 1 ||
                  token.owner_auction.length > 1 ||
                  (token.owner_auction.length === 1 && token.owner_auction[0].id !== user.id) ||
                  (Array.isArray(token.owners) && token.owners.length > 1)
                : Array.isArray(token.owners) && token.owners.length > 1)) ? (
              <div className={styles.btns}>
                {isAllowed ? (
                  <>
                    {(standart === 'ERC721' && token.price && token.is_selling) ||
                    (standart === 'ERC1155' &&
                      ((token.sellers.length === 1 && token.sellers[0].id !== user.id) ||
                        token.sellers.length > 1)) ? (
                      <Button
                        className={cn('button', styles.button)}
                        onClick={() => getOnClick(isAllowed, standart === 'ERC1155')}
                      >
                        Purchase now
                      </Button>
                    ) : (
                      ''
                    )}
                    {(standart === 'ERC721' && is_auc_selling) ||
                    (standart === 'ERC1155' &&
                      (token.owner_auction.length > 1 ||
                        (token.owner_auction.length === 1 &&
                          token.owner_auction[0].id !== user.id))) ? (
                      <Button
                        className={cn('button-stroke', styles.button)}
                        onClick={() => setVisibleModalBid(true)}
                      >
                        Place a bid
                      </Button>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  <Button
                    className={cn('button', styles.button)}
                    onClick={() => getOnClick(isAllowed, standart === 'ERC1155')}
                  >
                    Approve Token
                  </Button>
                )}
              </div>
            ) : (
              ''
            )}
            {(standart === 'ERC721' && is_auc_selling && isOwner && bids.length) ||
            (standart === 'ERC1155' &&
              is_auc_selling &&
              isOwner &&
              bids.length &&
              token.owner_auction.find((seller) => seller.id === user.id)) ? (
              <Button
                className={cn('button-stroke', styles.button)}
                onClick={() => setEndAuc(true)}
              >
                End auction
              </Button>
            ) : (
              ''
            )}
          </div>
        )}
        <div className={styles.text}>
          Service fee <span className={styles.percent}>{fee}%</span>
          <span>
            {new BigNumber(price || 0).multipliedBy(fee).dividedBy(100).toString()} ETH
          </span>{' '}
          <span>${new BigNumber(USD_price || 0).multipliedBy(fee).dividedBy(100).toFixed(2)}</span>
        </div>
        {(token.standart === 'ERC721' && !token.price && !token.is_selling && isOwner) ||
        (token.standart === 'ERC1155' &&
          !token.sellers.find((seller) => seller.id === user.id) &&
          !token.owner_auction.find((seller) => seller.id === user.id) &&
          isOwner) ? (
          <div className={styles.foot}>
            <Button
              className={cn('button', styles.button)}
              onClick={() => setVisibleModalSale(true)}
            >
              Put on sale
            </Button>
          </div>
        ) : (
          ''
        )}
        <div className={styles.note}>You can sell this token on Crypter Marketplace</div>
      </div>
      <Modal visible={visibleModalPurchase} onClose={() => setVisibleModalPurchase(false)}>
        {!isSuccess && (
          <Checkout
            tokenId={id}
            standart={standart}
            sellerId={Array.isArray(owners) ? sellerId : 0}
            fee={fee}
            price={price}
            currency={currency.name}
            isVerified={creator.is_verificated || false}
            setIsSuccess={setIsSuccess}
            close={() => setVisibleModalPurchase(false)}
          />
        )}
        {isSuccess && <SuccessfullyPurchased />}
      </Modal>
      <Modal visible={visibleModalBid} onClose={() => setVisibleModalBid(false)}>
        {/* <Connect /> */}
        <Bid
          id={id}
          title={name}
          available={available}
          creatorName={creator.name}
          price={price}
          currency={currency.symbol}
        />
      </Modal>
      <Modal visible={visibleModalSellers} onClose={() => setVisibleModalSellers(false)}>
        <Sellers owners={owners} openCheckout={handleOpenCheckout} user={user.id} />
      </Modal>
      <Modal visible={visibleModalSale} onClose={() => setVisibleModalSale(false)}>
        <PutSale
          tokenId={id.toString()}
          currency={currency.name}
          updateTokenData={updateTokenData}
          onClose={() => setVisibleModalSale(false)}
          royalty={royalty}
        />
      </Modal>
    </>
  );
});

export default Control;
