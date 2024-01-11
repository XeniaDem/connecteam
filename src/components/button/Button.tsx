import styles from "./Button.module.css"
type Props = {
    text: string;
    onClick: ()=>void;

}
export function Button(props: Props) {


  return (
    <button className={styles.button} onClick={props.onClick}>
     
    {props.text}
    </button>

   
  )
}