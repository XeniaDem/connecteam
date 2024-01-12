import styles from "./Button.module.css"
import cn from 'classnames';
type Props = {
    text: string;
    onClick: ()=>void;
    className?: string; 

}
export function Button(props: Props) {


  return (
    <button className={cn(styles.button, props.className)} onClick={props.onClick}>
     
    {props.text}
    </button>

   
  )
}