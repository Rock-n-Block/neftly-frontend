import { FC, PropsWithChildren } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { LinkIcon } from 'assets/img';
import cx from 'classnames';

import styles from './styles.module.scss';

type Props = {
  valueToCopy: string;
  onCopy?: () => void;
  withIcon?: boolean;
  className?: string;
  classNameIcon?: string;
  title?: string
};

const Copyable: FC<PropsWithChildren<Props>> = ({
  valueToCopy,
  onCopy = () => {},
  children,
  withIcon,
  className,
  classNameIcon,
  title = 'Value'
}) => (
  <CopyToClipboard
    text={valueToCopy}
    onCopy={() => {
      onCopy();
      toast.success(`${title} copied`);
    }}
  >
    <div className={cx(styles.copy, withIcon && styles.withIcon, className)}>
      {withIcon && <img src={LinkIcon} alt="" className={cx(styles.icon, classNameIcon)} />}
      {children}
    </div>
  </CopyToClipboard>
);

export default Copyable;
