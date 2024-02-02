
import { useState } from "react";
import styles from "./Field.module.css"


type Props = {
  title: string;
  placeholder?: string;
  isInput: boolean;
  disabled: boolean;

  value?: string;
  onValueChange?: (newValue: string) => void;
  small?:boolean;





}


export function Field(props: Props) {



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
          <textarea className={styles.textarea} placeholder={props.placeholder} disabled={props.disabled} 
          value={props.value} onChange={(event) => { props.onValueChange?.(event.target.value) }}/>
        )}
      </div>



    </div>
  )
}
