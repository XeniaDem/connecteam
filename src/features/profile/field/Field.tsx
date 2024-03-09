
import styles from "./Field.module.css"
import Dropdown, { Option } from 'react-dropdown';

type Props = {
  title: string;
  placeholder?: string;
  isInput?: boolean;
  isTextArea?: boolean;
  isDropDown?: boolean;
  disabled?: boolean;

  value?: string;
  onValueChange?: (newValue: string) => void;
  small?: boolean;

  dropDownValue?: string;
  onDropDownValueChange?: (newValue: Option) => void;
  options: string[];
}
Field.defaultProps = {options: ['Нет доступа', 'Простой',  'Расширенный', 'Широкий']}


export function Field(this: any, props: Props) {

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {props.title}
      </div>
      <div className={styles.inputs}>
        {props.isInput ? (
          <input className={!props.small ? styles.input : styles.inputSmall} placeholder={props.placeholder} disabled={props.disabled}
            value={props.value} onChange={(event) => { props.onValueChange?.(event.target.value) }} />
        ) : (
          null
        )}
        {props.isTextArea ? (
          <textarea className={styles.textarea} placeholder={props.placeholder} disabled={props.disabled}
            value={props.value} onChange={(event) => { props.onValueChange?.(event.target.value) }} maxLength={256}/>
        ) : (
          null
        )}
        {props.isDropDown ? (
          <Dropdown controlClassName={styles.control} menuClassName={styles.menu} arrowClassName= {styles.arrow}
            options = {props.options} onChange={props.onDropDownValueChange} value={props.dropDownValue} placeholder="Select an option" />
        ) : (
          null
        )}
      </div>
    </div>
  )
}
