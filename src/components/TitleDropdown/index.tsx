import {FC} from "react";
import {OptionType} from "typings";
import cn from "classnames";
import styles from './styles.module.scss'


interface IProps {
  options: OptionType[];
  className?:string;
}

const TitleDropdown: FC<IProps> = ({options,className}) => {
  return(
    <select className={cn(styles.titleSelect,className)}>
      {options.map((option) => (<option value={option.value} className={styles.option}>{option.label}</option>))}
    </select>
  )
}
export default TitleDropdown;
