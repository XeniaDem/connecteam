
import styles from "./Field.module.css"


type Props = {
  text: string;
  placeholder?: string;

  


}


export function Field(props: Props) {


  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {props.text}
      </div>
      <div className={styles.inputs}>
        <input className={styles.input} placeholder= {props.placeholder}  />
      </div>



    </div>
  )
}
