import { FC } from 'react';
import { IExtendedInfo } from 'typings';
import styles from './About.module.scss';
import { H3, Text } from 'components';
import {
  iconFacebook,
  iconInstagramOutline,
  iconSiteOutline,
  iconTwitterOutline,
} from 'assets/img/icons/social';
import moment from 'moment';

interface IProps {
  currentUser: IExtendedInfo;
}

const About: FC<IProps> = (props) => {
  const { currentUser } = props;
  return (
    <>
      <div className={styles.column}>
        <div className={styles.header}>
          <H3 className={styles.title}>About Me</H3>
          <ul className={styles.info}>
            <li>
              <Text color="gray" weight="medium" size="l">
                <Text tag="span" color="white" weight="medium" size="l">
                  {currentUser.followers_count || 0}
                </Text>{' '}
                Followers
              </Text>
            </li>
            <li>
              <Text color="gray" weight="medium" size="l">
                <Text tag="span" color="white" weight="medium" size="l">
                  {currentUser.follows_count || 0}
                </Text>{' '}
                Following
              </Text>
            </li>
          </ul>
        </div>
        <Text className={styles.description} size="m">
          {currentUser.bio}
        </Text>
      </div>
      <div className={styles.column}>
        <H3 className={styles.title}>Available Contact</H3>
        <ul className={styles.socials}>
          {currentUser.twitter && (
            <li>
              <a
                href={`https://twitter.com/${currentUser.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <img src={iconTwitterOutline} alt="twitter" width={28} height={28} />
                <Text color="lightGray" size="m">
                  @{currentUser.twitter}
                </Text>
              </a>
            </li>
          )}
          {currentUser.instagram && (
            <li>
              <a
                href={`https://instagram.com/${currentUser.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <img src={iconInstagramOutline} alt="instagram" width={28} height={28} />
                <Text color="lightGray" size="m">
                  @{currentUser.instagram}
                </Text>
              </a>
            </li>
          )}
          {currentUser.facebook && (
            <li>
              <a
                href={`https://facebook.com/${currentUser.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <img src={iconFacebook} alt="twitter" width={28} height={28} />
                <Text color="lightGray" size="m">
                  @{currentUser.facebook}
                </Text>
              </a>
            </li>
          )}
          {currentUser.site && (
            <li>
              <a
                href={`${currentUser.site}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <img src={iconSiteOutline} alt="site" width={28} height={28} />
                <Text color="lightGray" size="m">
                  {currentUser.site}
                </Text>
              </a>
            </li>
          )}
          {!currentUser.twitter &&
            !currentUser.instagram &&
            !currentUser.facebook &&
            !currentUser.site && (
              <li>
                <Text color="lightGray" size="m">
                  Not provided yet
                </Text>
              </li>
            )}
        </ul>
        <Text color="gray" size="m" className={styles.registered}>
          Member since {moment(currentUser.created_at).format('MMM D, YYYY')}
        </Text>
      </div>
    </>
  );
};
export default About;
