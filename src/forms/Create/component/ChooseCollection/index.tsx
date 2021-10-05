import React from 'react';
import cn from 'classnames';
import {connect} from 'formik';
import {observer} from 'mobx-react';
import SwiperCore, {Navigation} from 'swiper';

// import { Swiper, SwiperSlide } from 'swiper/react';
import {Icon, Modal} from 'components';
import {userApi} from 'services/api';
import {rootStore} from 'store/store';
import {CreateCollection} from '../../../index';

// import PlusImg from './plus.svg';
// import RefreshImg from './refresh.svg';
// import ArrowImg from './swiper-arrow.svg';
import {createCollection} from 'assets/img/ChooseCollection';
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
interface ICollection {
  avatar?: string;
  title: string;
  id: number;
}

const defaultCollection: ICollection = {
  avatar: createCollection,
  title: 'Create collection',
  id: -1,
};


@observer
class ChooseCollection extends React.Component<any, any, any> {
  // private prevRef = React.createRef<HTMLDivElement>();

  // private nextRef = React.createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);

    this.state = {
      activeCollectionId: this.props.formik.values.collectionId,
      collections: [defaultCollection, {
        avatar: createCollection,
        title: 'My collection',
        id: 0,
      }],
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
      .then(({data}) => {
        const collections = data.collections.filter((coll: any) => {
          if (this.props.isSingle) {
            return coll.standart === 'ERC721';
          }
          return coll.standart === 'ERC1155';
        });

        this.setState({
          collections: [
            defaultCollection,
            ...collections,
          ],
        });
        this.changeCollection(collections[0].id);
      })
      .catch((err) => console.log(err, 'get single'));
  }

  changeCollection(id: number) {
    if (this.props.formik.values.collectionId !== id) {
      this.setState({
        activeCollectionId: id,
      });

      this.props.formik.setFieldValue('collectionId', id);
    }
  }

  render() {
    return (
      <div className={styles.cards}>
        {this.state.collections?.length
          ? this.state.collections.map((collection: ICollection) => (
            <div
              className={cn(styles.card, {
                [styles.active]: this.state.activeCollectionId === collection.id,
              })}
              key={`collection_${collection.id}`}
              tabIndex={0}
              onKeyDown={() => {
              }}
              role="button"
              onClick={
                collection.id === -1
                  ? () =>
                    this.setState({
                      visibleModal: true,
                    })
                  : () => this.changeCollection(collection.id)
              }
            >
              {collection.id === -1 ? (
                <>
                  <img src={createCollection} alt='create' className={styles.plus}/>
                  <div className={styles.subtitle}>{collection.title}</div>
                </>
              ) : (
                <>
                  <div
                    className={styles.plus}
                    style={{
                      backgroundImage: `url(${collection.avatar})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <Icon name="plus" size="24"/>
                  </div>
                  <div className={styles.subtitle}>{collection.title}</div>
                </>
              )}
            </div>
          ))
          : ''}
        <Modal
          visible={this.state.visibleModal}
          onClose={() => this.setState({visibleModal: false})}
        >
          <CreateCollection isSingle={this.props.isSingle}/>
        </Modal>
      </div>
    );
  }
}

export default connect(ChooseCollection);
