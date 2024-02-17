import { ButtonHTMLAttributes } from "react";
import styles from "./CheckBox.module.css"
import cn from 'classnames';
import React from "react";
import check from './check.svg'
type Props = {
  text?: string;
  className?: string;
  checked?: boolean;
  setChecked: (newValue: boolean) => void;


}
export function CheckBox(props: Props) {

  // const [checked, setChecked] = React.useState(props.checked);


  const handleChange = () => {
    props.setChecked(!props.checked);


  };


  return (
    <div className={styles.checkbox}>
      <div className={styles.label}>
        <input type="checkbox" checked={props.checked}
          onChange={handleChange} />




        <div className={styles.check}>
          {
            (!props.checked) ? null :


              <img src={check} />
          }






        </div>


      </div>








    </div>






  )
}