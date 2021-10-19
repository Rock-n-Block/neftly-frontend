import { FC, PropsWithChildren } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { folders } from 'assets/img';
import cx from 'classnames';

import styles from './styles.module.scss';

type Props = {
  valueToCopy: string;
  onCopy?: () => void;
  withIcon?: boolean;
  className?: string;
  classNameIcon?: string;
};

const Copyable: FC<PropsWithChildren<Props>> = ({
  valueToCopy,
  onCopy = () => {},
  children,
  withIcon,
  className,
  classNameIcon,
}) => (
  <CopyToClipboard
    text={valueToCopy}
    onCopy={() => {
      onCopy();
      toast.success('Value copied');
    }}
  >
    <div className={cx(styles.copy, withIcon && styles.withIcon, className)}>
      {children}
      {withIcon && <img src={folders} alt="" className={cx(styles.icon, classNameIcon)} />}
    </div>
  </CopyToClipboard>
);

export default Copyable;
