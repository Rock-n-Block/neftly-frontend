import {FC, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {routes} from 'appConstants';
import cx from 'classnames';
import {Button, Text} from 'components';
import {useMst} from 'store';

import styles from './styles.module.scss';
import {Popover} from "containers";
import {observer} from "mobx-react-lite";
import {usePopover} from "hooks";
import {useHistory} from "react-router";

interface IHeaderLinksProps {
  toggleMenu?: () => void;
  className?: string;
};

interface ITag {
  icon: string,
  title: string
};

interface IHeaderNestedBodyProps {
  links?: ITag[];
};

const HeaderNestedBody: FC<IHeaderNestedBodyProps> = ({links}) => {
  const {closePopover}=usePopover();
  const history=useHistory();
  const handleTagClick=(title:string)=>{
    history.push(routes.discover.filter(title));
    closePopover();
  }
  return (
    <>
      {links?.map((tag) => (
        <Button
          className={styles.dropdownLink}
          key={tag.title} color="transparent" icon={tag.icon} onClick={()=>handleTagClick(tag.title)}>
          <Text color="black" size="m" weight="medium">{tag.title}</Text>
        </Button>
      ))}
    </>
  )
}

const HeaderLinks: FC<IHeaderLinksProps> = observer(({className, toggleMenu}) => {
  const {
    user,
    nftTags,
  } = useMst();

  const location = useLocation();

  const nav = useMemo(
    () => [
      {
        title: 'Explore',
        active: location.pathname.includes(routes.discover.root),
        disabled: false,
        isNested: true,
        internalLinks: nftTags.getTags as ITag[],
      },
      {
        url: routes.activity.root,
        active: location.pathname.includes(routes.activity.root),
        title: 'Activity',
        isNested: false,
        disabled: !user.address,
      },
      {
        url: routes.create.root,
        active: location.pathname.includes(routes.create.root),
        title: 'Create',
        isNested: false,
        disabled: !user.address,
      },
    ],
    [location.pathname, nftTags.getTags, user.address],
  );


  return (
    <div className={cx(styles.headerNavigation, className)}>
      {nav.map(({url, title, active, disabled, isNested, internalLinks}) => {
        if (isNested && !disabled) {
          return (
            <Popover>
              <Popover.Button>
                <Text weight="medium" size="m" color={active ? 'primary' : 'black'}>{title}</Text>
              </Popover.Button>
              <Popover.Body>
                <HeaderNestedBody links={internalLinks}/>
              </Popover.Body>
            </Popover>
          );
        }
        if (url && !disabled) {
          return (
            <Button key={title} href={url} color="transparent" onClick={toggleMenu}>
              <Text weight="medium" size="m" color={active ? 'primary' : 'black'}>{title}</Text>
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
});

export default HeaderLinks;
