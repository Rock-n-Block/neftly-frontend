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
  onClick: (url:string) => void;
};

const HeaderNestedBody: FC<IHeaderNestedBodyProps> = ({links, onClick}) => {
  const {closePopover} = usePopover();
  const handleTagClick = (title: string) => {
    closePopover();
    onClick(routes.discover.filter(title))
  }
  return (
    <>
      {links?.map((tag) => (
        <Button
          className={styles.dropdownLink}
          key={tag.title} color="transparent" icon={tag.icon} onClick={() => handleTagClick(tag.title)}>
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
  const history = useHistory();

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
  const handleMenuItemClick=(url:string)=>{
    if(toggleMenu){
      toggleMenu()
    }
    history.push(url);
  }

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
                <HeaderNestedBody links={internalLinks} onClick={handleMenuItemClick}/>
              </Popover.Body>
            </Popover>
          );
        }
        if (url && !disabled) {
          return (
            <Button key={title} color="transparent" onClick={()=>handleMenuItemClick(url)}>
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
