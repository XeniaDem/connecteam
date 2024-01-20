import { ButtonHTMLAttributes } from "react";
import styles from "./CheckBox.module.css"
import cn from 'classnames';
import React from "react";
type Props = {
  text?: string;
  onClick?: () => void;
  className?: string;

}
export function CheckBox(props: Props) {

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };


  return (
    <div className={styles.checkbox}  >
      <label>
        <input type="checkbox" checked={checked}
          onChange={handleChange} />
    
      </label>



  
    </div>






  )
}