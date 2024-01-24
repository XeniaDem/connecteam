import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css"
import cn from 'classnames';
import { IconProps } from "@mui/material";
type Props = {
  text: string;
  onClick: () => void;
  className?: string;

  disabled? : boolean;
}
export function Button(props: Props) {


  return (
    <button className={cn(styles.button, props.className)} onClick={props.onClick} disabled = {props.disabled}>

      {props.text}
    </button>


  )
}