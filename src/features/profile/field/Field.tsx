
import { useState } from "react";
import styles from "./Field.module.css"


type Props = {
  title: string;
  placeholder?: string;
  isInput: boolean;
  disabled: boolean;

  value?: string;
  onValueChange?: (newValue: string) => void;





}


export function Field(props: Props) {



  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {props.title}
      </div>
      <div className={styles.inputs}>
        {props.isInput ? (
          <input className={styles.input} placeholder={props.placeholder} disabled={props.disabled}
            value={props.value} onChange={(event) => { props.onValueChange?.(event.target.value) }} />
        ) : (
          <textarea className={styles.textarea} placeholder={props.placeholder} disabled={props.disabled} 
          value={props.value} onChange={(event) => { props.onValueChange?.(event.target.value) }}/>
        )}
      </div>



    </div>
  )
}
