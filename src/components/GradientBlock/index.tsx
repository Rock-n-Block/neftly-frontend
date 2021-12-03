import cn from 'classnames';

import styles from './GradientBlock.module.scss';
import { FC } from 'react';

interface IGradientBlockProps {
  className?: string;
  color: string;
  align: string;
}

const GradientBlock: FC<IGradientBlockProps> = ({ className, color, align = 'left' }) => {
  return <div className={cn(className, styles.gradient, styles[color], styles[align])}> </div>;
};

export default GradientBlock;
