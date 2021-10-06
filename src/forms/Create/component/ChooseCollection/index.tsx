import React from 'react';
import nextId from 'react-id-generator';
import cn from 'classnames';
import { connect } from 'formik';
import { observer } from 'mobx-react';
import SwiperCore, { Navigation } from 'swiper';

import { Icon, Modal } from 'components';
import { userApi } from '../../../../services/api';
import { rootStore } from '../../../../store';
import { CreateCollection } from '../../../index';

import styles from './ChooseCollection.module.scss';

SwiperCore.use([Navigation]);

// interface IChooseCollection {
//   // collections: [
//   //   {
//   //     avatar: string;
//   //     name: string;
//   //     id: string;
//   //   },
//   // ];
//   isSingle?: boolean;
// }

@observer
class ChooseCollection extends React.Component<any, any, any> {
  // private prevRef = React.createRef<HTMLDivElement>();

  // private nextRef = React.createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);

    this.state = {
      activeCollection: '',
      collections: [],
      visibleModal: false,
    };

    this.changeCollection = this.changeCollection.bind(this);
    this.getCollections = this.getCollections.bind(this);
  }

  componentDidMount() {
    if (!this.state.collections.length) {
      this.getCollections();
    }
  }

  getCollections() {
    userApi
      .getSingleCollections(rootStore.user.address)
      .then(({ data }) => {
        const collections = data.collections.filter((coll: any) => {
          if (this.props.isSingle) {
            return coll.standart === 'ERC721';
          }
          return coll.standart === 'ERC1155';
        });

        this.setState({
          collections: [
            {
              title: 'Create collection',
              color: ' linear-gradient(90deg, #6F45FF 0%, #FF6365 100%)',
            },
            ...collections,
          ],
        });
        this.changeCollection(collections[0].id);
      })
      .catch((err) => console.log(err, 'get single'));
  }

  changeCollection(id: string) {
    if (this.props.formik.values.collectionId !== id) {
      this.setState({
        activeCollection: id,
      });

      this.props.formik.setFieldValue('collectionId', id);
    }
  }

  render() {
    return (
      <div className={styles.cards}>
        {this.state.collections?.length
          ? this.state.collections.map((x: any) => (
              <div
                className={cn(styles.card, {
                  [styles.active]: this.state.activeCollection === x.id,
                })}
                key={nextId()}
                tabIndex={0}
                onKeyDown={() => {}}
                role="button"
                onClick={
                  x.title === 'Create collection'
                    ? () =>
                        this.setState({
                          visibleModal: true,
                        })
                    : () => this.changeCollection(x.id.toString())
                }
              >
                {x.title === 'Create collection' ? (
                  <>
                    <div className={styles.plus} style={{ background: x.color }}>
                      <Icon name="plus" size="24" />
                    </div>
                    <div className={styles.subtitle}>{x.title}</div>
                  </>
                ) : (
                  <>
                    <div
                      className={styles.plus}
                      style={{
                        backgroundImage: `url(${x.avatar})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      <Icon name="plus" size="24" />
                    </div>
                    <div className={styles.subtitle}>{x.name}</div>
                  </>
                )}
              </div>
            ))
          : ''}
        <Modal
          visible={this.state.visibleModal}
          onClose={() => this.setState({ visibleModal: false })}
        >
          <CreateCollection isSingle={this.props.isSingle} />
        </Modal>
      </div>
      // <div>
      //   <div className="ch-coll__title text-grad text-lg text-bold">
      //     <div
      //       className="ch-coll__refresh"
      //       onClick={this.getCollections}
      //       onKeyDown={this.getCollections}
      //       tabIndex={0}
      //       role="button"
      //     >
      //       <img src={RefreshImg} alt="refresh" />
      //     </div>
      //   </div>
      //   <div className="ch-coll__slider">
      //     <div ref={this.prevRef} className={cn('swiper-navigation swiper-navigation-prev')}>
      //       <img src={ArrowImg} alt="arrow" />
      //     </div>
      //     <div ref={this.nextRef} className="swiper-navigation swiper-navigation-next">
      //       <img src={ArrowImg} alt="arrow" />
      //     </div>
      //     <Swiper
      //       className={styles.cards}
      //       slidesPerView={2}
      //       spaceBetween={0}
      //       navigation={{
      //         prevEl: this.prevRef.current!, // Assert non-null
      //         nextEl: this.nextRef.current!, // Assert non-null
      //       }}
      //       onInit={(swiper) => {
      //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //         // @ts-ignore
      //         // eslint-disable-next-line no-param-reassign
      //         swiper.params.navigation.prevEl = this.prevRef.current;
      //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //         // @ts-ignore
      //         // eslint-disable-next-line no-param-reassign
      //         swiper.params.navigation.nextEl = this.nextRef.current;
      //         swiper.navigation.update();
      //       }}
      //       breakpoints={{
      //         605: {
      //           slidesPerView: 3,
      //           spaceBetween: 20,
      //         },
      //       }}
      //     >
      //       {/* <SwiperSlide className="ch-coll__slide" key={nextId()}>
      //         <div
      //           className="ch-coll__item box-shadow"
      //           onClick={ChooseCollection.handleOpenModal}
      //           onKeyDown={ChooseCollection.handleOpenModal}
      //           role="button"
      //           tabIndex={0}
      //         >
      //           <div className="ch-coll__item-img">
      //             <img src={PlusImg} alt="new" />
      //           </div>
      //           <div className="ch-coll__item-title text-md text-bold">Create</div>
      //           <div className="text-bold text-gray-l">
      //             {this.props.isSingle ? 'ERC-721' : 'ERC-1155'}
      //           </div>
      //         </div>
      //       </SwiperSlide> */}
      //       {/* {this.state.collections &&
      //         this.state.collections.map((item: any) => (
      //           <SwiperSlide className="ch-coll__slide" key={nextId()}>
      //             <div
      //               className={cn('ch-coll__item box-shadow', {
      //                 active: this.state.activeCollection === item.id,
      //               })}
      //               onClick={() => this.changeCollection(item.id.toString())}
      //               onKeyDown={() => this.changeCollection(item.id.toString())}
      //               role="button"
      //               tabIndex={0}
      //             >
      //               <div className="ch-coll__item-img">
      //                 <img src={`https://${item.avatar}`} alt="dds" />
      //               </div>
      //               <div className="ch-coll__item-title text-md text-bold">{item.name}</div>
      //               <div className="text-bold text-gray-l">
      //                 {this.props.isSingle ? 'ERC-721' : 'ERC-1155'}
      //               </div>
      //             </div>
      //           </SwiperSlide>
      //         ))} */}
      //       {this.state.collections?.length &&
      //         this.state.collections.map((x: any) => (
      //           <SwiperSlide key={nextId()}>
      //             <div
      //               className={cn(styles.card, {
      //                 [styles.active]: this.state.activeCollection === x.id,
      //               })}
      //               key={nextId()}
      //               tabIndex={0}
      //               onKeyDown={() => {}}
      //               role="button"
      //               onClick={
      //                 x.title === 'Create collection'
      //                   ? () => ChooseCollection.handleOpenModal()
      //                   : () => this.changeCollection(x.id.toString())
      //               }
      //             >
      //               {x.title === 'Create collection' ? (
      //                 <>
      //                   <div className={styles.plus} style={{ background: x.color }}>
      //                     <Icon name="plus" size="24" />
      //                   </div>
      //                   <div className={styles.subtitle}>{x.title}</div>
      //                 </>
      //               ) : (
      //                 <>
      //                   <div
      //                     className={styles.plus}
      //                     style={{
      //                       backgroundImage: `url(${x.avatar})`,
      //                       backgroundPosition: 'center',
      //                       backgroundSize: 'cover',
      //                       backgroundRepeat: 'no-repeat',
      //                     }}
      //                   >
      //                     <Icon name="plus" size="24" />
      //                   </div>
      //                   <div className={styles.subtitle}>{x.name}</div>
      //                 </>
      //               )}
      //             </div>
      //           </SwiperSlide>
      //         ))}
      //     </Swiper>
      //   </div>
      // </div>
    );
  }
}

export default connect(ChooseCollection);
